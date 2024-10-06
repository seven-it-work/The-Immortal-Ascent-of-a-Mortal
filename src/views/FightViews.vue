<script lang="ts" setup>
import PeopleCom from "../components/PeopleCom.vue";
import EquipmentCom from "../components/EquipmentCom.vue";
import {useFightStore} from "../store/useFightStore.ts";
import {Fight} from "../objs/Fight.ts";
import {beAttacked, doAttacked} from "../util/AnimateUtils.ts";
import {getPercent, randomUtil} from "../util/ProbabilityUtils.ts";
import {getLevelStr, ImmortalCultivators} from "../objs/ImmortalCultivators.ts";
import {message, Modal} from 'ant-design-vue';
import {useLogStore} from "../store/useLogStore.ts";
import {fightNodeCreate, sleep, createEquipment} from "../util/RandomCreateUtils.ts";
import {ref} from "vue";
import {progressFormat, textEllipsis} from "../util/StrUtils.ts";
import {one_classify} from "../objs/Equipment.ts";
import EquipmentPopoverItem from "../components/equipment/EquipmentPopoverItem.vue";
import EquipmentCompare from "../components/equipment/EquipmentCompare.vue";

const fightStore = useFightStore()
const logStore = useLogStore()
const fight: Fight = fightStore.getFight;

// 战斗执行
async function doFight(): Promise<string> {
    const currentFightProgress = fightStore.getFight.fightNode.getCurrentFightProgress();
    if (['小兵'].includes(currentFightProgress.type)) {
        // todo 先手问题，这里默认 player先手
        let round2 = 0;
        let isPlayer = true;

        let playerFightIndex = 0;
        let enemyFightIndex = 0;
        const fightList = fightStore.getFight.player.getFightList();
        const currentEnemy = (currentFightProgress?.currentEnemy || [])
        while (true) {
            const sPlayer = fightList.filter(item => item.isLife());
            const sEnemy = currentEnemy.filter(item => item.isLife());
            if (sPlayer.length == 0) {
                // 战斗结束，失败了
                return "失败了"
            }
            if (sEnemy.length == 0) {
                // 战斗结束，胜利
                // 物品掉落
                const equipment = createEquipment({});
                fightStore.getFight.player.playerInfo.baseEquipment.push(equipment)
                return "胜利了"
            }
            if (isPlayer) {
                const attack = fightList[playerFightIndex];
                if (attack.isLife()) {
                    // 敌人随机选则一个
                    const immortalCultivator = randomUtil.pickone(sEnemy);
                    await fightFunction(attack, immortalCultivator);
                    isPlayer = false
                }
                playerFightIndex++;
                playerFightIndex = playerFightIndex % fightList.length;
            } else {
                const attack = currentEnemy[enemyFightIndex];
                if (attack.isLife()) {
                    // 敌人随机选则一个
                    const immortalCultivator = randomUtil.pickone(sPlayer);
                    await fightFunction(attack, immortalCultivator);
                    isPlayer = true
                }
                enemyFightIndex++;
                enemyFightIndex = enemyFightIndex % currentEnemy.length;
            }
            round2++;
            if (round2 % 2 == 0) {
                fightStore.getFight.round = round2 / 2;
            }
        }
    } else if (['灵力'].includes(currentFightProgress.type)) {
        // todo 这里是谁吸收呢？是玩家？随机一个？还是随机分配？
        randomUtil.pickone(fightStore.getFight.player.getFightList()).currentLinLi += currentFightProgress.linLi;
        return Promise.resolve("吸收灵力");
    }
    return Promise.resolve("还在开发中...");
}

async function fightFunction(attacker: ImmortalCultivators, defencer: ImmortalCultivators) {
    // 播放动画
    await doAttacked(document.getElementById(`card_animate_${attacker.id}`))
    // 血量计算
    const harm = fightTargetAndGetHarm(attacker, defencer);
    logStore.logAttack(attacker, defencer, harm)
    defencer.currentLife -= harm;
    await beAttacked(document.getElementById(`card_animate_${defencer.id}`))
}


/**
 * 对敌人进行攻击，并计算造成伤害
 * 1、先进行躲避判断，如果判断成功，造成伤害为0；
 * 2、判断是否暴击，如果暴击则加入暴击额外伤害
 * 3、计算伤害=（暴击额外伤害+攻击力-对方防御力）
 */
function fightTargetAndGetHarm(attacker: ImmortalCultivators, defencer: ImmortalCultivators): number {
    if (attacker.checkIsHit(defencer)) {
        let harm = attacker.getAttack() - defencer.getDefense();
        if (attacker.checkIsCriticalHits()) {
            // 暴击成功
            harm += attacker.getCriticalDamage();
        }
        // 最低造成的伤害为1
        return Math.max(harm, 1);
    } else {
        // 躲避成功
        logStore.logAvoid(defencer)
        return 0;
    }
}


async function startFight() {
    fightStore.getFight.isStart = true
    fightStore.getFight.isFighting = true
    await sleep(1000)
    if (fightStore.getFight.fightNode.currentProgressIndex > (fightStore.getFight.fightNode.fightProgressList?.length || 0) - 1) {
        fightStore.getFight.isFighting = false
        // 结束了 弹窗告知
        // todo 加入日志
        // todo 这里可以加入3秒等待，等待完成后，自动点击ok按钮
        if (fightStore.getFight.isAutoNextRound) {
            // 继续运行
            fightStore.getFight.fightNode = fightNodeCreate()
            startFight()
        }else {
            Modal.confirm({
                closable: true,
                title: '战斗信息',
                content: '战斗完成了',
                okText: '继续战斗',
                cancelText: '知道了',
                onOk: () => {
                    fightStore.getFight.fightNode = fightNodeCreate()
                    startFight()
                },
                onCancel: () => {
                    console.log("知道了")
                }
            })
        }
        return
    }
    const type = await doFight();
    // 重置回合
    fightStore.getFight.round = 0;
    if (['吸收灵力'].includes(type)) {
        fightStore.getFight.fightNode.currentProgressIndex++;
        // 继续运行
        await startFight()
        return
    } else if (['胜利了'].includes(type)) {
        // todo 加入日志
        message.success(type)
        if (fightStore.getFight.isAutoNextRound) {
            fightStore.getFight.fightNode.currentProgressIndex++;
            // 继续运行
            await startFight()
        } else {
            // 手动点击按钮
        }
    } else if (type === '失败了') {
        // todo 加入日志
        // 弹窗告知
        Modal.error({
            title: '战斗信息',
            content: '失败了',
        })
    }
    fightStore.getFight.isFighting = false
}


function changeAutoNext() {
    if (fightStore.getFight.isAutoNextRound && !fightStore.getFight.isFighting) {
        fightStore.getFight.fightNode.currentProgressIndex++;
        startFight()
    }
}

function clickStartFight() {
    fightStore.getFight.fightNode.currentProgressIndex++;
    startFight()
}


const activeKey = ref('CharacterInformation');
const characterIndex = ref(0);


function changeEquipment(item) {
    console.log("触发了")
    // 从背包移除
    const allListElement = fightStore.getFight.player.getAllList()[characterIndex.value];
    const oldLength = allListElement.baseEquipment.length;
    allListElement.baseEquipment = allListElement.baseEquipment?.filter(equipment => equipment.id != item.id) || [];
    if (oldLength !== allListElement.baseEquipment.length) {
        const oldEquipment = allListElement[item.type];
        allListElement[item.type] = item
        if (oldEquipment && oldEquipment.id) {
            // 替换的装备放入背包
            allListElement.baseEquipment.push(oldEquipment)
        }
    } else {
        // 存在错误，装备了数量还是没有减少
    }
}
</script>

<template>
  <!--PC，安卓存在挤在一起问题-->
  <!--战斗区域-->
    <a-row style="padding: 20px" justify="space-between">
        <a-col :span="8">
            <div v-for="item in fightStore.getFight.player.getFightList()" :key="item.id">
                <PeopleCom :immortal-cultivator="item"></PeopleCom>
            </div>
        </a-col>
        <a-col :span="4">
            <div>第{{ fightStore.getFight.round }}回合</div>
            <template v-if="fightStore.getFight.isStart">
                <a-checkbox v-model:checked="fightStore.getFight.isAutoNextRound" @change="changeAutoNext">自动
                </a-checkbox>
                <a-button :disabled="fightStore.getFight.isAutoNextRound || fightStore.getFight.isFighting"
                          @click="clickStartFight">下一个阶段
                </a-button>
            </template>
            <template v-else>
                <a-button @click="startFight">开始</a-button>
            </template>
        </a-col>
        <a-col :span="10">
            <div v-for="item in fightStore.getFight.fightNode.getCurrentFightProgress()?.currentEnemy"
                 v-if="fightStore.getFight.fightNode.getCurrentFightProgress()?.currentEnemy" :key="item.id">
                <PeopleCom :immortal-cultivator="item"></PeopleCom>
            </div>
        </a-col>
    </a-row>
  <!--  进度区域-->
    <a-row style="padding: 20px">
        <a-flex style="margin:5px;width: 100%;height: 80px;border-radius: 6px;border: 1px solid #40a9ff"
                justify="space-between" align="center">
            <span>进  度：</span>
            <a-card v-for="item in fightStore.getFight.fightNode.getNextFightProgressList()" :key="item.id">
                {{ item.type }}
            </a-card>
        </a-flex>
        <a-progress
                :percent="getPercent(fightStore.getFight.fightNode.currentProgressIndex,fightStore.getFight.fightNode.fightProgressList?.length)"
                :size="[800, 20]"/>
    </a-row>
    <a-row justify="space-between" align="center" style="margin: 20px">
        <a-col :span="10">
            <!--      日志 todo 自动往下滚动-->
            <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px;overflow-y: scroll">
                <div v-for="item in logStore.logs" :key="item" v-html="item"></div>
            </div>
        </a-col>
        <a-col>
            <a-divider type="vertical" style="height: 400px; background-color: #7cb305"/>
        </a-col>
        <a-col :span="13">
            <!--      个人信息-->
            <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px;padding: 10px">
                <a-tabs v-model:activeKey="activeKey" type="card">
                    <a-tab-pane key="CharacterInformation" tab="人物信息">
                        <a-tabs
                                v-model:activeKey="characterIndex"
                                :style="{ height: '300px' }"
                                tab-position="left"
                        >
                            <a-tab-pane v-for="(item,i) in fightStore.getFight.player.getAllList()" :key="i"
                                        :tab="`${item.name}`">
                                <a-row>
                                    <a-col :span="6">
                                        <EquipmentCom :immortal="item"></EquipmentCom>
                                    </a-col>
                                    <a-col :span="6">
                                        <div style="overflow: hidden;">
                                            境界：{{ item.getLevelStr() }}
                                            <a-button v-if="item.canUpdateLevel()" size="small"
                                                      @click="item.doUpdateLevel()">突破
                                            </a-button>
                                        </div>
                                        <div class="progress-container">
                                            <a-progress
                                                    :stroke-color="{from: '#108ee9',to: '#87d068',}"
                                                    :percent="getPercent(item.currentLinLi,item.getUpdateLinLi())"
                                                    status="active"
                                                    :size="[300, 20]"
                                                    :format="(percent)=>progressFormat(percent,'灵力')"
                                            ></a-progress>
                                        </div>
                                        <div class="progress-container">
                                            <a-progress
                                                    :stroke-color="{from: '#108ee9',to: '#87d068',}"
                                                    :percent="getPercent(item.currentLife,item.getLife())"
                                                    status="active"
                                                    :size="[300, 20]"
                                                    :format="(percent)=>progressFormat(percent,'生命')"
                                            ></a-progress>
                                        </div>
                                        <div class="progress-container">
                                            <a-progress
                                                    :stroke-color="{from: '#108ee9',to: '#87d068',}"
                                                    :percent="getPercent(item.currentMana,item.getMana())"
                                                    status="active"
                                                    :size="[300, 20]"
                                                    :format="(percent)=>progressFormat(percent,'法力')"
                                            />
                                        </div>
                                        <a-row>
                                            <a-col :span="12">攻击力：{{ item.getAttack() }}</a-col>
                                            <a-col :span="12">防御力：{{ item.getDefense() }}</a-col>
                                            <a-col :span="12">暴击率：{{ item.getCriticalHitProbability() }}</a-col>
                                            <a-col :span="12">暴伤：{{ item.getCriticalDamage() }}</a-col>
                                            <a-col :span="12">命中：{{ item.hit }}</a-col>
                                            <a-col :span="12">躲避：{{ item.avoid }}</a-col>
                                        </a-row>
                                    </a-col>
                                    <a-col :span="6">
                                        <div>属性</div>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </a-tab-pane>
                    <a-tab-pane key="2" tab="背包" force-render>
                        <div v-for="item in fightStore.getFight.player.getAllList()[characterIndex].baseEquipment"
                             :key="item.id">
                            <a-card
                                    style="width: 60px; height: 60px;margin: 5px"
                                    :bodyStyle="{ margin: '0', padding: '0' }"
                            >
                                <div style="width: 100%; height: 60px;" class="center-content">
                                    <a-popover>
                                        {{ textEllipsis(item.name) }}
                                        <template #title>
                                            <EquipmentCompare
                                            :current-equipment="fightStore.getFight.player.getAllList()[characterIndex][item.type]"
                                            :new-equipment="item"
                                            @change-equipment="changeEquipment"
                                            ></EquipmentCompare>
                                        </template>
                                    </a-popover>
                                </div>
                            </a-card>
                        </div>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </a-col>
    </a-row>
  <!--  战斗日志-->
</template>

<style scoped>

</style>
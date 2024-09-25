<script lang="ts" setup>
import PeopleCom from "../components/PeopleCom.vue";
import EquipmentCom from "../components/EquipmentCom.vue";
import {useFightStore} from "../store/useFightStore.ts";
import {Fight} from "../objs/Fight.ts";
import {beAttacked, doAttacked} from "../util/AnimateUtils.ts";
import {getPercent, randomUtil} from "../util/ProbabilityUtils.ts";
import {ImmortalCultivators} from "../objs/ImmortalCultivators.ts";
import {message, Modal} from 'ant-design-vue';
import {useLogStore} from "../store/useLogStore.ts";

const fightStore = useFightStore()
const logStore = useLogStore()
const fight: Fight = fightStore.fight;

// 战斗执行
async function doFight(): Promise<string> {
  // todo 先手问题，这里默认 player先手
  let round2 = 0;
  let isPlayer = true;

  let playerFightIndex = 0;
  let enemyFightIndex = 0;
  const fightList = fight.player.getFightList();
  const currentEnemy = (fight.fightNode.getCurrentFightProgress()?.currentEnemy || [])

  while (true) {
    const sPlayer = fightList.filter(item => item.isLife());
    const sEnemy = currentEnemy.filter(item => item.isLife());
    if (sPlayer.length == 0) {
      // 战斗结束，失败了
      return "失败了"
    }
    if (sEnemy.length == 0) {
      // 战斗结束，胜利
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
      fight.round = round2 / 2;
    }
  }
}

async function fightFunction(attacker: ImmortalCultivators, defencer: ImmortalCultivators) {
  logStore.logAttack(attacker, defencer)
  // 播放动画
  await doAttacked(document.getElementById(`card_animate_${attacker.id}`))
  // 血量计算
  defencer.currentLife = (defencer?.currentLife || 0) - attacker.getAttack()
  await beAttacked(document.getElementById(`card_animate_${defencer.id}`))
}


async function startFight() {
  fight.isStart = true
  fight.isFighting = true
  if (fight.fightNode.currentProgressIndex > (fight.fightNode.fightProgressList?.length || 0) - 1) {
    fight.isFighting = false
    // 结束了 弹窗告知
    // todo 加入日志
    Modal.success({
      title: '战斗信息',
      content: '战斗完成了',
    })
    return
  }
  const type = await doFight();
  // 重置回合
  fight.round = 0;
  if (type === '胜利了') {
    // todo 加入日志
    message.success('胜利！')
    if (fight.isAutoNextRound) {
      fight.fightNode.currentProgressIndex++;
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
  fight.isFighting = false
}


function changeAutoNext() {
  if (fight.isAutoNextRound && !fight.isFighting) {
    fight.fightNode.currentProgressIndex++;
    startFight()
  }
}

function clickStartFight() {
  fight.fightNode.currentProgressIndex++;
  startFight()
}
</script>

<template>
  <!--PC，安卓存在挤在一起问题-->
  <!--战斗区域-->
  <a-row style="padding: 20px" justify="space-between">
    <a-col :span="8">
      <div v-for="item in fight.player.getFightList()" :key="item.id">
        <PeopleCom :immortal-cultivator="item"></PeopleCom>
      </div>
    </a-col>
    <a-col :span="4">
      <div>第{{ fight.round }}回合</div>
      <template v-if="fight.isStart">
        <a-checkbox v-model:checked="fight.isAutoNextRound" @change="changeAutoNext">自动</a-checkbox>
        <a-button :disabled="fight.isAutoNextRound || fight.isFighting" @click="clickStartFight">下一个阶段</a-button>
      </template>
      <template v-else>
        <a-button @click="startFight">开始</a-button>
      </template>
    </a-col>
    <a-col :span="10">
      <div v-for="item in fight.fightNode.getCurrentFightProgress()?.currentEnemy"
           v-if="fight.fightNode.getCurrentFightProgress()?.currentEnemy" :key="item.id">
        <PeopleCom :immortal-cultivator="item"></PeopleCom>
      </div>
    </a-col>
  </a-row>
  <!--  进度区域-->
  <a-row style="padding: 20px">
    <a-flex style="margin:5px;width: 100%;height: 80px;border-radius: 6px;border: 1px solid #40a9ff"
            justify="space-between" align="center">
      <span>进  度：</span>
      <a-card v-for="item in fight.fightNode.getNextFightProgressList()" :key="item.id">
        {{ item.type }}
      </a-card>
    </a-flex>
    <a-progress :percent="getPercent(fight.fightNode.currentProgressIndex,fight.fightNode.fightProgressList?.length)"
                :size="[800, 20]"/>
  </a-row>
  <a-row justify="space-between" align="center" style="margin: 20px">
    <a-col :span="10">
      <!--      日志 todo 自动往下滚动-->
      <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px">
        <div v-for="item in logStore.logs" :key="item" v-html="item"></div>
      </div>
    </a-col>
    <a-col>
      <a-divider type="vertical" style="height: 400px; background-color: #7cb305"/>
    </a-col>
    <a-col :span="13">
      <!--      个人信息-->
      <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px">
        <a-row>
          <a-col flex="none">
            <EquipmentCom></EquipmentCom>
          </a-col>
          <a-col flex="auto">
            装备信息
          </a-col>
        </a-row>
      </div>
    </a-col>
  </a-row>
  <!--  战斗日志-->
</template>

<style scoped>

</style>
<script setup lang="ts">
import FightViews from "./views/FightViews.vue";
import {Player} from "./objs/Player.ts";
import {fightNodeCreate, immortalCreate} from "./util/RandomCreateUtils.ts";
import {Fight} from "./objs/Fight.ts";
import {useFightStore} from "./store/useFightStore.ts";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
// import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import {useLogStore} from "./store/useLogStore.ts";
import {doLoad, doSave} from "./util/SaveUtils.ts";
import {ref} from "vue";
// dayjs.locale('zh-cn');
const locale = zhCN

// 初始化player
const immortalCultivators = immortalCreate({level: 1, physique: 50});
immortalCultivators.name = "会飞的🐖"
const player = new Player(immortalCultivators, []);
const fight = new Fight(player, 0, false, fightNodeCreate());

useFightStore().init(fight)

const fightStore = useFightStore()
const logStore = useLogStore()
const saveDataStr = ref("{\"logs\":[\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成3点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成2点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成4点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成3点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成4点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成3点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成3点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成3点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\"],\"fight\":{\"player\":{\"playerInfo\":{\"birth\":0,\"id\":\"067675b8-239b-5d04-841e-56a9d05fed7b\",\"level\":1,\"name\":\"会飞的🐖\",\"strength\":5,\"soulForce\":2,\"physique\":52,\"currentLife\":33,\"currentMana\":2,\"usedPoints\":20,\"currentLinLi\":6,\"toughness\":2,\"erupt\":2,\"blast\":0,\"hit\":8,\"avoid\":3,\"baseEquipment\":[{\"type\":\"weapon\",\"id\":\"480db885-5c34-5cf9-85f4-dcd1e63cc58e\",\"name\":\"测试🗡\",\"requiredEquipmentLevel\":1,\"attack\":1,\"life\":0,\"mana\":0},{\"type\":\"ring\",\"id\":\"cdd080cc-12ae-57c5-9c19-675aa10b5c3c\",\"name\":\"测试衣\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":2,\"mana\":0},{\"type\":\"ring\",\"id\":\"4de97ac3-37b2-5e94-9f58-c648fa083271\",\"name\":\"测试衣\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":1,\"mana\":1},{\"type\":\"clothe\",\"id\":\"5015bc15-def6-5800-a1bc-0f0c3b09724e\",\"name\":\"测试衣\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":0,\"mana\":2}],\"avoidCount\":0},\"otherImmortal\":[],\"notFightImmortal\":[]},\"round\":0,\"isAutoNextRound\":false,\"fightNode\":{\"id\":\"70a64b06-df9f-585f-bf0b-6358cfe13eb1\",\"fightProgressList\":[{\"id\":\"49487e1c-ec17-507d-afc5-6a37e4cdc302\",\"currentEnemy\":[{\"birth\":0,\"id\":\"ff6ebd8d-11bc-5fe4-8c51-ac8dda2b568b\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":4,\"physique\":1,\"currentLife\":0,\"currentMana\":4,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":4,\"erupt\":5,\"blast\":3,\"hit\":1,\"avoid\":4,\"baseEquipment\":[],\"avoidCount\":0},{\"birth\":0,\"id\":\"e936370b-b420-5ac8-b3d4-ef4e843fde2d\",\"level\":1,\"name\":\"你好\",\"strength\":5,\"soulForce\":2,\"physique\":2,\"currentLife\":0,\"currentMana\":2,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":3,\"erupt\":1,\"blast\":2,\"hit\":6,\"avoid\":4,\"baseEquipment\":[],\"avoidCount\":0}],\"type\":\"小兵\",\"linLi\":0},{\"id\":\"c26fc9e8-dd37-5d39-a659-a6301fadb6be\",\"type\":\"灵力\",\"linLi\":1}],\"currentProgressIndex\":0},\"isFighting\":false,\"isStart\":true}}")

function save() {
    saveDataStr.value = doSave(logStore.logs, fightStore.fight);
}

function load() {
    const saveObj = doLoad(saveDataStr.value);
    fightStore.init(saveObj.fight);
    logStore.init(saveObj.logs);
}
</script>

<template>
    <a-config-provider :locale="locale">
        <a-flex>
            <a-textarea v-model:value="saveDataStr"></a-textarea>
            <div>
                <a-button type="primary" @click="save">保存</a-button>
                <a-button @click="load">加载</a-button>
            </div>
        </a-flex>
        <FightViews></FightViews>
    </a-config-provider>
</template>

<style scoped>

</style>

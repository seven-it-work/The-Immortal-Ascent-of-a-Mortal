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
const saveDataStr = ref("{\"logs\":[\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成5点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成3点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成6点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成6点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成5点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成2点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\"],\"fight\":{\"player\":{\"playerInfo\":{\"birth\":0,\"id\":\"7ecac66d-d3b3-5637-9b1e-e2469c99120c\",\"level\":1,\"name\":\"会飞的🐖\",\"strength\":4,\"soulForce\":1,\"physique\":52,\"currentLife\":37,\"currentMana\":1,\"usedPoints\":20,\"currentLinLi\":3,\"toughness\":1,\"erupt\":5,\"blast\":3,\"hit\":2,\"avoid\":6,\"baseEquipment\":[{\"type\":\"shoe\",\"type2\":\"鞋\",\"rarity\":\"exotic\",\"id\":\"a900ed6e-16a5-55ab-8572-899918b9bb09\",\"name\":\"希夷秘鞋\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":7},{\"type\":\"clothe\",\"type2\":\"甲\",\"rarity\":\"legendary\",\"id\":\"eb2b5f58-ea7d-5f81-905a-d24cb22bebcc\",\"name\":\"万剑灰木甲\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":1,\"mana\":6,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":5},{\"type\":\"shoe\",\"type2\":\"靴\",\"rarity\":\"mythic\",\"id\":\"df6f60be-499e-5406-8746-a80cada67592\",\"name\":\"天龙古靴\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":5}],\"avoidCount\":0},\"otherImmortal\":[],\"notFightImmortal\":[]},\"round\":0,\"isAutoNextRound\":false,\"fightNode\":{\"id\":\"3396bc9d-9c8e-56bb-a8af-23c3a183b5fc\",\"fightProgressList\":[{\"id\":\"699b97b5-0027-5e8a-a13d-453e56ca5fdc\",\"currentEnemy\":[{\"birth\":0,\"id\":\"e6628f4f-6d99-59e6-a06f-6c61209fd7f3\",\"level\":1,\"name\":\"你好\",\"strength\":2,\"soulForce\":4,\"physique\":4,\"currentLife\":0,\"currentMana\":4,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":2,\"erupt\":1,\"blast\":1,\"hit\":6,\"avoid\":5,\"baseEquipment\":[],\"avoidCount\":0}],\"type\":\"小兵\",\"linLi\":0},{\"id\":\"a3989f65-5796-5e9e-9f00-3835e943ec1e\",\"currentEnemy\":[{\"birth\":0,\"id\":\"07a28dfd-c203-550e-a722-075b05d1cdbe\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":3,\"physique\":4,\"currentLife\":4,\"currentMana\":3,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":1,\"erupt\":6,\"blast\":0,\"hit\":5,\"avoid\":3,\"baseEquipment\":[],\"avoidCount\":0},{\"birth\":0,\"id\":\"11413602-c25b-5240-a388-e6b2ad070ec1\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":4,\"physique\":2,\"currentLife\":2,\"currentMana\":4,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":7,\"erupt\":1,\"blast\":3,\"hit\":3,\"avoid\":2,\"baseEquipment\":[],\"avoidCount\":0},{\"birth\":0,\"id\":\"36beb089-ab98-554e-94ee-6c5a5bb0ce0b\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":1,\"physique\":5,\"currentLife\":5,\"currentMana\":1,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":4,\"erupt\":1,\"blast\":1,\"hit\":4,\"avoid\":6,\"baseEquipment\":[],\"avoidCount\":0}],\"type\":\"小兵\",\"linLi\":0}],\"currentProgressIndex\":0},\"isFighting\":false,\"isStart\":true}}")

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

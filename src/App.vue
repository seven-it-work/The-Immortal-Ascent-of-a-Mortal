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
const saveDataStr = ref("{\"logs\":[\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成5点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成3点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成6点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成6点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成5点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成2点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成1点伤害</div>\",\"<div>你好躲避成功</div>\",\"<div>会飞的🐖对你好进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成2点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成993点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成990点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成990点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成995点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成995点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成995点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成994点伤害</div>\",\"<div>你好对会飞的🐖进行攻击，造成1点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成994点伤害</div>\",\"<div>会飞的🐖躲避成功</div>\",\"<div>你好对会飞的🐖进行攻击，造成0点伤害</div>\",\"<div>会飞的🐖对你好进行攻击，造成996点伤害</div>\"],\"fight\":{\"player\":{\"playerInfo\":{\"birth\":0,\"id\":\"7ecac66d-d3b3-5637-9b1e-e2469c99120c\",\"level\":2,\"name\":\"会飞的🐖\",\"strength\":7,\"soulForce\":1,\"physique\":54,\"currentLife\":36,\"currentMana\":1,\"usedPoints\":30,\"currentLinLi\":1,\"toughness\":1,\"erupt\":6,\"blast\":5,\"hit\":4,\"avoid\":6,\"baseEquipment\":[{\"type\":\"shoe\",\"type2\":\"鞋\",\"rarity\":\"exotic\",\"id\":\"a900ed6e-16a5-55ab-8572-899918b9bb09\",\"name\":\"希夷秘鞋\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":7},{\"type\":\"clothe\",\"type2\":\"甲\",\"rarity\":\"legendary\",\"id\":\"eb2b5f58-ea7d-5f81-905a-d24cb22bebcc\",\"name\":\"万剑灰木甲\",\"requiredEquipmentLevel\":1,\"attack\":0,\"life\":1,\"mana\":6,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":5},{\"type\":\"bottle\",\"type2\":\"裤\",\"rarity\":\"uncommon\",\"id\":\"7097e0c3-4762-56ec-b192-081149e87d9f\",\"name\":\"赤金裤\",\"requiredEquipmentLevel\":2,\"attack\":0,\"life\":0,\"mana\":1,\"physique\":1,\"soulForce\":1,\"strength\":0,\"toughness\":1,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":4},{\"type\":\"necklace\",\"type2\":\"链\",\"rarity\":\"common\",\"id\":\"cc8de663-7a9f-571c-bec9-967df8d62ea1\",\"name\":\"铁链\",\"requiredEquipmentLevel\":2,\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":1,\"toughness\":0,\"erupt\":0,\"blast\":1,\"hit\":0,\"avoid\":0,\"points\":2},{\"type\":\"necklace\",\"type2\":\"链\",\"rarity\":\"legendary\",\"id\":\"25ffea3e-e34a-55d6-baec-38ab8e87432e\",\"name\":\"游身赤铁链（赝品）\",\"requiredEquipmentLevel\":2,\"attack\":1,\"life\":1,\"mana\":1,\"physique\":1,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":2,\"avoid\":0,\"points\":6},{\"type\":\"shoe\",\"type2\":\"靴\",\"rarity\":\"uncommon\",\"id\":\"e5d13617-73de-506f-83de-b014162d8b7a\",\"name\":\"紫竹靴\",\"requiredEquipmentLevel\":2,\"attack\":0,\"life\":1,\"mana\":0,\"physique\":0,\"soulForce\":2,\"strength\":1,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":4}],\"avoidCount\":0,\"weapon\":{\"type\":\"weapon\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"clothe\":{\"type\":\"clothe\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"bottle\":{\"type\":\"bottle\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"shoe\":{\"type\":\"shoe\",\"type2\":\"靴\",\"rarity\":\"mythic\",\"id\":\"df6f60be-499e-5406-8746-a80cada67592\",\"name\":\"天龙古靴\",\"requiredEquipmentLevel\":1,\"attack\":990,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":990,\"avoid\":0,\"points\":5},\"belt\":{\"type\":\"belt\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"ring\":{\"type\":\"ring\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"necklace\":{\"type\":\"necklace\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0},\"mount\":{\"type\":\"mount\",\"attack\":0,\"life\":0,\"mana\":0,\"physique\":0,\"soulForce\":0,\"strength\":0,\"toughness\":0,\"erupt\":0,\"blast\":0,\"hit\":0,\"avoid\":0,\"points\":0}},\"otherImmortal\":[],\"notFightImmortal\":[]},\"round\":0,\"isAutoNextRound\":true,\"fightNode\":{\"id\":\"15f92f02-62e1-5e4f-9749-27ba9dfc301c\",\"fightProgressList\":[{\"id\":\"691f1aa4-dda7-5a83-93ef-f510af4ec3a7\",\"type\":\"灵力\",\"linLi\":1},{\"id\":\"ef96fab3-0d7a-5bcb-a7d9-df6d5f03c792\",\"currentEnemy\":[{\"birth\":0,\"id\":\"6e3988b2-d4ec-5fc6-a135-c7aef090c993\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":4,\"physique\":7,\"currentLife\":7,\"currentMana\":4,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":4,\"erupt\":1,\"blast\":2,\"hit\":2,\"avoid\":2,\"baseEquipment\":[],\"avoidCount\":0},{\"birth\":0,\"id\":\"1fc5b804-a1b3-5757-973d-a275de1c710b\",\"level\":1,\"name\":\"你好\",\"strength\":2,\"soulForce\":6,\"physique\":6,\"currentLife\":6,\"currentMana\":6,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":2,\"erupt\":1,\"blast\":2,\"hit\":4,\"avoid\":2,\"baseEquipment\":[],\"avoidCount\":0},{\"birth\":0,\"id\":\"f967186d-edd4-559b-8a52-5b6d2b869321\",\"level\":1,\"name\":\"你好\",\"strength\":3,\"soulForce\":3,\"physique\":5,\"currentLife\":5,\"currentMana\":3,\"usedPoints\":20,\"currentLinLi\":0,\"toughness\":2,\"erupt\":5,\"blast\":2,\"hit\":4,\"avoid\":1,\"baseEquipment\":[],\"avoidCount\":0}],\"type\":\"小兵\",\"linLi\":0}],\"currentProgressIndex\":0},\"isFighting\":false,\"isStart\":true}}")

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

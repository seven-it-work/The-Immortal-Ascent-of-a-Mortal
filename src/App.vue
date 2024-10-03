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
const saveDataStr = ref("{}")

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

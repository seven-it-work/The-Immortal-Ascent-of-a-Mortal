<script setup lang="ts">
import FightViews from "./views/FightViews.vue";
import {Player} from "./objs/Player.ts";
import {fightNodeCreate, immortalCreate} from "./util/RandomCreateUtils.ts";
import {Fight} from "./objs/Fight.ts";
import {useFightStore} from "./store/useFightStore.ts";

// 初始化player
const immortalCultivators = immortalCreate({level: 1, physique: 50});
immortalCultivators.name = "会飞的🐖"
const player = new Player(immortalCultivators, []);
const fight = new Fight(player, 0, false, fightNodeCreate());

useFightStore().init(fight)
</script>

<template>
  <FightViews></FightViews>
</template>

<style scoped>

</style>

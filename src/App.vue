<script setup lang="ts">
import FightViews from "./views/FightViews.vue";
import {Player} from "./objs/Player.ts";
import {fightNodeCreate, immortalCreate} from "./util/RandomCreateUtils.ts";
import {Fight} from "./objs/Fight.ts";
import {useFightStore} from "./store/useFightStore.ts";

// 初始化player
const immortalCultivators = immortalCreate();
immortalCultivators.name = "会飞的🐖"
immortalCultivators.life = 500
immortalCultivators.currentLife = 500
immortalCultivators.attack=100
const player = new Player(immortalCultivators, []);
const fight = new Fight(player, 0, true, fightNodeCreate());

useFightStore().init(fight)
</script>

<template>
  <FightViews></FightViews>
</template>

<style scoped>

</style>

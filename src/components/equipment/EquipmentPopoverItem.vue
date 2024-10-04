<template>
    <div>名称：{{ equipment.name }}</div>
    <div>类型：{{ one_classify[equipment.type] }}</div>
    <div>装备境界：{{ getLevelStr(equipment.requiredEquipmentLevel) }}</div>
    <div v-for="item in Array.from(Object.keys(equipmentProps))"
         :key="item">
        <div v-if="equipment[item]">{{ equipmentProps[item] }}：+{{ equipment[item] }}</div>
    </div>
</template>

<script setup>
import {one_classify} from "../../objs/Equipment.ts";
import {getLevelStr} from "../../objs/ImmortalCultivators.ts";

const props = defineProps(['equipment'])

const equipmentProps = {
    'attack': "攻击",
    'life': "生命",
    'mana': "法力",
    'physique': "体质",
    'soulForce': "魂力",
    'strength': "力量",
    'toughness': "韧性",
    'erupt': "爆发",
    'blast': "爆伤",
    'hit': "命中",
    'avoid': "躲避",
}

</script>

<style scoped>

</style>
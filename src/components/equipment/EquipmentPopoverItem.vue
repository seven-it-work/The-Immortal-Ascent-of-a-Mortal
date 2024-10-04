<template>
    <div>名称：{{ equipment.name }}</div>
    <div>类型：{{ one_classify[equipment.type] }}</div>
    <div>装备境界：{{ getLevelStr(equipment.requiredEquipmentLevel) }}</div>
    <div v-for="item in Array.from(Object.keys(equipmentProps))"
         :key="item">
        <div v-if="equipment[item]">
            {{ equipmentProps[item] }}：+{{ equipment[item] }}
            <span v-if="compareEquipmentProps[item]>=1" ><ArrowUpOutlined style="color: #52c41a" /></span>
            <span v-if="compareEquipmentProps[item]<=-1" ><ArrowDownOutlined style="color: #eb2f96" /></span>
        </div>
    </div>
</template>

<script setup>
import {one_classify} from "../../objs/Equipment.ts";
import {getLevelStr} from "../../objs/ImmortalCultivators.ts";
import { ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons-vue';

const props = defineProps(['equipment', 'compareEquipment'])

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

const compareEquipmentProps = {}

// if (props.compareEquipment && props.equipment) {
    let strings = Array.from(Object.keys(equipmentProps));
    for (let i = 0; i < strings.length; i++) {
        const type = strings[i];
        if (props.equipment[type] > props.compareEquipment[type]) {
            compareEquipmentProps[type] = 1;
        } else if (props.equipment[type] < props.compareEquipment[type]) {
            compareEquipmentProps[type] = -1;
        }
    }
// }
console.log(compareEquipmentProps)

</script>

<style scoped>

</style>
<template>
    <div>名称：{{ equipment.name }}</div>
    <div>类型：{{ one_classify[equipment.type] }}</div>
    <div>装备境界：{{ getLevelStr(equipment.requiredEquipmentLevel) }}</div>
    <div v-for="item in Array.from(Object.keys(equipmentProps))"
         :key="item">
        <div v-if="equipment[item]">
            {{ equipmentProps[item] }}：+{{ equipment[item] }}
            <span v-if="compareEquipmentProps[item]>=1"><ArrowUpOutlined style="color: #52c41a"/></span>
            <span v-if="compareEquipmentProps[item]<=-1"><ArrowDownOutlined style="color: #eb2f96"/></span>
        </div>
    </div>
</template>

<script setup>
import {one_classify, equipmentProps} from "../../objs/Equipment.ts";
import {getLevelStr} from "../../objs/ImmortalCultivators.ts";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons-vue';

const props = defineProps(['equipment', 'compareEquipment'])


const compareEquipmentProps = {}

if (props.compareEquipment) {
    let strings = Array.from(Object.keys(equipmentProps));
    for (let i = 0; i < strings.length; i++) {
        try {
            const type = strings[i];
            if (props.equipment[type] > props.compareEquipment[type]) {
                compareEquipmentProps[type] = 1;
            } else if (props.equipment[type] < props.compareEquipment[type]) {
                compareEquipmentProps[type] = -1;
            }
        } catch (e) {
            console.log("错误", strings[i], props.compareEquipment)
        }
    }
}

</script>

<style scoped>

</style>
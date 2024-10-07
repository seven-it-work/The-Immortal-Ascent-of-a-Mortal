<template>
    <a-row>
        <a-col :span="11">
            <div>更换装备</div>
            <EquipmentPopoverItem :equipment="newEquipment" :compare-equipment="currentEquipment"/>
        </a-col>
        <a-col :span="2">
            <a-divider type="vertical"
                       style="height: 100%; border-color: #7cb305" dashed/>
        </a-col>
        <a-col :span="11">
            <div>当前穿戴</div>
            <div v-if="currentEquipment?.id">
                <EquipmentPopoverItem :equipment="currentEquipment" :compare-equipment="newEquipment"/>
            </div>
            <div v-else>无</div>
        </a-col>
    </a-row>
</template>

<script lang="ts">
import EquipmentPopoverItem from "./EquipmentPopoverItem.vue";
import {BaseEquipment} from "../../objs/Equipment.ts";

export default {
    name: "EquipmentCompare",
    components: {EquipmentPopoverItem},
    props: {
        currentEquipment: {
            type: Object as () => BaseEquipment,
        },
        newEquipment: {
            type: Object as () => BaseEquipment,
        },
    },
    methods: {

    },
}
</script>

<style scoped>

</style>
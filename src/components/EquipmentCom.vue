<script lang="ts">
import {defineComponent} from 'vue'
import {textEllipsis} from "../util/StrUtils.ts";
import EquipmentPopoverItem from "./equipment/EquipmentPopoverItem.vue";
import {one_classify} from "../objs/Equipment.ts";

// @ts-ignore
export default defineComponent({
    name: "EquipmentCom",
    computed: {
        one_classify() {
            return one_classify
        }
    },
    components: {EquipmentPopoverItem},
    methods: {textEllipsis},
    props: {
        immortal: Object,
    },
    data() {
    },
})
</script>

<template>
    <a-row>
        <a-col :span="12"
               v-for="(item) in Array.from(Object.keys(one_classify))" :key="item">
            <a-card
                    style="width: 60px; height: 60px;margin: 5px"
                    :bodyStyle="{ margin: '0', padding: '0',background:immortal?.[item]?.id?'':'gainsboro' }"
            >
                <div style="width: 100%; height: 60px;" class="center-content">
                    <a-popover>
                        {{ immortal[item]?.name || one_classify[item] }}
                        <template #title>
                            <a-row>
                                <div v-if="immortal?.[item]?.id">
                                    <EquipmentPopoverItem
                                            :equipment="immortal?.[item]"/>
                                </div>
                                <div v-else>无</div>
                            </a-row>
                        </template>
                    </a-popover>
                </div>
            </a-card>
        </a-col>
    </a-row>
</template>

<style scoped>

</style>
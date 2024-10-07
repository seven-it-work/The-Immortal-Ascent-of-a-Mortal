<script lang="ts">
import {defineComponent} from 'vue'
import {textEllipsis} from "../util/StrUtils.ts";
import EquipmentPopoverItem from "./equipment/EquipmentPopoverItem.vue";
import {BaseEquipment, one_classify} from "../objs/Equipment.ts";
import {PropType} from "vue/dist/vue";
import {ImmortalCultivators} from "../objs/ImmortalCultivators.ts";
import {message} from "ant-design-vue";

// @ts-ignore
export default defineComponent({
    name: "EquipmentCom",
    computed: {
        one_classify() {
            return one_classify
        }
    },
    components: {EquipmentPopoverItem},
    methods: {
        textEllipsis,
        unload(type) {
            const old: BaseEquipment = this.immortal?.[type];
            if (old) {
                // 如果背包满了，无法卸下，提示背包满了，请清理背包再卸下
                if (this.immortal?.isOverweight()) {
                    message.error("背包满了，请先清理背包再卸下!")
                    return
                }
                if (old.backpackCapacity > 0) {
                    if (this.immortal?.baseEquipment.length >= this.immortal?.getBackpackCapacity() - old.backpackCapacity) {
                        message.error("卸载后，背包容量变小，无法放入卸载物品，请先清理背包再卸下!")
                        return;
                    }
                }
                // 如果是坐骑那么需要判断，当前old的背包容量是否可能导致背包满载
                // @ts-ignore
                this.immortal?.baseEquipment?.push(old)
                // @ts-ignore
                this.immortal[type] = undefined;
            }
        }
    },
    props: {
        immortal: {
            type: Object as PropType<ImmortalCultivators>
        },
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
                                    <EquipmentPopoverItem :equipment="immortal?.[item]"/>
                                    <a-button @click="unload(item)">卸下</a-button>
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
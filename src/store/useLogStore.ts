import {defineStore} from 'pinia';
import {ImmortalCultivators} from "../objs/ImmortalCultivators.ts";

// 定义状态类型
interface State {
    logs: string[];
}

// 创建 store
export const useLogStore = defineStore('log', {
    state: (): State => ({
        logs: []
    }),
    actions: {
        logAttack(attack: ImmortalCultivators, defrense: ImmortalCultivators) {
            this.logs.push(`<div>${attack.name}对${defrense.name}进行攻击</div>`)
        }
    },
    getters: {},
});


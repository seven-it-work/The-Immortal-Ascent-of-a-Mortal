import {defineStore} from 'pinia';
import {Fight} from "../objs/Fight.ts";

// 定义状态类型
interface State {
    fight?: Fight;
}

// 创建 store
export const useFightStore = defineStore('fight', {
    state: (): State => ({}),
    actions: {
        init(fight: Fight) {
            this.fight = fight;
        },
    },
    getters: {
    },
});


import {ImmortalCultivators} from "./ImmortalCultivators.ts";

export interface FightProgressInterFace {
    id?: string | undefined;
    // 小兵、boss、宝箱、灵力等
    type?: string;
    currentEnemy?: ImmortalCultivators[] | undefined;
    // 宝箱对象
    // 灵力
    linLi?: number;
}

export class FightProgress implements FightProgressInterFace {
    id: string | undefined;
    currentEnemy: ImmortalCultivators[] | undefined;
    type: string = '';
    linLi: number = 0;


    constructor(fightProgressInterFace: FightProgressInterFace) {
        Object.assign(this, fightProgressInterFace);
    }
}
import {ImmortalCultivators} from "./ImmortalCultivators.ts";

export interface FightProgressInterFace {
    id?: string|undefined;
    // 小兵、boss、宝箱等
    type?: string | undefined;
    currentEnemy?: ImmortalCultivators[] | undefined;
    // 宝箱对象

}

export class FightProgress implements FightProgressInterFace {
    id: string|undefined;
    currentEnemy: ImmortalCultivators[] | undefined;
    type: string | undefined;


    constructor(fightProgressInterFace: FightProgressInterFace) {
        this.id = fightProgressInterFace.id
        this.type = fightProgressInterFace.type;
        this.currentEnemy = fightProgressInterFace.currentEnemy;
    }
}
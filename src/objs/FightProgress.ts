import {ImmortalCultivators} from "./ImmortalCultivators.ts";
import {SaveFunction} from "../util/SaveUtils.ts";

export interface FightProgressInterFace {
    id?: string | undefined;
    // 小兵、boss、宝箱、灵力等
    type?: string;
    currentEnemy?: ImmortalCultivators[] | undefined;
    // 宝箱对象
    // 灵力
    linLi?: number;
}

export class FightProgress implements FightProgressInterFace, SaveFunction<FightProgress> {
    id: string | undefined;
    currentEnemy: ImmortalCultivators[] | undefined;
    type: string = '';
    linLi: number = 0;


    constructor(fightProgressInterFace?: FightProgressInterFace) {
        Object.assign(this, fightProgressInterFace);
    }

    doLoad(dataStr: string): FightProgress {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doLoadByObj(obj: any): FightProgress {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        this.currentEnemy = obj.currentEnemy?.map((data: any)=> new ImmortalCultivators().doLoadByObj(data));
        return this;
    }

    doSave(): string {
        return JSON.stringify(this);
    }

}
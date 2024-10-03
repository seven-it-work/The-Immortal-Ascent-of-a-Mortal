import {ImmortalCultivators} from "./ImmortalCultivators.ts";
import {SaveFunction} from "../util/SaveUtils.ts";

export class Player implements SaveFunction<Player> {
    playerInfo: ImmortalCultivators;
    // 上场的人员
    otherImmortal: ImmortalCultivators[];
    // 没有上场的人员
    notFightImmortal: ImmortalCultivators[] = [];

    getFightList(): ImmortalCultivators[] {
        return [this.playerInfo, ...this.otherImmortal];
    }

    getAllList(): ImmortalCultivators[] {
        return [this.playerInfo, ...this.otherImmortal, ...this.notFightImmortal];
    }


    constructor(playerInfo?: ImmortalCultivators, otherImmortal?: ImmortalCultivators[]) {
        // @ts-ignore
        this.playerInfo = playerInfo;
        // @ts-ignore
        this.otherImmortal = otherImmortal;
    }

    doLoad(dataStr: string): Player {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doLoadByObj(obj: any): Player {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        this.playerInfo = new ImmortalCultivators().doLoadByObj(obj.playerInfo);
        this.otherImmortal = obj.otherImmortal?.map((data: any)=> new ImmortalCultivators().doLoadByObj(data));
        this.notFightImmortal = obj.notFightImmortal?.map((data: any)=> new ImmortalCultivators().doLoadByObj(data));
        return this;
    }

    doSave(): string {
        return JSON.stringify(this);
    }
}
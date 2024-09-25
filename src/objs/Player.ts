import {ImmortalCultivators} from "./ImmortalCultivators.ts";

export class Player {
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


    constructor(playerInfo: ImmortalCultivators, otherImmortal: ImmortalCultivators[]) {
        this.playerInfo = playerInfo;
        this.otherImmortal = otherImmortal;
    }
}
import {ImmortalCultivators} from "./ImmortalCultivators.ts";

export class Player {
    playerInfo: ImmortalCultivators;
    otherImmortal: ImmortalCultivators[];

    getFightList(): ImmortalCultivators[] {
        return [this.playerInfo, ...this.otherImmortal];
    }


    constructor(playerInfo: ImmortalCultivators, otherImmortal: ImmortalCultivators[]) {
        this.playerInfo = playerInfo;
        this.otherImmortal = otherImmortal;
    }
}
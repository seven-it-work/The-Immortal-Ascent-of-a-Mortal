import {FightProgress} from "./FightProgress.ts";

export interface FightNodeInterface {
    id?: string | undefined;
    // 进度
    fightProgressList?: FightProgress[] | undefined;
    // 当前进度索引;
    currentProgressIndex?: number;
}

export class FightNode implements FightNodeInterface {
    id: string | undefined;
    // 进度
    fightProgressList: FightProgress[] | undefined;
    // 当前进度索引;
    currentProgressIndex: number = 0;


    constructor(fightNodeInterface: FightNodeInterface) {
        this.id = fightNodeInterface.id;
        this.fightProgressList = fightNodeInterface.fightProgressList;
        this.currentProgressIndex = fightNodeInterface.currentProgressIndex || 0;
    }

    getCurrentFightProgress(): FightProgress | undefined {
        if (!this.fightProgressList) {
            return undefined;
        }
        return this.fightProgressList[this.currentProgressIndex]
    }

    getNextFightProgressList(size: number = 3): FightProgress[] {
        if (!this.fightProgressList) {
            return [];
        }
        const result: FightProgress[] = [];
        let count = 0;
        for (let i = this.currentProgressIndex; i < (this.fightProgressList?.length || 0); i++) {
            result.push(this.fightProgressList[i]);
            count += 1;
            if (count > size) {
                return result;
            }
        }
        return result;
    }

}
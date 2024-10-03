import {FightProgress} from "./FightProgress.ts";
import {SaveFunction} from "../util/SaveUtils.ts";

export interface FightNodeInterface {
    id?: string | undefined;
    // 进度
    fightProgressList?: FightProgress[] | undefined;
    // 当前进度索引;
    currentProgressIndex?: number;
}

export class FightNode implements FightNodeInterface, SaveFunction<FightNode> {
    id: string | undefined;
    // 进度
    fightProgressList: FightProgress[] = [];
    // 当前进度索引;
    currentProgressIndex: number = 0;


    constructor(fightNodeInterface?: FightNodeInterface) {
        Object.assign(this, fightNodeInterface);
        this.currentProgressIndex = fightNodeInterface?.currentProgressIndex || 0;
    }

    getCurrentFightProgress(): FightProgress {
        if (!this.fightProgressList) {
            throw new Error("fightProgressList does not exist");
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

    doLoad(dataStr: string): FightNode {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doSave(): string {
        return JSON.stringify(this);
    }

    doLoadByObj(obj: any): FightNode {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        this.fightProgressList = obj.fightProgressList?.map((data: any) => new FightProgress().doLoadByObj(data));
        return this;
    }

}
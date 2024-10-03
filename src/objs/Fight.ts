import {Player} from "./Player.ts";
import {FightNode} from "./FightNode.ts";
import {SaveFunction} from "../util/SaveUtils.ts";


export class Fight implements SaveFunction<Fight> {
    doLoad(dataStr: string): Fight {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doLoadByObj(obj: any): Fight {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        this.player = new Player().doLoadByObj(obj.player)
        this.fightNode = new FightNode().doLoadByObj(obj.fightNode)
        this.isFighting = false
        this.isAutoNextRound = false
        return this;
    }

    doSave(): string {
        return JSON.stringify(this);
    }

    // 玩家阵容
    player: Player;
    // 回合
    round: number = 0;
    //     是否自动下一回合
    isAutoNextRound: boolean = false;
    //     场景对象
    fightNode: FightNode;
    isFighting: boolean = false;
    // 第一次开始标记
    isStart: boolean = false;


    constructor(player?: Player, round?: number, isAutoNextRound?: boolean, fightNode?: FightNode) {
        // @ts-ignore
        this.player = player;
        // @ts-ignore
        this.round = round;
        // @ts-ignore
        this.isAutoNextRound = isAutoNextRound;
        // @ts-ignore
        this.fightNode = fightNode;
    }

}
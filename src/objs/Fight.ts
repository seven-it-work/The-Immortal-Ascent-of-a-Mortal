import {Player} from "./Player.ts";
import {FightNode} from "./FightNode.ts";


export class Fight {
    // 玩家阵容
    player: Player;
    // 回合
    round: number=0;
    //     是否自动下一回合
    isAutoNextRound: boolean = true;
    //     场景对象
    fightNode: FightNode;
    isFighting: boolean = false;


    constructor(player: Player, round: number, isAutoNextRound: boolean, fightNode: FightNode) {
        this.player = player;
        this.round = round;
        this.isAutoNextRound = isAutoNextRound;
        this.fightNode = fightNode;
    }

}
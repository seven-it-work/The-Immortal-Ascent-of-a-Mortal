import People from "./People";
import Chance from "chance"

export default class RoundFunction {
    private readonly startRound: number;
    private readonly endRound: number;
    private readonly maximumNumberOfExecutions: number;
    private readonly fight: Fight;
    private readonly targetPeopleId: string[];
    private readonly tempData: { any } = {};
    private theNumberOfCurrentExecutions: number = 0;
    private _isEnd: boolean = false;

    currentFunc: (roundFunction: RoundFunction) => {}
    overFunc: (roundFunction: RoundFunction) => {}


    /**
     *
     * @param startRound 开始回合
     * @param ongoingTurns 持续回合
     * @param maximumNumberOfExecutions 最大执行次数
     * @param fight fight对象
     * @param targetPeopleId 执行模板对象id
     * @param currentFunc 当前回合执行func
     * @param overFunc 结束后的回收func
     */
    constructor(startRound: number, ongoingTurns: number, maximumNumberOfExecutions: number, fight: Fight, targetPeopleId: string[], currentFunc: () => {}, overFunc: () => {}) {
        this.startRound = startRound;
        this.endRound = startRound + ongoingTurns;
        this.maximumNumberOfExecutions = maximumNumberOfExecutions;
        this.fight = fight;
        this.targetPeopleId = targetPeopleId;
        this.currentFunc = currentFunc;
        this.overFunc = overFunc;
    }

    public currentFunction(round: number) {
        if (round >= this.endRound) {
            this.overFunction();
        }
        if (this.theNumberOfCurrentExecutions > this.maximumNumberOfExecutions) {
            this._isEnd = true;
            return
        }
        this.theNumberOfCurrentExecutions++;
        this.currentFunc(this)
    }

    public isEnd(): boolean {
        return this._isEnd;
    }

    private overFunction() {
        this._isEnd = true;
        this.overFunc(this)
    }
}

export default class Fight {
    defendTeamID: string[];
    attackingTeamID: string[];
    idAndPeopleMap: Map<string, People>
    idAndRoundFunction: Map<string, RoundFunction>
    currentRound: number;


    constructor(defendTeam: People[], attackingTeam: People[]) {
        this.defendTeamID = defendTeam.map(item => item.id);
        this.attackingTeamID = attackingTeam.map(item => item.id);
        this.idAndPeopleMap = new Map();
        this.idAndRoundFunction = new Map();
        [...defendTeam, ...attackingTeam].forEach(item => {
            this.idAndPeopleMap.set(item.id, item)
        })
        this.currentRound = 0;
    }

    public doFight() {
        this.currentRound++;
        // 先执行加成
        Array.from(this.idAndRoundFunction.values())
            .filter(item => !item.isEnd())
            .forEach(item => {
                item.currentFunction(this.currentRound)
            })
        // 在进行对战
        this.autoFight();
    }

    private autoFight() {
        // 获取idAndPeopleMap.values()按着速度进行排序
        Array.from(this.idAndPeopleMap.values()).sort((v1, v2) => {
            return v1.velocity - v2.velocity;
        }).forEach(item => {
            if (item.isDead()) {
                // 死亡了的从队伍中移除
                this.attackingTeamID = this.attackingTeamID.filter(id => id !== item.id)
                this.defendTeamID = this.defendTeamID.filter(id => id !== item.id)
            } else {
                // 如果攻击方没有体力，则不进行攻击，进入休眠
                if (item.isSleep()) {
                    item.doSleep()
                } else {
                    let targetIdList = []
                    // 随机选择一个敌法
                    if (this.attackingTeamID.indexOf(item.id) === -1) {
                        // 在defendTeamID中
                        targetIdList = this.attackingTeamID;
                    } else {
                        // 在attackingTeamID中
                        targetIdList = this.defendTeamID;
                    }
                    if (targetIdList.length === 0) {
                        // 没有对手了，应该是结束了
                    } else {
                        // 从中选一个
                        const pickone = new Chance().pickone(targetIdList);
                        Fight.peopleFight(item, pickone, this)
                    }
                }

            }
        })
    }

    private static peopleFight(attack: People, defend: People, fight: Fight) {
        // 判断是使用技能还是普通攻击。后续可以做一个比例 按比例来随机触发 todo
        Fight.技能攻击(attack, defend, fight);
        Fight.普通攻击(attack, defend, fight);
    }

    private static 普通攻击(attack: People, defend: People, fight: Fight) {
        // 普通攻击
        attack.usePhysical();
        // 普通攻击伤害=攻击力+装备攻击力加成 todo
        let harm = attack.attack.current
        // 暴击判定 todo

        // 防御闪避判定 todo

        // 防御格挡判定 todo

        // 伤害赋值
        defend.blood.current -= harm
    }

    private static 技能攻击(attack: People, defend: People, fight: Fight) {
        // 过滤出可以执行的技能 消耗元气<attack的元气 todo
        // 如果一个技能都没有，执行普通攻击兜底。否则随机选择一个技能进行执行 todo


    }
}
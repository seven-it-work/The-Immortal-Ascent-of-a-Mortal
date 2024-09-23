import {randomUtil, uuid} from "../util/ProbabilityUtils.ts";

const levelAndMark = []
const jj = [
    "练气期",
    "筑基期",
    "开光期",
    "融合期",
    "金丹期",
    "元婴期",
    "出窍期",
    "分神期",
    "合体期",
    "大乘期",
    "真仙境",
    "金仙境",
]
const jj2 = [
    "大罗金仙境",
    "混元大罗金仙境",
    "混元无极大罗金仙境",
    "混沌至尊境",
    "天尊境",
    "至高无上境",
    "超脱境",
    "无上真仙",
]

for (let i = 0; i < jj.length; i++) {
    for (let j = 0; j < 9 + i; j++) {
        levelAndMark.push(`${jj[i]}第${j + 1}重`)
    }
}
for (let i = 0; i < jj2.length; i++) {
    for (let j = 0; j < 30 + i * 10; j++) {
        levelAndMark.push(`${jj2[i]}第${j + 1}重`)
    }
}
console.log(levelAndMark)

export class Skill {
    name: string;
    mana: number;

}

/**
 * 最大值和自身等级有关
 */
export class ScopeNumberInfo {
    current: number = 1;
    basePoint: number = 0;
    basePointMultiplier: number = 1;
    grow: number = 0;

    /**
     * 最大值=(1 + level * 成长因子) * (基础点 * 基础点倍率)
     * @param level
     */
    getMax(level: number): number {
        return (1 + level * this.grow) * (this.basePoint * this.basePointMultiplier)
    }

    constructor(current: number = 1) {
        this.current = current;
    }
}

export default class {
    id: string = uuid();
    // 姓名
    name: string;
    // 出生时间
    birth: number;
    // 等级
    level: number;
    // 生命值
    life: ScopeNumberInfo = new ScopeNumberInfo(20);
    // 法力
    mana: ScopeNumberInfo = new ScopeNumberInfo(10);
    // 灵力（升级必须要的）
    spiritualPower: ScopeNumberInfo = new ScopeNumberInfo(0);
    // 体力（做任何操作都需要体力，战斗中体力=0需要休眠）
    physical: ScopeNumberInfo = new ScopeNumberInfo(10);
    // 速度
    velocity: number = 1;
    // 攻击力
    attack: number = 1;
    // 防御力
    defense: number = 1;
    // 暴击率（触发暴击的概率，按百分率取值的 比如100=100%）
    crit: number = 0;
    // 暴击加成（按百分率取值的）
    critBonus: number = 0;
    // 命中率（按百分率取值的）
    hit: number = 0;
    // 躲避率（按百分率取值的）
    dodge: number = 0;
    // 格挡率（按百分率取值的）
    block: number = 0;
    // 抗性（抗性越高，格挡减少伤害越多）
    resistance: number = 0;
    // 技能
    skills: Skill[] = [];

    // 年纪
    getAge(now: number): number {
        return now - this.birth;
    }

    getMax(key: "life" | "mana" | "spiritualPower" | "physical"): number {
        const levelNumberInfo = this[key];
        if (levelNumberInfo) {
            return levelNumberInfo.getMax(this.level);
        }
        return 0;
    }

    public isDead(): boolean {
        return this.life.current === 0;
    }

    public isSleep(): boolean {
        return this.physical.current < 0;
    }

    public doSleep() {
        this.physical.current++;
    }

    /**
     * 当第一次休眠时
     */
    public usePhysical() {
        if (this.physical.current <= 0) {
            this.physical.current -= 3
        } else {
            this.physical.current--
        }
    }


    constructor(name: string,
                birth: number,
                id: string = uuid(),
                level: number = 1,
                life: ScopeNumberInfo = new ScopeNumberInfo(20),
                mana: ScopeNumberInfo = new ScopeNumberInfo(10),
                spiritualPower: ScopeNumberInfo = new ScopeNumberInfo(0),
                physical: ScopeNumberInfo = new ScopeNumberInfo(10)) {
        this.id = id;
        this.name = name;
        this.birth = birth;
        this.level = level;
        this.life = life;
        this.mana = mana;
        this.spiritualPower = spiritualPower;
        this.physical = physical;
    }
}

export class SpiritualRoots {
    // 金
    gold: number = 0;
    // 木
    wood: number = 0;
    // 水
    water: number = 0;
    // 火
    fire: number = 0;
    // 土
    earth: number = 0;
}
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

export  class NumberInfo {
    pre: number;
    current: number;

    getMax(baseValue: number, growthRate: number = 0): number {
        return this.pre + (baseValue + this.pre * growthRate)
    }
}

export  class FoundationPoint {
    blood: number;
    strength: number;
    physical: number;
    attack: number;
    defense: number;
    velocity: number;
}

export default class {
    id: string;
    name: string;
    age: number;
    foundationPoint: FoundationPoint;
    // 气血
    blood: NumberInfo;
    // 元气
    strength: NumberInfo;
    // 体力
    physical: NumberInfo;
    // 灵力(升级所需)
    spiritualPower: NumberInfo;
    // 攻击
    attack: NumberInfo;
    // 防御
    defense: NumberInfo;
    // 速度
    velocity: NumberInfo;
    // 幸运
    fortunate: number;
    // 威望
    prestige: number;
    // 魅力
    charm: number;
    // 善恶
    goodAndEvil: number;
    // 等级
    grade: number;
    // 五行灵根
    spiritualRoots: SpiritualRoots;
    // 光灵根（五行、光、暗 灵根只能存在一种）
    light: number;
    // 暗灵根
    dark: number;
    // 装备、法器
    // 坐骑
    // 护具

    public isDead(): boolean {
        return this.blood.current === 0;
    }

    public isSleep(): boolean {
        return this.physical.current <0;
    }

    public doSleep() {
        this.physical.current++;
    }

    /**
     * 当第一次休眠时
     */
    public usePhysical() {
        if (this.physical.current<=0){
            this.physical.current-=3
        }else {
            this.physical.current--
        }
    }
}

export class SpiritualRoots {
    // 金
    gold: number;
    // 木
    wood: number;
    // 水
    water: number;
    // 火
    fire: number;
    // 土
    earth: number;
}
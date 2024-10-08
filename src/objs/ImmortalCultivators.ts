import {randomUsePoint} from "../util/RandomCreateUtils.ts";

import {BaseEquipment, Belt, Bottle, Clothe, Mount, Necklace, Ring, Shoe, Weapon} from "./Equipment.ts";
import {randomProbability} from "../util/ProbabilityUtils.ts";
import {SaveFunction} from "../util/SaveUtils.ts";

const temp: string[] = []
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
        temp.push(`${jj[i]}第${j + 1}重`)
    }
}
for (let i = 0; i < jj2.length; i++) {
    for (let j = 0; j < 30 + i * 10; j++) {
        temp.push(`${jj2[i]}第${j + 1}重`)
    }
}

export const getLevelStr = (level: number | undefined): string => {
    return temp[level || 0]
}

export interface ImmortalCultivatorsInterface {
    id?: string | undefined;
    name?: string | undefined;
    birth?: number | undefined;
    level?: number | undefined;
    currentLife?: number | undefined;
    currentMana?: number | undefined;
    // 体质
    physique?: number | undefined;
    // 魂力
    soulForce?: number | undefined;
    // 力量
    strength?: number | undefined;
    // 使用过的点数
    usedPoints?: number;
    // 当前灵力
    currentLinLi?: number;
    // 背包（已经存入的物品）
    baseEquipment?: BaseEquipment[];
    // 背包最大数量
    backpackCapacity?: number;
    // 韧性 1韧性=1点防御
    toughness?: number;
    // 爆发 爆发*0.01=暴击率
    erupt?: number;
    // 爆伤 1爆伤=1额外伤害
    blast?: number;
    // 命中
    hit?: number;
    // 躲避
    avoid?: number;
    // 躲避计数器
    avoidCount?: number;
    // 武器
    weapon?: Weapon;
    // 上装
    clothe?: Clothe;
    // 下装
    bottle?: Bottle;
    // 鞋子
    shoe?: Shoe;
    // 腰带
    belt?: Belt;
    // 戒指
    ring?: Ring;
    // 项链
    necklace?: Necklace;
    // 坐骑
    mount?: Mount;

}


function getEquipmentValue(immortal: ImmortalCultivators, prop: 'physique' | 'soulForce' | 'strength' | 'toughness' | 'erupt' | 'blast' | 'hit' | 'avoid' | 'attack' | 'life' | 'mana'|'backpackCapacity'): number {
    let equipmentValue = 0;
    const strings = [
        "weapon",
        "clothe",
        "bottle",
        "shoe",
        "belt",
        "ring",
        "necklace",
        "mount",
    ];
    for (let i = 0; i < strings.length; i++) {
        // @ts-ignore
        const immortalElement = immortal[strings[i]];
        if (immortalElement) {
            equipmentValue += immortalElement[prop] || 0
        }
    }
    return equipmentValue;
}

export class ImmortalCultivators implements ImmortalCultivatorsInterface, SaveFunction<ImmortalCultivators> {
    doLoad(dataStr: string): ImmortalCultivators {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doLoadByObj(obj: any): ImmortalCultivators {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        this.baseEquipment = obj.baseEquipment?.map((data: any) => new BaseEquipment().doLoadByObj(data));
        this.weapon = new Weapon().doLoadByObj(obj.weapon);
        this.clothe = new Clothe().doLoadByObj(obj.clothe);
        this.bottle = new Bottle().doLoadByObj(obj.bottle);
        this.shoe = new Shoe().doLoadByObj(obj.shoe);
        this.belt = new Belt().doLoadByObj(obj.belt);
        this.ring = new Ring().doLoadByObj(obj.ring);
        this.necklace = new Necklace().doLoadByObj(obj.necklace);
        this.mount = new Mount().doLoadByObj(obj.mount);

        return this;
    }

    doSave(): string {
        return JSON.stringify(this);
    }

    birth: number = 0;
    id: string = "";
    level: number = 0;
    name: string = "";
    strength: number = 1;
    soulForce: number = 1;
    physique: number = 1;
    currentLife: number = 0;
    currentMana: number = 0;
    usedPoints: number = 0;
    currentLinLi: number = 0;
    toughness: number = 0;
    erupt: number = 0;
    blast: number = 0;
    hit: number = 1;
    avoid: number = 1;
    baseEquipment: BaseEquipment[] = [];
    // 背包最大数量
    backpackCapacity: number = 5;
    avoidCount: number = 0;
    // 武器
    weapon?: Weapon;
    // 上装
    clothe?: Clothe;
    // 下装
    bottle?: Bottle;
    // 鞋子
    shoe?: Shoe;
    // 腰带
    belt?: Belt;
    // 戒指
    ring?: Ring;
    // 项链
    necklace?: Necklace;
    // 坐骑
    mount?: Mount;

    /**
     * 是否超重
     */
    isOverweight(): boolean {
        return this.baseEquipment.length >= this.getBackpackCapacity();
    }

    getBackpackCapacity():number{
        return this.backpackCapacity+ getEquipmentValue(this, 'backpackCapacity');
    }


    /**
     * 获取暴击伤害
     */
    getCriticalDamage(): number {
        return this.blast + getEquipmentValue(this, 'blast');
    }

    /**
     * 获取命中率
     */
    getHit(): number {
        return this.hit + getEquipmentValue(this, 'hit');
    }

    /**
     * 获取躲避率
     */
    getAvoid(): number {
        return this.avoid + getEquipmentValue(this, 'avoid');
    }

    /**
     * 暴击率
     * 爆发=暴击率
     */
    getCriticalHitProbability(): number {
        return this.erupt + getEquipmentValue(this, 'erupt');
    }

    /**
     * 检测是否暴击（调用判断）
     */
    checkIsCriticalHits(): boolean {
        return randomProbability(this.getCriticalHitProbability());
    }

    /**
     * 检测是否命中
     * 攻击命中率/（攻击命中率+防御躲避率）
     */
    checkIsHit(target: ImmortalCultivators): boolean {
        const number = this.getHit() + target.avoidCount + target.getAvoid();
        if (target.getAvoid() <= 0) {
            return true;
        }
        const b = randomProbability(this.getHit() + target.avoidCount, number);
        if (b) {
            return true;
        } else {
            target.avoidCount = 0;
            return false
        }
    }

    /**
     * 获取防御力
     */
    getDefense(): number {
        return this.toughness + getEquipmentValue(this, 'toughness');
    }

    getAttack(): number {
        return this.strength + getEquipmentValue(this, 'strength') + getEquipmentValue(this, 'attack');
    }

    getMana(): number {
        return this.soulForce + getEquipmentValue(this, 'soulForce') + getEquipmentValue(this, 'mana');
    }

    getLife(): number {
        return this.physique + getEquipmentValue(this, 'physique') + getEquipmentValue(this, 'life');
    }


    getLevelStr(): string {
        return getLevelStr(this.level)
    }

    getMaxRemainingPoints(): number {
        return ((this.level || 0) + 1) * 10
    }

    constructor(immortalCultivatorsInterface?: ImmortalCultivatorsInterface) {
        Object.assign(this, immortalCultivatorsInterface)
    }

    /**
     * 检测是否存活
     */
    isLife(): boolean {
        return (this?.currentLife || 0) > 0;
    }

    canUpdateLevel(): boolean {
        return this.currentLinLi >= this.getUpdateLinLi();
    }

    getUpdateLinLi(): number {
        const baseNumber = this.level + 1
        return Math.ceil(baseNumber * baseNumber * 0.1 + baseNumber)
    }

    doUpdateLevel() {
        if (this.canUpdateLevel()) {
            this.level++;
            this.currentLinLi = 0;
            // 突破的点数随机加（玩家也是如此）
            const number = this.getMaxRemainingPoints() - this.usedPoints;
            randomUsePoint(number, this);
        }
    }

    /**
     * 放入物品到背包中
     * @param oldEquipment
     */
    addEquipment(oldEquipment: BaseEquipment) {
        if (!oldEquipment) {
            return
        }
        if (this.isOverweight()) {
            // 超重了
            console.log("超重了")
        } else {
            this.baseEquipment.push(oldEquipment)
        }
    }
}
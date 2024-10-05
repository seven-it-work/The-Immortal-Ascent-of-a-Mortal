import {ImmortalCultivators, ImmortalCultivatorsInterface} from "../objs/ImmortalCultivators.ts";
import {randomUtil, uuid} from "./ProbabilityUtils.ts";
import {FightProgress, FightProgressInterFace} from "../objs/FightProgress.ts";
import {FightNode, FightNodeInterface} from "../objs/FightNode.ts";
import {getTalisman} from "random_chinese_fantasy_names";
import {
    Belt,
    Bottle,
    Clothe,
    EquipmentInterface,
    Mount,
    Necklace,
    one_classify,
    Ring,
    Shoe,
    Weapon, weapon_classify
} from "../objs/Equipment.ts";

createEquipment({type:"weapon"})

export function createEquipment(equipmentInterface: EquipmentInterface = {}) {
    if (!equipmentInterface.requiredEquipmentLevel) {
        equipmentInterface.requiredEquipmentLevel = 1;
    }
    const level = equipmentInterface.requiredEquipmentLevel;
    let enumValue;
    if (equipmentInterface.type) {
        enumValue = equipmentInterface.type
    } else {
        enumValue = randomUtil.pickone(Array.from(Object.keys(one_classify)));
    }
    let armor = undefined;
    switch (enumValue) {
        case 'weapon':
            const weapon = new Weapon(equipmentInterface);
            // todo选择问题
            const kind = randomUtil.pickone(Array.from(Object.values(weapon_classify)))
            // const rarity = randomUtil.pickone(Array.from(Object.values(quality)))
            console.log(kind)
            const name = getTalisman(10,
                {
                    kind:'拳'
                });
            console.log(111,name)
            weapon.id = uuid();
            weapon.name = "测试🗡"
            weapon.attack = level
            return weapon
        case 'mount':
            const mount = new Mount(equipmentInterface);
            mount.id = uuid();
            mount.name = "测试🐎"
            // 展示不知道加什么属性
            return mount
        case 'clothe':
            armor = new Clothe(equipmentInterface)
            break
        case 'bottle':
            armor = new Bottle(equipmentInterface)
            break
        case 'shoe':
            armor = new Shoe(equipmentInterface)
            break
        case 'belt':
            armor = new Belt(equipmentInterface)
            break
        case 'ring':
            armor = new Ring(equipmentInterface)
            break
        case 'necklace':
            armor = new Necklace(equipmentInterface)
            break
    }
    if (!armor) {
        throw new Error("没有指定类型")
    }
    // 随机生成防具信息
    armor.id = uuid();
    armor.name = "测试衣"
    const points = 2 * level;
    for (let i = 0; i < points; i++) {
        // @ts-ignore
        armor[randomUtil.pickone(['life', 'mana'])] += 1;
    }
    return armor
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const fightNodeCreate = (fightNodeInterface: FightNodeInterface = {}): FightNode => {
    if (!fightNodeInterface.id) {
        fightNodeInterface.id = uuid()
    }

    if (!fightNodeInterface.fightProgressList) {
        fightNodeInterface.fightProgressList = []
        // 初始化数量
        const integer = randomUtil.integer({min: 1, max: 2});
        for (let i = 0; i < integer; i++) {
            fightNodeInterface.fightProgressList.push(fightProgressCreate())
        }
    }
    return new FightNode(fightNodeInterface);
}

export const fightProgressCreate = (fightProgressInterFace: FightProgressInterFace = {}, level: number = 1): FightProgress => {
    if (!fightProgressInterFace.id) {
        fightProgressInterFace.id = uuid()
    }

    if (!fightProgressInterFace.type) {
        fightProgressInterFace.type = randomUtil.pickone(["小兵", "灵力"]);
    }
    if (["小兵"].includes(fightProgressInterFace.type)) {
        if (!fightProgressInterFace.currentEnemy) {
            fightProgressInterFace.currentEnemy = []
            // 初始化数量
            const integer = randomUtil.integer({min: 1, max: 3});
            for (let i = 0; i < integer; i++) {
                fightProgressInterFace.currentEnemy.push(immortalCreate({level}))
            }
        }
    } else if (["灵力"].includes(fightProgressInterFace.type)) {
        fightProgressInterFace.linLi = randomUtil.integer({min: 1, max: Math.max(level, 1)});
    }
    return new FightProgress(fightProgressInterFace)
}

export const immortalCreate = (immortalCultivatorsInterface: ImmortalCultivatorsInterface = {}): ImmortalCultivators => {
    if (!immortalCultivatorsInterface.id) {
        immortalCultivatorsInterface.id = uuid()
    }
    if (!immortalCultivatorsInterface.name) {
        immortalCultivatorsInterface.name = '你好'
    }
    if (!immortalCultivatorsInterface.birth) {
        immortalCultivatorsInterface.birth = 0
    }
    if (!immortalCultivatorsInterface.level) {
        // 默认1级
        immortalCultivatorsInterface.level = 0
    }
    const immortalCultivators = new ImmortalCultivators(immortalCultivatorsInterface);
    const maxRemainingPoints = immortalCultivators.getMaxRemainingPoints();
    randomUsePoint(maxRemainingPoints, immortalCultivators)

    immortalCultivators.currentLife = immortalCultivators.getLife()
    immortalCultivators.currentMana = immortalCultivators.getMana()
    return immortalCultivators
}

export function randomUsePoint(points: number, immortalCultivators: ImmortalCultivators) {
    // 均衡分配模式
    const strings = [
        "physique",
        "soulForce",
        "strength",
        "toughness",
        "erupt",
        "blast",
        "hit",
        "avoid",
    ];
    for (let i = 0; i < points; i++) {
        const pickone = randomUtil.pickone(strings);
        // @ts-ignore
        immortalCultivators[pickone] += 1;
    }
    immortalCultivators.usedPoints += points;
}
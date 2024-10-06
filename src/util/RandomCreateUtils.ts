import {ImmortalCultivators, ImmortalCultivatorsInterface} from "../objs/ImmortalCultivators.ts";
import {Probability, ProbabilitySelector, randomUtil, uuid} from "./ProbabilityUtils.ts";
import {FightProgress, FightProgressInterFace} from "../objs/FightProgress.ts";
import {FightNode, FightNodeInterface} from "../objs/FightNode.ts";
import {getTalisman} from "random_chinese_fantasy_names";
import {
    BaseEquipment,
    Belt,
    Bottle, clothClassify,
    Clothe,
    EquipmentInterface,
    Mount, mountClassify,
    Necklace,
    one_classify, rarityMorePoint, rarityNames,
    Ring,
    Shoe,
    Weapon, weaponClassify
} from "../objs/Equipment.ts";


function equipmentPropsInit(equipmentInterface: EquipmentInterface, kindList: string[]) {
    // 装备属性基础点数
    const basePoints = 1
    // 公有设值
    if (!equipmentInterface.rarity) {
        equipmentInterface.rarity = randomUtil.pickone(Array.from(Object.keys(rarityNames)));
    }
    if (!equipmentInterface.requiredEquipmentLevel) {
        equipmentInterface.requiredEquipmentLevel = 1;
    }
    if (!equipmentInterface.type2) {
        equipmentInterface.type2 = randomUtil.pickone(kindList)
    }
    // 设置属性点数
    equipmentInterface.points = equipmentInterface.requiredEquipmentLevel * basePoints * randomUtil.integer({
        min: 1,
        max: rarityMorePoint[equipmentInterface.rarity]
    })
}

function commonSet<T extends BaseEquipment>(equipmentInterface: EquipmentInterface, t: T): T {
    const talisman = getTalisman(10,
        {
            kind: equipmentInterface.type2,
            rarity: equipmentInterface.rarity,
            postfix: ''
        });
    t.id = uuid();
    t.name = randomUtil.pickone(talisman).name
    return t;
}

function createEquipmentFactory<T extends BaseEquipment>(equipmentInterface: EquipmentInterface,
                                                         kindList: string[],
                                                         newBaseEquipment: (equipmentInterface: EquipmentInterface) => T,
                                                         afterFunction: (equipment: T) => void = () => {
                                                         }): T {
    equipmentPropsInit(equipmentInterface, kindList);
    const equipment = commonSet(equipmentInterface, newBaseEquipment(equipmentInterface));
    afterFunction(equipment)
    return equipment;
}

function propsSetFactory<T extends BaseEquipment>(equipment: T, probabilityList: Probability<string>[]) {
    const probabilitySelector = ProbabilitySelector(probabilityList);
    // @ts-ignore
    equipment[probabilitySelector] += 1;
}


export function createEquipment(equipmentInterface: EquipmentInterface = {}) {
    let enumValue;
    if (equipmentInterface.type) {
        enumValue = equipmentInterface.type
    } else {
        enumValue = randomUtil.pickone(Array.from(Object.keys(one_classify)));
    }
    switch (enumValue) {
        case 'weapon':
            return createEquipmentFactory(
                equipmentInterface,
                weaponClassify,
                (data) => new Weapon(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 10},
                            {data: "life", probability: 1},
                            {data: "mana", probability: 1},
                            {data: "physique", probability: 1},
                            {data: "soulForce", probability: 1},
                            {data: "strength", probability: 10},
                            {data: "toughness", probability: 1},
                            {data: "erupt", probability: 4},
                            {data: "blast", probability: 4},
                            {data: "hit", probability: 4},
                            {data: "avoid", probability: 1},
                        ])
                    }
                });
        case 'mount':
            return createEquipmentFactory(
                equipmentInterface,
                mountClassify,
                (data) => new Mount(data),
                (data) => {
                    // 展示不知道加什么属性
                });
        case 'clothe':
            return createEquipmentFactory(
                equipmentInterface,
                clothClassify,
                (data) => new Clothe(data),
                (data) => {
                    // 随机生成防具信息
                    for (let i = 0; i < data.points+ 2; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 1},
                            {data: "life", probability: 10},
                            {data: "mana", probability: 10},
                            {data: "physique", probability: 10},
                            {data: "soulForce", probability: 10},
                            {data: "strength", probability: 1},
                            {data: "toughness", probability: 10},
                            {data: "erupt", probability: 1},
                            {data: "blast", probability: 1},
                            {data: "hit", probability: 1},
                            {data: "avoid", probability: 5},
                        ])
                    }
                });
        case 'bottle':
            return createEquipmentFactory(
                equipmentInterface,
                ['裤'],
                (data) => new Bottle(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 1},
                            {data: "life", probability: 10},
                            {data: "mana", probability: 10},
                            {data: "physique", probability: 10},
                            {data: "soulForce", probability: 10},
                            {data: "strength", probability: 1},
                            {data: "toughness", probability: 10},
                            {data: "erupt", probability: 1},
                            {data: "blast", probability: 1},
                            {data: "hit", probability: 1},
                            {data: "avoid", probability: 5},
                        ])
                    }
                });
        case 'shoe':
            return createEquipmentFactory(
                equipmentInterface,
                ['靴', '鞋'],
                (data) => new Shoe(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 1},
                            {data: "life", probability: 1},
                            {data: "mana", probability: 1},
                            {data: "physique", probability: 1},
                            {data: "soulForce", probability: 1},
                            {data: "strength", probability: 1},
                            {data: "toughness", probability: 1},
                            {data: "erupt", probability: 1},
                            {data: "blast", probability: 1},
                            {data: "hit", probability: 1},
                            {data: "avoid", probability: 1},
                        ])
                    }
                });
        case 'belt':
            return createEquipmentFactory(
                equipmentInterface,
                ['腰带', '腰佩'],
                (data) => new Belt(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 2},
                            {data: "life", probability: 1},
                            {data: "mana", probability: 2},
                            {data: "physique", probability: 1},
                            {data: "soulForce", probability: 2},
                            {data: "strength", probability: 1},
                            {data: "toughness", probability: 2},
                            {data: "erupt", probability: 1},
                            {data: "blast", probability: 2},
                            {data: "hit", probability: 1},
                            {data: "avoid", probability: 2},
                        ])
                    }
                });
        case 'ring':
            return createEquipmentFactory(
                equipmentInterface,
                ['戒', '镯'],
                (data) => new Ring(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 1},
                            {data: "life", probability: 2},
                            {data: "mana", probability: 1},
                            {data: "physique", probability: 2},
                            {data: "soulForce", probability: 1},
                            {data: "strength", probability: 2},
                            {data: "toughness", probability: 1},
                            {data: "erupt", probability: 2},
                            {data: "blast", probability: 1},
                            {data: "hit", probability: 2},
                            {data: "avoid", probability: 1},
                        ])
                    }
                });
        case 'necklace':
            return createEquipmentFactory(
                equipmentInterface,
                ['珠', '链', '铃'],
                (data) => new Necklace(data),
                (data) => {
                    for (let i = 0; i < data.points; i++) {
                        propsSetFactory(data, [
                            {data: "attack", probability: 1},
                            {data: "life", probability: 1},
                            {data: "mana", probability: 1},
                            {data: "physique", probability: 1},
                            {data: "soulForce", probability: 1},
                            {data: "strength", probability: 1},
                            {data: "toughness", probability: 1},
                            {data: "erupt", probability: 1},
                            {data: "blast", probability: 1},
                            {data: "hit", probability: 1},
                            {data: "avoid", probability: 1},
                        ])
                    }
                });
        default:
            throw new Error("没有指定类型")
    }

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
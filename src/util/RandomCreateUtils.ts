import {ImmortalCultivators, ImmortalCultivatorsInterface} from "../objs/ImmortalCultivators.ts";
import {randomUtil, uuid} from "./ProbabilityUtils.ts";
import {FightProgress, FightProgressInterFace} from "../objs/FightProgress.ts";
import {FightNode, FightNodeInterface} from "../objs/FightNode.ts";
import {Armor, EquipmentInterface, EquipmentLocation, Mount, Weapon} from "../objs/Equipment.ts";


export function createEquipment(equipmentInterface: EquipmentInterface = {}) {
    if (!equipmentInterface.requiredEquipmentLevel) {
        equipmentInterface.requiredEquipmentLevel = 1;
    }
    const level = equipmentInterface.requiredEquipmentLevel;

    const arrmorList = [
        EquipmentLocation.CLOTHE,
        EquipmentLocation.BOTTLE,
        EquipmentLocation.SHOE,
        EquipmentLocation.BELT,
        EquipmentLocation.RING,
        EquipmentLocation.NECKLACE,
    ]
    let enumValue = randomUtil.pickone([
        EquipmentLocation.WEAPON,
        EquipmentLocation.MOUNT,
        ...arrmorList
    ]);
    if (equipmentInterface.equipmentLocation !== undefined) {
        enumValue = equipmentInterface.equipmentLocation;
    }
    equipmentInterface.equipmentLocation = enumValue
    if (enumValue === EquipmentLocation.WEAPON) {
        const weapon = new Weapon(equipmentInterface);
        weapon.id = uuid();
        weapon.name = "测试🗡"
        weapon.attack = level
        return weapon
    } else if (enumValue === EquipmentLocation.MOUNT) {
        const mount = new Mount(equipmentInterface);
        mount.id = uuid();
        mount.name = "测试🐎"
        // 展示不知道加什么属性
        return mount
    } else {
        // 随机生成防具信息
        const armor = new Armor(equipmentInterface);
        armor.id = uuid();
        armor.name = "测试衣"
        const points = 2 * level;
        for (let i = 0; i < points; i++) {
            // @ts-ignore
            armor[randomUtil.pickone(['life', 'mana'])] += 1;
        }
        return armor
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
    ];
    for (let i = 0; i < points; i++) {
        const pickone = randomUtil.pickone(strings);
        // @ts-ignore
        immortalCultivators[pickone] += 1;
    }
    immortalCultivators.usedPoints += points;
}
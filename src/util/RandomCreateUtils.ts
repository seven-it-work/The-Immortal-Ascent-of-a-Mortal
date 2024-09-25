import {ImmortalCultivators, ImmortalCultivatorsInterface} from "../objs/ImmortalCultivators.ts";
import {randomUtil, uuid} from "./ProbabilityUtils.ts";
import {FightProgress, FightProgressInterFace} from "../objs/FightProgress.ts";
import {FightNode, FightNodeInterface} from "../objs/FightNode.ts";


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
        const integer = randomUtil.integer({min: 3, max: 10});
        for (let i = 0; i < integer; i++) {
            fightNodeInterface.fightProgressList.push(fightProgressCreate())
        }
    }
    return new FightNode(fightNodeInterface);
}

export const fightProgressCreate = (fightProgressInterFace: FightProgressInterFace = {}): FightProgress => {
    if (!fightProgressInterFace.id) {
        fightProgressInterFace.id = uuid()
    }

    if (!fightProgressInterFace.type) {
        fightProgressInterFace.type = "小兵"
    }
    if (["小兵"].includes(fightProgressInterFace.type)) {
        if (!fightProgressInterFace.currentEnemy) {
            fightProgressInterFace.currentEnemy = []
            // 初始化数量
            const integer = randomUtil.integer({min: 1, max: 3});
            for (let i = 0; i < integer; i++) {
                fightProgressInterFace.currentEnemy.push(immortalCreate())
            }
        }
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
    // 均衡分配模式
    const strings = [
        "physique",
        "soulForce",
        "strength",
    ];
    for (let i = 0; i < maxRemainingPoints; i++) {
        const pickone = randomUtil.pickone(strings);
        // @ts-ignore
        immortalCultivators[pickone] += 1;
    }
    immortalCultivators.usedPoints = immortalCultivators.getMaxRemainingPoints();

    immortalCultivators.currentLife = immortalCultivators.getLife()
    immortalCultivators.currentMana = immortalCultivators.getMana()
    return immortalCultivators
}
import {ImmortalCultivators, ImmortalCultivatorsInterface} from "../objs/ImmortalCultivators.ts";
import {randomUtil, uuid} from "./ProbabilityUtils.ts";
import {FightProgress, FightProgressInterFace} from "../objs/FightProgress.ts";
import {FightNode, FightNodeInterface} from "../objs/FightNode.ts";


export async function sleep(ms:number) {
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
        immortalCultivatorsInterface.level = randomUtil.integer({min: 0, max: 100})
    }
    if (!immortalCultivatorsInterface.life) {
        immortalCultivatorsInterface.life = randomUtil.integer({min: 0, max: 100})
    }
    if (!immortalCultivatorsInterface.mana) {
        immortalCultivatorsInterface.mana = randomUtil.integer({min: 0, max: 100})
    }
    if (!immortalCultivatorsInterface.attack) {
        immortalCultivatorsInterface.attack = randomUtil.integer({min: 0, max: 100})
    }
    immortalCultivatorsInterface.currentLife = immortalCultivatorsInterface.life
    immortalCultivatorsInterface.currentMana = immortalCultivatorsInterface.mana
    return new ImmortalCultivators(immortalCultivatorsInterface)
}
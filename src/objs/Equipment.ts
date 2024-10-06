import {SaveFunction} from "../util/SaveUtils.ts";

export const one_classify = {
    'weapon': '武器',
    'belt': '腰带',
    'clothe': '上装',
    'bottle': '下装',
    'ring': '戒指',
    'necklace': '项链',
    'shoe': '鞋子',
    'mount': '坐骑',
}

export const equipmentProps = {
    'attack': "攻击",
    'life': "生命",
    'mana': "法力",
    'physique': "体质",
    'soulForce': "魂力",
    'strength': "力量",
    'toughness': "韧性",
    'erupt': "爆发",
    'blast': "爆伤",
    'hit': "命中",
    'avoid': "躲避",
}
export const weaponClassify: string[] = [
    "刀",
    "剑",
    "枪",
    "棍",
    "弓",
    "矛",
    "斧",
    "锤",
    "弩",
    "鞭",
    '拳套',
    '琴'
]
// [
//     "戟",
//     "戈",
//     "环",
//     "钩",
//     "刺",
//     "爪",
//     "针",
//     "钉",
//     "镖",
//     "盾",

// ],


export const mountClassify: string[] = ["舟", "车", "马", "驹", "龙", "虎", "鹤"]

export const clothClassify: any = [
    "衣",
    "甲"
]


export const rarityNames: any = {
    common: '凡品',
    uncommon: '良品',
    rare: '上品',
    epic: '极品',
    legendary: '秘宝',
    mythic: '灵宝',
    exotic: '古宝'
};
export const rarityMorePoint: any = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    mythic: 6,
    exotic: 7
};

const rarityColors: any = {
    default: '#000000',
    common: '#CCCCCC',
    uncommon: '#222A35',
    rare: '#00A6A9',
    epic: '#804DC8',
    legendary: '#C5C660',
    mythic: '#F28234',
    exotic: '#C65043',
};


export interface EquipmentInterface {
    type?: 'weapon' | 'clothe' | 'bottle' | 'shoe' | 'belt' | 'ring' | 'necklace' | 'mount';
    // 二级分类
    type2?: string;
    // 稀有度
    rarity?: string;
    id?: string;
    name?: string;
    // 要求装备等级
    requiredEquipmentLevel?: number;
    // 攻击力（直接加成攻击力）
    attack?: number
    // 生命值
    life?: number
    // 法力值
    mana?: number
    // 体质
    physique?: number;
    // 魂力
    soulForce?: number;
    // 力量
    strength?: number;
    // 韧性
    toughness?: number;
    // 爆发
    erupt?: number;
    // 爆伤
    blast?: number;
    // 命中
    hit?: number;
    // 躲避
    avoid?: number;
    // 属性点数
    points?: number;

}

export class BaseEquipment implements EquipmentInterface, SaveFunction<BaseEquipment> {
    doLoad(dataStr: string): BaseEquipment {
        return this.doLoadByObj(JSON.parse(dataStr));
    }

    doLoadByObj(obj: any): BaseEquipment {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }

    doSave(): string {
        return JSON.stringify(this);
    }

    /**
     * 获取稀有度颜色
     */
    getRarityColors(): string {
        return rarityColors[this.rarity || 'default']
    }

    type?: 'weapon' | 'clothe' | 'bottle' | 'shoe' | 'belt' | 'ring' | 'necklace' | 'mount';
    // 二级分类
    type2?: string;
    // 稀有度
    rarity?: string;
    id?: string;
    name?: string;
    requiredEquipmentLevel?: number;
    attack: number = 0;
    life: number = 0;
    mana: number = 0;
    physique: number = 0;
    soulForce: number = 0;
    strength: number = 0;
    toughness: number = 0;
    erupt: number = 0;
    blast: number = 0;
    hit: number = 0;
    avoid: number = 0;
    points: number = 0;

    constructor(equipmentInterface?: EquipmentInterface) {
        Object.assign(this, equipmentInterface);
    }
}

export class Weapon extends BaseEquipment {
    type: 'weapon' = 'weapon'

    doLoadByObj(obj: any): Weapon {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Mount extends BaseEquipment {
    type: 'mount' = 'mount'

    doLoadByObj(obj: any): Mount {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Clothe extends BaseEquipment {
    type: 'clothe' = 'clothe'

    doLoadByObj(obj: any): Clothe {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Bottle extends BaseEquipment {
    type: 'bottle' = 'bottle'

    doLoadByObj(obj: any): Bottle {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Shoe extends BaseEquipment {
    type: 'shoe' = 'shoe'

    doLoadByObj(obj: any): Shoe {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Belt extends BaseEquipment {
    type: 'belt' = 'belt'

    doLoadByObj(obj: any): Belt {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Ring extends BaseEquipment {
    type: 'ring' = 'ring'

    doLoadByObj(obj: any): Ring {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}

export class Necklace extends BaseEquipment {
    type: 'necklace' = 'necklace'

    doLoadByObj(obj: any): Necklace {
        if (!obj) {
            return this;
        }
        Object.assign(this, obj);
        return this;
    }
}
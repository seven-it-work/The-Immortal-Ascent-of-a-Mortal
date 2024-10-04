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

export const weapon_classify = {
    sword: '剑',
    knife: '刀',
    violin: '琴',
    bow: '弓',
    whip: '鞭',
    fist: '拳',
    palm: '掌',
    gun: '枪',
}


export interface EquipmentInterface {
    type?: 'weapon' | 'clothe' | 'bottle' | 'shoe' | 'belt' | 'ring' | 'necklace' | 'mount';
    id?: string;
    name?: string;
    // 要求装备等级
    requiredEquipmentLevel?: number;

    attack?: number
    life?: number
    mana?: number
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

    type?: 'weapon' | 'clothe' | 'bottle' | 'shoe' | 'belt' | 'ring' | 'necklace' | 'mount';
    id?: string;
    name?: string;
    requiredEquipmentLevel?: number;
    attack: number = 0;
    life: number = 0;
    mana: number = 0;

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
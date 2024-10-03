import {SaveFunction} from "../util/SaveUtils.ts";

const weaponType = [
    '剑',
    '刀',
    '琴',
    '弓',
    '鞭',
    '拳',
    '掌',
    '枪',
]

const armor = [
    "上装",
    "下装",
    "鞋子",
    "腰带",
    "戒指",
    "项链",
]

export enum EquipmentLocation {
    WEAPON,
    CLOTHE,
    BOTTLE,
    SHOE,
    BELT,
    RING,
    NECKLACE,
    MOUNT,
}

export interface EquipmentInterface {
    type?: 'WEAPON' | 'ARMOR' | 'MOUNT';
    equipmentLocation?: EquipmentLocation;
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

    type?: 'WEAPON' | 'ARMOR' | 'MOUNT';
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
    type: 'WEAPON' = 'WEAPON'
    equipmentLocation: EquipmentLocation = EquipmentLocation.WEAPON;

    constructor(equipmentInterface: EquipmentInterface) {
        super(equipmentInterface);
    }
}

export class Armor extends BaseEquipment {
    type: 'ARMOR' = 'ARMOR'

    constructor(equipmentInterface: EquipmentInterface) {
        super(equipmentInterface);
    }
}

export class Mount extends BaseEquipment {
    type: 'MOUNT' = 'MOUNT'
    equipmentLocation: EquipmentLocation = EquipmentLocation.MOUNT;

}
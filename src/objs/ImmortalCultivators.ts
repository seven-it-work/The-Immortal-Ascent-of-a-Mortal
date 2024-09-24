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

export interface ImmortalCultivatorsInterface {
    id?: string | undefined;
    name?: string | undefined;
    birth?: number | undefined;
    level?: number | undefined;
    life?: number | undefined;
    currentLife?: number | undefined;
    mana?: number | undefined;
    currentMana?: number | undefined;
    attack?: number | undefined;
}

export class ImmortalCultivators implements ImmortalCultivatorsInterface {
    attack: number | undefined;
    birth: number | undefined;
    currentLife: number | undefined;
    currentMana: number | undefined;
    id: string | undefined;
    level: number | undefined;
    life: number | undefined;
    mana: number | undefined;
    name: string | undefined;


    getLevelStr(): string {
        return temp[this.level || 0]
    }

    constructor(immortalCultivatorsInterface: ImmortalCultivatorsInterface) {
        this.attack = immortalCultivatorsInterface.attack;
        this.birth = immortalCultivatorsInterface.birth;
        this.currentLife = immortalCultivatorsInterface.currentLife;
        this.currentMana = immortalCultivatorsInterface.currentMana;
        this.id = immortalCultivatorsInterface.id;
        this.level = immortalCultivatorsInterface.level;
        this.life = immortalCultivatorsInterface.life;
        this.mana = immortalCultivatorsInterface.mana;
        this.name = immortalCultivatorsInterface.name;
    }

    isLife(): boolean {
        return (this?.currentLife || 0) > 0;
    }
}
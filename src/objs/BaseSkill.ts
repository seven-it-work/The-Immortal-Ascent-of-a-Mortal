import {ImmortalCultivators} from "./ImmortalCultivators.ts";
import {pickList, randomUtil, uuid} from "../util/ProbabilityUtils.ts";

export default class BaseSkill {
    id?: string;
    name?: string;
    description?: string;
    spendMana?: number;
    classType?: string;

    /**
     * 攻击者
     * 防御者
     * 攻击队伍
     * 防御队伍
     * 返回值：any
     */
    doUseSkill(attacker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[]): UseSkillResult {
        attacker.currentMana -= this.spendMana
        const useSkillResult = new UseSkillResult();
        this.useBefore(attacker, defender, attackTeam, defenderTeam, useSkillResult)
        this.use(attacker, defender, attackTeam, defenderTeam, useSkillResult)
        this.useAfter(attacker, defender, attackTeam, defenderTeam, useSkillResult)
        return useSkillResult;
    }

    useBefore(attacker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[], useSkillResult: UseSkillResult) {

    }

    use(attacker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[], useSkillResult: UseSkillResult) {

    }

    useAfter(attacker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[], useSkillResult: UseSkillResult) {

    }
}

export const jsonStr2SkillUtil = (str: string): BaseSkill => {
    return json2SkillUtil(JSON.parse(jsonStr))
}

export const json2SkillUtil = (obj: any): BaseSkill => {
    switch (obj.classType) {
        case "PropertySkill":
            const propertySkill = new PropertySkill();
            Object.assign(propertySkill, obj);
            return propertySkill;
        default:
            const baseSkill = new BaseSkill();
            Object.assign(baseSkill, obj);
            return baseSkill;
    }
}


export class PropertySkill extends BaseSkill {
    classType = "PropertySkill";
    target: 'attacker' | 'defender' | 'AllAttackTeam' | 'AllDefenderTeam' | 'RandomAttackTeam' | 'RandomDefenderTeam'
    randomNumber: number = 1;
    isGainBuff: boolean = true;
    buff: Buff;

    use(attacker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[], useSkillResult: UseSkillResult) {
        const targetList: ImmortalCultivators[] = []
        switch (this.target) {
            case "AllAttackTeam":
                targetList.push(...attackTeam)
                break;
            case "AllDefenderTeam":
                targetList.push(...defenderTeam)
                break;
            case "attacker":
                targetList.push(attacker)
                break;
            case "defender":
                targetList.push(defender)
                break;
            case "RandomAttackTeam":
                targetList.push(...pickList(attackTeam, this.randomNumber))
                break;
            case "RandomDefenderTeam":
                targetList.push(...pickList(defenderTeam, this.randomNumber))
                break;
            default:
                throw new Error("错误类型")
        }
        targetList.forEach(item => {
            if (this.isGainBuff) {
                item.addGain({...this.buff})
            } else {
                item.addNegativeBenefits({...this.buff})
            }
        })
    }
}

export class UseSkillResult {
    harm: number = 0;
    otherData: any = {};
}

export interface Buff {
    type: string;
    id: string;
    name: string;
    value: number;
    remainingTimes: number;
}
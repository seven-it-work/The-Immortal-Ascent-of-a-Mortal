import {ImmortalCultivators} from "./ImmortalCultivators.ts";

export default class BaseSkill {
    id?: string;
    name?: string;
    spendMana?: number;

    /**
     * 攻击者
     * 防御者
     * 攻击队伍
     * 防御队伍
     * 返回值：any
     */
    doUseSkill(attker: ImmortalCultivators, defender: ImmortalCultivators, attackTeam: ImmortalCultivators[], defenderTeam: ImmortalCultivators[]): UseSkillResult {
        var useSkillResult = new UseSkillResult();
        return useSkillResult;
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
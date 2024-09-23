/**
 * 酒馆（招募）
 * 旅店（恢复、有伴侣可以双休）
 * 秘境（探宝）
 * 试炼（提升个人能力（比如奖励什么什么丹药））
 * 宗门排名比赛
 * 大陆排名比赛
 * 世界排名比赛
 * 修炼（修炼技能，提升技能等级）
 * 人
 * 怪物
 * 出口
 */
export enum PathEnum {
}

export default class Path {
    id: string;
    name: string;
    type: PathEnum;
    continentId: string;

    nameStr(): string {
        return this.name
    }
}
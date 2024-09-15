import People from "./People";
import Chance from "chance"

export default class Fight {
    defendTeamID: string[];
    attackingTeamID: string[];
    idAndPeopleMap: Map<string, People>

    public autoFight() {
        // 获取idAndPeopleMap.values()按着速度进行排序
        Array.from(this.idAndPeopleMap.values()).sort((v1, v2) => {
            return v1.velocity - v2.velocity;
        }).forEach(item => {
            if (item.isDead()) {
                // 死亡了的从队伍中移除
                this.attackingTeamID = this.attackingTeamID.filter(id => id !== item.id)
                this.defendTeamID = this.defendTeamID.filter(id => id !== item.id)
            } else {
                // 如果攻击方没有体力，则不进行攻击，进入休眠
                if (item.isSleep()) {
                    item.doSleep()
                } else {
                    let targetIdList = []
                    // 随机选择一个敌法
                    if (this.attackingTeamID.indexOf(item.id) === -1) {
                        // 在defendTeamID中
                        targetIdList = this.attackingTeamID;
                    } else {
                        // 在attackingTeamID中
                        targetIdList = this.defendTeamID;
                    }
                    if (targetIdList.length === 0) {
                        // 没有对手了，应该是结束了
                    } else {
                        // 从中选一个
                        const pickone = new Chance().pickone(targetIdList);
                        Fight.doFight(item, pickone)
                    }
                }

            }
        })
    }

    public static doFight(attack: People, defend: People) {
        // 判断是使用技能还是普通攻击。后续可以做一个比例 按比例来随机触发 todo
        // 普通攻击
        attack.usePhysical();
        // 普通攻击伤害=攻击力+装备攻击力加成 todo
        let harm = attack.attack.current
        // 暴击判定 todo

        // 防御闪避判定 todo

        // 防御格挡判定 todo

        // 伤害赋值
        defend.blood.current -= harm
    }
}
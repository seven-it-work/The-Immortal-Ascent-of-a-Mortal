# 凡人修仙传

# 逻辑说明

人间界
妖
仙
魔
神
圣
尊
混沌
鸿蒙
之后便是轮回，比如人名是 小虾米
开天（小虾米）
辟地（小虾米）
人间界（小虾米）
妖（小虾米）
仙（小虾米）
魔（小虾米）
神（小虾米）
圣（小虾米）
尊（小虾米）
混沌（小虾米）
鸿蒙（小虾米）
然后再轮回

# 场景对象

客栈：恢复
酒楼：恢复、招募
怡红院：恢复
宗门：挑战、加入、退出、接收宗门任务、宗门选拔比赛
秘境：打怪、寻宝、升级
奇遇：打怪、寻宝

比赛：宗门选拔比赛、世界排名比赛、比武招亲



# 技能对象
- 名称
- 描述
- 消耗元气
- 消耗体力
- 分类
    - 阵法
    - 技能
技能执行函数(attack: People, defend: People,fight:Fight)
简单做个分类：
- 治疗生命比例最低的人
- 当前回合攻击力加成5%等 RoundFunction

伤害计算函数


# 队伍说明
一个队伍最多7个人（包含魂魄）

# 战斗说明
当前气血：归零时，人物死亡（战斗中死亡将变成魂魄，魂魄不能攻击，魂魄只能撑7天，7天后魂魄自动消失）

当前元气：释放 阵法、技能所需要的消耗（有的需要消耗元气、有的需要消耗灵力、有的都需要）

当前灵力：释放 阵法、技能所需要的消耗

当前体力：每次行动时，都需要进行扣除，如果体力为0 则昏迷3个回合，普通攻击消耗1，技能根据技能进行消耗

速度 速度高的先出手，并且逃跑概率=逃跑方速度/(逃跑方速度+对方速度)

## 伤害计算

普通攻击：Math.max(攻击力-对方防御力,1) 最低造成1点伤害

闪避计算：Math.max(攻击方命中-防御方闪避,1)%概率进行触发

暴击计算：攻击方暴击概率进行触发

格挡计算：防御方格挡概率进行触发
格挡减伤计算：攻击方造成伤害*（1-防御方抗性/(防御方抗性+攻击方抗性)）

# 人物属性说明

## 基础属性

气血：角色的生命值，决定了角色能承受多少伤害。
每提升一级，气血增加基础值（如100点）加上上次气血的百分比（如5%）
气血 = 上次气血 + （基础值 + 上次气血 * 百分比）

法力/元气：用于施法或使用技能的能量，不同的游戏可能会有不同的称呼。
每提升一级，法力增加基础值（如50点）加上上次法力的百分比（如3%）。
法力 = 上次法力 + （基础值 + 上次法力 * 百分比）

体力：用于执行某些行动的能量，如采集、挖掘等。
每提升一级，体力增加基础值（如20点）加上上次体力的百分比（如2%）。
体力 = 上次体力 + （基础值 + 上次体力 * 百分比）

灵力：升级必须
每提升一级，灵力增加基础值（如100点）加上上次灵力的百分比（如5%）
灵力 = 上次灵力 + （基础值 + 上次灵力 * 百分比）


攻击：角色的基本攻击力，影响物理或法术伤害。
每提升一级，攻击增加基础值（如10点）加上上次攻击的百分比（如2%）。
攻击 = 上次攻击 + （基础值 + 上次攻击 * 百分比）

防御：减少受到的伤害量。
每提升一级，防御增加基础值（如5点）加上上次防御的百分比（如1%）。
防御 = 上次防御 + （基础值 + 上次防御 * 百分比）

速度：影响角色移动速度或战斗中的行动顺序。
每提升一级，速度增加基础值（如3点）加上上次速度的百分比（如1%）。
速度 = 上次速度 + （基础值 + 上次速度 * 百分比）

悟性：影响角色学习新技能的速度或修炼效率。
每提升一级，悟性增加基础值（如1点）加上上次悟性的百分比（如0.5%）。
悟性 = 上次悟性 + （基础值 + 上次悟性 * 百分比）

幸运：影响各种随机事件的结果。
每提升一级，幸运增加基础值（如1点）加上上次幸运的百分比（如0.5%）。
幸运 = 上次幸运 + （基础值 + 上次幸运 * 百分比）

声望/威望：在游戏世界中的声誉。
声望通常通过完成任务、击败敌人等方式获得，每次完成可获得固定值（如100点）。
声望 = 上次声望 + 固定值

魅力：影响角色与其他NPC的交互结果。
每提升一级，魅力增加基础值（如1点）加上上次魅力的百分比（如0.5%）。
魅力 = 上次魅力 + （基础值 + 上次魅力 * 百分比）


道德/善恶：反映角色的行为倾向，可能会影响游戏剧情的发展。
等级/修为：体现角色的整体实力，可能影响修炼速度或其他重要事件的发生。
灵根：影响角色修炼属性，对齐的功法加成不同
五行：金->木->水->火->土->金
光->暗->五行->光
虚无（没有克制，也没有被克制）

## 战斗属性

命中：增加攻击命中目标的概率。
每提升一级，命中增加基础值（如2点）加上上次命中的百分比（如1%）。
命中 = 上次命中 + （基础值 + 上次命中 * 百分比）

闪避：增加躲避敌人攻击的概率。
每提升一级，闪避增加基础值（如2点）加上上次闪避的百分比（如1%）。
闪避 = 上次闪避 + （基础值 + 上次闪避 * 百分比）

暴击：增加造成致命一击的概率。
每提升一级，暴击增加基础值（如1点）加上上次暴击的百分比（如0.5%）。
暴击 = 上次暴击 + （基础值 + 上次暴击 * 百分比）

抗性：减少受到特定类型伤害的程度。
每提升一级，抗性增加基础值（如1点）加上上次抗性的百分比（如0.5%）。
抗性 = 上次抗性 + （基础值 + 上次抗性 * 百分比）

格挡：有一定概率格挡敌人的攻击，减少受到的伤害。
每提升一级，格挡增加基础值（如1点）加上上次格挡的百分比（如1%）。
格挡 = 上次格挡 + （基础值 + 上次格挡 * 百分比）



## 等级说明


练气期（9）：修炼的基础阶段，主要是在体内积累真气或元气。

筑基期（10）：在这个阶段，修炼者会将之前积累的真气或元气进行巩固，为后续修炼打下坚实基础。

开光期（11）：修炼者开始开发自身的潜力，使自身的能力得到显著提高。

融合期（12）：修炼者开始尝试将自身的真气或元气与外界的力量相融合。

金丹期（13）：修炼者在这个阶段会凝结出一颗金丹，金丹是修炼者实力的象征。

元婴期（14）：修炼者会凝结出元婴，元婴是修炼者的第二生命形态，可以脱离肉身存在。

出窍期（15）：修炼者可以将自己的元神或元婴脱离肉身，进行远距离活动。

分神期（16）：修炼者可以将自身的元神分裂，形成多个分身。

合体期（17）：修炼者可以将自身与元神或元婴完美融合，达到新的境界。

大乘期（18）：在一些设定中，这是人间界能达到的最高境界。

真仙境（19）：修炼者在这个阶段开始领悟更高层次的力量，成为真正的仙人。

金仙境（20）：修炼者在这个阶段已经掌握了相当强大的力量，接近于仙人的顶端。

大罗金仙境（30）：这是修仙者能达到的一个极为高深的境界，几乎可以操纵一切自然法则。

混元大罗金仙境（40）：这是在一些设定中提到的，位于“大罗金仙境”之上的一个更高层次。达到此境界的修仙者不仅能够掌控更多的自然法则，还能对时空有着更深入的理解。

混元无极大罗金仙境（50）：在某些设定中，这是比“混元大罗金仙境”还要高的境界，几乎可以认为是修仙者所能达到的极致。

混沌至尊境（60）：在一些修仙小说或游戏中，这被认为是最高的境界之一，超越了“大罗金仙境”，达到这个境界的修仙者几乎可以掌控整个宇宙的法则。

圣人境（70）：在某些设定中，修仙者只有领悟了天地大道，才能进入“混元大罗金仙境”，而在这个境界之上，还有“圣人境”。圣人境的修仙者至少会领悟一种天地法则，是超越凡俗的存在，被诸仙共尊为圣人。

天尊境（80）：某些作品中提到的高于“大罗金仙境”的境界，达到此境界的修仙者几乎可以称得上是天道的一部分。

至高无上境（90）：这是一种抽象的概念，代表着修仙者所能达到的极限，几乎无所不能。

超脱境（100）：有些设定中，认为“大罗金仙境”只是修仙者在物质世界中的极限，而“超脱境”则是完全超出了物质世界的限制，达到了另一种存在形式。

无上真仙（∞）：这是某些作品中描述的最高境界之一，代表了修仙者已经完全掌握了自然法则，成为了近乎完美的存在。


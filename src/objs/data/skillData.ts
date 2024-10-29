export default [
    {
        "classType": "PropertySkill",
        "target": "attacker",
        "randomNumber": 1,
        "isGainBuff": true,
        "name":"强身健体",
        "id": "attackerPhysiqueAdd1And10",
        "description":"给自己添加体质+1增益，持续10回合",
        "spendMana":1,
        "buff": {
            "type": "physique",
            "id": "attackerPhysiqueAdd1And10",
            "name": "体质",
            "value": 1,
            "remainingTimes": 4
        }
    },
]
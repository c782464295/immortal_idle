'use strict'


export const MonsterName = {
    0: "LegaranWurm",
    1: "CursedLich",
    2: "Dragon",

    get: function (value) {
        if (typeof (value) == 'number') {
            return GeneralStats[value];
        } else {
            return Object.keys(GeneralStats).find(key => GeneralStats[key] === value);
        }
    }
}



export const Monster = {
    id: MonsterName.get("Dragon"),
    get name() {
        return getLangString('MONSTER_NAME', `${this.id}`);
    },
    basicAttributes: {
        Hitpoints: 900,
        Attack: 1,
        Strength: 1,
        Defence: 350,
        Ranged: 650,
        Magic: 300,
        attackSpeed: 2100
    },
    specialAttacks: [attacks.Burrow, attacks.PenetratingSpikeShot, attacks.ToxicNeedles],
    dropRate: 10 / 100,
    lootTable: [
        // 物品Id,数量，概率
        [Items.Poison_Essence, 8, 1 / 100],
        [Items.Worm_Spike, 1, 10 / 100],
    ],

}

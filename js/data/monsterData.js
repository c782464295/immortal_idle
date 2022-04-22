'use strict'
import { loc } from '../locale.js';
import { deepClone, rando } from '../utility.js';

export const MonsterName = {
    0: "LegaranWurm",
    1: "CursedLich",
    2: "Dragon",

    get: function (value) {
        if (typeof (value) == 'number') {
            return MonsterName[value];
        } else {
            return Object.keys(MonsterName).find(key => MonsterName[key] === value);
        }
    }
}


const attacks = {
    Burrow: 0,
    PenetratingSpikeShot: 1,
    ToxicNeedles: 2
}
const Items = {
    Poison_Essence: 0,
    Worm_Spike: 1
}


export const MonsterDragon = {
    id: MonsterName.get("Dragon"),
    get name() {
        return loc('MONSTER_NAME', `${this.id}`);
    },
    basicAttributes: {
        HP: 900,
        MP: 200,
        Attack: 1,
        Strength: 1,
        Defence: 350,
        Ranged: 650,
        Magic: 300,
        attackSpeed: 200
    },
    specialAttacks: [attacks.Burrow, attacks.PenetratingSpikeShot, attacks.ToxicNeedles],
    lootTable: [
        // itemID,number of item, probability
        { id: Items.Poison_Essence, number: 8, probability: 1 / 100 },
        { id: Items.Worm_Spike, number: 1, probability: 50 / 100 },
        { id: Items.Worm_Spike, number: 1, probability: '*' },
    ]
}
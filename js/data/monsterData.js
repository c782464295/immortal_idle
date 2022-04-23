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
    Burn: 0,
    BeingSheep: 1,
    DoubleAttack: 2,
    AttackUP: 3
}
const Items = {
    null: -1,
    log0: 0,
    log1: 1
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
        attackSpeed: 20
    },
    specialAttacks: [attacks.Burn, attacks.BeingSheep, attacks.DoubleAttack, attacks.AttackUP],
    lootTable: [
        // itemID,number of item, probability
        { id: Items.log1, number: 8, probability: 1 / 100 },
        { id: Items.log0, number: 1, probability: 50 / 100 },
        { id: Items.null, number: 1, probability: '*' },
    ]
}
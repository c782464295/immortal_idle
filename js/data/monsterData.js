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

function randomizer(values) {
    let picked = null;
    let i, pickedValue,
        randomNr = Math.random(),
        threshold = 0;

    for (i = 0; i < values.length; i++) {
        if (values[i].probability === '*') {
            continue;
        }

        threshold += values[i].probability;
        if (threshold > randomNr) {
            pickedValue = values[i].value;
            picked = values[i];
            break;
        }

        if (!pickedValue) {
            //nothing found based on probability value, so pick element marked with wildcard
            picked = values.find((value) => value.probability === '*');
        }
    }

    return picked;
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

export const MonsterInterface = {
    id: -1,
    get name() {
        return '';
    },
    basicAttributes: {
        HP: -1,
        MP: -1,
        Attack: -1,
        Strength: -1,
        Defence: -1,
        Ranged: -1,
        Magic: -1,
        attackSpeed: -1
    },
    idleState: {
        action() {
        }
    },
    fleeState: {
        action() {
        }
    },
    dieState: {
        action() {
        }
    }
}

export const MonsterDefalut = {
    id: -1,
    enemy: {},
    idleState: {
        action(that) {
            return
        }
    }
}

export const MonsterTest = {
    id: MonsterName.get("Dragon"),
    get name() {
        return loc('MONSTER_NAME', `${this.id}`);
    },
    enemy: {},
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
    idleState: {
        maxTick:0,
        tickLeft:0,
        action(that) {
            if(this.maxTick === 0) {
                this.maxTick = that.characteristic.basicAttributes.attackSpeed;
                this.tickLeft = this.maxTick;
            }
            if (that.characteristic.basicAttributes.HP <= 0) {
                that.stack.push(that.characteristic.dieState);
                return
            }

            if (that.enemy.characteristic.basicAttributes.HP <= 0) {
                that.start = false;
                that.enemy.start = false;
            }
            /*
            if (that.characteristic.basicAttributes.HP < Math.floor(that.characteristic.basicAttributes.HP * 0.1)) {
                that.stack.push(that.characteristic.fleeState);
                return;
            }
            */
            this.tickLeft -= 1;
            if(this.tickLeft === 0 ) {
                this.tickLeft = this.maxTick;
                if (rando(0,1) === 1) {

                    if (that.characteristic.basicAttributes.MP >= 10) {
                        //that.stack.push(that.characteristic.skill);
                        that.characteristic.basicAttributes.MP -= 10;
                        console.log('skill');
                    } else {
                        that.stack.push(that.characteristic.attackState);
                    }
                } else {
    
                    that.stack.push(that.characteristic.attackState);
                }
            }
        }
    },
    fleeState: { action: function () { console.log('fless') } },
    dieState: {

        lootTable: [
            // itemID,number of item, probability
            { id: Items.Poison_Essence, number: 8, probability: 1 / 100 },
            { id: Items.Worm_Spike, number: 1, probability: 10 / 100 },
            { id: Items.Worm_Spike, number: 1, probability: '*' },
        ],

        action: function (that) {
            console.log('die');
            //that.stack = [];
            //that.characteristic = {};
            //delete that.stack;
            //delete that.characteristic;

            let tmpItem = randomizer(this.lootTable);
            console.log(tmpItem);
            that.stack.pop();
            that.stack.push(that.characteristic.respawnState);
        }
    },
    attackState: {

        action: function(that) {
            that.enemy.characteristic.basicAttributes.HP -= 500;
            console.log('normal attack');
            console.log(that.enemy);
            console.log(that.enemy.characteristic.basicAttributes.HP);
            that.stack.pop();
        }
    },
    respawnState : {
        action: function(that) {
            console.log('res');
            that.characteristic = deepClone(MonsterTest);
            that.stack.pop();
        }
    }
}
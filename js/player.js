'use strict'
import { StackFSM } from './FSM.js';
import { global } from './global.js';

export const playerData = {
    id: 0,
    get name() {
        return 'player';
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
    idleState: {
        maxTick: 0,
        tickLeft: 0,
        action(that) {
            if (that.enemy.characteristic.basicAttributes.HP > 0) {
                that.stack.push(that.characteristic.attackState);
            } else {
                that.stack.push(that.characteristic.dieState);
            }

        }
    },
    fleeState: { action: function () { console.log('fless') } },
    dieState: {



        action: function (that) {
            console.log('player die');
            console.log(that);
            that.start = false;
            that.enemy.start = false;
        }
    },
    attackState: {

        action: function (that) {
            that.enemy.characteristic.basicAttributes.HP -= 10;

            that.stack.pop();
        }
    }
}

class playerFleeState extends State{
    constructor() {
        super('fleeState');
    }
    action() {
        console.log('fless');
    }
}
class playerDieState extends State{
    constructor() {
        super('dieState');
    }
    action() {
        console.log('fless');
    }
}
export class Player{
    constructor() {
        this.stackFSM = new StackFSM();
        this.start = false;

        this.basicAttributes = global.PlayerStates;
        this.specialAttacks = {};

        this.enemy = {};
    }
    tick() {
        if (this.start) {
            this.stackFSM.tick(this);
        }
    }
}
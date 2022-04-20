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
        maxTick:0,
        tickLeft:0,
        action(that) {
            
        }
    },
    fleeState: { action: function () { console.log('fless') } },
    dieState: {

        

        action: function (that) {

        }
    },
    attackState: {

        action: function(that) {
            console.log('normal attack');
            that.stack.pop();
        }
    }
}
export class Player extends StackFSM{
    constructor(playerData){
        super(playerData);
        //this.characteristic = global.PlayerStates;
    }

}
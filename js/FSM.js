'use strict'
import { deepClone } from './utility.js';
import { MonsterInterface } from './data/monsterData.js';
export class StackFSM {
    /**
     * 
     * @param {MonsterInterface} characteristic 
     */
    constructor(characteristic) {
        this.stack = [];
        this.characteristic = characteristic;
        this.pushState(this.characteristic.idleState);

    }
    updateState() {
        if (this.getCurrentState() != null) {
            this.getCurrentState().action(this);
        }
    }

    popState() {
        return this.stack.pop();
    }

    pushState(state) {
        this.stack.push(state);
    }

    getCurrentState() {
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }

    tick() {
        this.updateState();
    }
}

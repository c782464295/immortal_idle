'use strict'
import { deepClone } from './utility.js';
import { randomizer } from './utility.js';
import { global } from './global.js';
/**
 * @override
 */
export class State {
    constructor(name) {
        this.name = name;
    }
    action() {
        throw new Error('Must be override!');
    }
}
export class idleState extends State {
    constructor() {
        super('idleState');
        this.maxTick = 0;
        this.tickLeft = 0;
    }
    action(target) {
        if (this.maxTick === 0) {
            this.maxTick = target.basicAttributes.attackSpeed;
            this.tickLeft = this.maxTick;
        }

        if (target.basicAttributes.HP <= 0) {
            target.stackFSM.pushState(target.dieState);
            return
        }

        this.tickLeft -= 1;
        if (this.tickLeft === 0) {
            this.tickLeft = this.maxTick;
            if (0) {

                if (target.basicAttributes.MP >= 10) {
                    //that.stack.push(that.characteristic.skill);
                    target.basicAttributes.MP -= 10;
                    console.log('skill');
                } else {
                    target.stackFSM.pushState(target.attackState);
                }
            } else {
                target.stackFSM.pushState(target.attackState);
            }
        }
    }
}
export class fleeState extends State {
    constructor() {
        super('fleeState');
    }
    action() {
        console.log('fless');
    }
}
export class dieState extends State {
    constructor() {
        super('dieState');
    }
    action(target) {

        target.battleHistory.push(`targetID:${target.id} Die!`);
        target.stackFSM.popState();
        let tmpItem = randomizer(target.lootTable);
        console.log(tmpItem);
        if (tmpItem.id != -1) {
            let tmp = global.inventory.find(item => item.id == tmpItem.id);
            tmp.qty += 1;
        }

        target.stackFSM.pushState(target.respawnState);

    }
}
export class attackState extends State {
    constructor() {
        super('attackState');
    }
    action(target) {
        target.enemy.basicAttributes.HP -= target.basicAttributes.Attack;
        //console.log(target);
        target.stackFSM.popState();
    }
}
export class normalAttackState extends State {
    constructor() {
        super('normalAttackState');
    }
    action() {
        console.log('fless');
    }
}
export class skillState extends State {
    constructor() {
        super('skillState');
    }
    action() {
        console.log('fless');
    }
}
export class stunState extends State {
    constructor() {
        super('stunState');
    }
    action() {
        console.log('fless');
    }
}
export class respawnState extends State {
    constructor() {
        super('respawnState');
        this.maxTick = 100;
        this.tickLeft = this.maxTick;
    }
    action(target) {

        if (this.tickLeft >= 0) {
            this.tickLeft--;

        } else {
            target.battleHistory.push(`targetID:${target.id} Respown!`);

            this.tickLeft = this.maxTick;
            target.stackFSM.popState();
            target.basicAttributes = deepClone(target.saveBasicAttributes);
            console.log(target.battleHistory);
            target.battleHistory.length = 0;
        }
    }
}

export class StackFSM {

    constructor() {
        this.stack = [];
    }
    updateState(target) {
        if (this.getCurrentState() != null) {
            this.getCurrentState().action(target);
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

    tick(target) {
        this.updateState(target);
    }
}

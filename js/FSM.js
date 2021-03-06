'use strict'
import { deepClone, rando } from './utility.js';
import { randomizer } from './utility.js';
import { global } from './global.js';
import { skill } from './skill.js';
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
            if (rando(0, 1)) {
                if (target.basicAttributes.MP >= 10) {
                    target.stackFSM.pushState(target.skillState);
                    target.basicAttributes.MP -= 10;
                    
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
        console.log('fleeState');
    }
}
export class dieState extends State {
    constructor() {
        super('dieState');
    }
    action(target) {

        target.battleHistory.push(`targetID:${target.id} Die!`);
        
        let tmpItem = randomizer(target.lootTable);
        target.battleHistory.push(`lootItem:${tmpItem.id} Dropped!`);
        if (tmpItem.id != -1) {
            global.inventoryAddItem(tmpItem.id, 1);
        }

        target.effectContainer.effectsList.length = 0;
        target.enemy.effectContainer.effectsList.length = 0;
        target.stackFSM.popState();
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
export class skillState extends State {
    constructor() {
        super('skillState');
    }
    action(target) {
        let skillID = target.specialAttacks[rando(0, target.specialAttacks.length - 1)];
        let skill_tmp = skill.find((item) => { return item.id == skillID });

        
        let concrete = new skill_tmp.concrete();
        concrete.cast(target);

        target.battleHistory.push(target.name + ' use Skill named ' + concrete.effectName);
        target.stackFSM.popState();
    }
}
export class stunState extends State {
    constructor() {
        super('stunState');
    }
    action() {
        console.log('stun');
    }
}
export class respawnState extends State {
    constructor() {
        super('respawnState');
        this.maxTick = 100;
        this.tickLeft = this.maxTick;
    }
    action(target) {
        target.effectContainer.length = 0;
        if (this.tickLeft >= 0) {
            this.tickLeft--;

        } else {
            target.battleHistory.push(`targetID:${target.id} Respown!`);

            this.tickLeft = this.maxTick;
            target.stackFSM.popState();
            target.basicAttributes = deepClone(target.saveBasicAttributes);
            
            console.log(target.battleHistory.join('\r\n'));
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

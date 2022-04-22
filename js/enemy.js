'use strict'
import { StackFSM, respawnState, skillState, stunState, idleState, dieState, normalAttackState, attackState, fleeState } from './FSM.js';
import { deepClone } from './utility.js';

export class Enemy {
    constructor() {
        this.stackFSM = new StackFSM();
        this.start = false;

        this.id = 0;
        this.name = '';
        this.basicAttributes = {};
        this.specialAttacks = {};
        this.lootTable = [];
        this.enemy = {};

        this.idleState = new idleState();
        this.attackState = new attackState();
    }

    setSelf(target) {
        this.id = target.id;
        this.name = target.name;
        this.basicAttributes = deepClone(target.basicAttributes);
        this.specialAttacks = deepClone(target.specialAttacks);
        this.lootTable = deepClone(target.lootTable);

        this.stackFSM.stack = [];
    }

    setState(stateName) {
        switch (stateName) {
            case 'flee':
                this.stackFSM.pushState(this.fleeState);
                break
            case 'idle':
                console.log(this);
                this.stackFSM.pushState(this.idleState);
        }
    }
    setEnemy(enemy) {
        this.enemy = enemy;
    }

    tick() {
        if (this.start) {
            this.stackFSM.tick(this);
        }

    }

}
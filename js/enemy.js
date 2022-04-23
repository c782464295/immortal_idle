'use strict'
import { StackFSM, respawnState, skillState, stunState, idleState, dieState, normalAttackState, attackState, fleeState } from './FSM.js';
import { deepClone } from './utility.js';
import { effectAndBuffContainer } from './skill.js';

export class Enemy {
    constructor() {
        this.battleHistory = [];
        this.effectAndBuffContainer = new effectAndBuffContainer();

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
        this.respawnState = new respawnState();
        this.dieState = new dieState();

        this.saveBasicAttributes = {};
    }

    setSelf(target) {
        this.id = target.id;
        this.name = target.name;
        this.saveBasicAttributes = deepClone(target.basicAttributes);
        this.basicAttributes = deepClone(target.basicAttributes);
        this.specialAttacks = deepClone(target.specialAttacks);
        this.lootTable = deepClone(target.lootTable);

        this.stackFSM.stack = [];
    }
    respawn() {
        this.basicAttributes = deepClone('xxx');
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
    pushState(stateName, maxTick, tickLeft) {
        switch (stateName) {
            case 'idleState':
                this.idleState.maxTick = maxTick;
                this.idleState.tickLeft = tickLeft;
                this.stackFSM.pushState(this.idleState);
        }
    }
    tick() {
        if (this.start) {
            this.stackFSM.tick(this);
        }

    }

}
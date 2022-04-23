'use strict'
import { StackFSM, State, skillState, stunState, idleState, attackState } from './FSM.js';
import { global } from './global.js';
import { effectAndBuffContainer } from './skill.js';

class playerFleeState extends State {
    constructor() {
        super('fleeState');
    }
    action() {

        target.stackFSM.popState();
        target.start = false;
        target.enemy.start = false;
    }
}
class playerDieState extends State {
    constructor() {
        super('dieState');
    }
    action(target) {

        target.start = false;
        target.enemy.start = false;
        // keep the original array references
        //global.inventory.length = 0;
    }
}
class playerSkillState extends State {
    constructor() {
        super('dieState');
    }
    action(target) {
        target.stackFSM.popState();
    }
}

export class Player {
    constructor() {
        this.battleHistory = [];
        this.effectAndBuffContainer = new effectAndBuffContainer();

        this.stackFSM = new StackFSM();
        this.start = false;

        this.basicAttributes = global.PlayerStates;
        this.specialAttacks = {};

        this.enemy = {};

        this.idleState = new idleState();
        this.attackState = new attackState();
        this.skillState = new playerSkillState();

        this.dieState = new playerDieState();
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
    pushState(stateName, maxTick, tickLeft) {
        switch (stateName) {
            case 'idleState':
                this.idleState.maxTick = maxTick;
                this.idleState.tickLeft = tickLeft;
                this.stackFSM.pushState(this.idleState);
        }
    }
    effect(target) {
        this.effectAndBuffContainer;
    }
    tick() {
        if (this.start) {
            this.stackFSM.tick(this);
            this.effect(this);
        }
    }
}
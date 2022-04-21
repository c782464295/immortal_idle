'use strict'

import { MonsterTest } from './data/monsterData.js';
import { StackFSM } from './FSM.js';
import { deepClone } from './utility.js';

export class Enemy extends StackFSM{
    constructor(enemy) {
        super(enemy);
        
    }

    setEnemy(enemy) { 
        this.characteristic = deepClone(enemy);
        this.stack = [];
        this.pushState(this.characteristic.idleState);
    }

}
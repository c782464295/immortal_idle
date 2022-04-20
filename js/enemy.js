'use strict'

import { MonsterTest } from './data/monsterData.js';
import { StackFSM } from './FSM.js';
import { deepClone } from './utility.js';

class Enemy extends StackFSM{
    constructor(enemy) {
        super(enemy);
    }

}

let enemy = new Enemy(deepClone(MonsterTest));

export { enemy };
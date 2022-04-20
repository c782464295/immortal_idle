'use strict'
import { StackFSM } from './FSM.js';

class Player {
    constructor(enemy){
        this.stackFSM = new StackFSM(enemy);
    }
    tick() {
        this.stackFSM.tick();
    }
}
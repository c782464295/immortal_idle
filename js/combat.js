'use strict'
import { global } from './global.js';
import { Player, playerData } from './player.js';
import { Enemy } from './enemy.js';
import { MonsterDragon } from './data/monsterData.js';
import { deepClone } from './utility.js';
import { idleState } from './FSM.js';

export class Combat {
    constructor() {
        this.player = new Player();
        this.enemy = new Enemy();
    }
    tick() {
        this.enemy.tick();
        this.player.tick();
    }
    combatStart() {
        this.enemy.start = true;
        this.player.start = true;
    }
    combatEnd() {
        this.enemy.start = false;
        this.player.start = false;
    }
    clickSelected(enemy) {
        this.enemy.setSelf(MonsterDragon);
        this.enemy.enemy = this.player;
        this.player.enemy = this.enemy;

        this.enemy.setState('idle');
        this.player.setState('idle');
        this.combatStart();
    }
    clickFlee() {
        this.player.setState('flee');
    }

    serialize() {
        return {
            enemyStart: this.enemy.start,
            playerStart: this.player.start,
            enemyStack: this.enemy.stackFSM.stack,
            playerStack: this.player.stackFSM.stack,
            saveBasicAttributes : JSON.stringify(this.enemy.saveBasicAttributes),
        };


    }
    deserialize(data) {
        this.enemy.start = data.enemyStart;
        this.player.start = data.playerStart;

        for (let state of data.enemyStack) {
            this.enemy.pushState(state.name, state.maxTick, state.tickLeft);
        }
        for (let state of data.playerStack) {
            this.player.pushState(state.name, state.maxTick, state.tickLeft);
        }
        this.enemy.saveBasicAttributes = JSON.parse(data.saveBasicAttributes);
        this.enemy.basicAttributes = this.enemy.saveBasicAttributes;
        this.enemy.enemy = this.player;
        this.player.enemy = this.enemy;
        return true;
    }

}

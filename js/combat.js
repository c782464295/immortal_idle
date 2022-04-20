'use strict'
import { global } from './global.js';
import { Player, playerData } from './player.js';
import { Enemy } from './enemy.js';
import { MonsterTest } from './data/monsterData.js';
import { deepClone } from './utility.js';

export class Combat {
    constructor() {
        this.start = false;
        this.player = new Player(playerData);
        this.enemy = new Enemy(deepClone(MonsterTest));
    }
    tick() {
        if (this.start) {
            this.enemy.tick();
            this.player.tick();
        }
    }
    combatStart() {
        this.start = true;
    }
    clickSelected(enemy) {
        this.enemy.setEnemy(enemy);
        this.combatStart();
    }
    clickFlee() {
        this.player.setState('flee');
    }
}
let combat = new Combat();
export { combat };
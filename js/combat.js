'use strict'
import { global } from './global.js';
import { Player, playerData } from './player.js';
import { Enemy } from './enemy.js';
import { MonsterDefalut, MonsterTest } from './data/monsterData.js';
import { deepClone } from './utility.js';

export class Combat {
    constructor() {
        this.player = new Player(playerData);
        this.enemy = new Enemy(MonsterDefalut);
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
        this.enemy.setEnemy(MonsterTest);
        this.enemy.enemy = this.player;
        this.player.enemy = this.enemy;
        this.combatStart();
    }
    clickFlee() {
        this.player.setState('flee');
    }
}
let combat = new Combat();
export { combat };
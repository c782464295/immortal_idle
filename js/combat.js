'use strict'
import { global } from './global.js';
import { Player, playerData } from './player.js';
import { Enemy } from './enemy.js';
import { MonsterDragon } from './data/monsterData.js';
import { deepClone } from './utility.js';

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
}

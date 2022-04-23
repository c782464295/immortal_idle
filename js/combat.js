'use strict'
import { global } from './global.js';
import { Player } from './player.js';
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
            enemyId: this.enemy.id,
            enemyName: this.enemy.name,
            enemySpecialAttacks: this.enemy.specialAttacks,
            enemyLootTable: this.enemy.lootTable,

            enemyStart: this.enemy.start,
            playerStart: this.player.start,
            enemyTick: [this.enemy.idleState.maxTick, this.enemy.idleState.tickLeft],
            playerTick: [this.player.idleState.maxTick, this.player.idleState.tickLeft],
            saveBasicAttributes : JSON.stringify(this.enemy.saveBasicAttributes),
        };


    }
    deserialize(data) {
        this.enemy.id = data.enemyId;
        this.enemy.name = data.enemyName;
        this.enemy.specialAttacks  = deepClone(data.enemySpecialAttacks);
        this.enemy.lootTable = deepClone(data.enemyLootTable);

        this.enemy.start = data.enemyStart;
        this.player.start = data.playerStart;

        
        this.enemy.pushState('idleState', data.enemyTick[0], data.enemyTick[1]);
        this.player.pushState('idleState', data.playerTick[0], data.playerTick[1]);
        
        this.enemy.saveBasicAttributes = deepClone(JSON.parse(data.saveBasicAttributes));
        this.enemy.basicAttributes = deepClone(JSON.parse(data.saveBasicAttributes));
        this.enemy.enemy = this.player;
        this.player.enemy = this.enemy;
        return true;
    }

}

'use strict'
import { loc } from './locale.js';
import { TICK_INTERVAL, global, storage } from './global.js';
import { } from './indexLoc.js';
import { } from './items.js';
import { Mining } from './customelement/ore.js';
import { WoodCutting } from './customelement/woods.js';
import { Inventory } from './customelement/inventory.js';
import { deepClone } from './utility.js';
import { } from './customelement/stasticsTable.js'

import { achievementManager } from './achivement.js';
import { statistics, GameStats, getGameStatsTableData } from './statistic.js';


import { notificationQueue } from './notify.js';

import { } from './recipes.js';

class Game {
    constructor() {
        /* 单例模式 */
        if (typeof Game.instance === 'object') {
            throw new Error("You can only create one instance!");
        }
        Game.instance = this;

        this.loopTimer = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;
        this.previousTickTime = performance.now();

        this.lasttimestamp = new Date().getTime();

        this.config = {
            'version': 0.1,
            'GameName': 'Immortal Idle',
        };

        this.global = global;


        this.minning = new Mining();
        this.WoodCutting = new WoodCutting();

        this.inventory = new Inventory();

        this.achievementManager = achievementManager;
        this.statistics = statistics;


        ifvisible.on("blur", () => this.pauseGame());

        ifvisible.on("focus", () => this.resumeGame());
        // 离开页面（关闭、刷新、跳转其他页面）才会触发
        window.onbeforeunload = event => {

            if (event) {
                event.returnValue = '关闭提示';
                this.lasttimestamp = new Date().getTime();
                //this.lasttimestamp = 0;
                storage.setItem('saveData', this.serialize());
                this.inventory.close();

            }

        }





        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
    }
    init() {
        if (storage.getItem('saveData') !== null) {
            this.deserialize(storage.getItem('saveData'));
        }
        if (this.statistics.Gamestats.get(GameStats.AccountCreationDate) === 0) {
            this.statistics.Gamestats.set(GameStats.AccountCreationDate, Date.now());
        }

        console.log(this.global['Settings'].lightmode);
        this.global['Settings'].lightmode == 1 ? document.body.classList.add('light-mode') : document.body.classList.remove('light-mode');
        let oldsnap = this.snapShot();

        let offlinetimestamp = new Date().getTime();
        if ((offlinetimestamp - this.lasttimestamp) / TICK_INTERVAL < this.maxOfflineTicks) {
            this.runTicks(Math.floor((offlinetimestamp - this.lasttimestamp) / TICK_INTERVAL));
        } else {
            this.runTicks(this.maxOfflineTicks);
        }

        let newsnap = this.snapShot();
        this.CreateModal(oldsnap, newsnap);
    }

    snapShot() {
        const snapshot = {
            skill: deepClone(global.NonBattleSkill),
            items: deepClone(global.inventory),
            currency: deepClone(global.currency),
        }
        console.log(snapshot);
        return snapshot;
    }

    calDiffGeneral(oldsnap, newsnap) {
        let newObj = Object.keys(newsnap).reduce((a, k) => {
            a[k] = newsnap[k] - oldsnap[k];
            return a;
        }, {});
        return newObj;

    }
    calDiffItem(oldsnap, newsnap) {
        let newObj = Object.keys(newsnap).reduce((a, k) => {
            a[newsnap[k].id] = newsnap[k].qty - oldsnap[k].qty;
            return a;
        }, {});
        return newObj;

    }

    CreateModal(oldsnap, newsnap) {

        console.log(this.calDiffGeneral(oldsnap.skill, newsnap.skill));
        console.log(this.calDiffItem(oldsnap.items, newsnap.items));
        console.log(this.calDiffGeneral(oldsnap.currency, newsnap.currency));

    }

    pauseGame() {
        console.log('GamePause');
        this.stopMainLoop();
    }
    resumeGame() {
        console.log('GameConsume');
        this.startMainLoop();
    }
    startMainLoop() {
        console.log('start main loop');
        this.loopTimer = window.setInterval(this.loop.bind(this), TICK_INTERVAL);
        // 定时保存
        window.setInterval(this.saveGame.bind(this), 10000);
        this.loopStarted = true;
        this.render();
    }
    loop() {
        this.processTime();
        //this.render();
    }

    stopMainLoop() {
        if (this.loopStarted) {
            clearInterval(this.loopTimer);
            this.loopStarted = false;
        }
    }
    runTicks(ticksToRun) {
        //console.log(ticksToRun);
        const startTimeStamp = performance.now();
        for (let i = 0; i < ticksToRun; i++) {
            this.tick();
        }
        if (ticksToRun > 72000) {
            const processingTime = performance.now() - startTimeStamp;
            console.log(`Took ${processingTime / 1000}s to process ${ticksToRun} ticks. ${processingTime / ticksToRun}ms per tick.`);
        }
    }

    tick() {
        this.minning.tick();
        this.WoodCutting.tick();
        this.achievementManager.tick();

    }

    processTime() {
        const currentTickTime = performance.now();
        let ticksToRun = Math.floor((currentTickTime - this.previousTickTime) / TICK_INTERVAL);
        if (ticksToRun > this.maxOfflineTicks) {
            ticksToRun = this.maxOfflineTicks;
            this.previousTickTime = currentTickTime - ticksToRun * TICK_INTERVAL;
        }
        this.runTicks(ticksToRun);

        this.previousTickTime += ticksToRun * TICK_INTERVAL;
    }
    render() {
        //console.log('render');
        this.minning.render();
        this.WoodCutting.render();
        this.inventory.render();

        document.querySelector('table-of-data').render();
        notificationQueue.notify();
        requestAnimationFrame(() => this.render());
    }
    saveGame() {
        storage.setItem('saveData', this.serialize());
        console.log('GameSaved');
    }

    serialize() {
        //console.log(Object.keys(this));
        //console.log(Object.values(this));
        //console.log(Object.entries(this));
        //console.log(Object.values(this)[8].serialize());

        let res = {};
        for (let [k, v] of Object.entries(this)) {

            if (v.serialize == undefined) {

                if (typeof (v) != 'object') {
                    res[k.toString()] = v;
                }


            } else {
                res[k.toString()] = v.serialize();
            }
        }
        let saveString = JSON.stringify(res);
        let cipher = btoa(pako.gzip(saveString, { to: 'string' }));
        localStorage.setItem('saveData', cipher);
        return cipher;


    }
    printSaveString() {
        let res = {};
        for (let [k, v] of Object.entries(this)) {

            if (v.serialize == undefined) {

                if (typeof (v) != 'object') {
                    res[k.toString()] = v;
                }


            } else {
                res[k.toString()] = v.serialize();
            }
        }
        let saveString = JSON.stringify(res);
        console.log(saveString);
        return res;
    }
    deserialize(data) {
        let cipher = pako.ungzip(atob(data), { to: 'string' })
        let res = JSON.parse(cipher);
        //console.log(res);

        for (let [k, v] of Object.entries(this)) {
            console.log(k, v);
            if (v.serialize == undefined) {
                if (typeof (v) != 'object') {

                    this[k] = res[k];
                }
            } else {

                v.deserialize(res[k]);
            }
        }
        return true;
    }
    debug(isdebug) {
        isdebug ? window.game = this : window.game = null;
    }
}


var game = new Game();
export { game };

$(document).ready(function () {

    game.init();
    game.startMainLoop();

    game.debug(true);



    //game.deserialize('');
    // 明暗模式动态
    const toggleButton1 = document.querySelector('.header-profile svg');
    toggleButton1.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        global['Settings'].lightmode = !global['Settings'].lightmode;
    });

    const searchBar = document.querySelector('.search-bar input');
    console.log(searchBar);
    searchBar.addEventListener("input", function (event) {
        console.log(this.value);
        const options = {
            shouldSort: true,
            tokenize: true,
            matchAllTokens: true,
            findAllMatches: true,
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["name", "qty", "id", "type", "description"],
        };
        const fuse = new Fuse(global.inventory, options);
        let result = fuse.search(this.value);
        console.log(result);
    })



})
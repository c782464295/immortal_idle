'use strict'
import { loc } from './locale.js';
import { TICK_INTERVAL, global, storage } from './global.js';
import { } from './indexLoc.js';
import { Mining } from './customelement/ore.js';
import { Inventory } from './customelement/inventory.js';
import { achieve_list, checkAchievement } from './achivements.js';
import { deepClone } from './utility.js';
import { gpNotify } from './notify.js';
import { } from './items.js';


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
        this.achieves = achieve_list;



        ifvisible.on("blur", () => this.pauseGame());

        ifvisible.on("focus", () => this.resumeGame());
        // 离开页面（关闭、刷新、跳转其他页面）才会触发
        window.onbeforeunload = event => {

            if (event) {
                event.returnValue = '关闭提示';
                this.lasttimestamp = new Date().getTime();
                //this.lasttimestamp = 0;
                storage.setItem('saveData', this.serialize());

            }

        }

        this.minning = new Mining();

        this.inventory = new Inventory();



        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
    }
    init() {
        if (storage.getItem('saveData') !== null) {
            this.deserialize(storage.getItem('saveData'));
        }

        console.log(this.global['Settings'].lightmode);
        this.global['Settings'].lightmode == 1 ? document.body.classList.add('light-mode') : document.body.classList.remove('light-mode');
        let oldsnap = this.snapShot();

        let offlinetimestamp = new Date().getTime();
        if ((offlinetimestamp - this.lasttimestamp) / TICK_INTERVAL < this.maxOfflineTicks) {
            this.runTicks((offlinetimestamp - this.lasttimestamp) / TICK_INTERVAL);
        } else {
            this.runTicks(this.maxOfflineTicks);
        }

        let newsnap = this.snapShot();
        this.CreateModal(oldsnap, newsnap);
    }

    snapShot() {
        const snapshot = {
            level: global.Level,
            items: deepClone(global.pack.storage),
            exp: global.Exp
        }
        return snapshot;
    }

    CreateModal(oldsnap, newsnap) {
        console.log(newsnap.items[2] - oldsnap.items[2]);

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
        //checkAchievement();
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
        requestAnimationFrame(() => this.render());
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
        console.log(saveString);
        let cipher = btoa(pako.gzip(saveString, { to: 'string' }));
        localStorage.setItem('saveData', cipher);
        return cipher;


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
                console.log(res);
                v.deserialize(res[k]);
            }
        }
        return true;
    }
    debug(isdebug) {
        isdebug ? window.game = this : window.game = null;
    }
}



$(document).ready(function () {
    var game = new Game();
    game.init();
    game.startMainLoop();

    game.debug(true);
    console.log(game.serialize());
    //game.deserialize('');
    // 明暗模式动态
    const toggleButton1 = document.querySelector('.header-profile svg');
    toggleButton1.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        global['Settings'].lightmode = !global['Settings'].lightmode;
    });

})
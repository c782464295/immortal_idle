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

import { achievementManager } from './customelement/achivement.js';
import { statistics, GameStats, getGameStatsTableData } from './statistic.js';

import { notificationQueue } from './notify.js';

import { nonBattleModifiersManager } from './nonBattleModiers.js';

import { } from './recipes.js';
import { } from './customelement/textChange.js';
import { PrayMenu } from './customelement/pray.js';
import { enemy } from './enemy.js';

class Game {
    constructor() {
        /* 单例模式 */
        if (typeof Game.instance === 'object') {
            throw new Error("You can only create one instance!");
        }
        Game.instance = this;

        this.loopTimer = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 1000 / TICK_INTERVAL * 60 * 60 * 12;
        this.previousTickTime = performance.now();

        this.lasttimestamp = new Date().getTime();

        this.config = {
            'version': 0.1,
            'GameName': 'Immortal Idle',
        };

        this.global = global;


        this.minning = new Mining();
        this.WoodCutting = new WoodCutting();
        this.prayMenu = new PrayMenu();

        this.inventory = new Inventory();

        this.achievementManager = achievementManager;
        this.statistics = statistics;

        this.NonBattleModifers = nonBattleModifiersManager;

        ifvisible.on("blur", () => this.pauseGame());

        ifvisible.on("focus", () => this.resumeGame());
        // 离开页面（关闭、刷新、跳转其他页面）才会触发
        window.onbeforeunload = event => {

            if (event) {
                //event.returnValue = '关闭提示';
                if (global.Settings.saveClosing) {
                    this.lasttimestamp = new Date().getTime();
                    //this.lasttimestamp = 0;
                    storage.setItem('saveData', this.serialize());
                    this.inventory.close();
                }

            }

        }




        this.enn = enemy;
        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
    }
    init() {
        if (storage.getItem('saveData') !== null) {
            this.deserialize(storage.getItem('saveData'));
        }
        if (this.statistics.Gamestats.get(GameStats.AccountCreationDate) === 0) {
            this.statistics.Gamestats.set(GameStats.AccountCreationDate, Date.now());
        }

        
        this.global['Settings'].lightmode == 1 ? document.body.classList.add('light-mode') : document.body.classList.remove('light-mode');


        this.prayMenu.init();

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
        return snapshot;
    }

    calDiffGeneral(oldsnap, newsnap) {
        let newObj = Object.keys(newsnap).reduce((a, k) => {
            try {
                a[k] = newsnap[k] - oldsnap[k];
            } catch (e) { }
            return a;
        }, {});
        return newObj;

    }
    calDiffItem(oldsnap, newsnap) {
        let newObj = Object.keys(newsnap).reduce((a, k) => {
            try {
                a[newsnap[k].id] = newsnap[k].qty - oldsnap[k].qty;
            } catch (e) { }
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
        // new Promise((resolve, reject) => {})
    }

    tick() {
        this.minning.tick();
        this.WoodCutting.tick();
        this.achievementManager.tick();

        this.enn.tick();
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

        this.achievementManager.render();

        document.querySelector('table-of-data').render();
        notificationQueue.notify();
        requestAnimationFrame(() => this.render());
    }
    saveGame() {
        storage.setItem('saveData', this.serialize());
        console.log('GameSaved');
    }

    openExportSave() {
        Swal.fire({
            title: 'nice',
            html: `
            <h5 class="font-w400 text-combat-smoke font-size-sm mb-1"</h5>
                    <h5 class="font-w600 text-danger font-size-sm"></h5>
                        <div class="form-group">
                            <textarea class="form-control" id="export-save-character-selection" name="export-save-character-selection" rows="8" onclick="navigator.clipboard.writeText(window.localStorage.getItem('saveData'));">${window.localStorage.getItem('saveData')}</textarea>
                        </div>
                    `,
            showCancelButton: false,
        });
    }

    openImportSave() {
        Swal.fire({
            title: '导入',
            html: `<h5 class="font-w400 text-combat-smoke font-size-sm"></h5>
                        <div class="form-group">
                            <textarea class="form-control" id="import-save-character-selection" name="import-save-character-selection" rows="8" placeholder="1" onclick="this.select();"></textarea>
                        </div>`,
            showCancelButton: true,
            confirmButtonText: 'yes',
        }).then((result) => {
            if (result.value) {
                let save = $("#import-save-character-selection").val();
                this.stopMainLoop();
                this.deserialize(save);
                this.saveGame();
                location.reload();
            }
        });
    }
    downloadTextFile(fileName, fileText, fileType = 'text/plain') {
        const file = new Blob([fileText], {
            type: fileType
        });
        const link = document.createElement('a');
        const url = URL.createObjectURL(file);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        setTimeout(function () {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    resetGame() {
        global.Settings.saveClosing = false;
        storage.removeItem('saveData');
        location.reload();
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
            //console.log(k, v);
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
    var guiPresets = {
        "preset": "Default",
        "remembered": {
            "Default": {
                "0": {
                    "fworkSpeed": 2,
                    "fworkAccel": 4,
                    "showShockwave": false,
                    "showTarget": true,
                    "partCount": 30,
                    "partSpeed": 5,
                    "partSpeedVariance": 10,
                    "partWind": 50,
                    "partFriction": 5,
                    "partGravity": 1,
                    "flickerDensity": 20,
                    "hueMin": 150,
                    "hueMax": 200,
                    "hueVariance": 30,
                    "lineWidth": 1,
                    "clearAlpha": 25
                }
            },
            "Anti Gravity": {
                "0": {
                    "fworkSpeed": 4,
                    "fworkAccel": 10,
                    "showShockwave": true,
                    "showTarget": false,
                    "partCount": 150,
                    "partSpeed": 5,
                    "partSpeedVariance": 10,
                    "partWind": 10,
                    "partFriction": 10,
                    "partGravity": -10,
                    "flickerDensity": 30,
                    "hueMin": 0,
                    "hueMax": 360,
                    "hueVariance": 30,
                    "lineWidth": 1,
                    "clearAlpha": 50
                }
            },
            "Battle Field": {
                "0": {
                    "fworkSpeed": 10,
                    "fworkAccel": 20,
                    "showShockwave": true,
                    "showTarget": true,
                    "partCount": 200,
                    "partSpeed": 30,
                    "partSpeedVariance": 5,
                    "partWind": 0,
                    "partFriction": 5,
                    "partGravity": 0,
                    "flickerDensity": 0,
                    "hueMin": 20,
                    "hueMax": 30,
                    "hueVariance": 10,
                    "lineWidth": 1,
                    "clearAlpha": 40
                }
            },
            "Mega Blast": {
                "0": {
                    "fworkSpeed": 3,
                    "fworkAccel": 3,
                    "showShockwave": true,
                    "showTarget": true,
                    "partCount": 500,
                    "partSpeed": 50,
                    "partSpeedVariance": 5,
                    "partWind": 0,
                    "partFriction": 0,
                    "partGravity": 0,
                    "flickerDensity": 0,
                    "hueMin": 0,
                    "hueMax": 360,
                    "hueVariance": 30,
                    "lineWidth": 20,
                    "clearAlpha": 20
                }
            },
            "Nimble": {
                "0": {
                    "fworkSpeed": 10,
                    "fworkAccel": 50,
                    "showShockwave": false,
                    "showTarget": false,
                    "partCount": 120,
                    "partSpeed": 10,
                    "partSpeedVariance": 10,
                    "partWind": 100,
                    "partFriction": 50,
                    "partGravity": 0,
                    "flickerDensity": 20,
                    "hueMin": 0,
                    "hueMax": 360,
                    "hueVariance": 30,
                    "lineWidth": 1,
                    "clearAlpha": 80
                }
            },
            "Slow Launch": {
                "0": {
                    "fworkSpeed": 2,
                    "fworkAccel": 2,
                    "showShockwave": false,
                    "showTarget": false,
                    "partCount": 200,
                    "partSpeed": 10,
                    "partSpeedVariance": 0,
                    "partWind": 100,
                    "partFriction": 0,
                    "partGravity": 2,
                    "flickerDensity": 50,
                    "hueMin": 0,
                    "hueMax": 360,
                    "hueVariance": 20,
                    "lineWidth": 4,
                    "clearAlpha": 10
                }
            },
            "Perma Trail": {
                "0": {
                    "fworkSpeed": 4,
                    "fworkAccel": 10,
                    "showShockwave": false,
                    "showTarget": false,
                    "partCount": 150,
                    "partSpeed": 10,
                    "partSpeedVariance": 10,
                    "partWind": 100,
                    "partFriction": 3,
                    "partGravity": 0,
                    "flickerDensity": 0,
                    "hueMin": 0,
                    "hueMax": 360,
                    "hueVariance": 20,
                    "lineWidth": 1,
                    "clearAlpha": 0
                }
            }
        },
        "closed": true,
        "folders": {
            "Fireworks": {
                "preset": "Default",
                "closed": false,
                "folders": {}
            },
            "Particles": {
                "preset": "Default",
                "closed": true,
                "folders": {}
            },
            "Color": {
                "preset": "Default",
                "closed": true,
                "folders": {}
            },
            "Other": {
                "preset": "Default",
                "closed": true,
                "folders": {}
            }
        }
    };

    var gui = new dat.GUI({
        autoPlace: false,
        load: guiPresets,
        preset: 'Default'
    });
    var customContainer = document.getElementById('gui');
    customContainer.appendChild(gui.domElement);

    var fworks = {
        partCount: parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--bg-blur').replace('px', '')), partSpeed: 0,

    };
    var guiParticles = gui.addFolder('Particles');
    guiParticles.add(fworks, 'partCount').min(0).max(10).step(1).onChange(
        function () {
            document.documentElement.style
                .setProperty('--bg-blur', `${this.getValue()}px`);
        }
    );
    guiParticles.add(fworks, 'partSpeed').min(1).max(100).step(1);



    gui.remember(fworks);

})

/* 

*/
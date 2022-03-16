'use strict'
import {GatheringSkill} from './Skills.js';
import {TICK_INTERVAL} from './constant.js';
import {IdelState} from './state.js';
import { WoodCuting } from './woodcutting.js';


class Game{
    constructor(){
        /* 单例模式 */
        if (typeof Game.instance === 'object') {
            throw new Error("You can only create one instance!");
        }
        Game.instance = this;

        this.loopTimer = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;
        this.previousTickTime = performance.now();

        this.config = {
            'version': 0.1,
            'GameName': 'Immortal Idle',
        };

        this.playerState = new IdelState(this);

        this.wood = new WoodCuting(this);


        this.ga = new GatheringSkill(this,'a');
        this.gb = new GatheringSkill(this,'b', this.ga);
        this.gc = new GatheringSkill(this,'c', this.gb);

        ifvisible.on("blur", ()=>this.pauseGame());
        
        ifvisible.on("focus", ()=>this.resumeGame());
        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
    }
    changeState(state){
        this.playerState = state;
    }

    pauseGame(){
        console.log('GamePause');
        this.stopMainLoop();
    }
    resumeGame(){
        console.log('GameConsume');
        this.startMainLoop();
    }
    startMainLoop(){
        console.log('start main loop');
        this.loopTimer = window.setInterval(this.loop.bind(this), TICK_INTERVAL);
        this.loopStarted = true;

    }
    loop(){
        this.processTime();
        this.render();
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

    tick(){
        this.gc.exec();
    }
    processTime(){
        const currentTickTime = performance.now();
        let ticksToRun = Math.floor((currentTickTime - this.previousTickTime) / TICK_INTERVAL);
        if (ticksToRun > this.maxOfflineTicks) {
            ticksToRun = this.maxOfflineTicks;
            this.previousTickTime = currentTickTime - ticksToRun * TICK_INTERVAL;
        }
        this.runTicks(ticksToRun);
        
        this.previousTickTime += ticksToRun * TICK_INTERVAL;
    }
    render(){
        this.wood.render();
    }

    serialize(){
        //console.log(Object.keys(this));
        //console.log(Object.values(this));
        //console.log(Object.entries(this));
        //console.log(Object.values(this)[8].serialize());
        
        let res = {};
        for (let [k,v] of Object.entries(this)) {
            
            if(v.serialize == undefined){
                
                if(typeof(v) != 'object'){ 
                    res[k.toString()] = v;
                }

                
            }else{
                res[k.toString()] = v.serialize();
            }
        }
        let saveString = JSON.stringify(res);
        console.log(saveString);
        let cipher = btoa(pako.gzip(saveString, { to: 'string' }));
        localStorage.setItem('saveData', cipher);
        return cipher;
        

    }
    deserialize(data){
        let cipher = pako.ungzip(atob(data), { to: 'string' })
        let res = JSON.parse(cipher);
        //console.log(res);

        for (let [k,v] of Object.entries(this)) {
            if(v.serialize == undefined){
                if(typeof(v) != 'object'){

                    this[k] = res[k];
                }
            }else{
                v.deserialize(res[k]);
            }
        }
        return true;
    }
}
var game = new Game();
game.startMainLoop();
game.playerState.End();

console.log(game.playerState);
console.log(game.serialize());
game.deserialize('H4sIAAAAAAAAA6tWysnPLwjJzE0tUrIy0gHzgksSi0pSU5SsSopKU3WUchMr/NPScjLzUkMyk7OLlawszEwMDAx0lAqKUssy80uLQcIgE4AyFnoGlmBgZmJkbG5kqKOUnqhkFa1rqANEBrFAbhIqNxmJWwsA6QHtGY0AAAA=')
console.log(game.serialize());
export {game};

//H4sIAAAAAAAAA6tWysnPLwjJzE0tUrIy0gHzgksSi0pSU5SsSopKU3WUchMr/NPScjLzUkMyk7OLlawszEwMDAx0lAqKUssy80uLQcIgE4AyFnoGlmBgZmJkbG5kqKOUnqhkFa1rqANEBrFAbhIqNxmJWwsA6QHtGY0AAAA=
//"previousTickTime" 88
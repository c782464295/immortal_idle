'use strict'

import { global } from './global.js';
import { TICK_INTERVAL, global } from './global.js';
// skill composed of many buff
class effectTimer {
    /**
     * 
     * @param {number} totalTime 
     * @param {number} frequency 
     * @param {Function} action
     * @param {Function} uncast
     */
    constructor(totalTime, frequency, action, uncast) {
        const ticks = Math.floor(totalTime / TICK_INTERVAL);
        this.action = action;
        this.uncast = uncast;

        if (ticks < 1)
            throw new Error(`some error has occur`);

        this._frequency = frequency;
        this._frequencyLeft = frequency;

        this._ticksLeft = ticks;
        this._maxTicks = ticks;
    }
    tick() {
        if (this._frequencyLeft) {
            this._ticksLeft--;
            if (this._ticksLeft === 0) {
                if (this._frequencyLeft) {
                    this._ticksLeft = this._maxTicks;
                    this._frequencyLeft--;
                    this.action();
                }else {
                    this.uncast();
                }
            }
        }
    }
    serialize() {
        const sData = [];
        sData.push(this._ticksLeft, this._maxTicks, this._frequencyLeft);
        return sData;
    }
    deserialize(sData, version) {
        this._ticksLeft = sData[0];
        this._maxTicks = sData[1];
        this.active = sData[2];
    }
}


class Effect {
    constructor(effectName) {
        this.effectName = effectName;
    }
    cast(target) {
        throw new Error('this medthod must be override');
    }
    uncast() {
        throw new Error('this medthod must be override');
    }
    action() {

    }
}

class effectContainer {
    constructor() {
        this.effectsList = [];
    }
    push(effect) {
        this.effectsList.push(effect);
    }
}



// every skill to enemy or self is composed of buffs
class Skill extends effectContainer {
    constructor() {
        super();
    }
    spellTo(target) {
        for (let effect of this.effectsList) {
            effect.cast(target);
        }
    }
    tick() {
        for (let effect of this.effectsList) {
            effect.tick();
        }
    }
}


class poisonEffect extends Effect {
    constructor(){
        super('poison');
        this.effectTimer = new effectTimer(200, 5, this.action.bind(this), undefined);
        this.hp = 200;
    }
    action() {
        console.log('tike me');
        this.hp -= 10;
        console.log(this.hp);
    }
    tick() {
        this.effectTimer.tick();
    }
}
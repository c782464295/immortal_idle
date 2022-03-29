"use strict";
import {TICK_INTERVAL,global} from './global.js';
class Timer {
    constructor(type, action) {
        this.type = type;
        this.action = action;
        this._ticksLeft = -1;
        this._maxTicks = -1;
        this.active = false;
    }
    tick() {
        if (this.active) {
            this._ticksLeft--;
            if (this._ticksLeft === 0) {
                this.active = false;
                this.action();
            }
        }
    }
    start(time) {
        const ticks = Math.floor(time / TICK_INTERVAL);
        if (ticks < 1)
            throw new Error(`Tried to start timer: ${this.type} with invalid tick amount: ${ticks}`);
        this.active = true;
        this._maxTicks = ticks;
        this._ticksLeft = ticks;
    }
    stop() {
        this.active = false;
    }
    get isActive() {
        return this.active;
    }
    get maxTicks() {
        return this._maxTicks;
    }
    get ticksLeft() {
        return this._ticksLeft;
    }
    serialize() {
        const sData = [];
        sData.push(this._ticksLeft, this._maxTicks, this.active ? 1 : 0);
        return sData;
    }
    deserialize(sData, version) {
        this._ticksLeft = sData[0];
        this._maxTicks = sData[1];
        this.active = sData[2] === 1;
    }
}
export {Timer};
'use strict'
import {TICK_INTERVAL} from './constant.js';
class TickTimer {
	#ticksLeft;
    #maxTicks;
    constructor(type, active = false) {
        this.type = type;
		this.active = active;
		

		this.#ticksLeft = -1;
        this.#maxTicks = -1;
    }
    tick() {
        if (this.active) {
            this.#ticksLeft--;
            if (this.#ticksLeft === 0) {
                this.active = false;
                this.action();
            }
        }
    }
	action(){
		throw new Error("This method must be overided!");
	}
	
    start(time_) {
        const ticks = Math.floor(time_ / TICK_INTERVAL);
        if (ticks < 1)
            throw new Error(`Tried to start timer: ${this.type} with invalid tick amount: ${ticks}`);
        this.active = true;
        this.#maxTicks = ticks;
        this.#ticksLeft = ticks;
        
    }
    stop() {
        this.active = false;
    }
    get isActive() {
        return this.active;
    }

    get ticksLeft(){
        return this.#ticksLeft;
    }

    get maxTicks(){
        return this.#maxTicks;
    }
    serialize() {
        const sData = [];
        sData.push(this.#ticksLeft, this.#maxTicks, this.active ? 1 : 0);
        return sData;
    }
    deserialize(sData, version) {
        this.#ticksLeft = sData[0];
        this.#maxTicks = sData[1];
        this.active = sData[2] === 1;
    }
}

export default TickTimer;
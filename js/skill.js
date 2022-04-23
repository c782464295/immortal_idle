'use strict'
import { idleState } from './FSM.js';
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
    constructor(totalTime, frequency, cast, uncast) {
        const ticks = Math.floor(totalTime / TICK_INTERVAL);
        this.cast = cast;
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
                    this.cast();
                } else {
                    this.uncast();
                }
            }
        }
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

export class effectAndBuffContainer {
    constructor() {
        this.containerList = [];
    }
    push(skillOrbuff) {
        this.containerList.push(skillOrbuff);
    }
    pop() {
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


class burnEffect extends Effect {
    constructor() {
        super('poison');
        this.effectTimer = new effectTimer(200, 5, this.action.bind(this), undefined);
    }
    action(target) {
        target.basicAttributes.HP 
    }
    tick() {
        this.effectTimer.tick();
    }
}

export const SkillsEnmu = {
    DoubleAttack: 0,
    AttackUP: 1,
    Burn: 2,
    BeingSheep: 3,

    get: function (value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}
export const skill = [
    { id: SkillsEnmu.DoubleAttack, concrete: burnEffect },
    { id: SkillsEnmu.AttackUP, concrete: burnEffect },
    { id: SkillsEnmu.Burn, concrete: burnEffect },
    { id: SkillsEnmu.BeingSheep, concrete: burnEffect },
]
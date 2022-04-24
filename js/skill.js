'use strict'
import { idleState } from './FSM.js';
import { TICK_INTERVAL, global } from './global.js';

// skill composed of many buff
class effectTimer {
    /**
     * 
     * @param {number} time 
     * @param {number} frequency 
     * @param {Function} action
     * @param {Function} uncast
     */
    constructor(time, frequency, cast, uncast, action) {
        const ticks = Math.floor(time / TICK_INTERVAL);
        this.cast = cast;
        this.uncast = uncast;
        this.action = action;
        if (ticks < 1)
            throw new Error(`some error has occur`);

        this._frequency = frequency;
        this._frequencyLeft = frequency;

        this._ticksLeft = ticks;
        this._maxTicks = ticks;
    }
    tick(target) {
        if (this._frequencyLeft) {
            this._ticksLeft--;
            if (this._ticksLeft === 0) {
                if (this._frequencyLeft) {
                    this._ticksLeft = this._maxTicks;
                    this._frequencyLeft--;
                    this.action(target);
                    if (this._frequencyLeft === 0) {
                        this.uncast(target);
                    }

                }
            }
        }
    }
}


class Effect {
    constructor(effectName, time, frequency = 1) {
        this.effectName = effectName;
        this.effectTimer = new effectTimer(time, frequency, this.cast.bind(this), this.uncast.bind(this), this.action.bind(this));
    }
    cast(target) {
        throw new Error('this medthod must be override');
    }
    uncast(target) {
        throw new Error('this medthod must be override');
    }
    action(target) {
        throw new Error('this medthod must be override');
    }
    tick(target) {
        this.effectTimer.tick(target);
    }
}

export class effectContainer {
    constructor() {
        this.effectsList = [];
    }
    push(effect) {
        this.effectsList.push(effect);
    }
    tick(target) {
        this.effectsList.forEach((effect) => {
            effect.tick(target);
        });
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
const TARGET = {
    ENEMY: 0,
    SELF: 1
}

class burnEffect extends Effect {
    constructor() {
        super('burnEffect', 100, 5);
        this.targetObj = TARGET.ENEMY;

    }
    cast(target) {
        target.enemy.effectContainer.push(this);

    }
    uncast(target) {
        target.effectContainer.effectsList.splice(target.effectContainer.effectsList.indexOf(this), 1);

    }
    action(target) {
        target.battleHistory.push(this.effectName + ' caused ' + target.name + ' HP -10');

        target.basicAttributes.HP -= 10;
    }
}

class doubleAttack extends Effect {
    constructor() {
        super('doubleAttack');
        this.targetObj = TARGET.SELF;
    }
    cast(target) {

    }
    action(target) {
        target.basicAttributes.HP;
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
    { id: SkillsEnmu.DoubleAttack, concrete: doubleAttack },
    { id: SkillsEnmu.AttackUP, concrete: burnEffect },
    { id: SkillsEnmu.Burn, concrete: burnEffect },
    { id: SkillsEnmu.BeingSheep, concrete: burnEffect },
]
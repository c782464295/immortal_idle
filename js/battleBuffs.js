'use strict'
const BattleBuffs = [
    {
        id: 0,
        name: 'shanbi',
        defaultRate: 0
    },
    {
        id: 1,
        name: 'BirdNestDropRate',
        defaultRate: 3
    },
    {
        id: 2,
        name: 'DoubleHarvestRate',
        defaultRate: 5
    },
    {
        id: 3,
        name: 'DoubleHarvestRate',
        defaultRate: 5
    }
]

class BaseBuff {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        this.id = id;
        this.name = name;
        this.baseValue = baseValue;
        this.baseMultiplier = baseMultiplier;
    }
}

class Buff extends BaseBuff {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        super(id, name, baseValue, baseMultiplier);

        this._baseValue = baseValue;
        this._baseMultiplier = baseMultiplier;

        this._finalValue = baseValue;

        this.buffs = [];
    }
    addModifier(buff) {
        this.buffs.push(buff);
    }


    removeModifier(buff) {
        if (this.buffs.indexOf(buff) >= 0) {
            this.buffs.splice(this.buffs.indexOf(buff), 1);
        }
    }

    applyModifiers() {
        // Adding value from final
        let _finalBonusValue = 0;
        let _finalBonusMultiplier = 0;


        this.buffs.forEach(function (modifier) {
            _finalBonusValue += modifier.baseValue;
            _finalBonusMultiplier += modifier.baseMultiplier;
        })

        this._finalValue += _finalBonusValue;
        this._finalValue *= (1 + _finalBonusMultiplier);
    }
    /**
     * calculateValue.
     * @override
     */
    calculateValue() {
        this._finalValue = this._baseValue;


        this.applyModifiers();

        return this._finalValue;
    }
    get finalValue() {
        return this.calculateValue();
    }
}
class BuffTimer {
    constructor(type, action, time) {
        this.type = type;
        this.action = action;
        this._ticksLeft = -1;
        this._maxTicks = -1;
        this.active = false;
		
		this.p = undefined;
		const ticks = Math.floor(time / 50);
		this.active = true;
        this._maxTicks = ticks;
        this._ticksLeft = ticks;
		
		
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
    start(p) {
        
        console.log(this);
		this.p = p;
    }

}

class DependantBuff extends Buff {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        super(id, name, baseValue, baseMultiplier);
        this.otherAttributes = [];
    }
    /**
     * calculateValue.
     * @override
     */
    calculateValue() {
        throw "This method must be override!";
    }
}
class LoseHPBuff extends DependantBuff {
	constructor(id, name, baseValue, baseMultiplier = 0) {
		super(id, name, baseValue, baseMultiplier = 0);

        this.timeBuff = new Buff(0, 'LoseHPBuff', -100);

		this.timer = new BuffTimer('a',this.destroy.bind(this), 200);
	}
	destroy(){
		this.timeBuff = new Buff(-1, '', 0);
		
	}
	calculateValue() {
        this.timer.tick();

        this._finalValue = this._baseValue;
        
        this._finalValue += this.timeBuff.finalValue;
        

        this.applyModifiers();

        return this._finalValue;
    }
}

class AttackSpeed extends DependantBuff {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        super(id, name, baseValue, baseMultiplier);
        this.otherAttributes.push(new Buff(0, 'agile', 100));
    }

    findModifierByName(name) {
        return this.otherAttributes.filter(m => m.name == name)[0];
    }

    calculateValue() {
        this._finalValue = this._baseValue;

        let tmp = this.findModifierByName('agile');

        this._finalValue += tmp.calculateValue()/5;

        this.applyModifiers();

        return this._finalValue;
    }
}

let att = new AttackSpeed(1, 'att', 4);
console.log(att.finalValue);


let tbb = new LoseHPBuff(1, 'LoseHPBuff', 0);
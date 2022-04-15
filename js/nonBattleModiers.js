'use strict'

const nonBattleModifierData = [
    {
        id: 0,
        name: 'CuttingDoubleRate',
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

class BaseModifier {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        this.id = id;
        this.name = name;
        this.baseValue = baseValue;
        this.baseMultiplier = baseMultiplier;
    }
}

class Modifier extends BaseModifier {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        super(id, name, baseValue, baseMultiplier);

        this._baseValue = baseValue;
        this._baseMultiplier = baseMultiplier;

        this._finalValue = baseValue;

        this.modifiers = [];
    }
    addModifier(modifier) {
        this.modifiers.push(modifier);
    }


    removeModifier(modifier) {
        if (this.modifiers.indexOf(modifier) >= 0) {
            this.modifiers.splice(this.modifiers.indexOf(modifier), 1);
        }
    }

    applyModifiers() {
        // Adding value from final
        let _finalBonusValue = 0;
        let _finalBonusMultiplier = 0;


        this.modifiers.forEach(function (modifier) {
            _finalBonusValue += modifier.baseValue;
            _finalBonusMultiplier += modifier.baseMultiplier;
        })

        this._finalValue += _finalBonusValue;
        this._finalValue *= (1 + _finalBonusMultiplier);
    }
    calculateValue() {
        this._finalValue = this._baseValue;


        this.applyModifiers();

        return this._finalValue;
    }
    get finalValue() {
        return this.calculateValue();
    }
}


class NonBattleModifiersManager {
    constructor() {
        this.modifier = [];
        nonBattleModifierData.forEach(function (modifier) {
            this.modifier.push(new Modifier(modifier.id, modifier.name, modifier.defaultRate));
        }, this)
    }
    findModifierByName(name) {
        return this.modifier.filter(m => m.name == name)[0];
    }
    addModifier(name, modifier) {
        this.findModifierByName(name).addModifier(modifier);
    }
    removeModifier(name,modifier) {
        return this.findModifierByName(name).removeModifier(modifier);
    }
    getFinalValue(name) {
        return this.findModifierByName(name).finalValue;
    }
}


let nonBattleModifiersManager = new NonBattleModifiersManager();

let test = new BaseModifier(2,'a',50);
nonBattleModifiersManager.addModifier("CuttingDoubleRate",test);

//onBattleModifiersManager.removeModifier("CuttingDoubleRate",test);
export { nonBattleModifiersManager };
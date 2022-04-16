'use strict'
import { prayData } from './data/prayData.js';

class BaseModifier {
    constructor(id, name, baseValue, baseMultiplier = 0) {
        this.id = id;
        this.name = name;
        this.baseValue = baseValue;
        this.baseMultiplier = baseMultiplier;
    }
}

export class Modifier extends BaseModifier {
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

    }

    init(prayData) {
        prayData.forEach((ele) => {
            this.modifier.push(new Modifier(ele.id, ele.name, ele.baseValue, ele.baseMultiplier));
        }, this);

    }
    findModifierByName(name) {
        return this.modifier.filter(m => m.name == name)[0];
    }
    addModifier(name, modifier) {
        this.findModifierByName(name).addModifier(modifier);
    }
    removeModifier(name, modifier) {
        return this.findModifierByName(name).removeModifier(modifier);
    }
    getFinalValue(name) {
        return this.findModifierByName(name).finalValue;
    }

    serialize() {
        let saveObj = { id: 0 };
        this.modifier.forEach((m) => {
            let index = 0
            m.modifiers.forEach((mm) =>{
                saveObj[index] = {baseValue : mm.baseValue,baseMultiplier:mm.baseMultiplier};
                index++;
            }, this);
            
            
        })

        return JSON.stringify(saveObj);
    }
    deserialize(data) {
        return true;
    }

}


let nonBattleModifiersManager = new NonBattleModifiersManager();
nonBattleModifiersManager.init(prayData);

//onBattleModifiersManager.removeModifier("CuttingDoubleRate",test);
export { nonBattleModifiersManager };
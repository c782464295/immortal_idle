'use strict'
import { modifierData } from './data/modifier.js';

export class BaseModifier {
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
    findModifierById(id) {
        return this.modifiers.find(m => m.id == id);
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
        this.modifierList = [];

    }

    init(prayData) {
        prayData.forEach((ele) => {
            this.modifierList.push(new Modifier(ele.id, ele.name, ele.baseValue, ele.baseMultiplier));
        }, this);

    }
    findModifierById(id) {
        return this.modifierList.find(m => m.id == id);
    }
    addModifier(id, modifier) {
        this.findModifierById(id).addModifier(modifier);
    }
    removeModifier(id, modifier) {
        return this.findModifierById(id).removeModifier(modifier);
    }
    getFinalValue(id) {
        return this.findModifierById(id).finalValue;
    }

    serialize() {
        let saveObj = {};
        let i = 0;
        this.modifierList.forEach((m) => {

            saveObj[i] = [];
            m.modifiers.forEach((mm) => {
                saveObj[i].push({ id:mm.id, baseValue: mm.baseValue, baseMultiplier: mm.baseMultiplier });
            }, this);
            i++;

        })

        return JSON.stringify(saveObj);
    }
    deserialize(sData, version) {
        let parseData = JSON.parse(sData);
        Object.keys(parseData).forEach((e) => {
            if(parseData[e].length != 0) {
                
                for(let item in parseData[e]){
                    console.log(parseData[e][item]);
                    this.addModifier(e, new BaseModifier(parseData[e][item].id,'',parseData[e][item].baseValue,parseData[e][item].baseMultiplier));
                }
            }
        }, this)
        return true;
    }

}


let nonBattleModifiersManager = new NonBattleModifiersManager();
nonBattleModifiersManager.init(modifierData);


export { nonBattleModifiersManager };
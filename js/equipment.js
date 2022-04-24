'use strict'
import { global } from './global.js';
import { BaseModifier, Modifier } from './nonBattleModiers.js';
class EquipmentSys {
    constructor() {
        this.equipment = global.Equipment;
        this.attackModifier = new Modifier(0, 'attackModifier', 0, 0);
        this.defenseModifier = new Modifier(1, 'defenseModifier', 0, 0);
        this.attackModifier = new Modifier(2, 'attackModifier', 0, 0);
        this.attackModifier = new Modifier(3, 'attackModifier', 0, 0);

    }
    equip(equipID) {

    }
    unquip(equipID) {
        if (isEquiped) {

        }
    }
    isEquiped(equipID) {
        return true;
    }
    get attack() {

    }
    get defense() {

    }
    get evade() {

    }
    get accuracy() {

    }
    get HP() {

    }
    get MP() {

    }
}

let equipment = new EquipmentSys();

export { equipment };
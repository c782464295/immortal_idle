'use strict'
import { global } from './global.js';
import { BaseModifier, Modifier } from './nonBattleModiers.js';
import { items } from './items.js';
class EquipmentSys {
    constructor() {
        this.equipment = global.Equipment;
        this.attackModifier = new Modifier(0, 'attackModifier', 0, 0);
        this.defenseModifier = new Modifier(1, 'defenseModifier', 0, 0);
        this.attackModifier = new Modifier(2, 'attackModifier', 0, 0);
        this.attackModifier = new Modifier(3, 'attackModifier', 0, 0);

    }
    equip(equipID) {
        items.find(equipID);
        global.Equipment.amulet.equipmentID = equipID;
    }
    unquip(equipID) {
        if (isEquiped(equipID)) {
            global.inventoryAddItem(equipID, 1);
        }
    }
    isEquiped(equipID) {

        return true;
    }
    get attack() {
        return this.attackModifier.finalValue();
    }
    get defense() {
        return this.defenseModifier.finalValue();
    }
    get evade() {
        return this.attackModifier.finalValue();
    }
    get accuracy() {
        return this.attackModifier.finalValue();
    }
    get HP() {
        return this.attackModifier.finalValue();
    }
    get MP() {
        return this.attackModifier.finalValue();
    }
}

let equipment = new EquipmentSys();

export { equipment };
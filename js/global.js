'use strict'
/* https://jsonvisio.com/editor
   Json visualization
   https://svgsilh.com/
   svg
*/
import { exp } from './exp.js';
export const TICK_INTERVAL = 50;
export var save = window.localStorage;
export var global = {
    inventory: [],//{ id: 15, locked: false, qty: 1, tab: 0, sellsFor: 80 },
    getMaxSpace() {
        return 2;
    },
    isFull() {
        return this.inventory.filter(item => item.qty != 0).length >= this.getMaxSpace() ? true : false;
    },
    options: {
        disableFlyoutLabels: false
    },
    Settings: {
        locale: 'zh-CN',
        lightmode: 1,
        saveClosing: true,
    },
    currency: {
        money: 0,
        taskMoney: 0
    },
    itemsAlreadyFound: [],
    currentAction: '',
    NonBattleSkill: new Proxy({
        miningExp: 0,
        woodcuttingExp: 0,
        fishingExp: 0,
        plantExp: 0,
        alchemyExp: 0,
        craftingExp: 0,
        prayExp: 0,

        miningLevel: 1,
        woodcuttingLevel: 1,
        fishingLevel: 1,
        plantLevel: 1,
        alchemyLevel: 1,
        craftingLevel: 1,
        prayLevel: 1
    }, {
        set: function (target, attr, value) {
            if (attr.indexOf('Exp') != -1) {

                target[attr.replace('Exp', 'Level')] = exp.xp_to_level(value);
                target[attr] = value;
            } else {
                target[attr] = value;
            }
            return true;

        }
    }),
    PlayerStates: {
        HP: 300,
        MP: 140,
        XP: 0,
        Attack:100,
        attackSpeed:10
    },
    Equipment: {
        leftHand: { name: 'left-hand', equipmentID: 0 },
        rightHand: { name: 'right-hand', equipmentID: 1 },
        leftRing: { name: 'right-ring', equipmentID: 2 },
        rightRing: { name: 'right-ring', equipmentID: 2 },

        helmet: { name: 'helmat', equipmentID: 2 },
        foot: { name: 'foot', equipmentID: 2 },

        amulet: { name: 'amulet', equipmentID: 2, unlocked: false},

        necklace : { name: 'necklace ', equipmentID: 2 },

        plateBody: { name: 'right-hand', equipmentID: 2 },
        plateLegs: { name: 'right-hand', equipmentID: 2 },

        medicine: [{ name: 'medicine', equipmentID: 2 },{ name: 'medicine', equipmentID: 2 },{ name: 'medicine', equipmentID: 2 }]
    },
    serialize() {
        return this;
    },
    deserialize(data) {
        for (let k in data) {

            if(k == 'PlayerStates' || k == 'NonBattleSkill') {
                Object.keys(this[k]).forEach((key)=>{

                    this[k][key] = data[k][key];
                });
                continue
            }
            
            this[k] = data[k];
        }
    },
};











export var itemNotifyToProcess = [];
export const storage = window.localStorage;

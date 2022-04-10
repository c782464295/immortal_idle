'use strict'
import { exp } from './exp.js';
export const TICK_INTERVAL = 50;
export var save = window.localStorage;
export var global = {
    inventory: [],//{ id: 15, locked: false, qty: 1, tab: 0, sellsFor: 80 },
    options: {
        disableFlyoutLabels: false
    },
    Settings: {
        locale: 'zh-CN',
        lightmode: 1,
    },
    currentAction:'',
    NonBattleSkill : new Proxy({
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
    },{
        set : function(target, attr, value){
            console.log(target,attr,value);
            if(attr.indexOf('Exp')!=-1){
               
                target[attr.replace('Exp','Level')] = exp.xp_to_level(value);
                target[attr]=value;
            }else{
                target[attr]=value;
            }
            return true;
            
        }
    }),
    
    serialize() {
        return JSON.stringify(this);
    },
    deserialize(data) {
        console.log(JSON.parse(data));
        for (let k in JSON.parse(data)) {
            if(k == 'NonBattleSkill'){
                this[k] = new Proxy(JSON.parse(data)[k],{
                    set : function(target, attr, value){
                        
                        if(attr.indexOf('Exp')!=-1){
                           
                            target[attr.replace('Exp','Level')] = exp.xp_to_level(value);
                            target[attr]=value;
                        }else{
                            target[attr]=value;
                        }
                        return true;
                        
                    }
                });
                continue;
            }
            this[k] = JSON.parse(data)[k];
        }
    },
};

global['pack'] = {
    baseBOFmax: 5,
    baseStomax: 10,
    storage: {},
    BagOfHolding: {},
    bank: []
};




global['PlayerStates'] = {
    HP: 300,
    magic: 140,
    XP: 0,
};



global['items'] = {
    itemsAlreadyFound: []
}



export var itemNotifyToProcess = [];
export const storage = window.localStorage;
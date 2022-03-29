export const TICK_INTERVAL = 50;
export var save = window.localStorage;
export var global = {
    serialize(){
        return JSON.stringify(this);
    },
    inventory(){}
};
global['pack'] = {
    storage:{},
    BagOfHolding:{}
};

global['Settings'] = {
    locale:'zh-CN',
};

global['Level'] = {
    mining:1,
    woodcutting:1,
    fishing:1,
    plant:1,
    alchemy:1,
    crafting:1,
    pray:1
};

global['Exp'] = {
    miningExp:0,
    woodcuttingExp:0,
    fishingExp:0,
    plantExp:0,
    alchemyExp:0,
    craftingExp:0,
    prayExp:0,
};

global['PlayerStates'] = {
    HP:300,
    magic:140,
    XP:0,
};


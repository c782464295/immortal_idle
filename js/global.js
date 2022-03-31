export const TICK_INTERVAL = 50;
export var save = window.localStorage;
export var global = {
    inventory: [],
    serialize() {
        return JSON.stringify(this);
    },
    deserialize(data) {
        console.log(JSON.parse(data));
        for (let k in JSON.parse(data)) {
            this[k] = JSON.parse(data)[k];
        }
    },
};
global.inventory = [
    { id: 15, locked: false, qty: 1, tab: 0, sellsFor: 80 },
    { id: 17, locked: false, qty: 12, tab: 1, sellsFor: 70 },
    { id: 11, locked: false, qty: 13, tab: 0, sellsFor: 30 },
    { id: 12, locked: false, qty: 14, tab: 2, sellsFor: 20 },
    { id: 13, locked: false, qty: 2, tab: 0, sellsFor: 10 },
];
global['pack'] = {
    baseBOFmax: 5,
    baseStomax: 10,
    storage: {},
    BagOfHolding: {},
    bank: []
};

global['Settings'] = {
    locale: 'zh-CN',
    lightmode: 1,
};

global['Level'] = {
    mining: 1,
    woodcutting: 1,
    fishing: 1,
    plant: 1,
    alchemy: 1,
    crafting: 1,
    pray: 1
};

global['Exp'] = {
    miningExp: 0,
    woodcuttingExp: 0,
    fishingExp: 0,
    plantExp: 0,
    alchemyExp: 0,
    craftingExp: 0,
    prayExp: 0,
};

global['PlayerStates'] = {
    HP: 300,
    magic: 140,
    XP: 0,
};

global['Active'] = {
    currentAction: 0,
}


global['items'] = {
    itemsAlreadyFound: []
}



export var itemNotifyToProcess = [];
export const storage = window.localStorage;
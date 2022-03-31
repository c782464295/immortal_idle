'use strict'
import { global } from '../global.js';

class Inventory {
    constructor() {
        this.storage = global.inventory;
    }

    sort() {
        this.storage.sort(function (a, b) { return a.sellsFor - b.sellsFor });
    }

    serialize() {

    }

    deserialize(data) {

    }
}


export { Inventory }; 
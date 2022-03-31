'use strict'
import { global } from '../global.js';

class Item extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {

    }
}

customElements.define('item-element', Item);

class Inventory {
    constructor() {
        this.storage = global.inventory;

        this.parentDOM = document.getElementById("");
        this.items = [];

        this.init();
    }

    init() {

    }

    sort() {
        this.storage.sort(function (a, b) { return a.sellsFor - b.sellsFor });
    }

    addItem(itemID, quantity) {
        if (this.storage.length == 0) {
            this.storage.push({
                id: itemID,
                qty: quantity,
                tab: tab,
                sellsFor: 100,
                locked: false,
            });
        } else {

        }

    }

    serialize() {

    }

    deserialize(data) {

    }
}


export { Inventory }; 
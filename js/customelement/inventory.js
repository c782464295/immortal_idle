'use strict'
import { global } from '../global.js';
import { items } from '../items.js';

class Item extends HTMLElement {
    constructor() {
        super();
        Item.counter = Item.counter + 1 || 1;

    }

    connectedCallback() {



    }
    set data(val) {
        this.innerHTML = `
        
        <div class="item"><span>${val.qty}</span></div>
        `
        this._data = val;

        this.setAttribute('data-id', val.id);
    }
    get data() {
        return this._data;
    }

    render() {
        this.innerHTML = `
        <style>
        .bank-img {
            width: 64px;
            height: 64px;
            pointer-events: none
        }
        .bank-item {
            position: relative;
            height: 64px;
            width: 64px;
            background-image: url(https://cdn.melvor.net/core/v018/assets/media/main/bank_border.png?2);
            background-size: contain;
            background-color: transparent;
            border-radius: 5px;
        }

        item-element{margin: 10px 10px;}
        
        .item{position: relative;height: 64px;width: 64px;float: left;background-image: url(https://cdn.melvor.net/core/v018/assets/media/main/bank_border.png?2);background-size: contain;background-color: transparent;border-radius: 5px}
        .item span{position: absolute;right: 0;bottom: 0;background: rgba(255, 255, 255, .5);border-radius: 2.5px;padding: 1.5px;color: black;}

    </style>
        <div class="item"><span>${this.data.qty}</span></div>
        `
    }
}

customElements.define('item-element', Item);

class Inventory {
    constructor() {


        this.parentDOM = document.getElementById("inventory-area");
        this.items = global.inventory;

        this.isSort = false;

        this.sortInsant = this.init();

    }

    init() {



        return Sortable.create(this.parentDOM, {
            group: "inventory",
            animation: 150,
            delay: 200,
            delayOnTouchOnly: true,
            sort: true,
            dataIdAttr: 'data-id',
            onEnd: function (evt) {
                tippy.hideAll();
            },
            onMove: function () {
                tippy.hideAll();

            },
            onChoose: function (evt) {
                tippy.hideAll();
            },
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    if (order) sortable.sort(order.split('|'), false);
                    return order ? order.split('|') : [];
                },

                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var order = sortable.toArray();
                    localStorage.setItem(sortable.options.group.name, order.join('|'));
                }
            }
        });

    }
    sortInit() {
        if (!this.isSort) {

            this.isSort = true;
            var order = localStorage.getItem(this.sortInsant.options.group.name);
            if (order) this.sortInsant.sort(order.split('|'), false);
        }
    }
    close() {
        var order = this.sortInsant.toArray();
        localStorage.setItem(this.sortInsant.options.group.name, order.join('|'));
    }
    sort() {
        global.inventory.sort(function (a, b) { return a.sellsFor - b.sellsFor });
    }

    ishasItem(itemID) {
        this.parentDOM.childNodes;
    }
    addItem(itemID) {
        let tmp_item = new Item();
        tmp_item.data = global.inventory.filter(item => item.id == itemID)[0];
        tippy(tmp_item, {
            placement: "top",
            allowHTML: true,
            interactive: false,
            animation: false,
            Duration: 0,
            content: `<img class="bank-img m-1" src="${items.filter(item => item.id == itemID)[0].media} ">I'm a Tippy ${items.filter(item => item.id == itemID)[0].description} tooltip!`,
            //onShow(instance) {
            //    instance.setContent(console.log(this));
            //},
        });
        this.parentDOM.appendChild(tmp_item);
    }

    render() {

        let memory_iventory = global.inventory.map((obj) => obj.id);
        let dom_iventory = [...this.parentDOM.children].map((obj) => obj.data.id);
        //console.log(memory_iventory,dom_iventory);

        let needToAdd = memory_iventory.filter(x => !dom_iventory.includes(x));
        //console.log('add',needToAdd);

        for (let i in needToAdd) {
            this.addItem(needToAdd[i], i);
        }



        for (let i of [...this.parentDOM.children]) {
            i.render();
        }
        this.sortInit();
    }

    getTotalMoney() {
        let totalGP = 0;
        totalGP = global.inventory.map(x => x.qty * x.sellsFor).reduce(function (x, y) { return x + y });
        return totalGP;
    }
    getMaxSpace() {
        return 999;
    }
    serialize() {

    }

    deserialize(data) {

    }
}


export { Inventory }; 
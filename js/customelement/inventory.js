'use strict'
import { global } from '../global.js';

class Item extends HTMLElement {
    constructor() {
        super();
        Item.counter = Item.counter + 1 || 1;
        
    }

    connectedCallback() {

        
    
    }
    set data(val){
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
        <div class="item"><span>${val}</span></div>
        `
    }
}

customElements.define('item-element', Item);

class Inventory {
    constructor() {
        this.storage = global.inventory;

        this.parentDOM = document.getElementById("inventory-area");
        this.items = global.inventory;
        
        this.init();

    }

    init() {
        
        this.items.forEach(function(currentValue, index, arr){
            console.log(currentValue);
            let tmp_item = new Item();
            tmp_item.data = index;
            tippy(tmp_item, {
                content: `I'm a Tippy ${index} tooltip!`,
              });
            this.parentDOM.appendChild(tmp_item);
            
        },this);

        Sortable.create(this.parentDOM, {
            group: "inventory",
            animation: 150,
            delay: 200,
            delayOnTouchOnly: true,
            sort: true,
            onEnd: function(evt) {
                tippy.hideAll();
            },
            onMove: function() {
                tippy.hideAll();
                
            },
            onChoose: function(evt) {
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
                    if(order) sortable.sort(order.split('|'), false);
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

    render(){

    }

    serialize() {

    }

    deserialize(data) {

    }
}


export { Inventory }; 
'use strict'
import { global } from '../global.js';
import { items } from '../items.js';
import { beautify } from '../numBeautify.js';
import { deepClone } from '../utility.js';
class Item extends HTMLElement {
    constructor() {
        super();
        Item.counter = Item.counter + 1 || 1;
        this.container = document.createElement("div");
        this.container.className = "item";
        this.text = document.createElement("span");
        this.img = document.createElement("img");
        this.img.className = "item-img";
        this.onclick =  () => this.click();
    }

    connectedCallback() {
        this.container.appendChild(this.img);
        this.container.appendChild(this.text);
        this.appendChild(this.container);

    }

    set data(val) {
        this._data = val;
        this.setAttribute('data-id', val.id);
        let item = items.find(function (currentValue, index, arr) { return currentValue.id == this.data.id }, this);
        this.img.src = item.media;
    }
    get data() {
        return this._data;
    }

    async render() {
        

        
        this.text.innerText = beautify(this.data.qty);
    }

    addGlow() {
        this.container.classList.add("new-item-glow");
    }
    removeGlow() {
        this.container.classList.remove("new-item-glow");
    }
    click() {
        console.log(`You clicked item ID:${this.data.id}`);
        if (!global.itemsAlreadyFound.includes(this.data.id)) {
            global.itemsAlreadyFound.push(this.data.id);
            this.removeGlow();
        }
    }
}

customElements.define('item-element', Item);
class Search extends HTMLElement {
    constructor() {
        super();

    }
    connectedCallback() {
        this.searchBar = document.createElement('div');
        this.searchBar.className = 'search-bar';
        this.input = document.createElement('input');
        this.input.setAttribute("type", "text");
        this.input.setAttribute("placeholder", "搜搜");
        this.searchBar.appendChild(this.input);
        document.getElementById("search-menu").appendChild(this.searchBar);

        this.input.addEventListener("input", function (event) {
            const options = {
                shouldSort: true,
                tokenize: true,
                matchAllTokens: true,
                findAllMatches: true,
                threshold: 0.1,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: ["name", "id", "qty", "description", "sellsFor"],
            };
            let searchObj = deepClone(global.inventory);
            for (let i in searchObj) {
                let tmp_item = items.find(function (currentValue) { return currentValue.id == searchObj[i].id });
                searchObj[i].name = tmp_item.name;
                searchObj[i].description = tmp_item.description;
            }

            const fuse = new Fuse(searchObj, options);
            let result = fuse.search(this.value);

            if (result.length > 0) {
                document.querySelectorAll(`item-element`).forEach((elem) => {
                    elem.classList.add("hidden");
                })
                for (let i = 0; i < result.length; i++) {
                    document.querySelector(`item-element[data-id='${result[i].id}']`).classList.remove("hidden");
                }
            }
            if (this.value == '') {
                document.querySelectorAll(`item-element`).forEach((elem) => {
                    elem.classList.remove("hidden");
                })
            }
        })
    }
}
customElements.define('search-element', Search);
class InventoryDetailMenu extends HTMLElement{
    constructor() {
        super();
    }
    connectedCallback() {

    }
    set data(val) {

    }
}
customElements.define('inventorydetailmenu-element', InventoryDetailMenu);


class Inventory {
    constructor() {


        this.parentDOM = document.getElementById("inventory-area");
        this.items = global.inventory;

        this.isSort = false;

        this.inventoryDetailMenu = new InventoryDetailMenu();
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
        tmp_item.data = global.inventory.find(item => item.id == itemID);
        tippy(tmp_item, {
            placement: "top",
            allowHTML: true,
            interactive: false,
            animation: false,
            Duration: 0,
            content: `
            <table>
                <tr>
                    <th width="50px" height="50px">
                        <img src="${items.find(item => item.id == itemID).media}">
                    </th>
                    <th>
                        ${items.find(item => item.id == itemID).name}<br/>
                        ${items.find(item => item.id == itemID).description}<br/>
                        ${items.find(item => item.id == itemID).farmingXP != undefined ? `恢复${items.find(item => item.id == itemID).farmingXP}` : ''}
                    </th>
                </tr>
            </table>
            `,
            //onShow(instance) {
            //    instance.setContent(console.log(this));
            //},
        });
        this.parentDOM.appendChild(tmp_item);
        return tmp_item;
    }

    async render() {

        let memory_iventory = global.inventory.map((obj) => obj.id);
        let dom_iventory = [...this.parentDOM.children].map((obj) => obj.data.id);
        //console.log(memory_iventory,dom_iventory);

        let needToAdd = memory_iventory.filter(x => !dom_iventory.includes(x));
        //console.log('add',needToAdd);
        // add new item
        for (let i in needToAdd) {
            let item = this.addItem(needToAdd[i], i);

            if (!global.itemsAlreadyFound.includes(needToAdd[i])) {
                item.addGlow();
            }
        }

        // update
        for (let i of [...this.parentDOM.children]) {
            if (i.data.qty == 0) i.remove();
            i.render();
        }
        this.sortInit();
    }

    getTotalMoney() {
        let totalGP = 0;
        totalGP = global.inventory.map(x => x.qty * x.sellsFor).reduce(function (x, y) { return x + y });
        return totalGP;
    }
    
    serialize() {

    }

    deserialize(data) {

    }
}


export { Inventory }; 
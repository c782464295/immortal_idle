'use strict'
import { items } from './items.js';
import { global } from './global.js';
import { recipeData } from './data/recipeData.js';



class Recipe extends HTMLElement {
    constructor(p_dom) {
        super();
        this.data = recipeData[0];
    }
    connectedCallback() {
        this.innerHTML = '<button type="button">点我!</button>';
        this.querySelector('button').addEventListener('click', this.check.bind(this), false);
    }
    check() {
        // 这里还需要判断背包是否满了
        let allMeet = true;
        let q = 0;
        this.data.itemCosts.forEach(function (value) {
            let tmp_item = global.inventory.find(function (currentValue, index, arr) { return currentValue.id == value.id }, this);
            if (tmp_item == undefined || tmp_item.qty < value.qty) allMeet = false;
            if (tmp_item != undefined && (tmp_item.qty - value.qty) === 0) q++;
        });
        if(global.isFull(-q) && !this.isItemExist(this.data.itemID)) allMeet = false;
        console.log(q);
        if (allMeet) {
            this.data.itemCosts.forEach(function (value) {
                let tmp_item = global.inventory.find(function (currentValue, index, arr) { return currentValue.id == value.id }, this);

                tmp_item.qty -= value.qty;

            });

            if (this.isItemExist(this.data.itemID)) {
                let tmp = global.inventory.find(item => item.id == this.data.itemID);
                tmp.qty += 1;
            } else {
                global.inventory.push({ id: this.data.itemID, locked: false, qty: 1, tab: 0, sellsFor: items.find(item => item.id == this.data.itemID).sellPrice });
            }
            return true;
        } else {
            console.log("条件不满足");
            return false;
        }

    }
    isItemExist(id) {
        if (global.inventory.find(item => item.id == id) === undefined) {
            return false;
        } else {
            return true;
        }
    }

}

customElements.define('recipes-element', Recipe);


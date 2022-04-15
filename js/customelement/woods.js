"use strict";
import { loc } from '../locale.js';
import { global } from '../global.js';
import { Timer } from '../timer.js';
import { processItemNotify, notificationQueue } from '../notify.js';
import { ProgressBar } from './progress.js'
import { items } from '../items.js';
import { statistics } from '../statistic.js';
import { nonBattleModifiersManager } from '../nonBattleModiers.js';
import { TreeData } from '../data/treeData.js';

class Tree extends HTMLElement {
    constructor(p_dom) {
        super();
        this._checked = undefined;

        this.p_dom = p_dom;

        this.timer = new Timer('woodcut', this.action.bind(this));



    }
    set data(val) {
        this.baseInterval = val.baseInterval;
        this.requirelevel = val.requirelevel;
        this.baseExperience = val.baseExperience;
        this._id = val.id;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 90%;
            height: 280px;
            display:inline-block;
            margin:20px;
            text-align:center;
            -webkit-user-select: none; 
            cursor: pointer;
        }
          
        .card:hover{
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
          
        .container{
            padding: 2px 16px;
        }

        progress{
            opacity: 0;
            width: 300px;
            height: 20px;
            background: #1da1f2;
            box-shadow: 2px 14px 15px -7px rgba(30, 166, 250, 0.36);
            border-radius: 50px;
            transition: all 0.5s;
        }
        .card[aria-checked="true"] progress{
            opacity: 1;
        }

        .card[aria-checked="true"] {
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }

        .hidden {
            visibility: hidden;
            opacity: 1;
            display:none;
        }
        </style>

        <div class='card' id=${val.id} aria-checked="false">
    <p>经验:${val.baseExperience * 1000 / val.baseInterval}xp/s</p>
            <img src=${val.media} alt="Avatar" height="100px" width="100px">
            <div class="container">
                <progress max=100 value=10></progress>
                <p><b>${val.name}</b></p>
                <p>${val.description}</p>
            </div>
        </div>
        `
        this.card = shadowRoot.querySelector('.card');
        this.bar = shadowRoot.querySelector('progress');
        //shadowRoot.querySelector('.card').addEventListener('click', this.check.bind(this), false);
        shadowRoot.querySelector('.card').onclick = this.check.bind(this);
        return
    }
    get data() {
        return this.val;
    }
    connectedCallback() {


    }



    check(event) {

        let children = this.p_dom.childNodes;

        for (let e in children) {

            if (children[e].isChecked == true && children[e] != this) {
                return;
            }
        }
        if (global.currentAction != 'woodcutting' && global.currentAction != '') {
            return;
        }
        this.timer.isActive ? this.timer.stop() : this.timer.start(this.baseInterval);



        const isPressed = event.currentTarget.getAttribute('aria-checked') === 'true';
        event.currentTarget.setAttribute('aria-checked', String(!isPressed));
        this._checked = Boolean(!isPressed);

        isPressed ? global.currentAction = '' : global.currentAction = 'woodcutting';

    }
    static get observedAttributes() {// (3)
        return ['value'];
        // return [/* array of attribute names to monitor for changes */];
    }

    attributeChangedCallback(name, oldValue, newValue) {// (4)
        // called when one of attributes listed above is modified
    }
    hide() {
        this.shadowRoot.querySelector(".card").classList.add("hidden")
    }
    show() {
        this.shadowRoot.querySelector(".card").classList.remove("hidden")
    }
    addXP() {

    }

    action() {


        let qty = 1;
        Math.random() * 100 < nonBattleModifiersManager.getFinalValue('CuttingDoubleRate') ? (qty = 2, statistics.Woodcutting.inc('doubleCut')) : qty = 1;


        if (this.isItemExist(this._id)) {
            let tmp = global.inventory.find(item => item.id == this._id);
            tmp.qty += qty;
        } else {
            if (global.isFull()) {
                this.stop();
                return;
            }
            global.inventory.push({ id: this._id, locked: false, qty: 1, tab: 0, sellsFor: items.find(item => item.id == this._id).sellPrice });
        }
        statistics.Woodcutting.inc('totalWoodcutting');
        statistics.Woodcutting.add('totalTimeConsume', this.baseInterval);

        notificationQueue.add(processItemNotify(this._id, qty));
        global.NonBattleSkill.woodcuttingExp += this.baseExperience;
        this.timer.start(this.baseInterval);

    }

    stop() {
        this.timer.stop();
        global.currentAction = '';
    }

    isItemExist(id) {
        if (global.inventory.find(item => item.id == id) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    tick() {
        if (this.timer.isActive) this.timer.tick();
    }
    async render() {
        if (this.timer.active) {
            this.card.setAttribute('aria-checked', String(true));
            this._checked = true;
            this.bar.value = 100 - 100 * this.timer._ticksLeft / this.timer._maxTicks;


        }

        this.requirelevel <= global.NonBattleSkill.woodcuttingLevel ? this.show() : this.hide();
    }
    get isChecked() {
        return this._checked;
    }

}


customElements.define('tree-element', Tree);






class WoodCutting {
    constructor() {
        this.parentDOM = document.getElementById("woodcutting-area");
        this.trees = [];

        this.init();

    }
    init() {
        this.progress = new ProgressBar();
        this.parentDOM.parentNode.insertBefore(this.progress, this.parentDOM);

        for (let i in TreeData) {
            let tmp_dom = new Tree(this.parentDOM);

            tmp_dom.data = TreeData[i];
            this.parentDOM.appendChild(tmp_dom);
            this.trees.push(tmp_dom);
            if (TreeData[i].requirelevel > global.NonBattleSkill.woodcuttingLevel) {
                tmp_dom.hide();
            } else {
                tmp_dom.show();
            }
        }


    }
    update() {
        for (let i in TreeData) {
            TreeData[i].requirelevel <= global.NonBattleSkill.woodcuttingLevel ? this.trees[i].show() : this.trees[i].hide();
        }
    }
    render() {
        for (let i in this.trees) {
            this.trees[i].render();
        }
        this.progress.max = 100;
        this.progress.value += 1;

    }
    tick() {
        for (let i in this.trees) {
            this.trees[i].tick();
        }
    }
    serialize() {
        let json_string = [];
        for (let i in this.trees) {
            json_string.push(this.trees[i].timer.serialize());
        }
        return json_string;
    }
    deserialize(data) {
        for (let i in data) {
            this.trees[i].timer.deserialize(data[i]);
        }
    }
}
export { WoodCutting };
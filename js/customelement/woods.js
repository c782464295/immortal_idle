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
import { modifier } from '../data/modifier.js';
import { exp } from '../exp.js';

class Tree extends HTMLElement {
    constructor(p_dom) {
        super();
        this._checked = undefined;

        this.p_dom = p_dom;

        this.timer = new Timer('woodcut', this.action.bind(this));

        let style = document.createElement('style');
        style.appendChild(document.createTextNode(`
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 30%!important;
            height: 280px!important;
            display:inline-block;
            margin:20px;
            text-align:center;
            -webkit-user-select: none; 
            cursor: pointer;
            float: left;
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
        `));
        this.setAttribute("aria-checked",false);

        
        this.appendChild(style);
        this.container = document.createElement("div");
        this.container.className = 'card';
        
        this.container.setAttribute("id",-1);

        this.exp_text = document.createElement("p");
        this.container.appendChild(this.exp_text);

        this.img = document.createElement("img");
        this.img.setAttribute("height","100px");
        this.img.setAttribute("width","100px");
        this.container.appendChild(this.img);

        this.sub_container = document.createElement("container");
        this.sub_progress = document.createElement("progress");
        this.sub_progress.max = 100;

        this.sub_name = document.createElement("p");
        this.sub_name_b = document.createElement("b");
        this.sub_name.appendChild(this.sub_name_b);
        this.sub_description = document.createElement("p");

        this.sub_container.appendChild(this.sub_name);
        this.sub_container.appendChild(this.sub_description);

        this.container.appendChild(this.sub_container);

    }
    connectedCallback() {
        this.appendChild(this.container);
        this.onclick = this.check.bind(this);
    }
    set data(val) {
        this.baseInterval = val.baseInterval;
        this.requirelevel = val.requirelevel;
        this.baseExperience = val.baseExperience;
        this._id = val.id;

        this.exp_text.innerText = `经验:${val.baseExperience}xp/⏳${Math.floor(val.baseInterval / 1000)}s`;
        this.img.src = val.media;
        this.sub_name_b.innerText = val.name;
        this.sub_description.innerText = val.description;
        return
    }
    get data() {
        return this.val;
    }
    



    check(event) {

        let children = this.p_dom.childNodes;
        console.log('click');
        for (let e in children) {
            console.log(children[e].isChecked);
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
        this.classList.add("hidden")
    }
    show() {
        this.classList.remove("hidden")
    }
    addXP() {

    }

    action() {


        let qty = 1;
        Math.random() * 100 < nonBattleModifiersManager.getFinalValue(0) ? (qty = 2, statistics.Woodcutting.inc('doubleCut')) : qty = 1;


        global.isFull() && !global.isItemExist(this._id) ? console.log('full') : global.inventoryAddItem(this._id, qty);
        statistics.Woodcutting.inc('totalWoodcutting');
        statistics.Woodcutting.add('totalTimeConsume', this.baseInterval);

        notificationQueue.add(processItemNotify(this._id, qty));
        global.NonBattleSkill.woodcuttingExp += this.baseExperience;
        this.timer.start(this.baseInterval);

    }




    tick() {
        if (this.timer.isActive) this.timer.tick();
    }
    async render() {
        if (this.timer.active) {
            this.setAttribute('aria-checked', String(true));
            this._checked = true;
            this.sub_progress.value = 100 - 100 * this.timer._ticksLeft / this.timer._maxTicks;


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


        this.level = document.createElement('h4');
        this.parentDOM.appendChild(this.level);
        this.progress = new ProgressBar();
        this.parentDOM.parentNode.insertBefore(this.progress, this.parentDOM);

        this.init();

    }

    init() {
        this.progress.max = 100;
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


        //this.progress.value = exp.progress(global.NonBattleSkill.woodcuttingExp);
        this.level.innerText = global.NonBattleSkill.woodcuttingLevel;
    }
    tick() {
        if (global.currentAction == 'woodcutting') {
            this.trees.forEach((tree) => {
                tree.tick();
            });
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
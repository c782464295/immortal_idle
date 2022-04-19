"use strict";
import { EightDiagrams } from '../data/prayData.js';
import { modifierData, modifier } from '../data/modifier.js';
import { TextChange } from './textChange.js';
import { nonBattleModifiersManager, Modifier, BaseModifier } from '../nonBattleModiers.js';
import { modifierFrom } from '../data/modifier.js';

/* https://game-icons.net/
*/
class PrayCard extends HTMLElement {
    constructor() {
        super();

        this.container = document.createElement('div');
        this.container.className = 'card';
        this.img = new Image(100, 100);
        this.name = document.createElement('h2');

        this.pray1 = new TextChange();
        this.pray2 = new TextChange();
        this.pray3 = new TextChange();

        this.pray1_ = undefined;
        this.pray2_ = undefined;
        this.pray3_ = undefined;

        this.button = document.createElement('button');
        this.button.className = 'content-button';
        this.button.innerText = '点我';

        let style = document.createElement('style');
        style.appendChild(document.createTextNode(`
            .card{
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                width: 40%;
                height: 300px;
                display:inline-block;
                margin-left:5%;
                margin-bottom:50px;
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

            .card[aria-checked="true"] {
                box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
            }

            .hidden {
                visibility: hidden;
                opacity: 1;
                display:none;
            }
        `));
        this.appendChild(style);

        this.nonBattleModifiersManager = nonBattleModifiersManager;

    }
    connectedCallback() {
        this.container.appendChild(this.img);
        this.container.appendChild(this.name);
        this.container.appendChild(this.pray1);
        this.container.appendChild(this.pray2);
        this.container.appendChild(this.pray3);
        this.container.appendChild(this.button);

        this.button.onclick = () => this.click();

        this.appendChild(this.container);
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    click() {
        let index = this.getRandomInt(1, KanData.length) - 1;
        let kan = KanData[index];
        if (this.pray2_ != undefined) {
            nonBattleModifiersManager.removeModifier(modifier[this.pray2_.name], this.pray2_);
        }
        this.pray2_ = new BaseModifier(modifierFrom.SlotIndex_0_1, kan.name, this.getRandomInt(kan.baseValueRange[0], kan.baseValueRange[1]), this.getRandomInt(kan.baseMultiplierRange[0], kan.baseMultiplierRange[1]));

        nonBattleModifiersManager.addModifier(kan.id, this.pray2_);
        this.pray2.text = kan.name + '+' + this.pray2_._baseValue + '%';
    }


    set data(val) {
        this._data = val;
        this.img.src = val.media;
        this.pray2.text = 'a';
        this.id = val.id;

        this.name.innerText = val.name;
        this.pray2_ = nonBattleModifiersManager.findSubModifierByid(val.id);

        if (typeof (this.pray2_) != "undefined") {
            this.pray2.text = this.pray2_.id;
        }
    }
}
customElements.define('praycard-element', PrayCard);

export class PrayMenu extends HTMLElement {
    constructor() {
        super();
        this.p_dom = document.getElementById("pray-container");
        this.nonBattleModifiersManager = nonBattleModifiersManager;
        this.eightDiagrams = [];
        this.p_dom.appendChild(this);
    }
    connectedCallback() {
        EightDiagrams.forEach((ele) => {
            let tmp_card = new PrayCard();
            tmp_card.data = ele;
            this.eightDiagrams.push(tmp_card);
            this.appendChild(tmp_card);
        })
    }
}
customElements.define('praymenu-element', PrayMenu);


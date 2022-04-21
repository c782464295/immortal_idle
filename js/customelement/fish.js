"use strict";
import { loc } from '../locale.js';
import { global } from '../global.js';
import { Timer } from '../timer.js';
import { processItemNotify, notificationQueue } from '../notify.js';
import { ProgressBar } from './progress.js'
import { items } from '../items.js';
import { statistics } from '../statistic.js';

class FishingArea extends HTMLElement {
    constructor() {
        super();
        this.className = 'col-12 col-xl-6';
        this.container = document.createElement('div');
        this.container.className = 'row';
        this.container.style = 'min-height:370px;';


        this.title_ = document.createElement('h4');

        this.container_left = document.createElement('div');
        this.container_left.className = 'col-6';
        this.container_left.style = 'width:50%';

        this.container_right = document.createElement('div');
        this.container_right.className = 'col-6';
        this.container_right.style = 'width:50%';
    }
    connectedCallback() {
        this.title_.innerText = '黄海';
        this.container_left.innerText = 'a';
        this.container_right.innerText = 'a';

        this.appendChild(this.title_);

        this.container.appendChild(this.container_left);
        this.container.appendChild(this.container_right);
        //this.button.onclick = () => this.click();

        this.appendChild(this.container);
    }

    click() {

    }
}
customElements.define('fishingarea-element', FishingArea);

class FishingMenu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

    }
}

customElements.define('fishingmenu-element', FishingMenu);
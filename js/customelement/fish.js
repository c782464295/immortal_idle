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
        this.className = '';
        this.style = `
            flex: 0 0 auto;
            width: 50%;
            min-width:767px;
          `;
        this.container = document.createElement('div');
        this.container.className = 'row';
        this.container.style = 'min-height:370px;';


        this.titleDiv = document.createElement('div');
        this.titleDiv.style = `text-align: center`;
        this.titleText = document.createElement('h3');
        
        this.container_left = document.createElement('div');
        this.container_left.style = 'width:50%;text-align:center;';

        this.right_content = document.createElement('h4');

        this.container_right = document.createElement('div');
        this.container_right.style = 'width:50%;text-align:center';
    }
    connectedCallback() {
        this.titleText.innerText = '黄海';
        this.right_content.innerText = '闲置';


        this.titleDiv.appendChild(this.titleText);
        this.appendChild(this.titleDiv);

        this.container_right.appendChild(this.right_content);

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
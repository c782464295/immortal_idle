"use strict";
import { loc } from '../locale.js';
import { global } from '../global.js';
import { Timer } from '../timer.js';
import { processItemNotify, notificationQueue } from '../notify.js';
import { ProgressBar } from './progress.js'
import { items } from '../items.js';
import { statistics } from '../statistic.js';

class FarmArea extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

    }
}

customElements.define('farmarea-element', FarmArea);


class FarmMenu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {

    }
}

customElements.define('farmmenu-element', FarmMenu);
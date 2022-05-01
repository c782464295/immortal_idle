"use strict";
import { loc } from '../locale.js';
import { global } from '../global.js';
import { Timer } from '../timer.js';
import { processItemNotify, notificationQueue } from '../notify.js';
import { ProgressBar } from './progress.js'
import { items } from '../items.js';
import { statistics } from '../statistic.js';

class FishingArea extends HTMLElement {
    constructor(name) {
        super();


        let style = document.createElement('style');
        style.appendChild(document.createTextNode(`
        .slide-container {
            margin: auto;
            width: 600px;
            
            text-align: center;
                      
            padding-top: 40px;
            padding-bottom: 40px;
        }

        .clash-card {
            background-color: transparent;
            width: 300px;
            height: 500px;
            display: inline-block;
            margin: auto;
            border-radius: 19px;
            position: relative;
            text-align: center;
            box-shadow: -1px 15px 30px -12px black;
            z-index: 9999;
        }

        .clash-card[aria-checked="true"] {
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }

        .clash-card__image {
            position: relative;
            height: 230px;
            margin-bottom: 35px;
            border-top-left-radius: 14px;
            border-top-right-radius: 14px;
        }

        .clash-card__level {
            text-transform: uppercase;
            font-size: 12px;
            font-weight: 700;
            margin-bottom: 3px;
            color: #EC9B3B;
        }

        .clash-card__unit-name {
            font-size: 26px;
            color: black;
            font-weight: 900;
            margin-bottom: 5px;
        }
          
        .clash-card__unit-description {
            padding: 20px;
            margin-bottom: 10px;  
        }
        
        .clash-card__unit-stats {
  
            color: white;
            font-weight: 700;
            border-bottom-left-radius: 14px;
            border-bottom-right-radius: 14px;
            clear: both;
        }
        .one-third {
            width: 33%;
            float: left;
            padding: 20px 15px;
            border-right: 1px solid darken(#4FACFF, 6%);
			bottom: 0;
        }
        .clearfix:after {
            visibility: hidden;
            display: block;
            font-size: 0;
            content: " ";
            clear: both;
            height: 0;
        }
        
        .stat {
            position: relative;
            font-size: 24px;
            margin-bottom: 10px;
        }
          
        .stat-value {
            text-transform: uppercase;
            font-weight: 400;
            font-size: 12px;
        }
        `));



        this.appendChild(style);


        this.slideContainer = document.createElement('div');
        this.slideContainer.className = 'slide-container';

        this.card = document.createElement('div');
        this.card.className = 'clash-card';
        this.slideContainer.appendChild(this.card);

        this.imgContainer = document.createElement('div');
        this.imgContainer.className = 'clash-card__image';
        this.card.appendChild(this.imgContainer);
        this.img = document.createElement('img');
        this.img.src = './assets/fish/barbarian.png';
        this.imgContainer.appendChild(this.img);


        this.cardLevel = document.createElement('div');
        this.cardLevel.className = 'clash-card__level';
        this.cardLevel.innerText = '49';
        this.card.appendChild(this.cardLevel);

        this.cardName = document.createElement('div');
        this.cardName.className = 'clash-card__unit-name';
        this.cardName.innerText = '天池';
        this.card.appendChild(this.cardName);

        this.cardDescription = document.createElement('div');
        this.cardDescription.className = 'clash-card__unit-description';
        this.cardDescription.innerText = '此处汲天地之精华，聚不测之深渊';
        this.card.appendChild(this.cardDescription);


        this.cardStats = document.createElement('div');
        this.cardStats.className = 'clash-card__unit-stats clearfix';
        this.card.appendChild(this.cardStats);


        this.oneThird0 = document.createElement('div');
        this.oneThird0.className = 'one-third';
        this.statName0 = document.createElement('div');
        this.statName0.className = "stat";
        this.oneThird0.appendChild(this.statName0);
        this.statName0.innerText = '概率';
        this.statNum0 = document.createElement('div');
        this.statNum0.className = "stat-value";
        this.oneThird0.appendChild(this.statNum0);
        this.statNum0.innerText = '10%';
        this.cardStats.appendChild(this.oneThird0);

        this.oneThird1 = document.createElement('div');
        this.oneThird1.className = 'one-third';
        this.statName1 = document.createElement('div');
        this.statName1.className = "stat";
        this.oneThird1.appendChild(this.statName1);
        this.statName1.innerText = '概率1';
        this.statNum1 = document.createElement('div');
        this.statNum1.className = "stat-value";
        this.oneThird1.appendChild(this.statNum1);
        this.statNum1.innerText = '11%';
        this.cardStats.appendChild(this.oneThird1);

        this.oneThird2 = document.createElement('div');
        this.oneThird2.className = 'one-third';
        this.statName2 = document.createElement('div');
        this.statName2.className = "stat";
        this.oneThird2.appendChild(this.statName2);
        this.statName2.innerText = '概率2';
        this.statNum2 = document.createElement('div');
        this.statNum2.className = "stat-value";
        this.oneThird2.appendChild(this.statNum2);
        this.statNum2.innerText = '31%';
        this.cardStats.appendChild(this.oneThird2);
    }
    connectedCallback() {
        this.appendChild(this.slideContainer);
        this.onclick = this.click.bind(this);
    }
    disable() {
        $('#fish-area').slick('slickSetOption', "arrows", false, true);
    }
    enable() {
        $('#fish-area').slick('slickSetOption', "arrows", true, true);
    }
    click() {

        if ($('#fish-area').slick('slickGetOption', 'arrows')) {
            this.disable();
            this.card.setAttribute('aria-checked', true);
        } else {
            this.enable();
            this.card.setAttribute('aria-checked', false);
        }
    }
}
customElements.define('fishingarea-element', FishingArea);

export class FishingMenu {
    constructor() {

        this.parentDOM = document.getElementById("fish-area");
        $("#fish-area").slick({ accessibility: true, slidesToShow: 1, infinite: false, });

        this.slider = document.createElement('div');
        this.slider.className = 'fish-slider';
        this.slider.style.width = '100%';
        this.slider.style.height = '100%';
        this.slider.style.height = '100%';

        this.fishingArea = new FishingArea('a');
        this.fishingArea1 = new FishingArea('b');
        this.fishingArea2 = new FishingArea('c');

        $("#fish-area").slick('slickAdd', this.fishingArea);
        $("#fish-area").slick('slickAdd', this.fishingArea1);
        $("#fish-area").slick('slickAdd', this.fishingArea2);



    }

    getCurrentSlide() {
        return $('#fish-area').slick('slickCurrentSlide');
    }
    setCurrentSlide(index) {
        $('#fish-area').slick('slickGoTo', index);
    }
    addSlide(obj) {
        $("#fish-area").slick('slickAdd', obj);
    }
    removeSlide(index) {
        $('#fish-area').slick('slickRemove', index);
    }
    destroy() {
        $('#fish-area').slick('unslick');

    }
    
    async render() {

    }

    
}

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
        this.style.width = "100%;";
        this.style.height = "100%;";
        this.innerHTML = `<div class= 'aaa'>a${name}</div>`;


    }
    connectedCallback() {
    }

    click() {

    }
}
customElements.define('fishingarea-element', FishingArea);

export class FishingMenu {
    constructor() {

        this.parentDOM = document.getElementById("fish-area");
        $("#fish-area").slick({accessibility:true, slidesToShow:1,infinite:false,});

        this.slider = document.createElement('div');
        this.slider.className = 'fish-slider';
        this.slider.style.width = '100%';
        this.slider.style.height = '100%';
        this.slider.style.height = '100%';
        
        this.fishingArea = new FishingArea('a');
        this.fishingArea1 = new FishingArea('b');
        this.fishingArea2 = new FishingArea('c');

        $("#fish-area").slick('slickAdd',this.fishingArea);
        $("#fish-area").slick('slickAdd',this.fishingArea1);
        $("#fish-area").slick('slickAdd',this.fishingArea2);

        $("#fish-area").on('beforeChange', function(event, slick, currentSlide, nextSlide){
            console.log(event);
            console.log(slick);
            return false;
          });

    }

    getCurrentSlide() {
        return $('#fish-area').slick('slickCurrentSlide');
    }
    setCurrentSlide(index) {
        $('#fish-area').slick('slickGoTo', index);
    }
    removeCurrentSlide(index) {
        $('#fish-area').slick('slickRemove', index);
    }
    destroy() {
        $('#fish-area').slick('unslick');

    }
    async render() {
        
    }
}

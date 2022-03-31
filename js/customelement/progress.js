"use strict";

class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.max = 100;
        this.value = 0;
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            .bar-wrap {
                background-color: rgba(0, 155, 202, 0.2);          
                border: 1px solid rgba(0, 155, 202, 0.8);
                margin-bottom: 10px;
                height: 15px;
                border-radius: 20px;
            }
            .bar-fill { 
                border-radius,10px 10px 10px 10px;
                background-color: rgba(0, 155, 202,1);
                display: block;
                height: 15px;
                width: 0px;
                border-radius: 20px;
            }
        </style>
        <div class="bar-wrap"><span class="bar-fill" style="width: ${this.value}%;"></span></div>
        `
    }

    render() {
        this.shadowRoot.innerHTML= `
        <style>
            .bar-wrap {
                background-color: rgba(0, 155, 202, 0.2);          
                border: 1px solid rgba(0, 155, 202, 0.8);
                margin-bottom: 10px;
                height: 15px;
                border-radius: 20px;
            }
            .bar-fill { 
                border-radius,10px 10px 10px 10px;
                background-color: rgba(0, 155, 202,1);
                display: block;
                height: 15px;
                width: 0px;
                border-radius: 20px;
            }
        </style>
        <div class="bar-wrap"><span class="bar-fill" style="width: ${this.value}%;"></span></div>
        `
        this.value > 100? this.value=0:0;
    }


}

customElements.define('progress-bar', ProgressBar);

export {ProgressBar};
"use strict";

class ProgressBar extends HTMLProgressElement {
    constructor() {
        super();        
    }

    connectedCallback() {
       
        this.innerHTML= `
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
                
                border-radius: 20px;
            }
            progress {
                background-color: rgba(0, 155, 202, 0.2);          
                border: 1px solid rgba(0, 155, 202, 0.8);
                margin-bottom: 10px;
                height: 15px;
                border-radius: 20px;
            }
            progress:after {
                margin:-26px 0 0 -7px;
                padding:0;
                display:inline-block;
                //float:left;
                content: attr(value) '%';
            }
            progress::-webkit-progress-bar {
                height:11px;
                width:150px;
                margin:0 auto;
                background-color: #CCC;
                border-radius: 15px;
                box-shadow:0px 0px 6px #777 inset;
            }
            progress::-webkit-progress-value {
                display:inline-block;
                float:left;
                height:11px;
                margin:0px -10px 0 0;
                background: #F70;
                border-radius: 15px;
                box-shadow:0px 0px 6px #777 inset;
            }
        </style>
        <div class="bar-wrap"><span class="bar-fill"></span></div>
        `

    }
    static get observedAttributes(){
        return ["value"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.value >= 100? this.value = 0 :0;
    }

}

customElements.define('progress-bar', ProgressBar, {extends:'progress'});

export {ProgressBar};
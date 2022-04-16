'use strict'
export class TextChange extends HTMLElement {
    constructor() {
        super();
        TextChange.counter = TextChange.counter + 1 || 1;
        this.container = document.createElement("div");
        this.span = document.createElement("span");


        let style = document.createElement('style');
        style.appendChild(document.createTextNode(`
            @keyframes strike{
                0%   { width : 0; }
                100% { width: 100%; }
            }
            span {
                color:#30c78d
            }
            .out {
                position: relative;
            }
            .out::after {
                content: ' ';
                position: absolute;
                top: 45%;
                left: 0;
                width: 100%;
                height: 3px;
                background: black;
                opacity:0.8;
                animation-name: strike;
                animation-duration: 1s;
                animation-timing-function: linear;
                animation-iteration-count: 1;
                animation-fill-mode: forwards; 
          }
        `));
        this.container.appendChild(style);
        this.container.appendChild(this.span);

        this._text = 'default';
    }

    connectedCallback() {
        this.append(this.container);
        this.span.innerText = this._text;
    }
    set text(val) {
        this._text = val;
        this.render();
    }

    render() {
        
        this.span.classList.add("out");
        
        setTimeout(()=>{this.span.classList.remove("out"),this.span.innerText = this._text;}, 1000);
    }

}

customElements.define('textchange-element', TextChange);
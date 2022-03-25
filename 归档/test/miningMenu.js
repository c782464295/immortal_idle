"use strict";
class FishingAreaMenu extends HTMLElement {
    #content;
    

    constructor(elementId) {
        super();
        this.#content = new DocumentFragment();
        this.but = new FishingAreaMenuButton();
        this.#content.appendChild(this.but);

        document.getElementById(elementId).appendChild(this.#content);
        this.but.onclick = function(){alert('a')};
        console.log(this.but.getid());
       
    }
    connectedCallback() {
        this.style.cssText = 'background: yellow;';
        console.log('a');
        console.log('a');
    }

}
window.customElements.define('fishing-area-menu', FishingAreaMenu);
class FishingAreaMenuButton extends HTMLElement {
    constructor() {
        super();
        this.div = document.createElement('div');
        this.div.className = 'mask';  
        this.id= 'aaaaaaasasasas';
        this.appendChild(this.div)
    }
    connectedCallback() {
       
    }
    getid(){
        return this.id;
    }

}
window.customElements.define('fishing-area-menu-button', FishingAreaMenuButton);
new FishingAreaMenu('mining-area');
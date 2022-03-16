'use strict'
import TickTimer from './TickTimer.js';
class TreeCard extends HTMLElement{
    #content;
    #card;
    #callBack;
    #p;
    #img;
    #container;


    constructor(callback){
        super();
        
        this._checked = undefined;

        this.#content = new DocumentFragment();
        this.#card = document.createElement("div");
        this.#card.className = "card";
        this.#p = document.createElement("p");
        this.#card.appendChild(this.#p);

        this.#img = document.createElement("img");
        this.#card.appendChild(this.#img);

        this.#container = document.createElement("div");
        this.#container.className = "container";
        this.progress = document.createElement("progress");
        this.progress.max = 100;
        this.#container.appendChild(this.progress);
        this.#card.appendChild(this.#container);

        
        this.setAttribute('aria-valuenow', 0);

        this.p_name = document.createElement("p");
        this.p_name_b = document.createElement("b");
        this.p_name.appendChild(this.p_name_b);
        this.p_description = document.createElement("p");
        this.#container.appendChild(this.p_name);
        this.#container.appendChild(this.p_description);

        this.#content.append(this.#card);


        this.onclick = callback;

        this.tickTimer = new TickTimer();

        
    }
    
    setData(TreeData){
        this.data = TreeData;
        this.#img.src = TreeData.img;
        this.#p.innerText = `经验:${TreeData.baseXP}xp/s`;
        this.id = TreeData.id;
        this.p_name_b.innerText = TreeData.name;
        this.p_description.innerText = TreeData.description;
        this.tickTimer.action = function(){
            this.start(TreeData.baseMinInterval);
        };
    }

    hideElement() {
        this.classList.add('d-none');
    }
    showElement() {
        this.classList.remove('d-none');
    }

    connectedCallback(){
        this.appendChild(this.#content);
    }
    /**
     * @param {Function} func
     */
    set callback(func){
        this.#callBack = func;
    }
    



    static get observedAttributes(){// (3)
        return ['aria-valuenow'];
        // return [/* array of attribute names to monitor for changes */];
    }
    
    render(){

        this.setAttribute("aria-valuenow",(this.tickTimer.maxTicks - this.tickTimer.ticksLeft)/this.tickTimer.maxTicks*100);
    }

    attributeChangedCallback(name, oldValue, newValue){// (4)
        // called when one of attributes listed above is modified

        this.progress.setAttribute('value', String(newValue));

    }
}

customElements.define('tree-card', TreeCard);

class treeMenu extends HTMLElement{
    constructor(){
        super();
        this.wooddata = [{
            name: "紫檀木",
            description:'来自幽暗森林的奇异木材，可以成为诸多材料的原料',
            id: 1,
            baseXP: 5,
            strengthXP: 0,
            level: 1,
            masteryID: 0,
            img: './normal_tree.svg',
            itemID: 1,
            baseMinInterval: 4000,
            baseMaxInterval: 8000,
        }, {
            name: "红檀木",
            description:'来自幽暗森林的奇异木材，可以成为诸多材料的原料',
            id: 2,
            baseXP: 8,
            strengthXP: 0,
            level: 5,
            masteryID: 0,
            img: './normal_tree.svg',
            itemID: 1,
            baseMinInterval: 4000,
            baseMaxInterval: 8000,
        }, {
            name: "金丝楠木",
            description: '木质间透出条条金丝，好像蕴含着不可小觑的力量',
            id: 3,
            baseXP: 10,
            strengthXP: 0,
            level: 15,
            masteryID: 1,
            img: './oak_tree.svg',
            itemID: 2,
            baseMinInterval: 4000,
            baseMaxInterval: 8000,
        }];
        this.woodList = [];
        
    }
    
    connectedCallback(){
        let style = document.createElement('style')
        style.innerHTML = `
        .card{
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 400px;
            height: 300px;
            display:inline-block;
            margin:20px;
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

        progress{
            opacity: 0;
            width: 300px;
            height: 20px;
            background: #1da1f2;
            box-shadow: 2px 14px 15px -7px rgba(30, 166, 250, 0.36);
            border-radius: 50px;
            transition: all 0.5s;
        }
        tree-card[aria-checked="true"]  .card div progress{
            opacity: 1;
        }

        tree-card[aria-checked="true"] .card {
            box-shadow: 0 8px 36px 0 rgba(0,0,0,0.9);
        }
        img {
            width: 100px;
        }
        .d-none {
            display: none!important
        }
        
        `;
        this.appendChild(style);
        this.onLoad();
    }
    onLoad(){
        this.wooddata.forEach((tree)=>{
            let tmp_tree = new TreeCard(this.clickHandler);
            tmp_tree.setData(tree);
            this.appendChild(tmp_tree);
            this.woodList.push(tmp_tree);
        });
        
    }
    
    clickHandler(){
        let ele = this.parentNode.querySelectorAll('[aria-checked=true]');
        if(ele[0]!=this && ele.length!=0){
            return
        }
        const isPressed = this.getAttribute('aria-checked') === 'true';
        this.setAttribute('aria-checked', String(!isPressed));
        if(!isPressed){
            this.tickTimer.start(2000);
        }else{
            this.tickTimer.stop();
        }
    }

    tick(){
        this.woodList.forEach(function(e){e.tickTimer.tick();});
    }
    render(){
        this.woodList.forEach(function(e){e.render();});
    }

}
customElements.define('tree-menu', treeMenu);




export {treeMenu};
"use strict";
import {treeMenu} from './treeMenu.js';
class WoodCuting{
    #p_game;
    constructor(game){
        this.#p_game = game;
        this.level = 0;
        this.ui = document.createElement("tree-menu");
        document.getElementById("treeContainer").appendChild(this.ui);
        this.isActive = false;
    }


    render(){
        if(this.ui.querySelector('[aria-checked=true]')!=null){
            this.ui.querySelector('[aria-checked=true]').ariaValueNow = Number(this.ui.querySelector('[aria-checked=true]').ariaValueNow)+1;
        }
    }
}

export {WoodCuting};
"use strict";
import {treeMenu} from './treeMenu.js';

class WoodCuting{
    #p_game;
    constructor(game){
        this.#p_game = game;
        this.level = 0;
        this.ui = document.createElement("tree-menu");
        document.getElementById("treeContainer").appendChild(this.ui);
        this.ui.addEventListener('click', this.dsHandler.bind(this), false);
    }

    dsHandler(e){

    }
    render(){
        this.ui.render();
    }
    tick(){
        this.ui.tick();
    }
}

export {WoodCuting};
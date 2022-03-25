'use strict'
import TickTimer from './TickTimer.js';
class GatheringSkill extends TickTimer {
    #p_game;
    constructor(p_game, sig, next=null) {
		super('Skill');
        this.#p_game = p_game;
        this.renderQueue = {}
        this.next = next;
        this.sig = sig;
    }
    get canStop() {
        return this.active;

    }

    exec(){
        //console.log(this.sig);
        const canStart = true;
        if (canStart) {
            this.active = true;
            //this.start(200);
        }
        if(this.next != null) return  this.next.exec();
    }

    render(){

    }

    renderChain(){
        if(this.active = true){
            this.render();
            return;
        }else{
            if(this.next != null) return  this.next.renderChain();
        }
    }

}

export {GatheringSkill};
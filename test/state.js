'use strict'
const PLAYER_STATE_IDEL = Symbol("idel");
const PLAYER_STATE_MINE = Symbol("mine");
const PLAYER_STATE_CUTWOOD = Symbol("cutwood");
 




class PlayerState {
    constructor(status, nextStatus){
        this.state = status;
        this.nextStatus = nextStatus;
    }
    next(){
        if(this.nextStatus!=null){
            return new this.nextStatus();
        }
        return null;
    }
}

class IdelState extends PlayerState{
    constructor(){
        super(PLAYER_STATE_IDEL, null);
    }
}


class MiningState extends PlayerState{
    constructor(){
        super(PLAYER_STATE_MINE, IdelState);
    }
}

class Order{
    constructor() {
      this.pattern = new MiningState();
    }
  
    nextPattern() {
      this.pattern = this.pattern.next();
    }
  }
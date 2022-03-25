'use strict'
class State{
    constructor(p_game){
        this.p_game = p_game;
    }
    Start(){
        throw new Error("This method must be overided!");
    }
    End(){
        throw new Error("This method must be overided!");
    }
}

class IdelState extends State{
    constructor(p_game){
        super(p_game);
    }
    Start(){
        console.log("Start Idel State!");
    }
    End(){
        this.p_game.changeState(new MiningState(this.p_game));
        console.log("End Idel State!");
    }
}

class MiningState extends State{
    constructor(p_game){
        super(p_game);
    }
    Start(){
        console.log("Start MiningState!");
    }
    End(){
        console.log("End MiningState!");
    }
}

class CutState extends State{
    constructor(p_game){
        super(p_game);
    }
    Start(){
        console.log("Start CutState!");
    }
    End(){
        console.log("End CutState!");
    }
}

export {IdelState, MiningState, CutState};
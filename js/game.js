class Game{
    constructor(){
        this.loopInterval = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;

        

        this.stats = new Statistics();

        this.inventory = new inventory();

        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
    }

    startMainLoop(){
        console.log('start main loop');
        this.loopInterval = window.setInterval(this.loop.bind(this), 500);
        this.loopStarted = true;
    }
    loop(){
        console.log('s');
    }

    stopMainLoop() {
        if (this.loopStarted) {
            clearInterval(this.loopInterval);
            this.loopStarted = false;
        }
    }

    serialize(){

    }
    deserialize(data){
        
    }
}

game = new Game();
game.inventory.update();
$("#stat-money").html("Wallet: <span>${0}</span>".format(2221212));
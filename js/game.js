class game{
    constructor(){
        this.loopInterval = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;

        this.woodcutting = new Woodcutting();

        this.stats = new Statistics();
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
class Game{
    constructor(){
        /* 单例模式 */
        if (typeof Game.instance === 'object') {
            throw new Error("You can only create one instance!");
        }
        Game.instance = this;

        this.loopInterval = -1;
        this.loopStarted = false;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;

        this.config = {
            'version': 0.1,
            'GameName': 'Immortal Idle',
        };
        this.achievementManager = new AchievementManager();
        this.achievementManager.init([
            [
                "Clicktastic", 
                "You clicked 1000 times!", 
                false,
                () => {
                    return (this.loopInterval > -2);
                },
                () => {
                    this.notification.pop_warning('data_test');
                },
            ],

            [
                "Clicktastic", 
                "You clicked 1000 times!", 
                false,
                () => {
                    return this.test;
                },
                () => {
                    this.notification.toast_warning('You clicked 1000 times!');
                },
            ]
        ]);
        this.gTimerManager = new TimerManager();
        this.stats = new Statistics();


        console.log("%c Loading %s Successfully!", 'background:#000;color:lime;font-style:italic', "Immortal Idle");
        this.ev = new EventHandle(this);
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
        //console.log(Object.keys(this));
        //console.log(Object.values(this));
        //console.log(Object.entries(this));
        //console.log(Object.values(this)[8].serialize());
        
        let res = {};
        for (let [k,v] of Object.entries(this)) {
            
            if(v.serialize == undefined){
                
                if(typeof(v) != 'object'){ 
                    res[k.toString()] = v;
                }

                
            }else{
                res[k.toString()] = v.serialize();
            }
        }
        let saveString = JSON.stringify(res);
        console.log(saveString);
        let cipher = btoa(pako.gzip(saveString, { to: 'string' }));
        localStorage.setItem('saveData', cipher);
        return cipher;
        

    }
    deserialize(data){
        let cipher = pako.ungzip(atob(data), { to: 'string' })
        let res = JSON.parse(cipher);
        //console.log(res);

        for (let [k,v] of Object.entries(this)) {
            
            if(v.serialize == undefined){
                
                if(typeof(v) != 'object'){
                    window["game"][k] = res[k];
                }
            }else{
                window["game"][k].deserialize(res[k]);
            }
        }
        return true;
    }
}

let game = new Game();
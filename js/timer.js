class TimerInfo{
	constructor(func, params, milliseconds, oneTime=true){
		this.oneTime = oneTime;
		this.threshold = milliseconds;
		this.current = 0;
		this.func = func;
		this.params = params;
		this.paused = false;
	}
}

class TimerManager{
	constructor(runtime = 1){
		this.timers = new Map();
		this.runtime = runtime;
        window.setInterval(this.Tick.bind(this), this.runtime);  
	}



	Tick(){
		this.timers.forEach((value, key, map)=>{
			if (!value.paused) {
				value.current += 1;

				if (value.current>=value.threshold) {
					value.func(...value.params);

					value.current = 0;

					if (value.oneTime) {
						map.delete(key);
					}
				}
			}
		});
	}

	Pause(tag, flag){
		const item = this.timers.get(tag);

		if (item) {
			item.paused = flag;
		}
	}

	PauseAll(flag){
		this.timers.forEach((value, key, map)=>{
			value.paused = flag;
		});
	}

	Delay(tag, delaytime){
		const item = this.timers.get(tag);
		if (item) {
			item.current = (item.current -delaytime)>0? (item.current -delaytime):0;
		}
	}

	ClearTimer(tag){
		if (this.timers.has(tag)) {
			this.timers.delete(tag);
		}
	}

	ClearAllTimers(){
		this.CleanUp();
	}

	CleanUp(){
		this.timers.clear();
	}

	CreateTimer(tag, func, params, milliseconds, oneTime=true){
		let item = this.timers.get(tag);

		if (item) {
			console.info(`Can not create a timer since ${tag} already exists.`);
		}
		else {
			item = new TimerInfo(func, params, milliseconds, oneTime);
			this.timers.set(tag, item);
		}
	}
}

/**
 * gTimerManager= new TimerManager();
 * function print(data){console.log(data)};
 * gTimerManager.CreateTimer("3times",(data)=>{print(data);}, ['3times'], 1000, false);
 */

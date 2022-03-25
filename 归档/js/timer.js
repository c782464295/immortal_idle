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
/**
 * 计时器默认100ms更新一次tick
 */
class TimerManager{
	constructor(runtime = 100){
		this.timers = new Map();
		this.runtime = runtime;
        window.setInterval(this.Tick.bind(this), this.runtime);

		// 用以恢复切换tab js不工作问题，暂时不考虑效率问题，等有明显卡顿再说
		this.OldTimestamp = null;
		this.NewTimestamp = null;
		
		document.addEventListener( 'visibilitychange' , () => {
			if(document.hidden){
				this.OldTimestamp = new Date().getTime();
				this.NewTimestamp = null;
			}else {
				this.NewTimestamp = new Date().getTime();
			}
			if(this.OldTimestamp!=null && this.NewTimestamp!=null){
				let diffTime = this.NewTimestamp - this.OldTimestamp;
				console.log(this);
				this.quickTick(diffTime);
				console.log("Offline time costs %d", new Date().getTime()-this.NewTimestamp);
			}
		}, false );
	}

	/* 用以离线时间的事件 不知道有没有BUG
	*/
	quickTick(diffTime){
		this.timers.forEach((value, key, map)=>{
			if (!value.paused) {
				for(let i=0;i < Math.floor(diffTime/value.threshold);i++) {
					value.func(...value.params);

					if (value.oneTime) {
						break;
					}
				}
			}
		});
	}

	Tick(){
		
		this.timers.forEach((value, key, map)=>{
			if (!value.paused) {
				value.current += 1 * this.runtime;

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

'use strict'
import { loc } from './locale.js';
import { global } from './global.js';

/** 用以追踪所有统计数据 */
class StatisticsTracker{
    constructor(){
        this.statistics = new Map();
    }
    add(stat, value){
        var a_;
        a_ = this.statistics.get(stat)?this.statistics.get(stat):0;
        this.statistics.set(stat, a_ + value);
    }
    set(stat, value){
        if(value){
            this.statistics.set(stat, value);
        }else{
            this.statistics.delete(stat);
        }
    }
    inc(stat) {
        this.add(stat, 1);
    }
    get(stat) {
        var _a;
        return (_a = this.statistics.get(stat)) !== null && _a !== void 0 ? _a : 0;
    }
    toJSON(){
        return {
            statistics:[...this.statistics],
        }
    }

    serialize(){
        return JSON.stringify(this);
    }
    deserialize(data){
        this.statistics.clear();
        //console.log(JSON.parse(data));
        JSON.parse(data)["statistics"].forEach((item,index,array)=>{
            this.statistics.set(item[0],item[1]);
        })
    }

}



class Statistics{
	constructor(){
        this.Mining = new StatisticsTracker();
		this.Woodcutting = new StatisticsTracker();
		this.Fishing = new StatisticsTracker();
		this.Firemaking = new StatisticsTracker();
    
    }
    serialize(){
        return {
            Mining:this.Mining.serialize(),
            Woodcutting:this.Woodcutting.serialize(),
            Fishing:this.Fishing.serialize(),
            Firemaking:this.Firemaking.serialize(),
        }
    }
    deserialize(data){
        this.Mining.deserialize(data['Mining']),
        this.Woodcutting.deserialize(data['Woodcutting']);
        this.Fishing.deserialize(data['Fishing']);
        this.Firemaking.deserialize(data['Firemaking']);
    }
}


let statistics = new Statistics();

export {statistics};
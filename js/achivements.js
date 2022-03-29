'use strict'
import {global} from './global.js';
import {} from './utility.js';
import {pop_warning,toast_warning} from './notify.js';

var achieve_list = {
    mining: {
        firstMining:{
            name:'firstgotalog',
            progress:()=>{},
            check:(x)=>{return x>0 ? true:false;},
            state: false,
            date:null,
            action:(new Date().Format("yyyy-MM-dd"))
        },

    },
    others: {

    },
    serialize(){
        return JSON.stringify(this);
    },
    deserialize(data){
        console.log(JSON.parse(data));
        for(let k in JSON.parse(data)){
            this[k] = JSON.parse(data)[k];
        }
    },
};

function checkAchievement(){
    for(let k in achieve_list){
        for(let achivement in achieve_list[k]){
            if(achieve_list[k][achivement].state == false){
                switch(k){
                    case 'mining':
                        achieve_list[k][achivement].check(global.pack.storage[3])? (achieve_list[k][achivement].state = true,pop_warning('a'),toast_warning('a')): achieve_list[k][achivement].state = false;
                        
                        break
                }
            }
            
            
        }
    }
}

export {achieve_list,checkAchievement};
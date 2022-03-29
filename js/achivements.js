'use strict'
import {global} from './global.js';

var achieve_list = {
    mining: {
        firstMining:{
            name:'firstgotalog',
            progress:()=>{},
            check:(x)=>{return x>0 ? true:false;},
            state: false,
            data:new Date()
        },

    },
    others: {

    },
};

function checkAchievement(){
    for(let k in achieve_list){
        for(let achivement in achieve_list[k]){
            if(achieve_list[k][achivement].state == false){
                switch(k){
                    case 'mining':
                        achieve_list[k][achivement].check(game.global.pack.storage[3])? (achieve_list[k][achivement].state = true,alert('a')): achieve_list[k][achivement].state = false;
                        break
                }
            }
            
            
        }
    }
}

export {achieve_list,checkAchievement};
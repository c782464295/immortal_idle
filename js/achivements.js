var achieve_list = {
    misc: {
        firstfarming:{
            name:'a',
            progress:()=>{},
            achive:(x)=>{return x.maxOfflineTicks>0 ? true:false;},
            state: false,
        },

    },
    others: {

    },
};

function checkAchievement(){
    achievements.forEach(function(achievement){
        console.log(achievement.checkFunction());
        if (achievement.checkFunction() && !achievement.state) {
              // award the achievement
              achievement.activeFunction(achievement.text);
              achievement.state = true;
        }
    })
}

export {achieve_list};
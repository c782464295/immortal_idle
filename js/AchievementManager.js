class Achievement{
    constructor(name, text, state, checkFunction, activeFunction){
        this.name = name;
        this.text = text;
        this.state = false;
        this.checkFunction = checkFunction;
        this.activeFunction = activeFunction;
    }
    
}

class AchievementManager{
    constructor(){
        this.achievements = [];
    }

    init(allAchive){
        allAchive.forEach(e => this.achievements.push(new Achievement(...e)));
    }

    checkAchievement(){
        this.achievements.forEach(function(achievement){
            console.log(achievement.checkFunction());
            if (achievement.checkFunction() && !achievement.state) {
                  // award the achievement
                  achievement.activeFunction(achievement.text);
                  achievement.state = true;
            }
       });
    } 
}
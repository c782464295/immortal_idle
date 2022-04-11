'use strict'
import { loc } from './locale.js';
import { global } from './global.js';


const achieve_list = [
    {
        id: 0,
        name: 'a',
        state: false,
        description: '',
        checkFunction: (x) => { return x.inventory.length > 0 ? true : false; },
    },
    {
        id: 1,
        name: 'a',
        state: false,
        description: '',
        checkFunction: (x) => { return 1 > 0 ? true : false; },
    },

]
class Achievement {
    constructor(id, name, text, state, checkFunction, activeFunction) {
        this.id = id;
        this.name = name;
        this.description = text;
        this.state = false;
        this.checkFunction = checkFunction;
    }

}

class AchievementManager {
    constructor(allAchive) {
        this.achievements = [];
        this.tickCounter = 0;
        allAchive.forEach(e => this.achievements.push(new Achievement(...Object.values(e))));
    }

    tick() {
        if (this.tickCounter > 10) {
            this.checkAchievement();
            this.tickCounter = 0;
        } else {
            this.tickCounter++;
        }
    }
    checkAchievement() {
        this.achievements.forEach(function (achievement) {
            if (!achievement.state && achievement.checkFunction(global)) {
                achievement.state = true;
                console.log('achivement unlocked');
            }
        });

    }

    serialize() {
        const sData = [];
        this.achievements.forEach(e => sData.push([e.id, e.state]));
        return sData;
    }
    deserialize(sData, version) {
        sData.forEach(e => this.achievements.filter(item => item.id == e[0])[0].state = e[1])
    }
}

let achievementManager = new AchievementManager(achieve_list);

export { achievementManager };
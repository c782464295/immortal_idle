'use strict'
import { loc } from '../locale.js';
import { global } from '../global.js';

class achivementUI extends HTMLElement {
    constructor() {
        super();
        achivementUI.counter = achivementUI.counter + 1 || 1;

        this.container = document.createElement("div");
        this.container.className = "achieve-card";


        this._data = undefined;
    }
    set data(val) {
        this._data = val;
    }

    connectedCallback() {
        this.appendChild(this.container);
    }
    render() {
        this.container.innerText = this._data.description + this._data.state;
    }

}

customElements.define('achivement-element', achivementUI);

const achieve_list = [
    {
        id: 0,
        name: 'a',
        state: false,
        description: '成就1',
        media: '',
        checkFunction: (x) => { return x.inventory.length > 0 ? true : false; },
    },
    {
        id: 1,
        name: 'a',
        state: false,
        description: '成就2',
        media: '',
        checkFunction: (x) => { return 1 > 0 ? true : false; },
    },

]
class Achievement {
    constructor(id, name, state, description, media, checkFunction) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.state = false;
        this.checkFunction = checkFunction;
    }

}

class AchievementManager {
    constructor(allAchive) {
        this.init = false;
        this.achievements = [];
        this.tickCounter = 0;
        this.achiveUI = [];
        allAchive.forEach(e => this.achievements.push(new Achievement(...Object.values(e))));
        this.parentDOM = document.getElementById("achieve-container");
    }

    tick() {
        if (!this.init) {
            this.init = true;
            this.checkAchievement();

            this.achievements.forEach(function (achievement) {

                let tmp_dom = new achivementUI();
                tmp_dom.data = achievement;
                this.achiveUI.push(tmp_dom);
                this.parentDOM.appendChild(tmp_dom);

            }.bind(this));
        }
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
    render() {
        this.achiveUI.forEach(function (achievement) {
            achievement.render();
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
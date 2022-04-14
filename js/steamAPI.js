'use strict'
import { loc } from './locale.js';
/* https://github.com/greenheartgames/greenworks */
class SteamAPI {
    constructor() {
        if (parent.greenworks.initAPI() && parent.greenworks.init()) connectedToSteam = true;
        else console.log("There was an error connecting to Steam. Steam Achievement functionality will not work.");
        if (connectedToSteam) checkForSteamAchievements();
    }

    checkForSteamAchievements() {

    }
    unlockSteamAchievement(achievementName, i) {
        try {
            parent.greenworks.activateAchievement(achievementName, function() {});
            steamAchievements[i] = 1;
        } catch (e) {
            console.log(e);
        }
    }

    resetSteamAchievements() {
        try {
            let achievementNames = parent.greenworks.getAchievementNames();
            steamAchievements = [];
            for (let i = 0; i < achievementNames.length; i++) {
                parent.greenworks.clearAchievement(achievementNames[i], function() {});
                steamAchievements.push(0);
            }
        } catch (e) {
            console.log(e);
        }
    }
    /** can save game to steam? */
}

let steamAPI = new SteamAPI();

export {steamAPI};
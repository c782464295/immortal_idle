"use strict";
export const MAX_LEVEL = 99;
class Exp {
    constructor(maxLevel) {
        this.table = [0];
        this.xpSum = 0;
        this.maxLevel = maxLevel;
    }
    equate(level) {
        return Math.floor(level + 300 * Math.pow(2, level / 7));
    }
    level_to_xp(level) {
        if (this.table.length >= level)
            return this.table[level - 1];
        else {
            for (let i = this.table.length; i < level; i++) {
                this.xpSum += this.equate(i);
                this.table.push(Math.floor(this.xpSum / 4));
            }
            return this.table[level - 1];
        }
    }
    xp_to_level(xp, level = 0) {
        do {
            level++;
            if (level > this.maxLevel) break;
        } while (this.level_to_xp(level) < xp);
        if (xp <= 0)
            level = 1;
        return level - 1;
    }
    progress(xp) {
        let diff = this.level_to_xp(this.xp_to_level(xp) + 1) - this.level_to_xp(this.xp_to_level(xp));
        let current_exp_diff = xp - this.level_to_xp(this.xp_to_level(xp));

        let rate = Math.floor(current_exp_diff / diff * 100);
        return rate;
    }
}
const exp = new Exp(MAX_LEVEL);

export { exp };
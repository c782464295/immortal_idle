"use strict";
import { MAX_LEVEL } from './global.js';
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
        return level-1;
    }
}
const exp = new Exp(MAX_LEVEL);

export { exp };
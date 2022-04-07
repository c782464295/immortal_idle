"use strict";
class Exp {
    constructor() {
        this.table = [0];
        this.xpSum = 0;
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
    xp_to_level(xp, level=1) {
        while (this.level_to_xp(level) < xp)
            level++;
            if(level > 99) return level;
        if (xp <= 0)
            level = 2;
        return level;
    }
}
const exp = new Exp();

export default exp;
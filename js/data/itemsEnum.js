'use strict'

export const itemsEnum = {
    log0: 0,
    log1: 1,
    log2: 2,
    log3: 3,
    log4: 4,
    log5: 5,
    log6: 6,
    log7: 7,
    log8: 8,

    ore0: 16 + 0,
    ore1: 16 + 1,
    ore2: 16 + 2,
    ore3: 16 + 3,
    ore4: 16 + 4,
    ore5: 16 + 5,
    ore6: 16 + 6,
    ore7: 16 + 8,
    ore8: 16 + 9,

    fish0: 32 + 0,
    fish1: 32 + 1,
    fish2: 32 + 2,
    fish3: 32 + 3,
    fish4: 32 + 4,
    fish5: 32 + 5,
    fish6: 32 + 6,
    fish7: 32 + 7,
    fish8: 32 + 8,
    fish9: 32 + 9,
    fish10: 32 + 10,
    fish11: 32 + 11,
    fish12: 32 + 12,
    fish13: 32 + 13,
    fish14: 32 + 14,
    fish15: 32 + 15,
    fish16: 32 + 16,
    fish17: 32 + 17,
    fish18: 32 + 18,
    fish19: 32 + 19,
    fish20: 32 + 20,
    fish21: 32 + 21,
    fish22: 32 + 22,
    fish23: 32 + 23,
    
    get: function (value) {
        return Object.keys(this).find(key => this[key] === value);
    }
}
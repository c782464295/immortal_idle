'use strict'
export const achieve_list = [
    {
        id: 0,
        name: 'a',
        state: false,
        description: '成就1',
        media: './assets/achievements/firemaking.png',
        checkFunction: (x) => { return x.inventory.length > 0 ? true : false; },
    },
    {
        id: 1,
        name: 'a',
        state: false,
        description: '成就2',
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 1 > 0 ? true : false; },
    },
    {
        id: 2,
        name: 'a',
        state: false,
        description: '成就3',
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 0 > 1 ? true : false; },
    },
    {
        id: 3,
        name: 'a',
        state: false,
        description: '成就3',
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 0 > 1 ? true : false; },
    },

]
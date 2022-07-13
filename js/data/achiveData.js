'use strict'
import { loc } from '../locale.js';

export const achieve_list = [
    {
        id: 0,
        name: loc('achivement')['achive_name_0'],
        state: false,
        description: loc('achivement')['achive_des_0'],
        hint: "Suit up.",
        media: './assets/achievements/firemaking.png',
        checkFunction: (x) => { return x.inventory.length > 0 ? true : false; },
        effect: () => {
            this.storeService.unlockManual(this.itemRepoService.items['useSpiritGemManual']);
        },
    },
    {
        id: 1,
        name: loc('achivement')['achive_name_1'],
        state: false,
        description: loc('achivement')['achive_des_1'],
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 1 > 0 ? true : false; },
    },
    {
        id: 2,
        name: loc('achivement')['achive_name_2'],
        state: false,
        description: loc('achivement')['achive_des_2'],
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 0 > 1 ? true : false; },
    },
    {
        id: 3,
        name: loc('achivement')['achive_name_3'],
        state: false,
        description: loc('achivement')['achive_des_3'],
        media: './assets/achievements/woodcutting.png',
        checkFunction: (x) => { return 0 > 1 ? true : false; },
    },

]
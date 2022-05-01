"use strict";
import { loc } from '../locale.js';

export const fishData = [
    {
        areaId: 0,
        name: loc('miningArea')['ore_name_0'],
        description: loc('miningDescription')['ore_description_0'],
        requirelevel: 1,
        requireEquipId: -1,
        fish: [
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 }
        ],
        chest: { id: 0, probability: 1 / 100, name: 'a' }
    },
    {
        areaId: 1,
        name: loc('miningArea')['ore_name_0'],
        description: loc('miningDescription')['ore_description_0'],
        requirelevel: 1,
        requireEquipId: -1,
        fish: [
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 }
        ],
        chest: { id: 0, probability: 1 / 100, name: 'a' }
    },
    {
        areaId: 2,
        name: loc('miningArea')['ore_name_0'],
        description: loc('miningDescription')['ore_description_0'],
        requirelevel: 1,
        requireEquipId: 1,
        fish: [
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 },
            { id: 0, baseInterval: 2000, baseXP: 10 }
        ],
        chest: { id: 0, probability: 1 / 100, name: 'a' }
    },

];

const fishes = ["🐟 🐠 🐡", "🐡", "🐠", "🐟", "🐟 🐠 🦑 🐙"];
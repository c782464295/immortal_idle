"use strict";
import { loc } from '../locale.js';

export const modifier = {
    "CuttingDoubleRate": 0,
    "BirdNestDropRate": 1,

    0: "CuttingDoubleRate",
    1: "BirdNestDropRate",
}

export const modifierData = [
    {
        id: modifier.CuttingDoubleRate,
        name: 'CuttingDoubleRate',
        description: '伐木双倍概率',
        baseValue: 3,
        baseMultiplier: 0,
    },
    {
        id: 1,
        name: modifier.BirdNestDropRate,
        description: '伐木双倍概率',
        baseValue: 3,
        baseMultiplier: 0,
    },
    {
        id: 2,
        name: loc('tree0'),
        description: '伐木掉落鸟巢概率',
        baseValue: 5,
        baseMultiplier: 0,
    },

]
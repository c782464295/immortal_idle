"use strict";
import { loc } from '../locale.js';


export const KanData = [
    {
        id: 0,
        name: "CuttingDoubleRate",
        baseValueRange: [1, 10],
        baseMultiplierRange: [0, 0],
    },
    {
        id: 1,
        name: 'BirdNestDropRate',
        baseValueRange: [1, 10],
        baseMultiplierRange: [0, 0],
    },
]


export const prayData = [
    {
        id: 0,
        name: 'CuttingDoubleRate',
        description: '伐木双倍概率',
        baseValue: 3,
        baseMultiplier: 0,
    },
    {
        id: 1,
        name: 'BirdNestDropRate',
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
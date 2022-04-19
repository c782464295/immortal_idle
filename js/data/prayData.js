"use strict";
import { loc } from '../locale.js';
import { modifier } from './modifier.js';

export const KanData = [
    {
        id: modifier.CuttingDoubleRate,
        name: "CuttingDoubleRate",
        baseValueRange: [1, 10],
        baseMultiplierRange: [0, 0],
    },
    {
        id: modifier.BirdNestDropRate,
        name: 'BirdNestDropRate',
        baseValueRange: [1, 10],
        baseMultiplierRange: [0, 0],
    },
]
export const KunData = [
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

export const EightDiagrams = [
    { id: 0, name: '乾', media: '../assets/pray/Trigramme2630_☰.svg', data: KanData },
    { id: 1, name: '坤', media: '', data: KunData },
    { id: 2, name: '震', media: '', data: KunData },
    { id: 3, name: '巽', media: '', data: KunData },
    { id: 4, name: '坎', media: '', data: KunData },
    { id: 5, name: '离', media: '', data: KunData },
    { id: 6, name: '艮', media: '', data: KunData },
    { id: 7, name: '兑', media: '', data: KunData },
]

export const SlotIndex = {
    SlotIndex_0_0: 0,
    SlotIndex_0_1: 1,
    SlotIndex_0_2: 2,
    SlotIndex_0_3: 3,
    SlotIndex_0_4: 4,
    SlotIndex_0_5: 5,
    SlotIndex_0_6: 6,
    SlotIndex_0_7: 7,

    SlotIndex_1_0: 8,
    SlotIndex_1_1: 9,
    SlotIndex_1_2: 10,
    SlotIndex_1_3: 11,
    SlotIndex_1_4: 12,
    SlotIndex_1_5: 13,
    SlotIndex_1_6: 14,
    SlotIndex_1_7: 15,
    
    SlotIndex_2_0: 16,
    SlotIndex_2_1: 17,
    SlotIndex_2_2: 18,
    SlotIndex_2_3: 19,
    SlotIndex_2_4: 20,
    SlotIndex_2_5: 21,
    SlotIndex_2_6: 22,
    SlotIndex_2_7: 23,
    
    SlotIndex_3_0: 24,
    SlotIndex_3_1: 25,
    SlotIndex_3_2: 26,
    SlotIndex_3_3: 27,
    SlotIndex_3_4: 28,
    SlotIndex_3_5: 29,
    SlotIndex_3_6: 30,
    SlotIndex_3_7: 31,

    SlotIndex_4_0: 32,
    SlotIndex_4_1: 33,
    SlotIndex_4_2: 34,
    SlotIndex_4_3: 35,
    SlotIndex_4_4: 36,
    SlotIndex_4_5: 37,
    SlotIndex_4_6: 38,
    SlotIndex_4_7: 39,

    SlotIndex_5_0: 40,
    SlotIndex_5_1: 41,
    SlotIndex_5_2: 42,
    SlotIndex_5_3: 43,
    SlotIndex_5_4: 44,
    SlotIndex_5_5: 45,
    SlotIndex_5_6: 46,
    SlotIndex_5_7: 47,

    SlotIndex_6_0: 48,
    SlotIndex_6_1: 49,
    SlotIndex_6_2: 50,
    SlotIndex_6_3: 51,
    SlotIndex_6_4: 52,
    SlotIndex_6_5: 53,
    SlotIndex_6_6: 54,
    SlotIndex_6_7: 55,

    SlotIndex_7_0: 56,
    SlotIndex_7_1: 57,
    SlotIndex_7_2: 58,
    SlotIndex_7_3: 59,
    SlotIndex_7_4: 60,
    SlotIndex_7_5: 61,
    SlotIndex_7_6: 62,
    SlotIndex_7_7: 63,
}


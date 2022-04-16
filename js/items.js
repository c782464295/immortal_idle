'use strict'
import { getItemName } from './locale.js';

// melvoridle有1200件物品
export const items = [
    {
        category: "Woodcutting",
        type: "Logs",
        id:1,
        get name() {
            return getItemName("oka1");
        },
        get description() {
            return getItemName("oka1");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/items/logs_magic.png",
    },
    {
        category: "Woodcutting",
        type: "Logs",
        id:2,
        get name() {
            return getItemName("oka2");
        },
        get description() {
            return getItemName("oka2");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/items/logs_mahogany.png",
    },
    {
        category: "Woodcutting",
        type: "Logs",
        id:3,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/items/logs_yew.png",
    },
    {
        category: "Raw Fish",
        type: "Logs",
        id:11,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka");
        },
        isEquipment: false,
        sellPrice: 1,
        media: "assets/items/logs_magic.png",
    },
    {
        category: "Cooking",
        type: "Food",
        id:11,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka");
        },
        canEat: true,
        healsFor: 3,
        sellPrice: 1,
        media: "assets/items/logs_magic.png",
    },
    {
        category: "Mining",
        type: "Ores",
        id:11,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka");
        },
        isEquipment: false,
        sellPrice: 1,
        media: "assets/items/logs_magic.png",
    },
    {
        category: "Farming",
        type: "Seeds",
        id:111,
        get name() {
            return getItemName("mucai");
        },
        get description() {
            return getItemName("mucaimiaoshu");
        },
        farmingLevel: 1,
        farmingXP: 8,
        grownItemID: 151,
        timeToGrow: 7200,
        isEquipment: false,
        sellPrice: 1,
        media: "assets/items/apple_pie.png",
    },
]

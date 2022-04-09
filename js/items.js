'use strict'
import { getItemName } from './locale.js';

// melvoridle有1200件物品
export const items = [
    {
        category: "Woodcutting",
        type: "Logs",
        id:1,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka1");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/svg/trees/normal_tree.svg",
    },
    {
        category: "Woodcutting",
        type: "Logs",
        id:2,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka2");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/svg/trees/oak_tree.svg",
    },
    {
        category: "Woodcutting",
        type: "Logs",
        id:15,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka2");
        },
        isEquipment: false,
        sellPrice: 10,
        media: "assets/svg/trees/oak_tree.svg",
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
        media: "assets/svg/trees/willow_tree.svg",
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
        media: "assets/media/bank/logs_normal.png?2",
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
        media: "assets/media/bank/logs_normal.png?2",
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
        media: "assets/media/bank/logs_normal.png?2",
    },
    {
        category: "Farming",
        type: "Seeds",
        id:11,
        get name() {
            return getItemName("oka");
        },
        get description() {
            return getItemName("oka");
        },
        farmingLevel: 1,
        farmingXP: 8,
        grownItemID: 151,
        timeToGrow: 7200,
        isEquipment: false,
        sellPrice: 1,
        media: "assets/media/bank/logs_normal.png?2",
    },
]

console.log(items);
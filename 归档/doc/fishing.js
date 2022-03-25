"use strict";
class Fishing extends GatheringSkill {
    constructor() {
        super(...arguments);
        this.id = Skills.Fishing;
        this.activeID = ActiveSkills.FISHING;
        this.pageID = Pages.Fishing;
        this.skillPetID = 1;
        this.renderQueue = {
            actionMastery: new Set(),
            skillMastery: false,
            progressBar: false,
            skillNav: false,
            gloves: new Set(),
            selectedAreaFish: false,
            selectedAreaFishRates: false,
            areaChances: false,
            areaUnlock: false,
            areaButtons: false,
            activeArea: false,
        };
        this.secretAreaUnlocked = false;
        this.selectedAreaFish = new Map();
        this.activeFishingArea = Fishing.areas[0];
        this.hiddenAreas = new Set();
    }
    get actionInterval() {
        const minTicks = this.getMinFishInterval(this.activeFish) / TICK_INTERVAL;
        const maxTicks = this.getMaxFishInterval(this.activeFish) / TICK_INTERVAL;
        return TICK_INTERVAL * rollInteger(minTicks, maxTicks);
    }
    get actionLevel() {
        return this.activeFish.level;
    }
    get masteryID() {
        return this.activeFish.masteryID;
    }
    get activeFish() {
        const fish = this.selectedAreaFish.get(this.activeFishingArea);
        if (fish === undefined)
            throw new Error('Tried to get active fish from area, but area has no fish selected');
        return fish;
    }
    unlockSecretArea() {
        if (this.secretAreaUnlocked)
            return;
        this.secretAreaUnlocked = true;
        this.renderQueue.areaUnlock = true;
        this.render();
    }
    getMinFishInterval(fish) {
        return this.modifyInterval(fish.baseMinInterval, fish.masteryID);
    }
    getMaxFishInterval(fish) {
        return this.modifyInterval(fish.baseMaxInterval, fish.masteryID);
    }
    getUncappedDoublingChance(masteryID) {
        let chance = super.getUncappedDoublingChance(masteryID);
        if (this.isPoolTierActive(2))
            chance += 5;
        return chance;
    }
    getAreaChances(area) {
        const chances = new FishingAreaChances();
        chances.setChancesFromArea(area);
        const fishToSpecialShift = player.modifiers.increasedFishingSpecialChance - player.modifiers.decreasedFishingSpecialChance;
        let bonusSpecialChance = player.modifiers.summoningSynergy_3_5;
        let noJunk = this.isPoolTierActive(1);
        const fish = this.selectedAreaFish.get(area);
        if (fish !== undefined) {
            const masteryLevel = getMasteryLevel(this.id, fish.masteryID);
            if (masteryLevel >= 50)
                bonusSpecialChance += 3;
            if (masteryLevel >= 65)
                noJunk = true;
        }
        chances.addBonusSpecialChance(bonusSpecialChance);
        chances.shiftFishToSpecial(fishToSpecialShift);
        if (noJunk)
            chances.shiftJunkToFish(chances.junk);
        return chances;
    }
    preAction() {}
    get actionRewards() {
        const rewards = new Rewards();
        const chances = this.getAreaChances(this.activeFishingArea);
        const fish = this.activeFish;
        let rewardType = chances.rollForRewardType();
        if (!tutorialComplete)
            rewardType = FishingRewardType.Fish;
        const masteryLevel = this.masteryLevel;
        let rewardQty = 1;
        if (masteryLevel >= 99 || rollPercentage(masteryLevel * 0.4))
            rewardQty *= 2;
        const doublingChance = this.getDoublingChance(this.masteryID);
        if (rollPercentage(doublingChance))
            rewardQty *= 2;
        rewardQty *= Math.pow(2, player.modifiers.getSkillModifierValue('doubleItemsSkill', this.id));
        const chanceForExtraResource = player.modifiers.getSkillModifierValue('increasedChanceAdditionalSkillResource', this.id) - player.modifiers.getSkillModifierValue('decreasedChanceAdditionalSkillResource', this.id);
        if (rollPercentage(chanceForExtraResource))
            rewardQty++;
        let rewardItemID;
        switch (rewardType) {
        case FishingRewardType.Fish:
            rewardItemID = fish.itemID;
            game.stats.Fishing.add(FishingStats.FishCaught, rewardQty);
            break;
        case FishingRewardType.Junk:
            rewardItemID = getRandomArrayElement(Fishing.junkItems);
            game.stats.Fishing.add(FishingStats.JunkCaught, rewardQty);
            break;
        case FishingRewardType.Special:
            rewardItemID = game.getItemFromLootTable(Fishing.specialItems).itemID;
            game.stats.Fishing.add(FishingStats.SpecialItemsCaught, rewardQty);
            if (this.isPoolTierActive(3) && rollPercentage(25)) {
                rewards.addItem(game.getItemFromLootTable(Fishing.specialItems).itemID, 1);
                game.stats.Fishing.inc(FishingStats.SpecialItemsCaught);
            }
            break;
        }
        if (rewardItemID === Items.Raw_Herring && player.equipment.checkForItemID(680) && this.masteryPoolProgress >= 100 && masteryLevel >= 99 && rollPercentage(0.01))
            rewardItemID = 1000;
        rewards.addItem(rewardItemID, rewardQty);
        const rewardItem = items[rewardItemID];
        if (rewardType !== FishingRewardType.Junk) {
            rewards.addXP(this.id, fish.baseXP);
            if (fish.strengthXP > 0)
                rewards.addXP(Skills.Strength, fish.strengthXP);
        } else {
            rewards.addXP(this.id, 1);
        }
        this.addCommonRewards(rewards);
        this.useSummonCharge(Summons.Octopus, rewards);
        if (this.isPotionActive)
            this.checkSynergyAndConsumeCharges(Summons.Octopus, Summons.Bear, rewards);
        this.checkSynergyAndConsumeCharges(Summons.Octopus, Summons.Ent, rewards);
        if (rewardItem.type === 'Gem') {
            if (rollPercentage(player.modifiers.summoningSynergy_4_5))
                rewards.addItem(getRandomGem(), 1);
            this.checkSynergyAndConsumeCharges(Summons.Octopus, Summons.Mole, rewards);
        }
        const cookedItem = Cooking.getIngredientCookedVersion(rewardItemID);
        if (cookedItem !== undefined) {
            if (rollPercentage(player.modifiers.summoningSynergy_5_9))
                rewards.addItem(cookedItem, 1);
            this.checkSynergyAndConsumeCharges(Summons.Octopus, Summons.Pig, rewards);
        }
        if (!tutorialComplete)
            updateTutorialTaskProgress({
                itemID: rewardItemID,
                qty: rewardQty
            }, {}, {});
        return rewards;
    }
    postAction() {
        this.consumePotionCharge();
        player.consumeQuiver('Fishing');
        game.stats.Fishing.inc(FishingStats.Actions);
        game.stats.Fishing.add(FishingStats.TimeSpent, this.currentActionInterval);
        this.renderQueue.selectedAreaFishRates = true;
        this.renderQueue.areaChances = true;
    }
    get masteryModifiedInterval() {
        return this.currentActionInterval;
    }
    onModifierChange() {
        this.renderQueue.areaChances = true;
        this.renderQueue.selectedAreaFishRates = true;
    }
    onEquipmentChange() {
        this.renderQueue.areaUnlock = true;
    }
    onLevelUp() {
        this.renderQueue.areaButtons = true;
    }
    getErrorLog() {
        const selectedFishLog = [];
        this.selectedAreaFish.forEach((fish,area)=>{
            selectedFishLog.push(`${FishingAreas[area.id]}:${fish.masteryID}`);
        }
        );
        return `${super.getErrorLog()}
Active Area: ${FishingAreas[this.activeFishingArea.id]}
Selected Area Fish: 
${selectedFishLog.join('\n')}
`;
    }
    onLoad() {
        Fishing.areas.forEach((area,id)=>{
            fishingAreaMenus[id].setAreaData(area);
        }
        );
        this.renderQueue.selectedAreaFish = true;
        this.renderQueue.selectedAreaFishRates = true;
        this.renderQueue.areaChances = true;
        this.renderQueue.areaButtons = true;
        this.renderQueue.areaUnlock = true;
        if (this.isActive) {
            this.renderQueue.skillNav = true;
            this.renderQueue.activeArea = true;
        }
        this.renderHiddenAreas();
    }
    onStop() {
        fishingAreaMenus[this.activeFishingArea.id].setActionInactive();
    }
    onAreaStartButtonClick(area) {
        const wasActive = this.isActive;
        if (this.isActive && !this.stop())
            return;
        const prevArea = this.activeFishingArea;
        this.activeFishingArea = area;
        if ((!wasActive || area !== prevArea) && this.selectedAreaFish.get(area) !== undefined && this.level >= this.activeFish.level) {
            this.start();
            this.renderQueue.activeArea = true;
        }
        this.render();
    }
    renderHiddenAreas() {
        Fishing.areas.forEach((area)=>{
            const menu = fishingAreaMenus[area.id];
            if (this.hiddenAreas.has(area))
                menu.hideAreaPanel();
            else
                menu.showAreaPanel();
        }
        );
    }
    onAreaHeaderClick(area) {
        if (this.hiddenAreas.has(area)) {
            this.hiddenAreas.delete(area);
            fishingAreaMenus[area.id].showAreaPanel();
        } else {
            this.hiddenAreas.add(area);
            fishingAreaMenus[area.id].hideAreaPanel();
        }
    }
    onAreaFishSelection(area, fish) {
        const previousSelection = this.selectedAreaFish.get(area);
        if (area === this.activeFishingArea && previousSelection !== fish && this.isActive && !this.stop())
            return;
        this.selectedAreaFish.set(area, fish);
        this.renderQueue.selectedAreaFish = true;
        this.renderQueue.selectedAreaFishRates = true;
        this.renderQueue.areaChances = true;
        this.renderQueue.actionMastery.add(fish.masteryID);
        this.render();
    }
    render() {
        this.renderSelectedAreaFish();
        super.render();
        this.renderSelectedFishRates();
        this.renderAreaChances();
        this.renderAreaButtons();
        this.renderAreaUnlock();
        this.renderActiveArea();
    }
    renderSelectedAreaFish() {
        if (!this.renderQueue.selectedAreaFish)
            return;
        Fishing.areas.forEach((area,id)=>{
            const menu = fishingAreaMenus[id];
            const selectedFish = this.selectedAreaFish.get(area);
            if (selectedFish !== undefined) {
                menu.setSelectedFish(selectedFish);
            } else {
                menu.setUnselected();
            }
        }
        );
        this.renderQueue.selectedAreaFish = false;
    }
    renderSelectedFishRates() {
        if (!this.renderQueue.selectedAreaFishRates)
            return;
        Fishing.areas.forEach((area,id)=>{
            const menu = fishingAreaMenus[id];
            const selectedFish = this.selectedAreaFish.get(area);
            if (selectedFish !== undefined) {
                menu.updateSelectedFishRates(selectedFish);
            }
        }
        );
        this.renderQueue.selectedAreaFishRates = false;
    }
    renderAreaChances() {
        if (!this.renderQueue.areaChances)
            return;
        Fishing.areas.forEach((area,id)=>{
            fishingAreaMenus[id].setChances(this.getAreaChances(area), area);
        }
        );
        this.renderQueue.areaChances = false;
    }
    renderAreaButtons() {
        if (!this.renderQueue.areaButtons)
            return;
        Fishing.areas.forEach((area,i)=>{
            fishingAreaMenus[i].updateButtons(area);
        }
        );
        this.renderQueue.areaButtons = false;
    }
    renderAreaUnlock() {
        if (!this.renderQueue.areaUnlock)
            return;
        if (this.secretAreaUnlocked) {
            showElement(fishingAreaMenus[FishingAreas.SecretArea]);
        } else {
            hideElement(fishingAreaMenus[FishingAreas.SecretArea]);
        }
        if (player.equipment.checkForItemID(Items.Barbarian_Gloves)) {
            showElement(fishingAreaMenus[FishingAreas.BarbarianFishing]);
        } else {
            hideElement(fishingAreaMenus[FishingAreas.BarbarianFishing]);
        }
        this.renderQueue.areaUnlock = false;
    }
    renderActiveArea() {
        if (!this.renderQueue.activeArea)
            return;
        if (this.isActive) {
            fishingAreaMenus[this.activeFishingArea.id].setActionActive();
        }
        this.renderQueue.activeArea = false;
    }
    serialize() {
        const writer = new DataWriter();
        writer.addVariableLengthChunk(super.serialize());
        writer.addBool(this.secretAreaUnlocked);
        writer.addNumber(this.activeFishingArea.id);
        writer.addNumber(this.selectedAreaFish.size);
        this.selectedAreaFish.forEach((fish,area)=>{
            writer.addNumber(area.id);
            writer.addNumber(fish.masteryID);
        }
        );
        writer.addNumber(this.hiddenAreas.size);
        this.hiddenAreas.forEach((area)=>{
            writer.addNumber(area.id);
        }
        );
        return writer.data;
    }
    deserialize(reader, version) {
        super.deserialize(reader.getVariableLengthChunk(), version);
        this.secretAreaUnlocked = reader.getBool();
        this.activeFishingArea = Fishing.areas[reader.getNumber()];
        const numSetAreas = reader.getNumber();
        for (let i = 0; i < numSetAreas; i++) {
            this.selectedAreaFish.set(Fishing.areas[reader.getNumber()], Fishing.data[reader.getNumber()]);
        }
        if (version >= 17) {
            const numHiddenAreas = reader.getNumber();
            for (let i = 0; i < numHiddenAreas; i++) {
                this.hiddenAreas.add(Fishing.areas[reader.getNumber()]);
            }
        }
    }
    convertFromOldFormat(savegame) {
        if (savegame.secretAreaUnlocked !== undefined)
            this.secretAreaUnlocked = savegame.secretAreaUnlocked;
    }
}
Fishing.data = [{
    baseXP: 5,
    strengthXP: 0,
    level: 1,
    masteryID: 0,
    itemID: Items.Raw_Shrimp,
    baseMinInterval: 4000,
    baseMaxInterval: 8000,
}, {
    baseXP: 10,
    strengthXP: 0,
    level: 5,
    masteryID: 1,
    itemID: Items.Raw_Sardine,
    baseMinInterval: 4000,
    baseMaxInterval: 8000,
}, {
    baseXP: 15,
    strengthXP: 0,
    level: 10,
    masteryID: 2,
    itemID: Items.Raw_Herring,
    baseMinInterval: 4000,
    baseMaxInterval: 8000,
}, {
    baseXP: 20,
    strengthXP: 0,
    level: 20,
    masteryID: 3,
    itemID: Items.Raw_Trout,
    baseMinInterval: 4000,
    baseMaxInterval: 10000,
}, {
    baseXP: 40,
    strengthXP: 0,
    level: 35,
    masteryID: 4,
    itemID: Items.Raw_Salmon,
    baseMinInterval: 4000,
    baseMaxInterval: 10000,
}, {
    baseXP: 50,
    strengthXP: 0,
    level: 40,
    masteryID: 5,
    itemID: Items.Raw_Lobster,
    baseMinInterval: 4000,
    baseMaxInterval: 11000,
}, {
    baseXP: 80,
    strengthXP: 0,
    level: 50,
    masteryID: 6,
    itemID: Items.Raw_Swordfish,
    baseMinInterval: 5000,
    baseMaxInterval: 12000,
}, {
    baseXP: 120,
    strengthXP: 0,
    level: 60,
    masteryID: 7,
    itemID: Items.Raw_Crab,
    baseMinInterval: 5000,
    baseMaxInterval: 12000,
}, {
    baseXP: 150,
    strengthXP: 0,
    level: 70,
    masteryID: 8,
    itemID: Items.Raw_Shark,
    baseMinInterval: 7000,
    baseMaxInterval: 15000,
}, {
    baseXP: 300,
    strengthXP: 0,
    level: 75,
    masteryID: 9,
    itemID: Items.Raw_Cave_Fish,
    baseMinInterval: 8000,
    baseMaxInterval: 15000,
}, {
    baseXP: 495,
    strengthXP: 0,
    level: 85,
    masteryID: 10,
    itemID: Items.Raw_Manta_Ray,
    baseMinInterval: 9000,
    baseMaxInterval: 25000,
}, {
    baseXP: 575,
    strengthXP: 0,
    level: 95,
    masteryID: 11,
    itemID: Items.Raw_Whale,
    baseMinInterval: 10000,
    baseMaxInterval: 25000,
}, {
    baseXP: 12,
    strengthXP: 0,
    level: 8,
    masteryID: 12,
    itemID: Items.Raw_Blowfish,
    baseMinInterval: 3000,
    baseMaxInterval: 8000,
}, {
    baseXP: 25,
    strengthXP: 0,
    level: 30,
    masteryID: 13,
    itemID: Items.Raw_Poison_Fish,
    baseMinInterval: 3000,
    baseMaxInterval: 10000,
}, {
    baseXP: 20,
    strengthXP: 10,
    level: 20,
    masteryID: 14,
    itemID: Items.Leaping_Trout,
    baseMinInterval: 3000,
    baseMaxInterval: 10000,
}, {
    baseXP: 40,
    strengthXP: 15,
    level: 35,
    masteryID: 15,
    itemID: Items.Leaping_Salmon,
    baseMinInterval: 3000,
    baseMaxInterval: 12000,
}, {
    baseXP: 100,
    strengthXP: 25,
    level: 70,
    masteryID: 16,
    itemID: Items.Leaping_Broad_Fish,
    baseMinInterval: 4000,
    baseMaxInterval: 12000,
}, {
    baseXP: 325,
    strengthXP: 0,
    level: 80,
    masteryID: 17,
    itemID: Items.Raw_Magic_Fish,
    baseMinInterval: 12000,
    baseMaxInterval: 30000,
}, {
    baseXP: 100,
    strengthXP: 0,
    level: 50,
    masteryID: 18,
    itemID: Items.Raw_Anglerfish,
    baseMinInterval: 5000,
    baseMaxInterval: 12000,
}, {
    baseXP: 120,
    strengthXP: 0,
    level: 55,
    masteryID: 19,
    itemID: Items.Raw_Fanfish,
    baseMinInterval: 4000,
    baseMaxInterval: 10000,
}, {
    baseXP: 25,
    strengthXP: 0,
    level: 15,
    masteryID: 20,
    itemID: Items.Raw_Seahorse,
    baseMinInterval: 3000,
    baseMaxInterval: 10000,
}, {
    baseXP: 130,
    strengthXP: 0,
    level: 65,
    masteryID: 21,
    itemID: Items.Raw_Carp,
    baseMinInterval: 6000,
    baseMaxInterval: 15000,
}, {
    baseXP: 100,
    strengthXP: 0,
    level: 45,
    masteryID: 22,
    itemID: Items.Raw_Skeleton_Fish,
    baseMinInterval: 4000,
    baseMaxInterval: 12000,
}, ];
Fishing.areas = [{
    id: FishingAreas.ShallowShores,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 75,
    junkChance: 25,
    specialChance: 0,
    fish: [Fishing.data[0], Fishing.data[5], Fishing.data[7]],
}, {
    id: FishingAreas.ShrapnelRiver,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 80,
    junkChance: 20,
    specialChance: 0,
    fish: [Fishing.data[1], Fishing.data[2], Fishing.data[21], ],
}, {
    id: FishingAreas.TrenchOfDespair,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 70,
    junkChance: 28,
    specialChance: 2,
    fish: [Fishing.data[12], Fishing.data[13], Fishing.data[18], Fishing.data[9], ],
}, {
    id: FishingAreas.LemvorPier,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 70,
    junkChance: 29,
    specialChance: 1,
    fish: [Fishing.data[3], Fishing.data[4], Fishing.data[19], ],
}, {
    id: FishingAreas.OpenWaters,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 69,
    junkChance: 29,
    specialChance: 2,
    fish: [Fishing.data[6], Fishing.data[10]],
}, {
    id: FishingAreas.BarrenOcean,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 90,
    junkChance: 10,
    specialChance: 0,
    fish: [Fishing.data[8], Fishing.data[11]],
}, {
    id: FishingAreas.BarbarianFishing,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    get description() {
        return getLangString('FISHING', `AREA_DESCRIPTION_${this.id}`);
    },
    fishChance: 95,
    junkChance: 5,
    specialChance: 0,
    fish: [Fishing.data[14], Fishing.data[15], Fishing.data[16], ],
}, {
    id: FishingAreas.SecretArea,
    get name() {
        return getLangString('FISHING', `AREA_NAME_${this.id}`);
    },
    fishChance: 95,
    junkChance: 0,
    specialChance: 5,
    fish: [Fishing.data[20], Fishing.data[22], Fishing.data[17], ],
}, ];
Fishing.junkItems = [Items.Old_Boot, Items.Old_Hat, Items.Seaweed, Items.Rusty_Key, Items.Shell, Items.Rope, Items.Glass_Bottle, Items.Rubber_Ducky, ];
Fishing.specialItems = [[Items.Topaz, 2000, 1], [Items.Sapphire, 1600, 1], [Items.Ruby, 1400, 1], [Items.Emerald, 1000, 1], [Items.Diamond, 400, 1], [Items.Treasure_Chest, 250, 1], [Items.Barbarian_Gloves, 50, 1], [Items.Pirates_Lost_Ring, 10, 1], [Items.Message_In_A_Bottle, 10, 1], [Items.Ancient_Ring_Of_Skills, 1, 1], [Items.Ancient_Ring_Of_Mastery, 1, 1], ];
class FishingAreaChances {
    constructor() {
        this.fish = 100;
        this.special = 0;
        this.junk = 0;
    }
    setChancesFromArea(area) {
        this.fish = area.fishChance;
        this.special = area.specialChance;
        this.junk = area.junkChance;
    }
    addBonusSpecialChance(amount) {
        const junkToSpecialShift = clampValue(amount, -this.special, this.junk);
        this.junk -= junkToSpecialShift;
        this.special += junkToSpecialShift;
        amount -= junkToSpecialShift;
        const fishToSpecialShift = clampValue(amount, -this.special, this.fish);
        this.fish -= fishToSpecialShift;
        this.special += fishToSpecialShift;
    }
    shiftFishToSpecial(amount) {
        amount = clampValue(amount, -this.special, this.fish);
        this.fish -= amount;
        this.special += amount;
    }
    shiftJunkToFish(amount) {
        amount = clampValue(amount, -this.fish, this.junk);
        this.junk -= amount;
        this.fish += amount;
    }
    rollForRewardType() {
        const roll = Math.random() * 100;
        if (roll < this.fish)
            return FishingRewardType.Fish;
        else if (roll < this.fish + this.junk)
            return FishingRewardType.Junk;
        else
            return FishingRewardType.Special;
    }
}
var FishingRewardType;
(function(FishingRewardType) {
    FishingRewardType[FishingRewardType["Fish"] = 0] = "Fish";
    FishingRewardType[FishingRewardType["Junk"] = 1] = "Junk";
    FishingRewardType[FishingRewardType["Special"] = 2] = "Special";
}
)(FishingRewardType || (FishingRewardType = {}));

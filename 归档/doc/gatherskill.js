"use strict";
class GatheringSkill {
    constructor() {
        this.actionTimer = new Timer('Skill',this.action.bind(this));
        this.renderQueue = {
            actionMastery: new Set(),
            skillMastery: false,
            progressBar: false,
            skillNav: false,
            gloves: new Set(),
        };
        this.isActive = false;
    }
    get canStop() {
        return this.isActive && !game.isGolbinRaid;
    }
    get masteryLevel() {
        return getMasteryLevel(this.id, this.masteryID);
    }
    get level() {
        return skillLevel[this.id];
    }
    get currentActionInterval() {
        return this.actionTimer.maxTicks * TICK_INTERVAL;
    }
    get masteryPoolProgress() {
        return getMasteryPoolProgress(this.id);
    }
    get isPotionActive() {
        const bonus = herbloreBonuses[this.pageID].bonus;
        return bonus[0] !== null && bonus[1] !== null;
    }
    isPoolTierActive(tier) {
        return this.masteryPoolProgress >= masteryCheckpoints[tier];
    }
    modifyInterval(interval, masteryID) {
        const flatModifier = this.getFlatIntervalModifier(masteryID);
        const percentModifier = this.getPercentageIntervalModifier(masteryID);
        interval *= 1 + percentModifier / 100;
        interval += flatModifier;
        interval = roundToTickInterval(interval);
        return Math.max(interval, 250);
    }
    getFlatIntervalModifier(masteryID) {
        return (getTotalFromModifierArray('increasedSkillInterval', this.id) - getTotalFromModifierArray('decreasedSkillInterval', this.id));
    }
    getPercentageIntervalModifier(masteryID) {
        return (getTotalFromModifierArray('increasedSkillIntervalPercent', this.id) - getTotalFromModifierArray('decreasedSkillIntervalPercent', this.id));
    }
    getUncappedDoublingChance(masteryID) {
        let chance = player.modifiers.increasedChanceToDoubleItemsGlobal - player.modifiers.decreasedChanceToDoubleItemsGlobal;
        chance += getTotalFromModifierArray('increasedChanceToDoubleItemsSkill', this.id) - getTotalFromModifierArray('decreasedChanceToDoubleItemsSkill', this.id);
        return chance;
    }
    getDoublingChance(masteryID) {
        return clampValue(this.getUncappedDoublingChance(masteryID), 0, 100);
    }
    getGPModifier(masteryID) {
        return player.modifiers.increasedGPGlobal - player.modifiers.decreasedGPGlobal;
    }
    tick() {
        this.actionTimer.tick();
    }
    onPageChange() {
        if (this.isActive) {
            this.renderQueue.progressBar = true;
        }
        this.onModifierChange();
        this.render();
    }
    render() {
        this.renderActionMastery();
        this.renderSkillMastery();
        this.renderSkillNav();
        this.renderSkillGloves();
    }
    getErrorLog() {
        return `Is Active: ${this.isActive}\n`;
    }
    start() {
        const canStart = !idleChecker(this.id);
        if (canStart) {
            this.isActive = true;
            this.renderQueue.skillNav = true;
            this.startActionTimer();
            game.activeSkill = this.activeID;
            offline.skill = this.id;
            offline.timestamp = new Date().getTime();
            offline.action = null;
            saveData();
        }
        return canStart;
    }
    stop() {
        if (!this.canStop)
            return false;
        this.isActive = false;
        this.actionTimer.stop();
        this.renderQueue.progressBar = true;
        this.renderQueue.skillNav = true;
        clearOffline();
        this.onStop();
        saveData();
        return true;
    }
    onStop() {}
    startActionTimer() {
        this.actionTimer.start(this.actionInterval);
        this.renderQueue.progressBar = true;
    }
    action() {
        this.preAction();
        const continueSkill = this.addActionRewards();
        this.postAction();
        if (continueSkill) {
            this.startActionTimer();
        } else {
            this.stop();
        }
    }
    consumePotionCharge() {
        player.consumePotionCharge('Skill', this.pageID);
    }
    addActionRewards() {
        const rewards = this.actionRewards;
        const notAllGiven = rewards.giveRewards();
        return !(notAllGiven && !ignoreBankFull);
    }
    addMasteryToken(rewards) {
        var _a;
        if (rollPercentage(getMasteryTokenChance(this.id) * 100)) {
            rewards.addItem((_a = SKILLS[this.id].masteryTokenID) !== null && _a !== void 0 ? _a : 0, 1);
        }
    }
    addCommonRewards(rewards) {
        dropRingHalfA(this.actionLevel, rewards);
        rollForRhaelyx(this.id, false, rewards);
        this.addMasteryXP();
        this.addMasteryToken(rewards);
        this.rollForSkillPet();
        this.rollForMasteryPet();
        eventManager.rollForEventRewards(this.currentActionInterval, this.id, rewards);
        game.summoning.rollMarksForSkill(this.id, this.masteryModifiedInterval);
    }
    addMasteryXP() {
        if (this.masteryID < 0)
            return false;
        const levelIncrease = addMasteryXP(this.id, this.masteryID, this.masteryModifiedInterval, false, 0, true, true);
        this.renderQueue.actionMastery.add(this.masteryID);
        this.renderQueue.skillMastery = true;
        return levelIncrease;
    }
    rollForSkillPet() {
        rollForPet(this.skillPetID, this.currentActionInterval);
    }
    rollForMasteryPet() {
        rollForPet(21, this.currentActionInterval * (1 + getMasteryPoolProgress(this.id) / 100), false, this.id);
    }
    checkSynergyAndConsumeCharges(summon1, summon2, rewards) {
        const active = player.isSynergyActive(summon1, summon2);
        if (active) {
            this.useSummonCharge(summon1, rewards);
            this.useSummonCharge(summon2, rewards);
        }
        return active;
    }
    useSummonCharge(summon, rewards) {
        if (player.consumeSummonCharge(summon)) {
            rewards.addXP(Skills.Summoning, Summoning.getTabletConsumptionXP(summon, this.masteryModifiedInterval));
        }
    }
    useGloveCharge(gloveID) {
        if (isUsingGloves(gloveID))
            this.renderQueue.gloves.add(gloveID);
        removeGloveCharge(gloveID, true);
    }
    renderSkillMastery() {
        if (this.renderQueue.skillMastery) {
            updateTotalMastery(this.id);
            updateMasteryPoolProgress(this.id);
            updateOpenMasteryXPModal(this.id);
        }
        this.renderQueue.skillMastery = false;
    }
    renderActionMastery() {
        this.renderQueue.actionMastery.forEach((mID)=>{
            processUpdateMasteryProgress(this.id, mID);
        }
        );
        this.renderQueue.actionMastery.clear();
    }
    renderSkillNav() {
        if (this.renderQueue.skillNav) {
            skillNav.setAllInactive();
            if (this.isActive)
                skillNav.setActive(this.id);
        }
        this.renderQueue.skillNav = false;
    }
    renderSkillGloves() {
        this.renderQueue.gloves.forEach((gloveID)=>{
            updateGloves(gloveID, this.id);
        }
        );
        this.renderQueue.gloves.clear();
    }
    serialize() {
        const writer = new DataWriter();
        writer.addBool(this.isActive);
        writer.addChunk(this.actionTimer.serialize());
        return writer.data;
    }
    deserialize(reader, version) {
        this.isActive = reader.getBool();
        this.actionTimer.deserialize(reader.getChunk(3), version);
    }
}
class CraftingSkill extends GatheringSkill {
    get actionPreservationChance() {
        return this.getPreservationChance(this.masteryID, 0);
    }
    getPreservationChance(masteryID, chance) {
        chance += player.modifiers.increasedGlobalPreservationChance - player.modifiers.decreasedGlobalPreservationChance;
        chance += player.modifiers.getSkillModifierValue('increasedSkillPreservationChance', this.id);
        chance -= player.modifiers.getSkillModifierValue('decreasedSkillPreservationChance', this.id);
        return Math.min(chance, 80);
    }
    consumeCommonCosts() {
        if (player.equipment.checkForItemID(Items.Crown_of_Rhaelyx) && game.combat.bank.getQty(Items.Charge_Stone_of_Rhaelyx) > 0 && rollPercentage(0.1))
            game.combat.bank.addQuantity(Items.Charge_Stone_of_Rhaelyx, -1);
    }
    action() {
        const recipeCosts = this.getCurrentRecipeCosts();
        if (!recipeCosts.checkIfOwned()) {
            game.combat.notifications.add({
                type: 'Player',
                args: [this.id, this.noCostsMessage, 'danger']
            });
            this.stop();
            return;
        }
        this.preAction();
        const continueSkill = this.addActionRewards();
        const preserve = rollPercentage(this.actionPreservationChance);
        if (preserve) {
            game.combat.notifications.add({
                type: 'Preserve',
                args: [this.id]
            });
            this.recordCostPreservationStats(recipeCosts);
        } else {
            recipeCosts.consumeCosts();
            this.recordCostConsumptionStats(recipeCosts);
        }
        this.consumeCommonCosts();
        this.postAction();
        const nextCosts = this.getCurrentRecipeCosts();
        if (nextCosts.checkIfOwned() && continueSkill) {
            this.startActionTimer();
        } else {
            game.combat.notifications.add({
                type: 'Player',
                args: [this.id, this.noCostsMessage, 'danger']
            });
            this.stop();
        }
    }
}
class Costs {
    constructor() {
        this._items = new Map();
        this._gp = 0;
        this._sc = 0;
    }
    addItem(itemID, quantity) {
        var _a;
        this._items.set(itemID, quantity + ((_a = this._items.get(itemID)) !== null && _a !== void 0 ? _a : 0));
    }
    addGP(amount) {
        this._gp += amount;
    }
    addSlayerCoins(amount) {
        this._sc += amount;
    }
    getQuantityArray() {
        const costArray = [];
        this._items.forEach((qty,id)=>costArray.push({
            id,
            qty
        }));
        if (this._gp > 0)
            costArray.push({
                id: -4,
                qty: this._gp
            });
        if (this._sc > 0)
            costArray.push({
                id: -5,
                qty: this._sc
            });
        return costArray;
    }
    recordGPStat(tracker, stat) {
        tracker.add(stat, this._gp);
    }
    recordSCStat(tracker, stat) {
        tracker.add(stat, this._sc);
    }
    recordBulkItemStat(tracker, stat) {
        let statTotal = 0;
        this._items.forEach((qty)=>{
            statTotal += qty;
        }
        );
        tracker.add(stat, statTotal);
    }
    recordBulkItemValueStat(tracker, stat) {
        let statTotal = 0;
        this._items.forEach((qty,itemID)=>{
            statTotal += qty * items[itemID].sellsFor;
        }
        );
        tracker.add(stat, statTotal);
    }
    recordIndividualItemStat(stat) {
        this._items.forEach((qty,itemID)=>{
            game.stats.Items.add(itemID, stat, qty);
        }
        );
    }
    reset() {
        this._gp = 0;
        this._sc = 0;
        this._items.clear();
    }
    checkIfOwned() {
        let owned = true;
        owned && (owned = gp >= this._gp);
        owned && (owned = player.slayercoins >= this._sc);
        this._items.forEach((qty,itemID)=>{
            owned && (owned = getBankQty(itemID) >= qty);
        }
        );
        return owned;
    }
    consumeCosts() {
        if (this._gp > 0)
            player.removeGP(this._gp);
        if (this._sc > 0)
            player.removeSlayerCoins(this._sc);
        this._items.forEach((qty,itemID)=>{
            if (qty > 0)
                game.combat.bank.addQuantity(itemID, -qty);
        }
        );
    }
}
class Rewards extends Costs {
    constructor() {
        super(...arguments);
        this._xp = new Map();
    }
    addXP(skill, amount) {
        var _a;
        this._xp.set(skill, amount + ((_a = this._xp.get(skill)) !== null && _a !== void 0 ? _a : 0));
    }
    getXP(skill) {
        var _a;
        return (_a = this._xp.get(skill)) !== null && _a !== void 0 ? _a : 0;
    }
    giveRewards() {
        let notAllItemsGiven = false;
        this._items.forEach((qty,itemID)=>{
            notAllItemsGiven = !game.combat.bank.addItem(itemID, qty, true) || notAllItemsGiven;
        }
        );
        if (this._gp > 0)
            player.addGP(this._gp, 'Skill');
        if (this._sc > 0)
            player.addSlayerCoins(this._sc);
        this._xp.forEach((qty,skillID)=>{
            player.addXP(skillID, qty);
        }
        );
        return notAllItemsGiven;
    }
    reset() {
        super.reset();
        this._xp.clear();
    }
}
var Summons;
(function(Summons) {
    Summons[Summons["GolbinThief"] = 0] = "GolbinThief";
    Summons[Summons["Occultist"] = 1] = "Occultist";
    Summons[Summons["Wolf"] = 2] = "Wolf";
    Summons[Summons["Ent"] = 3] = "Ent";
    Summons[Summons["Mole"] = 4] = "Mole";
    Summons[Summons["Octopus"] = 5] = "Octopus";
    Summons[Summons["Minotaur"] = 6] = "Minotaur";
    Summons[Summons["Centaur"] = 7] = "Centaur";
    Summons[Summons["Witch"] = 8] = "Witch";
    Summons[Summons["Pig"] = 9] = "Pig";
    Summons[Summons["Crow"] = 10] = "Crow";
    Summons[Summons["Leprechaun"] = 11] = "Leprechaun";
    Summons[Summons["Cyclops"] = 12] = "Cyclops";
    Summons[Summons["Yak"] = 13] = "Yak";
    Summons[Summons["Unicorn"] = 14] = "Unicorn";
    Summons[Summons["Dragon"] = 15] = "Dragon";
    Summons[Summons["Monkey"] = 16] = "Monkey";
    Summons[Summons["Salamander"] = 17] = "Salamander";
    Summons[Summons["Bear"] = 18] = "Bear";
    Summons[Summons["Devil"] = 19] = "Devil";
}
)(Summons || (Summons = {}));

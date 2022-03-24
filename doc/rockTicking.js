"use strict";
var MiningOres;
(function(MiningOres) {
    MiningOres[MiningOres["Copper"] = 0] = "Copper";
    MiningOres[MiningOres["Tin"] = 1] = "Tin";
    MiningOres[MiningOres["Iron"] = 2] = "Iron";
    MiningOres[MiningOres["Coal"] = 3] = "Coal";
    MiningOres[MiningOres["Silver"] = 4] = "Silver";
    MiningOres[MiningOres["Gold"] = 5] = "Gold";
    MiningOres[MiningOres["Mithril"] = 6] = "Mithril";
    MiningOres[MiningOres["Adamantite"] = 7] = "Adamantite";
    MiningOres[MiningOres["Runite"] = 8] = "Runite";
    MiningOres[MiningOres["Dragonite"] = 9] = "Dragonite";
    MiningOres[MiningOres["RuneEssence"] = 10] = "RuneEssence";
}
)(MiningOres || (MiningOres = {}));
const rockMenus = [];
const oreTypes = ['copper', 'tin', 'iron', 'coal', 'silver', 'gold', 'mithril', 'adamantite', 'runite', 'dragonite', 'rune Essence', ];
function getRandomGem() {
    const gemToCollect = Math.floor(Math.random() * 100);
    let itemToAdd;
    if (gemToCollect < 50) {
        itemToAdd = Items.Topaz;
    } else if (gemToCollect < 67.5) {
        itemToAdd = Items.Sapphire;
    } else if (gemToCollect < 85) {
        itemToAdd = Items.Ruby;
    } else if (gemToCollect < 95) {
        itemToAdd = Items.Emerald;
    } else {
        itemToAdd = Items.Diamond;
    }
    return itemToAdd;
}
function loadMiningOres() {
    const oreContainer = document.getElementById('mining-ores-container');
    for (let i = 0; i < Mining.rockData.length; i++) {
        const rock = createElement('mining-rock', {
            classList: ['col-6', 'col-lg-4', 'col-xl-3']
        });
        rockMenus.push(rock);
        rock.setRock(i);
    }
    oreContainer.append(rockMenus[MiningOres.RuneEssence], ...rockMenus.slice(MiningOres.Copper, MiningOres.RuneEssence));
    let miningOres = '<div class="col-6 col-lg-4 col-xl-3" id="mining-ore-locked">';
    miningOres += '<div class="block block-rounded block-link-pop border-top border-danger border-4x justify-vertical-center">';
    miningOres += '<div class="block-content block-content-full bg-light pb-0">';
    miningOres += '<div class="font-size-sm font-w600 text-center text-muted">';
    miningOres += `<span id="mining-locked-text">${getLangString('MENU_TEXT', 'LOCKED')}</span><br><img class="mining-ore-img m-3" src="` + CDNDIR + 'assets/media/skills/mining/mining.svg"><br>';
    miningOres += `<span class="badge badge-danger badge-pill mb-3" id="mining-next-level">${templateLangString('MENU_TEXT', 'LEVEL', {
        level: '90'
    })}</span>`;
    miningOres += '</div>';
    miningOres += '</div>';
    miningOres += '</div></div>';
    $('#mining-ores-container').append(miningOres);
}
function localizeMining() {
    $('#mining-locked-text').text(getLangString('MENU_TEXT', 'LOCKED'));
    game.mining.onLoad();
}
class Mining extends GatheringSkill {
    constructor() {
        super(...arguments);
        this.id = Skills.Mining;
        this.activeID = ActiveSkills.MINING;
        this.pageID = Pages.Mining;
        this.skillPetID = 4;
        this.renderQueue = {
            actionMastery: new Set(),
            skillMastery: false,
            rockHP: new Set(),
            rockStatus: new Set(),
            progressBar: false,
            skillNav: false,
            gloves: new Set(),
            rockRates: false,
            rockUnlock: false,
        };
        this.baseInterval = 3000;
        this.baseRockHP = 5;
        this.passiveRegenInterval = 10000;
        this.activeProgressID = -1;
        this.tier3PoolWasActive = false;
        this.selectedRockId = -1;
        this.activeRockData = [];
        this.rockRespawnTimers = new Map();
        this.passiveRegenTimer = new Timer('Skill',this.regenRockHP.bind(this));
    }
    get actionInterval() {
        return this.modifyInterval(this.baseInterval, this.selectedRockData.masteryID);
    }
    get actionLevel() {
        return this.selectedRockData.levelRequired;
    }
    get masteryID() {
        return this.selectedRockId;
    }
    get masteryModifiedInterval() {
        return this.actionInterval;
    }
    get selectedRockData() {
        return Mining.rockData[this.selectedRockId];
    }
    get selectedRockActiveData() {
        return this.activeRockData[this.selectedRockId];
    }
    get canMineDragonite() {
        let totalMastery = 0;
        for (let i = 0; i < MASTERY[this.id].xp.length; i++) {
            totalMastery += getMasteryLevel(this.id, i);
            if (totalMastery > 270)
                return true;
        }
        return false;
    }
    getFlatIntervalModifier(masteryID) {
        let modifier = super.getFlatIntervalModifier(masteryID);
        if (this.isPoolTierActive(2))
            modifier -= 200;
        return modifier;
    }
    getUncappedDoublingChance(masteryID) {
        let chance = super.getUncappedDoublingChance(masteryID);
        if (masteryID >= 0) {
            const masteryLevel = getMasteryLevel(this.id, masteryID);
            chance += Math.floor(masteryLevel / 10);
            if (masteryLevel >= 99)
                chance += 6;
            chance += player.modifiers.increasedChanceToDoubleOres - player.modifiers.decreasedChanceToDoubleOres;
        }
        return chance;
    }
    canMineOre(ore) {
        return Mining.rockData[ore].levelRequired <= this.level && (ore !== MiningOres.Dragonite || this.canMineDragonite);
    }
    tickRespawn() {
        if (this.rockRespawnTimers.size)
            this.rockRespawnTimers.forEach((timer)=>timer.tick());
        this.passiveRegenTimer.tick();
    }
    getErrorLog() {
        return `${super.getErrorLog()}
Selected Rock ID: ${this.selectedRockId}
Active Rock Data:
${this.activeRockData.map((activeRock,id)=>{
            return `id: ${id}; isRespawning: ${activeRock.isRespawning}; currentHP: ${activeRock.currentHP}; maxHP: ${activeRock.maxHP};`;
        }
        ).join('\n')}`;
    }
    onModifierChange() {
        this.renderQueue.rockRates = true;
    }
    onEquipmentChange() {}
    onLevelUp() {
        this.renderQueue.rockUnlock = true;
    }
    render() {
        super.render();
        this.renderRockRates();
        this.renderRockHP();
        this.renderProgressBar();
        this.renderRockStatus();
        this.renderRockUnlock();
    }
    renderRockRates() {
        if (!this.renderQueue.rockRates)
            return;
        Mining.rockData.forEach((rockData,id)=>{
            const menu = rockMenus[id];
            let interval = this.modifyInterval(this.baseInterval, rockData.masteryID);
            interval /= 1000;
            const xp = getSkillXPToAdd(this.id, rockData.baseExperience);
            const rateText = `${templateLangString('MENU_TEXT', 'XP_AMOUNT', {
                xp: `${Math.floor(xp)}`,
            })} / ${templateLangString('MENU_TEXT', 'SECONDS', {
                seconds: formatFixed(interval, 2)
            })}`;
            menu.setRate(rateText);
        }
        );
        this.renderQueue.rockRates = false;
    }
    renderRockHP() {
        if (this.renderQueue.rockHP.size === 0)
            return;
        this.renderQueue.rockHP.forEach((id)=>{
            rockMenus[id].updateHP(this.activeRockData[id], Mining.rockData[id]);
        }
        );
        this.renderQueue.rockHP.clear();
    }
    renderRockStatus() {
        if (this.renderQueue.rockStatus.size === 0)
            return;
        this.renderQueue.rockStatus.forEach((id)=>{
            const newStatus = id === this.selectedRockId ? 'MINING' : 'MINE';
            rockMenus[id].setStatus(newStatus);
        }
        );
        this.renderQueue.rockStatus.clear();
    }
    renderProgressBar() {
        if (!this.renderQueue.progressBar)
            return;
        if (this.activeProgressID !== this.selectedRockId || !this.isActive) {
            this.stopActiveProgressBar();
        }
        if (this.isActive) {
            rockMenus[this.selectedRockId].miningProgress.animateProgressFromTimer(this.actionTimer);
            this.activeProgressID = this.selectedRockId;
        }
        this.renderQueue.progressBar = false;
    }
    stopActiveProgressBar() {
        if (this.activeProgressID !== -1) {
            rockMenus[this.activeProgressID].miningProgress.stopAnimation();
            this.activeProgressID = -1;
        }
    }
    renderRockUnlock() {
        if (!this.renderQueue.rockUnlock)
            return;
        let lowestLockedLevel = Infinity;
        Mining.rockData.forEach((data,id)=>{
            const rockMenu = rockMenus[id];
            if (data.levelRequired > this.level) {
                hideElement(rockMenu);
                if (lowestLockedLevel > data.levelRequired) {
                    lowestLockedLevel = data.levelRequired;
                }
            } else {
                showElement(rockMenu);
            }
            if (id === MiningOres.Dragonite) {
                if (this.canMineDragonite) {
                    rockMenu.hideRequirement();
                } else {
                    rockMenu.setRequirement(templateLangString('MENU_TEXT', 'DRAGON_ORE_REQ', {
                        level: '270'
                    }));
                }
            }
        }
        );
        if (lowestLockedLevel === Infinity) {
            $('#mining-ore-locked').addClass('d-none');
        } else {
            $('#mining-next-level').text(templateLangString('MENU_TEXT', 'LEVEL', {
                level: `${lowestLockedLevel}`
            }));
        }
        this.renderQueue.rockUnlock = false;
    }
    get rockHPPreserveChance() {
        return player.modifiers.increasedChanceNoDamageMining - player.modifiers.decreasedChanceNoDamageMining;
    }
    get chanceToDoubleGems() {
        return this.getDoublingChance(-1);
    }
    getRockGemChance(ore) {
        let gemChance = 1;
        if (ore !== MiningOres.RuneEssence)
            gemChance += player.modifiers.increasedMiningGemChance;
        gemChance *= 1 + player.modifiers.increasedOffItemChance / 100;
        return gemChance;
    }
    onRockClick(ore) {
        const activeData = this.activeRockData[ore];
        if (activeData.isRespawning) {
            game.stats.Mining.inc(MiningStats.EmptyOresMined);
        }
        const prevRockId = this.selectedRockId;
        if (this.isActive && !this.stop())
            return;
        if (activeData.isRespawning) {
            notifyPlayer(CONSTANTS.skill.Mining, getLangString('TOASTS', 'ROCK_DEPLETED'), 'danger');
        } else if (prevRockId !== ore && this.canMineOre(ore)) {
            this.selectedRockId = ore;
            if (!this.start()) {
                this.selectedRockId = -1;
            } else {
                this.renderQueue.rockStatus.add(ore);
            }
        }
        this.render();
    }
    onStop() {
        this.renderQueue.rockStatus.add(this.selectedRockId);
        this.selectedRockId = -1;
    }
    onLoad() {
        Mining.rockData.forEach((_,id)=>{
            this.renderQueue.rockHP.add(id);
        }
        );
        this.renderQueue.rockRates = true;
        this.renderQueue.rockUnlock = true;
        if (!this.passiveRegenTimer.isActive)
            this.passiveRegenTimer.start(this.passiveRegenInterval);
        if (this.isActive) {
            this.renderQueue.progressBar = true;
            this.renderQueue.rockStatus.add(this.selectedRockId);
            this.renderQueue.skillNav = true;
        }
    }
    serialize() {
        const writer = new DataWriter();
        writer.addVariableLengthChunk(super.serialize());
        writer.addNumber(this.selectedRockId);
        writer.addVariableLengthChunk(this.serializeActiveRockData());
        writer.addVariableLengthChunk(this.serializeRespawnTimers());
        writer.addChunk(this.passiveRegenTimer.serialize());
        return writer.data;
    }
    deserialize(reader, version) {
        super.deserialize(reader.getVariableLengthChunk(), version);
        this.selectedRockId = reader.getNumber();
        this.deserializeActiveRockData(reader.getVariableLengthChunk(), version);
        this.deserializeRespawnTimers(reader.getVariableLengthChunk(), version);
        this.passiveRegenTimer.deserialize(reader.getChunk(3), version);
    }
    serializeActiveRockData() {
        const writer = new DataWriter();
        this.activeRockData.forEach((activeRock)=>{
            writer.addBool(activeRock.isRespawning);
            writer.addNumber(activeRock.currentHP);
            writer.addNumber(activeRock.maxHP);
        }
        );
        return writer.data;
    }
    deserializeActiveRockData(reader, version) {
        for (let i = 0; i < reader.dataLength / 3; i++) {
            this.activeRockData.push({
                isRespawning: reader.getBool(),
                currentHP: reader.getNumber(),
                maxHP: reader.getNumber(),
            });
        }
    }
    serializeRespawnTimers() {
        const writer = new DataWriter();
        this.rockRespawnTimers.forEach((timer,id)=>{
            writer.addNumber(id);
            writer.addChunk(timer.serialize());
        }
        );
        return writer.data;
    }
    deserializeRespawnTimers(reader, version) {
        this.rockRespawnTimers.clear();
        for (let i = 0; i < reader.dataLength / 4; i++) {
            const rockID = reader.getNumber();
            const timer = new Timer('Skill',()=>this.respawnRock(rockID));
            timer.deserialize(reader.getChunk(3), version);
            this.rockRespawnTimers.set(rockID, timer);
        }
    }
    preAction() {
        this.tier3PoolWasActive = this.isPoolTierActive(3);
    }
    get actionRewards() {
        const rewards = new Rewards();
        const oreItem = items[this.selectedRockData.oreID];
        let oreQty = this.selectedRockData.baseQuantity;
        switch (this.selectedRockId) {
        case MiningOres.RuneEssence:
            if (this.checkSynergyAndConsumeCharges(Summons.Mole, Summons.Crow, rewards))
                oreQty *= 2;
            break;
        case MiningOres.Silver:
        case MiningOres.Gold:
            if (this.checkSynergyAndConsumeCharges(Summons.Mole, Summons.Monkey, rewards))
                oreQty *= 2;
            break;
        }
        if (rollPercentage(this.getDoublingChance(this.selectedRockId)))
            oreQty *= 2;
        oreQty *= Math.pow(2, player.modifiers.doubleOresMining);
        const chanceForExtraResource = getTotalFromModifierArray('increasedChanceAdditionalSkillResource', CONSTANTS.skill.Mining) - getTotalFromModifierArray('decreasedChanceAdditionalSkillResource', CONSTANTS.skill.Mining);
        if (rollPercentage(chanceForExtraResource))
            oreQty++;
        rewards.addItem(this.selectedRockData.oreID, oreQty);
        game.stats.Mining.add(MiningStats.OresGained, oreQty);
        if (rollPercentage(this.getRockGemChance(this.selectedRockId))) {
            this.addRandomGemReward(rewards);
            if (player.modifiers.summoningSynergy_4_5 > 0) {
                if (rollPercentage(player.modifiers.summoningSynergy_4_5)) {
                    this.addRandomGemReward(rewards);
                }
                this.checkSynergyAndConsumeCharges(Summons.Mole, Summons.Octopus, rewards);
            }
        }
        if (player.modifiers.increasedBonusCoalMining > 0) {
            rewards.addItem(Items.Coal_Ore, player.modifiers.increasedBonusCoalMining);
            game.stats.Mining.add(MiningStats.OresGained, player.modifiers.increasedBonusCoalMining);
        }
        if (player.modifiers.summoningSynergy_4_17 > 0 && oreItem.smithingBar !== undefined) {
            if (rollPercentage(player.modifiers.summoningSynergy_4_17))
                rewards.addItem(oreItem.smithingBar, 1);
            this.checkSynergyAndConsumeCharges(Summons.Mole, Summons.Salamander, rewards);
        }
        rewards.addXP(this.id, this.selectedRockData.baseExperience);
        if (this.isPotionActive)
            this.checkSynergyAndConsumeCharges(Summons.Mole, Summons.Bear, rewards);
        this.useSummonCharge(Summons.Mole, rewards);
        this.addCommonRewards(rewards);
        if (!tutorialComplete)
            updateTutorialTaskProgress({
                itemID: oreItem.id,
                qty: oreQty
            }, {}, {
                name: setToUppercase(oreTypes[this.selectedRockId]) + ' Ore',
                qty: 1
            });
        return rewards;
    }
    addRandomGemReward(rewards) {
        let gemQty = 1;
        if (rollPercentage(this.chanceToDoubleGems))
            gemQty *= 2;
        const gemID = getRandomGem();
        rewards.addItem(gemID, gemQty);
        game.stats.Mining.add(MiningStats.GemsGained, gemQty);
    }
    postAction() {
        this.renderQueue.rockRates = true;
        if (rollPercentage(this.rockHPPreserveChance)) {
            game.stats.Mining.inc(MiningStats.RockHPPreserved);
            game.combat.notifications.add({
                type: 'Player',
                args: [this.id, getLangString('TOASTS', 'NO_ROCK_DAMAGE'), 'success'],
            });
        } else {
            this.selectedRockActiveData.currentHP--;
            this.renderQueue.rockHP.add(this.selectedRockId);
            if (this.selectedRockActiveData.currentHP === 0) {
                game.stats.Mining.inc(MiningStats.RocksDepleted);
                this.startRespawningRock(this.selectedRockId);
            }
        }
        game.stats.Mining.inc(MiningStats.Actions);
        game.stats.Mining.add(MiningStats.TimeSpent, this.currentActionInterval);
        this.consumePotionCharge();
        this.useGloveCharge(GloveShopPurchases.Mining);
        if (this.selectedRockId !== MiningOres.RuneEssence)
            this.useGloveCharge(GloveShopPurchases.Gem);
        if (this.tier3PoolWasActive !== this.isPoolTierActive(3)) {
            this.updateAllRockMaxHPs();
        } else {
            this.updateRockMaxHP(this.selectedRockId);
        }
    }
    startActionTimer() {
        if (!this.selectedRockActiveData.isRespawning) {
            super.startActionTimer();
        }
    }
    regenRockHP() {
        this.activeRockData.forEach((activeData,id)=>{
            if (!activeData.isRespawning && !(activeData.maxHP === activeData.currentHP)) {
                activeData.currentHP++;
                this.renderQueue.rockHP.add(id);
            }
        }
        );
        this.passiveRegenTimer.start(this.passiveRegenInterval);
    }
    getRockMaxHP(id) {
        let rockHP = this.baseRockHP;
        if (this.isPoolTierActive(3))
            rockHP += 10;
        if (this.isPotionActive) {
            rockHP += player.modifiers.summoningSynergy_4_18;
        }
        rockHP += getMasteryLevel(this.id, id);
        rockHP += player.modifiers.increasedMiningNodeHP - player.modifiers.decreasedMiningNodeHP;
        return rockHP;
    }
    updateRockMaxHP(id) {
        const activeData = this.activeRockData[id];
        activeData.maxHP = this.getRockMaxHP(id);
        if (activeData.currentHP > activeData.maxHP)
            activeData.currentHP = activeData.maxHP;
        this.renderQueue.rockHP.add(id);
    }
    updateAllRockMaxHPs() {
        Mining.rockData.forEach((_,id)=>{
            this.updateRockMaxHP(id);
        }
        );
    }
    startRespawningRock(id) {
        const activeData = this.activeRockData[id];
        activeData.isRespawning = true;
        const respawnTimer = new Timer('Skill',()=>this.respawnRock(id));
        let respawnInterval = Mining.rockData[id].baseRespawnInterval;
        if (this.isPoolTierActive(1))
            respawnInterval *= 0.9;
        respawnTimer.start(respawnInterval);
        this.rockRespawnTimers.set(id, respawnTimer);
    }
    respawnRock(id) {
        const activeData = this.activeRockData[id];
        activeData.isRespawning = false;
        activeData.currentHP = activeData.maxHP;
        this.renderQueue.rockHP.add(id);
        this.rockRespawnTimers.delete(id);
        if (this.selectedRockId === id && this.isActive) {
            this.startActionTimer();
        }
    }
    populateActiveRockData() {
        for (let id = this.activeRockData.length; id < Mining.rockData.length; id++) {
            const maxHP = this.getRockMaxHP(id);
            this.activeRockData.push({
                currentHP: maxHP,
                maxHP: maxHP,
                isRespawning: false,
            });
        }
    }
}
Mining.rockData = [{
    levelRequired: 1,
    baseRespawnInterval: 5000,
    oreID: Items.Copper_Ore,
    masteryID: 0,
    baseQuantity: 1,
    baseExperience: 7,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_copper.svg',
}, {
    levelRequired: 1,
    baseRespawnInterval: 5000,
    oreID: Items.Tin_Ore,
    masteryID: 1,
    baseQuantity: 1,
    baseExperience: 7,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_tin.svg',
}, {
    levelRequired: 15,
    baseRespawnInterval: 10000,
    oreID: Items.Iron_Ore,
    masteryID: 2,
    baseQuantity: 1,
    baseExperience: 14,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_iron.svg',
}, {
    levelRequired: 30,
    baseRespawnInterval: 10000,
    oreID: Items.Coal_Ore,
    masteryID: 3,
    baseQuantity: 1,
    baseExperience: 18,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_coal.svg',
}, {
    levelRequired: 30,
    baseRespawnInterval: 15000,
    oreID: Items.Silver_Ore,
    masteryID: 4,
    baseQuantity: 1,
    baseExperience: 25,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_silver.svg',
}, {
    levelRequired: 40,
    baseRespawnInterval: 15000,
    oreID: Items.Gold_Ore,
    masteryID: 5,
    baseQuantity: 1,
    baseExperience: 28,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_gold.svg',
}, {
    levelRequired: 50,
    baseRespawnInterval: 20000,
    oreID: Items.Mithril_Ore,
    masteryID: 6,
    baseQuantity: 1,
    baseExperience: 65,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_mithril.svg',
}, {
    levelRequired: 70,
    baseRespawnInterval: 30000,
    oreID: Items.Adamantite_Ore,
    masteryID: 7,
    baseQuantity: 1,
    baseExperience: 71,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_adamantite.svg',
}, {
    levelRequired: 80,
    baseRespawnInterval: 60000,
    oreID: Items.Runite_Ore,
    masteryID: 8,
    baseQuantity: 1,
    baseExperience: 86,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_runite.svg',
}, {
    levelRequired: 95,
    baseRespawnInterval: 120000,
    oreID: Items.Dragonite_Ore,
    masteryID: 9,
    baseQuantity: 1,
    baseExperience: 101,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/skills/mining/rock_dragonite.svg',
}, {
    levelRequired: 1,
    baseRespawnInterval: 1000,
    oreID: Items.Rune_Essence,
    masteryID: 10,
    baseQuantity: 2,
    baseExperience: 5,
    get name() {
        return getLangString('ORE_NAME', `${this.masteryID}`);
    },
    media: 'assets/media/bank/rune_essence.png',
}, ];

"use strict";
class Game {
    constructor() {
        this.loopInterval = -1;
        this.loopStarted = false;
        this.activeSkill = ActiveSkills.NONE;
        this.pausedSkill = ActiveSkills.NONE;
        this._isPaused = false;
        this.disableClearOffline = false;
        this.isUnpausing = false;
        this.previousTickTime = performance.now();
        this.enableRendering = true;
        this.maxOfflineTicks = 20 * 60 * 60 * 12;
        this.combat = new CombatManager();
        this.golbinRaid = new RaidManager();
        this.thieving = new Thieving();
        this.firemaking = new Firemaking();
        this.mining = new Mining();
        this.woodcutting = new Woodcutting();
        this.herblore = new Herblore();
        this.smithing = new Smithing();
        this.altMagic = new AltMagic();
        this.runecrafting = new Runecrafting();
        this.crafting = new Crafting();
        this.fletching = new Fletching();
        this.summoning = new Summoning();
        this.fishing = new Fishing();
        this.cooking = new Cooking();
        this.agility = new Agility();
        this.astrology = new Astrology();
        this.eventManager = new EventManager();
        this.christmas2021 = new Christmas2021(EVENTS[Events.CHRISTMAS2021]);
        this.minibar = new Minibar();
        this.dropWeightCache = new Map();
        this.merchantsPermitRead = false;
        this.renderQueue = {
            title: false,
            combatMinibar: false,
            itemLogItems: new Set(),
        };
        this.stats = new Statistics();
    }
    get isPaused() {
        return this._isPaused;
    }
    get isGolbinRaid() {
        return this.activeSkill === ActiveSkills.GOLBINRAID;
    }
    startMainLoop() {
        if (!this.loopStarted) {
            this.previousTickTime = performance.now();
            this.loopInterval = window.setInterval(this.loop.bind(this), TICK_INTERVAL);
            this.loopStarted = true;
            logConsole('Starting Main Game Loop.');
        } else {
            if (DEBUGENABLED)
                console.warn('Game loop was already started.');
        }
    }
    stopMainLoop() {
        if (this.loopStarted) {
            clearInterval(this.loopInterval);
            this.loopStarted = false;
            logConsole('Stopping Main Game Loop.');
        } else {
            if (DEBUGENABLED)
                console.warn('Game loop was already stopped');
        }
    }
    pauseActiveSkill(fromBlur=false) {
        if (this._isPaused)
            return;
        this._isPaused = true;
        if (this.pausedSkill === ActiveSkills.NONE) {
            if (this.activeSkill === ActiveSkills.COMBAT && !SETTINGS.general.enabledOfflineCombat && fromBlur)
                return;
            this.pausedSkill = this.activeSkill;
            this.activeSkill = ActiveSkills.NONE;
        }
        if (fromBlur)
            this.stopMainLoop();
    }
    unpauseActiveSkill(fromFocus=false) {
        return __awaiter(this, void 0, void 0, function*() {
            if (!this._isPaused || this.isUnpausing)
                return;
            this.isUnpausing = true;
            this._isPaused = false;
            if (this.pausedSkill !== ActiveSkills.NONE) {
                const wasGolbinRaid = this.isGolbinRaid;
                this.activeSkill = this.pausedSkill;
                this.pausedSkill = ActiveSkills.NONE;
                yield updateOffline(true);
                if (wasGolbinRaid) {
                    switch (this.activeSkill) {
                    case ActiveSkills.THIEVING:
                        this.thieving.onLoad();
                        break;
                    case ActiveSkills.FIREMAKING:
                        this.firemaking.onLoad();
                        break;
                    }
                }
            } else if (this.isGolbinRaid) {
                this.activeSkill = ActiveSkills.NONE;
            }
            if (fromFocus)
                this.startMainLoop();
            this.isUnpausing = false;
        });
    }
    getSkillFromActiveID(id) {
        switch (id) {
        case ActiveSkills.COMBAT:
            return this.combat;
        case ActiveSkills.GOLBINRAID:
            return this.golbinRaid;
        case ActiveSkills.THIEVING:
            return this.thieving;
        case ActiveSkills.MINING:
            return this.mining;
        case ActiveSkills.FIREMAKING:
            return this.firemaking;
        case ActiveSkills.WOODCUTTING:
            return this.woodcutting;
        case ActiveSkills.HERBLORE:
            return this.herblore;
        case ActiveSkills.SMITHING:
            return this.smithing;
        case ActiveSkills.MAGIC:
            return this.altMagic;
        case ActiveSkills.RUNECRAFTING:
            return this.runecrafting;
        case ActiveSkills.CRAFTING:
            return this.crafting;
        case ActiveSkills.FLETCHING:
            return this.fletching;
        case ActiveSkills.SUMMONING:
            return this.summoning;
        case ActiveSkills.FISHING:
            return this.fishing;
        case ActiveSkills.COOKING:
            return this.cooking;
        case ActiveSkills.AGILITY:
            return this.agility;
        case ActiveSkills.ASTROLOGY:
            return this.astrology;
        default:
            return undefined;
        }
    }
    onLoad() {
        if (this.golbinRaid.isActive && this.activeSkill !== ActiveSkills.GOLBINRAID) {
            if (this.pausedSkill !== ActiveSkills.NONE) {
                const paused = this.getSkillFromActiveID(this.pausedSkill);
                if (paused !== undefined && !(paused instanceof BaseManager) && !paused.isActive)
                    this.pausedSkill = ActiveSkills.NONE;
            }
            const currentActive = this.getSkillFromActiveID(this.activeSkill);
            if (currentActive !== undefined && !(currentActive instanceof BaseManager) && currentActive.isActive)
                this.pausedSkill = this.activeSkill;
            this.activeSkill = ActiveSkills.GOLBINRAID;
        }
        if (this.isPaused && this.pausedSkill === ActiveSkills.NONE && !this.isGolbinRaid)
            this._isPaused = false;
        if (this.pausedSkill !== ActiveSkills.NONE && !this.isGolbinRaid) {
            this.activeSkill = this.pausedSkill;
            this.pausedSkill = ActiveSkills.NONE;
            this._isPaused = false;
            logConsole('Game was paused on load. Setting state to unpaused.');
        }
    }
    processTime() {
        const currentTickTime = performance.now();
        let ticksToRun = Math.floor((currentTickTime - this.previousTickTime) / TICK_INTERVAL);
        if (ticksToRun > this.maxOfflineTicks) {
            ticksToRun = this.maxOfflineTicks;
            this.previousTickTime = currentTickTime - ticksToRun * TICK_INTERVAL;
        }
        this.runTicks(ticksToRun);
        this.previousTickTime += ticksToRun * TICK_INTERVAL;
    }
    runTicks(ticksToRun) {
        const startTimeStamp = performance.now();
        for (let i = 0; i < ticksToRun; i++) {
            this.tick();
        }
        if (ticksToRun > 72000) {
            const processingTime = performance.now() - startTimeStamp;
            console.log(`Took ${processingTime / 1000}s to process ${ticksToRun} ticks. ${processingTime / ticksToRun}ms per tick.`);
        }
    }
    tick() {
        if (this.isGolbinRaid) {
            this.golbinRaid.tick();
        } else if (this.pausedSkill === ActiveSkills.NONE) {
            switch (this.activeSkill) {
            case ActiveSkills.THIEVING:
                this.thieving.tick();
                break;
            case ActiveSkills.FIREMAKING:
                this.firemaking.tick();
                break;
            case ActiveSkills.MINING:
                this.mining.tick();
                break;
            case ActiveSkills.WOODCUTTING:
                this.woodcutting.tick();
                break;
            case ActiveSkills.HERBLORE:
                this.herblore.tick();
                break;
            case ActiveSkills.SMITHING:
                this.smithing.tick();
                break;
            case ActiveSkills.MAGIC:
                this.altMagic.tick();
                break;
            case ActiveSkills.RUNECRAFTING:
                this.runecrafting.tick();
                break;
            case ActiveSkills.CRAFTING:
                this.crafting.tick();
                break;
            case ActiveSkills.FLETCHING:
                this.fletching.tick();
                break;
            case ActiveSkills.SUMMONING:
                this.summoning.tick();
                break;
            case ActiveSkills.FISHING:
                this.fishing.tick();
                break;
            case ActiveSkills.COOKING:
                this.cooking.tick();
                break;
            case ActiveSkills.AGILITY:
                this.agility.tick();
                break;
            case ActiveSkills.ASTROLOGY:
                this.astrology.tick();
                break;
            }
            this.combat.tick();
            this.mining.tickRespawn();
        }
    }
    render() {
        if (this.isGolbinRaid) {
            this.golbinRaid.render();
        } else {
            this.combat.render();
            this.thieving.render();
            this.firemaking.render();
            this.mining.render();
            this.woodcutting.render();
            this.herblore.render();
            this.smithing.render();
            this.altMagic.render();
            this.runecrafting.render();
            this.crafting.render();
            this.fletching.render();
            this.summoning.render();
            this.fishing.render();
            this.cooking.render();
            this.agility.render();
            this.astrology.render();
        }
        this.renderGameTitle();
        this.renderCombatMinibar();
        this.stats.renderMutatedStats();
        this.renderItemLogItems();
        openNextModal();
    }
    renderItemLogItems() {
        if (this.renderQueue.itemLogItems.size === 0)
            return;
        this.renderQueue.itemLogItems.forEach((itemID)=>{
            updateCompletionLogEntryElement('items', itemID);
        }
        );
        $('#item-log-comp-count').text(numberWithCommas(getItemsFound()));
        $('.item-log-comp-percent').text(`${getItemCompletionProgress()}`);
        this.renderQueue.itemLogItems.clear();
    }
    renderGameTitle() {
        if (this.renderQueue.title) {
            let title = gameTitle;
            if (this.activeSkill === ActiveSkills.COMBAT || this.activeSkill === ActiveSkills.THIEVING) {
                title = `${getLangString('SKILL_NAME', '9')} ${numberWithCommas(this.combat.player.hitpoints)}`;
            } else if (this.activeSkill === ActiveSkills.GOLBINRAID) {
                title = `${getLangString('SKILL_NAME', '9')} ${numberWithCommas(this.golbinRaid.player.hitpoints)}`;
            }
            $('title').text(title);
        }
        this.renderQueue.title = false;
    }
    renderCombatMinibar() {
        if (!this.renderQueue.combatMinibar)
            return;
        const minibar = document.getElementById('combat-footer-minibar');
        const inCombatLike = this.activeSkill === ActiveSkills.COMBAT || this.activeSkill === ActiveSkills.GOLBINRAID;
        if (inCombatLike && showCombatMinibar && !(currentPage === Pages.Combat && !showCombatMinibarCombat)) {
            showElement(minibar);
        } else {
            hideElement(minibar);
        }
        this.renderQueue.combatMinibar = false;
    }
    loop() {
        if (this.activeSkill !== ActiveSkills.OTHER && !this.isGolbinRaid)
            offline.timestamp = new Date().getTime();
        try {
            this.processTime();
        } catch (e) {
            this.stopMainLoop();
            this.showBrokenGame(e, 'An error occurred while processing ticks:');
            console.error(e);
            throw new Error(`An error occurred while processing ticks: ${e}.`);
        }
        if (this.enableRendering) {
            try {
                this.render();
            } catch (e) {
                this.stopMainLoop();
                this.showBrokenGame(e, 'An error occurred while rendering:');
                console.error(e);
                throw new Error(`An error occurred while rendering: ${e}.`);
            }
        }
    }
    getErrorLog(error, title) {
        var _a;
        let errorBody = 'Could not parse error';
        if (error instanceof Error) {
            const stackTrace = (_a = error.stack) !== null && _a !== void 0 ? _a : 'Stack not available';
            errorBody = `Error Name: ${error.name}
Error Message: ${error.message}
Stack Trace:
${stackTrace}`;
        } else if (typeof error === 'string') {
            errorBody = error;
        }
        let equipmentText = 'Current Equipment:\n';
        let equipmentToLog;
        if (this.isGolbinRaid) {
            equipmentToLog = this.golbinRaid.player.equipment;
        } else {
            equipmentToLog = this.combat.player.equipment;
        }
        equipmentToLog.slotArray.forEach((slot)=>{
            if (slot.providesStats)
                equipmentText += `${slot.type}: ${Items[slot.item.id]}\n`;
        }
        );
        let activeSkillLog = 'No Active Skill Information\n';
        if (!(this.activeSkill === ActiveSkills.NONE || this.activeSkill === ActiveSkills.OTHER))
            activeSkillLog = 'Skill Information:\n';
        const activeSkill = this.getSkillFromActiveID(this.activeSkill);
        if (activeSkill !== undefined)
            activeSkillLog += activeSkill.getErrorLog();
        const errorMessage = `${title}
Active Skill: ${ActiveSkills[this.activeSkill]}
${errorBody}
${equipmentText}
${activeSkillLog}`;
        return errorMessage;
    }
    showBrokenGame(error, title) {
        $('#ticks-broke-error-msg').val(this.getErrorLog(error, title));
        $('#ticks-broke-error-title').text(title);
        $('#modal-ticks-broke').modal('show');
    }
    processOffline() {
        if (DEBUGENABLED && this.activeSkill === ActiveSkills.COMBAT)
            this.combat.compareStatsWithSavedStats();
        return new Promise((resolve,reject)=>{
            if (this.activeSkill === ActiveSkills.COMBAT && (!SETTINGS.general.enabledOfflineCombat || (combatManager.areaData.type === 'Slayer' && !skillsUnlocked[CONSTANTS.skill.Slayer]) || (combatManager.areaData.type === 'Dungeon' && afterCutOff() && isAdsPath() && DUNGEONS[combatManager.areaData.id].isPremium))) {
                this.combat.stopCombat();
                resolve();
                return;
            }
            if (this.activeSkill === ActiveSkills.THIEVING && !skillsUnlocked[CONSTANTS.skill.Thieving]) {
                this.thieving.stop();
                resolve();
                return;
            }
            if (this.isGolbinRaid) {
                resolve();
                return;
            }
            this.resetOfflineTracking();
            loadingOfflineProgress = true;
            const modalID = offlineModalID;
            offlineModalID++;
            const html = `<div id="offline-modal-${modalID}" style="height:auto;"><small><div class="spinner-border spinner-border-sm text-primary mr-2" id="offline-progress-spinner" role="status"></div>${getLangString('MENU_TEXT', 'LOADING_OFFLINE_PROGRESS')}</small></div>`;
            const welcomeBackModal = {
                title: getLangString('MISC_STRING', '3'),
                html: html,
                imageUrl: cdnMedia(activeSkillMedia[this.activeSkill]),
                imageWidth: 64,
                imageHeight: 64,
                imageAlt: getLangString('CHARACTER_SELECT', '88'),
                allowOutsideClick: false,
            };
            addModalToQueue(welcomeBackModal);
            setTimeout(()=>{
                const snapShot = this.snapShotOffline();
                const {timeDiff} = getOfflineTimeDiff();
                let offlineMessage;
                try {
                    this.runTicks(Math.floor(timeDiff / TICK_INTERVAL));
                    offlineMessage = this.createOfflineModal(snapShot, timeDiff);
                } catch (e) {
                    const messageDoc = new DocumentFragment();
                    messageDoc.append(getTemplateNode('broken-offline-template'));
                    const messageArea = getElementFromFragment(messageDoc, 'broken-offline-template-message', 'textarea');
                    messageArea.value = this.getErrorLog(e, 'An error occured while processing ticks offline:');
                    offlineMessage = messageDoc;
                    const activeSkill = this.getSkillFromActiveID(this.activeSkill);
                    if (activeSkill instanceof BaseManager)
                        activeSkill.stopCombat();
                    else if (activeSkill !== undefined)
                        activeSkill.stop();
                }
                if (this.combat.giveFreeDeath) {
                    window.setTimeout(()=>{
                        this.combat.giveFreeDeath = false;
                    }
                    , 60 * 1000);
                }
                this.combat.notifications.clear();
                if (document.getElementById(`offline-modal-${modalID}`) !== null) {
                    $(`#offline-modal-${modalID}`).html(offlineMessage);
                } else {
                    const offlineDiv = createElement('div', {
                        id: `offline-modal-${modalID}`,
                        attributes: [['style', 'height:auto;']],
                    });
                    if (typeof offlineMessage === 'string') {
                        offlineDiv.innerHTML = offlineMessage;
                    } else {
                        offlineDiv.append(offlineMessage);
                    }
                    welcomeBackModal.html = offlineDiv;
                }
                loadingOfflineProgress = false;
                resolve();
            }
            , 0);
        }
        );
    }
    snapShotOffline() {
        const quiverSlot = player.equipment.slots.Quiver;
        const quiverID = quiverSlot.item.id;
        let quiverQty = 0;
        if (quiverID !== -1)
            quiverQty = quiverSlot.quantity;
        const snapshot = {
            gp: gp,
            slayercoins: player.slayercoins,
            prayerPoints: player.prayerPoints,
            experience: [...skillXP],
            levels: [...skillLevel],
            food: player.food.slots.map((food)=>{
                return {
                    itemID: food.item.id,
                    qty: food.quantity
                };
            }
            ),
            quiverItem: {
                itemID: quiverID,
                qty: quiverQty,
            },
            summon1ID: player.equipment.slots.Summon1.item.id,
            summon2ID: player.equipment.slots.Summon2.item.id,
            bank: new Map(),
            loot: new Map(),
            monsterKills: MONSTERS.map((monster)=>game.stats.monsterKillCount(monster.id)),
            dungeonCompletion: [...dungeonCompleteCount],
            taskCompletions: [...this.combat.slayerTask.completion],
            summoningMarks: this.summoning.getMarkSnapshot(),
            skillGloves: glovesTracker.map((gloveData,gID)=>{
                return {
                    itemID: gloveID[gID],
                    qty: gloveData.remainingActions,
                };
            }
            ),
            cookingStockpile: this.cooking.getStockpileSnapshot(),
        };
        bank.forEach((bankItem)=>{
            snapshot.bank.set(bankItem.id, bankItem.qty);
        }
        );
        this.combat.loot.drops.forEach((drop)=>{
            var _a;
            snapshot.loot.set(drop.item.id, ((_a = snapshot.loot.get(drop.item.id)) !== null && _a !== void 0 ? _a : 0) + drop.qty);
        }
        );
        return snapshot;
    }
    createOfflineModal(oldSnapshot, timeDiff) {
        const newSnapshot = this.snapShotOffline();
        const lostLoot = this.combat.loot.lostLoot;
        const lostItems = this.combat.bank.lostItems;
        const seconds = timeDiff / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        let timeUnit = 'second';
        let timeAmount = Math.floor(seconds);
        if (hours > 1) {
            timeAmount = Math.floor(hours);
            timeUnit = 'hour';
        } else if (minutes > 1) {
            timeAmount = Math.floor(minutes);
            timeUnit = 'minute';
        }
        let timeText = `${timeAmount} ${timeUnit}${pluralS(timeAmount)}`;
        timeText += `<br><small class="text-danger">${getLangString('MENU_TEXT', 'MAX_OFFLINE_TIME')}</small>`;
        const gpDiff = newSnapshot.gp - oldSnapshot.gp;
        const scDiff = newSnapshot.slayercoins - oldSnapshot.slayercoins;
        const ppDiff = newSnapshot.prayerPoints - oldSnapshot.prayerPoints;
        const xpGain = newSnapshot.experience.map((xp,skillID)=>Math.floor(xp - oldSnapshot.experience[skillID]));
        const levelGain = newSnapshot.levels.map((level,skillID)=>level - oldSnapshot.levels[skillID]);
        const itemsGained = new Map();
        const itemsUsed = new Map();
        const monstersKilled = newSnapshot.monsterKills.map((newCount,id)=>newCount - oldSnapshot.monsterKills[id]);
        const dungeonsCompleted = newSnapshot.dungeonCompletion.map((newCount,id)=>newCount - oldSnapshot.dungeonCompletion[id]);
        const tasksCompleted = newSnapshot.taskCompletions.map((newCount,tier)=>newCount - oldSnapshot.taskCompletions[tier]);
        const marksFound = new Map();
        newSnapshot.summoningMarks.forEach((newCount,mark)=>{
            var _a;
            const oldCount = (_a = oldSnapshot.summoningMarks.get(mark)) !== null && _a !== void 0 ? _a : 0;
            if (oldCount !== newCount)
                marksFound.set(mark, newCount - oldCount);
        }
        );
        const gloveChargesUsed = newSnapshot.skillGloves.map(({itemID, qty},i)=>{
            return {
                itemID: itemID,
                qty: oldSnapshot.skillGloves[i].qty - qty,
            };
        }
        );
        const stockPileItemsGained = [];
        newSnapshot.cookingStockpile.forEach(({id, qty},category)=>{
            const oldItems = oldSnapshot.cookingStockpile.get(category);
            if (oldItems !== undefined) {
                qty -= oldItems.qty;
            }
            if (qty > 0)
                stockPileItemsGained.push({
                    itemID: id,
                    qty
                });
        }
        );
        items.forEach((item,id)=>{
            var _a, _b;
            const qtyDiff = ((_a = newSnapshot.bank.get(id)) !== null && _a !== void 0 ? _a : 0) - ((_b = oldSnapshot.bank.get(id)) !== null && _b !== void 0 ? _b : 0);
            if (qtyDiff > 0) {
                itemsGained.set(id, qtyDiff);
            } else if (qtyDiff < 0) {
                itemsUsed.set(id, qtyDiff);
            }
        }
        );
        const foodEaten = [];
        oldSnapshot.food.forEach(({itemID, qty},i)=>{
            var _a;
            const qtyDiff = qty - newSnapshot.food[i].qty;
            if (qtyDiff > 0)
                foodEaten.push({
                    itemID,
                    qty: qtyDiff
                });
            else if (qtyDiff < 0) {
                itemID = newSnapshot.food[i].itemID;
                itemsGained.set(itemID, ((_a = itemsGained.get(itemID)) !== null && _a !== void 0 ? _a : 0) - qtyDiff);
            }
        }
        );
        const image = (media)=>`<img class="skill-icon-xs" src="${media}">`;
        const posSpan = (text)=>`<span class='text-success'>${text}</span>`;
        const negSpan = (text)=>`<span class='text-danger'>${text}</span>`;
        const currencyDiff = (diff,name,media)=>{
            if (diff > 0) {
                return templateLangString('MENU_TEXT', `CURRENCY_GAIN_${name}`, {
                    curIcon: image(media),
                    count: posSpan(numberWithCommas(diff)),
                });
            } else {
                return templateLangString('MENU_TEXT', `CURRENCY_LOSS_${name}`, {
                    curIcon: image(media),
                    count: negSpan(numberWithCommas(-diff)),
                });
            }
        }
        ;
        const outputHeaders = [];
        xpGain.forEach((gain,skillID)=>{
            if (gain > 0) {
                outputHeaders.push(templateString(getLangString('MISC_STRING', '6'), {
                    qty: posSpan(numberWithCommas(gain)),
                    skillName: SKILLS[skillID].name,
                }));
                const levelIncrease = levelGain[skillID];
                if (levelIncrease > 0) {
                    const templateData = {
                        skillName: SKILLS[skillID].name,
                        count: `${levelIncrease}`,
                        oldLevel: `${oldSnapshot.levels[skillID]}`,
                        newLevel: `${newSnapshot.levels[skillID]}`,
                    };
                    outputHeaders.push(templateLangString('MENU_TEXT', levelIncrease === 1 ? 'LEVELED_UP_SKILL_ONCE' : 'LEVELED_UP_SKILL_TIMES', templateData));
                }
            }
        }
        );
        monstersKilled.forEach((killDiff,mID)=>{
            if (killDiff > 0) {
                const monster = MONSTERS[mID];
                outputHeaders.push(templateLangString('MENU_TEXT', 'YOU_KILLED_MONSTER', {
                    count: `${killDiff}`,
                    monsterImage: image(getMonsterMedia(monster)),
                    monsterName: monster.name,
                }));
            }
        }
        );
        dungeonsCompleted.forEach((countDiff,dID)=>{
            if (countDiff > 0) {
                const dungeon = DUNGEONS[dID];
                outputHeaders.push(templateLangString('MENU_TEXT', countDiff === 1 ? 'COMPLETED_DUNGEON_ONCE' : 'COMPLETED_DUNGEON_TIMES', {
                    dungeonImage: image(dungeon.media),
                    dungeonName: dungeon.name,
                    count: `${countDiff}`,
                }));
            }
        }
        );
        tasksCompleted.forEach((taskCount,tier)=>{
            if (taskCount > 0) {
                outputHeaders.push(templateLangString('MENU_TEXT', `COMPLETED_SLAYER_TASK_${tier}`, {
                    count: `${taskCount}`
                }));
            }
        }
        );
        marksFound.forEach((markCount,mark)=>{
            if (markCount > 0) {
                outputHeaders.push(templateLangString('MENU_TEXT', 'YOU_FOUND_MARK', {
                    count: posSpan(`${markCount}`),
                    markImage: image(this.summoning.getMarkImage(mark)),
                    markName: this.summoning.getMarkName(mark),
                }));
            }
        }
        );
        let itemGPValue = 0;
        itemsGained.forEach((qty,itemID)=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'YOU_GAINED_ITEM', {
                count: posSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
            itemGPValue += qty * items[itemID].sellsFor;
        }
        );
        stockPileItemsGained.forEach(({qty, itemID})=>{
            outputHeaders.push(`${templateLangString('MENU_TEXT', 'YOU_GAINED_ITEM', {
                count: posSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            })}<span class="text-warning">${getLangString('MENU_TEXT', 'IN_STOCKPILE')}</span>`);
            itemGPValue += qty * items[itemID].sellsFor;
        }
        );
        if (DEBUGENABLED)
            outputHeaders.push(`Total Item Value: ${numberWithCommas(itemGPValue)} GP`);
        newSnapshot.loot.forEach((qty,itemID)=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'YOU_HAVE_ITEM_LOOT', {
                count: posSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        );
        lostLoot.forEach((qty,itemID)=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'LOST_ITEM_LOOT', {
                count: posSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        );
        lostItems.forEach((qty,itemID)=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'LOST_ITEM_BANK', {
                count: posSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        );
        if (gpDiff !== 0) {
            outputHeaders.push(currencyDiff(gpDiff, 'GP', `${CDNDIR}assets/media/main/coins.svg`));
        }
        if (scDiff !== 0) {
            outputHeaders.push(currencyDiff(scDiff, 'SC', `${CDNDIR}assets/media/main/slayer_coins.svg`));
        }
        if (ppDiff !== 0) {
            outputHeaders.push(currencyDiff(ppDiff, 'PP', `${CDNDIR}assets/media/skills/prayer/prayer.svg`));
        }
        itemsUsed.forEach((qty,itemID)=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'ITEM_USAGE', {
                count: negSpan(numberWithCommas(-qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        );
        if (player.chargesUsed.Summon1 > 0) {
            const itemID = oldSnapshot.summon1ID;
            outputHeaders.push(templateLangString('MENU_TEXT', 'ITEM_USAGE', {
                count: negSpan(numberWithCommas(player.chargesUsed.Summon1)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        if (player.chargesUsed.Summon2 > 0) {
            const itemID = oldSnapshot.summon2ID;
            outputHeaders.push(templateLangString('MENU_TEXT', 'ITEM_USAGE', {
                count: negSpan(numberWithCommas(player.chargesUsed.Summon2)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        const ammoUsed = newSnapshot.quiverItem.qty - oldSnapshot.quiverItem.qty;
        if (ammoUsed > 0) {
            const itemID = oldSnapshot.quiverItem.itemID;
            outputHeaders.push(templateLangString('MENU_TEXT', 'ITEM_USAGE', {
                count: negSpan(numberWithCommas(ammoUsed)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        foodEaten.forEach(({qty, itemID})=>{
            outputHeaders.push(templateLangString('MENU_TEXT', 'FOOD_EATEN', {
                count: negSpan(numberWithCommas(qty)),
                itemImage: image(getItemMedia(itemID)),
                itemName: items[itemID].name,
            }));
        }
        );
        gloveChargesUsed.forEach(({itemID, qty})=>{
            if (qty > 0)
                outputHeaders.push(templateLangString('MENU_TEXT', 'GLOVE_CHARGE_USAGE', {
                    count: negSpan(numberWithCommas(qty)),
                    itemImage: image(getItemMedia(itemID)),
                    itemName: items[itemID].name,
                }));
        }
        );
        let html = `<h5 class='font-w400'>${templateString(getLangString('MISC_STRING', '4'), {
            timeAway: formatAsTimePeriod(timeDiff),
        })}<br><small class="text-info">${getLangString('MENU_TEXT', 'MAX_OFFLINE_TIME')}</small></h5>
    <h5 class='font-w400 font-size-sm mb-1'><lang-string lang-cat="MISC_STRING" lang-id="5"></h5>`;
        html += `<h5 class='font-w600 mb-1'>${outputHeaders.join(`</h5><h5 class='font-w600 mb-1'>`)}</h5>`;
        return html;
    }
    resetOfflineTracking() {
        this.combat.resetOfflineTracking();
    }
    testForOffline(timeToGoBack) {
        this.stopMainLoop();
        if (offline.timestamp !== null)
            offline.timestamp -= timeToGoBack * 60 * 60 * 1000;
        saveData('all');
        this.processOffline();
        this.startMainLoop();
    }
    testCombatInitializationStatParity() {
        this.combat.saveStats();
        this.combat.initialize();
        this.combat.compareStatsWithSavedStats();
    }
    serialize() {
        const writer = new DataWriter();
        writer.addVariableLengthChunk(this.combat.serialize());
        writer.addVariableLengthChunk(this.thieving.serialize());
        writer.addNumber(this.activeSkill);
        writer.addNumber(this.pausedSkill);
        writer.addBool(this.merchantsPermitRead);
        writer.addVariableLengthChunk(this.stats.serialize());
        writer.addVariableLengthChunk(this.firemaking.serialize());
        writer.addVariableLengthChunk(this.mining.serialize());
        writer.addVariableLengthChunk(this.golbinRaid.serialize());
        writer.addBool(this._isPaused);
        writer.addVariableLengthChunk(this.woodcutting.serialize());
        writer.addVariableLengthChunk(this.herblore.serialize());
        writer.addVariableLengthChunk(this.smithing.serialize());
        writer.addVariableLengthChunk(this.altMagic.serialize());
        writer.addVariableLengthChunk(this.runecrafting.serialize());
        writer.addVariableLengthChunk(this.crafting.serialize());
        writer.addVariableLengthChunk(this.fletching.serialize());
        writer.addVariableLengthChunk(this.summoning.serialize());
        writer.addVariableLengthChunk(this.fishing.serialize());
        writer.addVariableLengthChunk(this.cooking.serialize());
        writer.addVariableLengthChunk(this.agility.serialize());
        writer.addVariableLengthChunk(this.astrology.serialize());
        return writer.data;
    }
    deserialize(reader, version) {
        this.combat.deserialize(reader.getVariableLengthChunk(), version);
        this.thieving.deserialize(reader.getVariableLengthChunk(), version);
        this.activeSkill = reader.getNumber();
        this.pausedSkill = reader.getNumber();
        this.merchantsPermitRead = reader.getBool();
        if (version >= 9) {
            this.stats.deserialize(reader.getVariableLengthChunk(), version);
            const oldItemsFound = itemsAlreadyFound;
            itemsAlreadyFound = [];
            items.forEach((item)=>{
                if (this.stats.itemFindCount(item.id) > 0 && !oldItemsFound.includes(item.id))
                    itemsAlreadyFound.push(item.id);
            }
            );
            this.firemaking.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (version >= 10) {
            this.mining.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (version >= 12) {
            this.golbinRaid.deserialize(reader.getVariableLengthChunk(), version);
            this._isPaused = reader.getBool();
            this.woodcutting.deserialize(reader.getVariableLengthChunk(), version);
            this.herblore.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (version >= 13) {
            this.smithing.deserialize(reader.getVariableLengthChunk(), version);
            this.altMagic.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (version >= 16) {
            this.runecrafting.deserialize(reader.getVariableLengthChunk(), version);
            this.crafting.deserialize(reader.getVariableLengthChunk(), version);
            this.fletching.deserialize(reader.getVariableLengthChunk(), version);
            this.summoning.deserialize(reader.getVariableLengthChunk(), version);
            this.fishing.deserialize(reader.getVariableLengthChunk(), version);
            this.cooking.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (version >= 17) {
            this.agility.deserialize(reader.getVariableLengthChunk(), version);
            this.astrology.deserialize(reader.getVariableLengthChunk(), version);
        }
        if (!this._isPaused && this.activeSkill === ActiveSkills.GOLBINRAID) {
            this.activeSkill = this.pausedSkill;
        }
    }
    getLootTableWeight(table) {
        let totalWeight = this.dropWeightCache.get(table);
        if (totalWeight === undefined) {
            totalWeight = table.reduce((prev,loot)=>prev + loot[1], 0);
            this.dropWeightCache.set(table, totalWeight);
        }
        return totalWeight;
    }
    getItemFromLootTable(table) {
        const dropRoll = Math.floor(Math.random() * this.getLootTableWeight(table));
        let itemWeight = 0;
        const lootIndex = table.findIndex((loot)=>{
            itemWeight += loot[1];
            return dropRoll < itemWeight;
        }
        );
        const itemID = table[lootIndex][0];
        const qty = rollInteger(1, table[lootIndex][2]);
        return {
            itemID,
            qty
        };
    }
    getLootTableAverageGP(table) {
        const totalWeight = this.getLootTableWeight(table);
        return (table.reduce((totalValue,[itemID,weight,maxQty])=>{
            return totalValue + (weight * items[itemID].sellsFor * (1 + maxQty)) / 2;
        }
        , 0) / totalWeight);
    }
}
var ActiveSkills;
(function(ActiveSkills) {
    ActiveSkills[ActiveSkills["NONE"] = 0] = "NONE";
    ActiveSkills[ActiveSkills["COMBAT"] = 1] = "COMBAT";
    ActiveSkills[ActiveSkills["GOLBINRAID"] = 2] = "GOLBINRAID";
    ActiveSkills[ActiveSkills["THIEVING"] = 3] = "THIEVING";
    ActiveSkills[ActiveSkills["OTHER"] = 4] = "OTHER";
    ActiveSkills[ActiveSkills["FIREMAKING"] = 5] = "FIREMAKING";
    ActiveSkills[ActiveSkills["MINING"] = 6] = "MINING";
    ActiveSkills[ActiveSkills["WOODCUTTING"] = 7] = "WOODCUTTING";
    ActiveSkills[ActiveSkills["HERBLORE"] = 8] = "HERBLORE";
    ActiveSkills[ActiveSkills["SMITHING"] = 9] = "SMITHING";
    ActiveSkills[ActiveSkills["MAGIC"] = 10] = "MAGIC";
    ActiveSkills[ActiveSkills["RUNECRAFTING"] = 11] = "RUNECRAFTING";
    ActiveSkills[ActiveSkills["CRAFTING"] = 12] = "CRAFTING";
    ActiveSkills[ActiveSkills["FLETCHING"] = 13] = "FLETCHING";
    ActiveSkills[ActiveSkills["SUMMONING"] = 14] = "SUMMONING";
    ActiveSkills[ActiveSkills["FISHING"] = 15] = "FISHING";
    ActiveSkills[ActiveSkills["COOKING"] = 16] = "COOKING";
    ActiveSkills[ActiveSkills["ASTROLOGY"] = 17] = "ASTROLOGY";
    ActiveSkills[ActiveSkills["AGILITY"] = 18] = "AGILITY";
}
)(ActiveSkills || (ActiveSkills = {}));
const activeSkillMedia = ['assets/media/main/question.svg', 'assets/media/skills/combat/combat.svg', 'assets/media/pets/golden_golbin.svg', 'assets/media/skills/thieving/thieving.svg', 'assets/media/main/question.svg', 'assets/media/skills/firemaking/firemaking.svg', 'assets/media/skills/mining/mining.svg', 'assets/media/skills/woodcutting/woodcutting.svg', 'assets/media/skills/herblore/herblore.svg', 'assets/media/skills/smithing/smithing.svg', 'assets/media/skills/magic/magic.svg', 'assets/media/skills/runecrafting/runecrafting.svg', 'assets/media/skills/crafting/crafting.svg', 'assets/media/skills/fletching/fletching.svg', 'assets/media/skills/summoning/summoning.svg', 'assets/media/skills/fishing/fishing.svg', 'assets/media/skills/cooking/cooking.svg', 'assets/media/skills/astrology/astrology.svg', 'assets/media/skills/agility/agility.svg', ];

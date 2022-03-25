"use strict";
class Character {
    constructor(manager) {
        this.manager = manager;
        this.hitpoints = 0;
        this.stun = {
            turns: 0,
            flavour: 'Stun',
        };
        this.sleep = {
            turns: 0,
        };
        this.nextAction = 'Attack';
        this.attackCount = 1;
        this.nextAttack = attacks.Normal;
        this.isAttacking = false;
        this.firstHit = true;
        this.slowCount = 0;
        this.frostBurnCount = 0;
        this.curse = {
            turns: 0,
            data: CURSES[0],
        };
        this.isAfflicted = false;
        this.modifierEffects = {
            fromSelf: {
                countSelf: new Map(),
                countTarget: new Map(),
            },
            fromTarget: {
                countSelf: new Map(),
                countTarget: new Map(),
            },
        };
        this.reflexiveEffects = new Map();
        this.stackingEffect = new Map();
        this.comboEffects = new Map();
        this.activeDOTs = new Map();
        this.target = this;
        this.spellSelection = {
            standard: 0,
            ancient: -1,
            aurora: -1,
            curse: -1,
        };
        this.equipmentStats = new EquipmentStats();
        this.levels = {
            Hitpoints: 0,
            Attack: 0,
            Strength: 0,
            Defence: 0,
            Ranged: 0,
            Magic: 0,
            Prayer: 0,
        };
        this.stats = new CharacterStats();
        this.attackType = 'melee';
        this.hitchance = 0;
        this.availableAttacks = [{
            attack: attacks.Normal,
            chance: 100,
        }, ];
        this.targetModifiers = new TargetModifiers();
        this.canCurse = false;
        this.canAurora = false;
        this.passives = new Map();
        this.rendersRequired = {
            stats: false,
            hitChance: false,
            hitpoints: false,
            damageSplash: false,
            effects: false,
            attackBar: false,
            attackBarMinibar: false,
            attacks: false,
            passives: false,
            damageValues: false,
        };
        this.turnsTaken = 0;
        this.timers = {
            act: new Timer('Act',this.act.bind(this)),
            regen: new Timer('Regen',this.regen.bind(this)),
        };
    }
    get hitpointsPercent() {
        return (100 * this.hitpoints) / this.stats.maxHitpoints;
    }
    get usingAncient() {
        return this.attackType === 'magic' && this.spellSelection.ancient !== -1;
    }
    get isBurning() {
        return this.isDotActive('Burn');
    }
    get isBleeding() {
        return this.isDotActive('Bleed');
    }
    get isPoisoned() {
        return this.isDotActive('Poison');
    }
    isDotActive(type) {
        let active = false;
        this.activeDOTs.forEach((dot)=>{
            if (dot.type === type)
                active = true;
        }
        );
        return active;
    }
    isEffectSubtypeActive(type) {
        let active = false;
        switch (type) {
        case ModifierEffectSubtype.Frostburn:
            active = this.frostBurnCount > 0;
            break;
        case ModifierEffectSubtype.Slow:
            active = this.slowCount > 0;
            break;
        }
        return active;
    }
    isTargetDotActive(type) {
        return this.manager.fightInProgress && this.target.isDotActive(type);
    }
    isFightingTypeVsType(thisType, targetType) {
        return this.manager.fightInProgress && this.attackType === thisType && this.target.attackType === targetType;
    }
    isFighting() {
        return this.manager.fightInProgress;
    }
    get minHitFromMaxHitPercent() {
        let percent = this.modifiers.getMinHitFromMaxHitModifier();
        if (this.attackType === 'magic' && this.spellSelection.standard !== -1) {
            const spell = SPELLS[this.spellSelection.standard];
            if (spell.spellType === SpellTypes.Nature)
                percent += this.modifiers.increasedMinNatureSpellDamageBasedOnMaxHit;
        }
        return percent;
    }
    setRenderAll() {
        this.rendersRequired.attackBar = true;
        this.rendersRequired.attackBarMinibar = true;
        this.rendersRequired.attacks = true;
        this.rendersRequired.damageSplash = true;
        this.rendersRequired.damageValues = true;
        this.effectRenderer.queueRemoveAll();
        this.rendersRequired.effects = true;
        this.rendersRequired.hitChance = true;
        this.rendersRequired.hitpoints = true;
        this.rendersRequired.passives = true;
        this.rendersRequired.stats = true;
    }
    initializeForCombat() {
        this.computeCombatStats();
        this.rendersRequired.attackBar = true;
        this.rendersRequired.attackBarMinibar = true;
    }
    stopFighting() {
        this.timers.act.stop();
        this.isAttacking = false;
        this.removeAllEffects(false);
        this.initializeForCombat();
        this.target = this;
    }
    computeAttackInterval() {
        let attackInterval = this.equipmentStats.attackSpeed || 4000;
        attackInterval = this.modifyAttackInterval(attackInterval);
        attackInterval = roundToTickInterval(attackInterval);
        attackInterval = Math.max(attackInterval, 250);
        this.stats.attackInterval = attackInterval;
    }
    computeMinHit() {
        let minHit = 1;
        minHit = this.modifyMinHit(minHit);
        this.stats.minHit = minHit;
    }
    computeMaxHP() {
        let maxHP = getNumberMultiplierValue(this.levels.Hitpoints);
        maxHP = this.modifyMaxHP(maxHP);
        this.stats.maxHitpoints = maxHP;
        if (this.hitpoints >= maxHP)
            this.setHitpoints(maxHP);
    }
    computeAccuracy() {
        let accuracy = Character.calculateStandardStat(this.getAccuracyValues());
        accuracy = this.modifyAccuracy(accuracy);
        this.stats.accuracy = accuracy;
    }
    computeMaxHit() {
        let maxHit;
        switch (this.attackType) {
        case 'magic':
            maxHit = this.computeMagicMaxHit();
            break;
        case 'ranged':
            maxHit = this.computeRangedMaxHit();
            break;
        case 'melee':
            maxHit = this.computeMeleeMaxHit();
            break;
        default:
            throw new Error(`Invalid Attack Type: ${this.attackType}`);
        }
        maxHit = this.modifyMaxHit(maxHit);
        this.stats.maxHit = maxHit;
    }
    computeMeleeMaxHit() {
        return Character.calculateStandardMaxHit(this.levels.Strength, this.equipmentStats.meleeStrengthBonus);
    }
    computeRangedMaxHit() {
        return Character.calculateStandardMaxHit(this.levels.Ranged, this.equipmentStats.rangedStrengthBonus);
    }
    computeMagicMaxHit() {
        if (this.spellSelection.ancient !== -1) {
            return numberMultiplier * ANCIENT[this.spellSelection.ancient].specialAttack.damage[0].maxPercent;
        } else {
            const spell = SPELLS[this.spellSelection.standard];
            return Math.floor(numberMultiplier * spell.maxHit * (1 + this.equipmentStats.magicDamageBonus / 100) * (1 + (this.levels.Magic + 1) / 200));
        }
    }
    computeEvasion() {
        const evasion = {
            melee: Character.calculateStandardStat({
                effectiveLevel: this.levels.Defence,
                bonus: this.getMeleeDefenceBonus(),
            }),
            ranged: Character.calculateStandardStat({
                effectiveLevel: this.levels.Defence,
                bonus: this.getRangedDefenceBonus(),
            }),
            magic: Character.calculateStandardStat({
                effectiveLevel: Math.floor(this.levels.Defence * 0.3 + this.levels.Magic * 0.7),
                bonus: this.getMagicDefenceBonus(),
            }),
        };
        this.modifyEvasion(evasion);
        Object.assign(this.stats.evasion, evasion);
    }
    getMeleeDefenceBonus() {
        return this.equipmentStats.meleeDefenceBonus;
    }
    getRangedDefenceBonus() {
        return this.equipmentStats.rangedDefenceBonus;
    }
    getMagicDefenceBonus() {
        return this.equipmentStats.magicDefenceBonus;
    }
    computeDamageReduction() {
        let reduction = this.equipmentStats.damageReduction;
        reduction = this.modifyDamageReduction(reduction);
        reduction = Math.floor(reduction);
        this.stats.damageReduction = clampValue(reduction, 0, 95);
    }
    static calculateStandardStat(values) {
        return (values.effectiveLevel + 9) * (values.bonus + 64);
    }
    static calculateStandardMaxHit(baseLevel, strengthBonus) {
        const effectiveLevel = baseLevel + 9;
        return Math.floor(numberMultiplier * (1.3 + effectiveLevel / 10 + strengthBonus / 80 + (effectiveLevel * strengthBonus) / 640));
    }
    modifyAccuracy(accuracy) {
        let accuracyModifier = this.modifiers.getAccuracyModifier(this.attackType);
        if (this.attackType === 'magic' && this.spellSelection.standard !== -1 && SPELLS[this.spellSelection.standard].spellTier === 4) {
            accuracyModifier += this.modifiers.increasedSurgeSpellMaxHit;
        }
        return applyModifier(accuracy, accuracyModifier);
    }
    modifyEvasion(evasion) {
        evasion.melee = applyModifier(evasion.melee, this.modifiers.getEvasionModifier('melee'));
        evasion.ranged = applyModifier(evasion.ranged, this.modifiers.getEvasionModifier('ranged'));
        evasion.magic = applyModifier(evasion.magic, this.modifiers.getEvasionModifier('magic'));
        if (this.modifiers.globalEvasionHPScaling > 0) {
            const modifier = (this.modifiers.globalEvasionHPScaling * this.hitpointsPercent) / 100;
            evasion.melee = Math.floor(evasion.melee * modifier);
            evasion.ranged = Math.floor(evasion.ranged * modifier);
            evasion.magic = Math.floor(evasion.magic * modifier);
        }
    }
    modifyMaxHit(maxHit) {
        if (this.usingAncient) {
            return maxHit;
        }
        let maxHitModifier = this.modifiers.getMaxHitModifier(this.attackType);
        if (this.attackType === 'magic' && this.spellSelection.standard !== -1 && SPELLS[this.spellSelection.standard].spellTier === 4) {
            maxHitModifier += this.modifiers.increasedSurgeSpellMaxHit;
        }
        maxHit = applyModifier(maxHit, maxHitModifier);
        maxHit += getNumberMultiplierValue(this.modifiers.getMaxHitFlatModifier());
        if (this.attackType === 'magic' && this.spellSelection.standard !== -1) {
            maxHit += getNumberMultiplierValue(this.modifiers.getSpellMaxHitModifier(SPELLS[this.spellSelection.standard].spellType));
        }
        maxHit = Math.max(maxHit, 1);
        return maxHit;
    }
    modifyMinHit(minHit) {
        minHit += Math.floor((this.stats.maxHit * this.minHitFromMaxHitPercent) / 100);
        minHit += getNumberMultiplierValue(this.modifiers.getFlatMinHitModifier());
        if (this.attackType === 'magic' && this.spellSelection.standard !== -1) {
            minHit += getNumberMultiplierValue(this.modifiers.getSpellMinHitModifier(SPELLS[this.spellSelection.standard].spellType));
        }
        minHit = Math.max(minHit, 1);
        minHit = Math.min(minHit, this.stats.maxHit);
        return minHit;
    }
    modifyMaxHP(maxHP) {
        maxHP += getNumberMultiplierValue(this.modifiers.getMaxHPFlatModifier());
        maxHP = applyModifier(maxHP, this.modifiers.getMaxHPPercentModifier());
        maxHP = Math.max(maxHP, numberMultiplier);
        return maxHP;
    }
    modifyAttackInterval(attackInterval) {
        attackInterval = applyModifier(attackInterval, this.modifiers.getAttackIntervalModifier());
        attackInterval += this.modifiers.getFlatAttackIntervalModifier();
        return attackInterval;
    }
    modifyDamageReduction(reduction) {
        reduction += this.modifiers.getFlatDamageReductionModifier();
        reduction *= 1 + (this.modifiers.increasedDamageReductionPercent - this.modifiers.decreasedDamageReductionPercent) / 100;
        return reduction;
    }
    computeAllStats() {
        this.computeAttackType();
        this.computeModifiers();
        this.computeAttackSelection();
        this.computeLevels();
        this.computeEquipmentStats();
        this.computeCombatStats();
    }
    computeCombatStats() {
        this.computeMaxHP();
        this.updateHPConditionals(false);
        this.computeDamageReduction();
        this.computeAccuracy();
        this.computeEvasion();
        this.computeMaxHit();
        this.computeMinHit();
        this.computeAttackInterval();
        if (this.manager.fightInProgress) {
            this.computeHitchance();
            this.target.computeHitchance();
            this.target.rendersRequired.damageValues = true;
        }
        this.rendersRequired.stats = true;
        this.rendersRequired.damageValues = true;
    }
    updateHPConditionals(computeStats=true) {
        if (this.modifiers.globalEvasionHPScaling > 0 && computeStats)
            this.computeCombatStats();
    }
    computeHitchance() {
        const protection = this.target.modifiers.getProtectionValue(this.attackType);
        if (protection !== 0) {
            this.hitchance = 100 - protection;
        } else {
            const targetEvasion = this.target.stats.evasion[this.attackType];
            const accuracy = this.stats.accuracy;
            if (accuracy < targetEvasion) {
                this.hitchance = ((0.5 * accuracy) / targetEvasion) * 100;
            } else {
                this.hitchance = (1 - (0.5 * targetEvasion) / accuracy) * 100;
            }
        }
        this.rendersRequired.hitChance = true;
    }
    damage(amount, source) {
        this.addHitpoints(-amount);
        this.splashManager.add({
            source: source,
            amount: -amount,
            xOffset: this.hitpointsPercent,
        });
        if (this.hitpoints <= 0 && rollPercentage(this.modifiers.increasedRebirthChance))
            this.heal(this.stats.maxHitpoints);
        this.rendersRequired.damageSplash = true;
    }
    heal(amount) {
        amount = Math.min(amount, this.stats.maxHitpoints - this.hitpoints);
        this.addHitpoints(amount);
        this.splashManager.add({
            source: 'Heal',
            amount,
            xOffset: this.hitpointsPercent,
        });
        this.rendersRequired.damageSplash = true;
        return amount;
    }
    addHitpoints(amount) {
        this.hitpoints += amount;
        this.rendersRequired.hitpoints = true;
        if (this.manager.fightInProgress) {
            this.target.rendersRequired.damageValues = true;
            this.rendersRequired.damageValues = true;
        }
        this.updateHPConditionals(true);
    }
    setHitpoints(value) {
        this.hitpoints = value;
        this.rendersRequired.hitpoints = true;
    }
    isImmuneTo(attackType) {
        return (this.modifiers.getImmunity(attackType) || (this.modifiers.otherStyleImmunity > 0 && attackType !== this.attackType));
    }
    fireMissSplash(immune) {
        const text = getLangString('COMBAT_MISC', immune ? 'IMMUNE' : 'MISS');
        this.splashManager.add({
            source: 'Attack',
            amount: 0,
            text,
            xOffset: this.hitpointsPercent,
        });
        this.rendersRequired.damageSplash = true;
    }
    applyEffects(effects, target, damage=0, attack=this.nextAttack) {
        let blockedIndexes = 0;
        effects.forEach((effect,i,array)=>{
            if (effect.type === 'Compound') {
                blockedIndexes = effect.numEffects + 1;
                if (rollPercentage(effect.chance)) {
                    const effectIndex = i + rollInteger(1, effect.numEffects);
                    this.applyEffect(array[effectIndex], target, damage, attack);
                }
            }
            if (blockedIndexes <= 0)
                this.applyEffect(effect, target, damage, attack);
            blockedIndexes--;
        }
        );
    }
    attack(target, attack) {
        const targetImmune = target.isImmuneTo(this.attackType);
        let damage = 0;
        if (!targetImmune) {
            this.applyEffects(attack.prehitEffects, target);
            if (this.canCurse && this.spellSelection.curse !== -1 && target.curse.turns === 0 && target.modifiers.curseImmunity === 0)
                this.applyCurse(target);
        }
        if (!targetImmune && this.rollToHit(target, attack)) {
            damage = attack.damage.reduce(damageReducer(this, target), 0);
            const crit = rollPercentage(this.modifiers.getCritChance(this.attackType));
            if (crit) {
                damage *= 1.5;
            }
            const preModDamage = damage;
            damage = this.modifyAttackDamage(target, attack, damage);
            damage = Math.min(damage, target.hitpoints);
            target.damage(damage, crit ? 'Crit' : 'Attack');
            this.lifesteal(attack, damage);
            let damageTaken = 0;
            if (this.firstHit) {
                let reflectDamage = (damage * target.modifiers.getReflectPercent()) / 100;
                reflectDamage += getNumberMultiplierValue(target.modifiers.getFlatReflectDamage());
                reflectDamage += rollInteger(0, getNumberMultiplierValue(target.modifiers.getRolledReflectDamage()));
                reflectDamage = target.applyDamageModifiers(this, reflectDamage);
                reflectDamage *= 1 - this.stats.damageReduction / 100;
                reflectDamage = Math.floor(reflectDamage);
                if (reflectDamage < this.hitpoints)
                    damageTaken += reflectDamage;
                if (rollPercentage(this.target.modifiers.increasedPoisonReflectChance)) {
                    this.target.applyDOT(poisonEffect, this, 0);
                }
                if (rollPercentage(this.target.modifiers.increasedBleedReflectChance)) {
                    this.target.applyDOT(bleedReflectEffect, this, damage);
                }
                damageTaken += Math.floor((this.hitpoints * this.modifiers.increasedConfusion) / 100);
                damageTaken += Math.floor((this.stats.maxHitpoints * this.modifiers.increasedDecay) / 100);
            }
            damageTaken = Math.min(damageTaken, this.hitpoints);
            if (damageTaken > 0)
                this.damage(damageTaken, 'Attack');
            this.applyEffects(attack.onhitEffects, target, preModDamage);
            let applyStun = this.modifiers.increasedMeleeStunThreshold > 0 && this.attackType === 'melee' && preModDamage / this.stats.maxHit >= this.modifiers.increasedMeleeStunThreshold / 100;
            applyStun || (applyStun = this.attackType === 'melee' && rollPercentage(this.modifiers.increasedMeleeStunChance));
            if (applyStun) {
                this.applyStun({
                    chance: 100,
                    turns: 1,
                    type: 'Stun',
                    flavour: 'Stun',
                }, target);
            }
            if (this.attackType === 'magic' && rollPercentage(this.modifiers.increasedElementalEffectChance)) {
                this.applyEffects(elementalEffects, target, 0, attacks.Normal);
            }
            if (rollPercentage(this.modifiers.increasedChanceToApplyPoison)) {
                this.applyEffect(poisonEffect, target, 0);
            }
            if (this.modifiers.increasedOnHitSlowMagnitude > 0) {
                this.applyModifierEffect(new SlowEffect(this.modifiers.increasedOnHitSlowMagnitude,2), target, attacks.Normal);
            }
            target.reflexiveEffects.forEach((activeEffect,effect)=>{
                if (activeEffect.stacks < effect.maxStacks) {
                    activeEffect.stacks++;
                    target.modifiers.addModifiers(effect.modifiers);
                    target.computeCombatStats();
                    target.rendersRequired.effects = true;
                }
            }
            );
            this.comboEffects.forEach((activeEffect,effect)=>{
                if (activeEffect.sourceAttack === attack && activeEffect.stacks < effect.maxStacks) {
                    activeEffect.stacks++;
                    this.modifiers.addModifiers(effect.modifiers);
                    this.computeCombatStats();
                    this.rendersRequired.effects = true;
                }
            }
            );
            this.onHit();
            target.onBeingHit();
            this.firstHit = false;
        } else {
            this.removeComboEffects();
            this.computeCombatStats();
            target.fireMissSplash(targetImmune);
            this.onMiss();
        }
        if (!targetImmune) {
            if (rollPercentage(this.modifiers.increasedChanceToApplyBurn - this.modifiers.decreasedChanceToApplyBurn)) {
                this.applyEffect(burnEffect, target, 0);
            }
            if (rollPercentage(this.modifiers.increasedChanceToApplyFrostburn)) {
                this.applyModifierEffect(frostBurnEffect, this.target, attacks.Normal);
            }
            if (this.attackCount === 0 && rollPercentage(this.modifiers.increasedAfflictionChance)) {
                this.applyModifierEffect(afflictionEffect, this.target, attacks.Normal);
            }
        }
        if (this.attackCount === 0) {
            const damageTaken = Math.floor((this.hitpoints * this.modifiers.increasedFrostburn) / 100);
            if (damageTaken > 0)
                this.damage(damageTaken, 'Attack');
        }
        target.postAttack();
        this.attackCount++;
        if (attack.consumeStacks !== undefined) {
            let maxAttacks = attack.attackCount;
            const existingStacks = target.stackingEffect.get(attack.consumeStacks);
            if (existingStacks !== undefined)
                maxAttacks += existingStacks.stacks;
            this.isAttacking = this.attackCount < maxAttacks;
            if (!this.isAttacking && existingStacks !== undefined) {
                target.removeStackingEffect(attack.consumeStacks);
                target.computeCombatStats();
            }
        } else {
            this.isAttacking = this.attackCount < attack.attackCount;
        }
        return damage;
    }
    modifyAttackDamage(target, attack, damage) {
        damage = this.applyDamageModifiers(target, damage);
        if (attack.isDragonbreath)
            damage *= 1 - target.modifiers.decreasedDragonBreathDamage / 100;
        damage *= 1 - target.stats.damageReduction / 100;
        return Math.floor(damage);
    }
    getAttackMaxDamage(attack) {
        const maxHit = attack.damage.reduce(maxDamageReducer(this, this.target), 0);
        return this.modifyAttackDamage(this.target, attacks.Normal, maxHit);
    }
    lifesteal(attack, damage) {
        const lifesteal = this.modifiers.getLifesteal(this.attackType) + attack.lifesteal;
        let healing = Math.floor((damage * lifesteal) / 100);
        if (healing > 0)
            healing = this.heal(healing);
        return healing;
    }
    removeStackingEffect(effect) {
        const activeEffect = this.stackingEffect.get(effect);
        if (activeEffect === undefined)
            throw new Error('Tried to remove stacking effect that does not exist');
        this.stackingEffect.delete(effect);
        this.effectRenderer.queueRemoval(activeEffect);
        this.modifiers.subModifiers(effect.modifiers);
        this.rendersRequired.effects = true;
    }
    onBeingHit() {}
    rollToHit(target, attack) {
        if (target.modifiers.getProtectionValue(this.attackType) === 100)
            return false;
        if (target.stun.turns > 0 || target.sleep.turns > 0 || (attack.cantMiss && this.stats.accuracy >= attack.minAccuracy))
            return true;
        const maxRolls = 1 + this.modifiers.increasedAttackRolls - this.modifiers.decreasedAttackRolls;
        let hit = false;
        for (let i = 0; i < maxRolls; i++) {
            hit = rollPercentage(this.hitchance);
            if (hit)
                break;
        }
        return hit;
    }
    addAuroraModifiers() {
        if (this.canAurora && this.spellSelection.aurora !== -1) {
            this.modifiers.addModifiers(AURORAS[this.spellSelection.aurora].modifiers);
        }
    }
    addCurseModifiers() {
        if (this.curse.turns > 0) {
            this.modifiers.addModifiers(this.curse.data.enemyModifiers);
        }
    }
    addEffectModifiers() {
        const addModifiers = (attackMap)=>{
            attackMap.forEach((effectData,effect)=>{
                this.modifiers.addModifiers(effect.modifiers, effectData.stacks, effectData.stacks);
            }
            );
        }
        ;
        this.modifierEffects.fromSelf.countSelf.forEach(addModifiers);
        this.modifierEffects.fromSelf.countTarget.forEach(addModifiers);
        this.modifierEffects.fromTarget.countSelf.forEach(addModifiers);
        this.modifierEffects.fromTarget.countTarget.forEach(addModifiers);
        this.stackingEffect.forEach((activeEffect,effect)=>{
            this.modifiers.addModifiers(effect.modifiers);
        }
        );
        this.reflexiveEffects.forEach((activeReflex,effect)=>{
            if (activeReflex.stacks > 0)
                this.modifiers.addModifiers(effect.modifiers, activeReflex.stacks, activeReflex.stacks);
        }
        );
        this.comboEffects.forEach((activeEffect,effect)=>{
            if (activeEffect.stacks > 0)
                this.modifiers.addModifiers(effect.modifiers, activeEffect.stacks, activeEffect.stacks);
        }
        );
    }
    addCombatAreaEffectModifiers() {
        if (this.manager.fightInProgress)
            this.modifiers.addModifiers(this.manager.enemyAreaModifiers);
    }
    addPassiveModifiers() {
        this.passives.forEach((_,passive)=>{
            this.modifiers.addModifiers(passive.modifiers);
        }
        );
    }
    addTargetModifiers() {
        if (this.manager.fightInProgress)
            this.target.targetModifiers.addToCombatModifiers(this.modifiers);
    }
    addToTargetModifiers(modifiers, negMult=1, posMult=1) {
        this.targetModifiers.addModifiers(modifiers, negMult, posMult);
        if (this.manager.fightInProgress) {
            this.target.modifiers.addModifiers(modifiers, negMult, posMult);
            this.target.computeCombatStats();
        }
    }
    subFromTargetModifiers(modifiers, negMult=1, posMult=1) {
        this.addToTargetModifiers(modifiers, -negMult, -posMult);
    }
    getDamageModifiers(target) {
        let totalModifier = target.modifiers.increasedDamageTaken - target.modifiers.decreasedDamageTaken;
        if (target.stun.turns > 0)
            totalModifier += 30;
        if (target.sleep.turns > 0)
            totalModifier += 20;
        return totalModifier;
    }
    applyDamageModifiers(target, damage) {
        damage *= 1 + this.getDamageModifiers(target) / 100;
        return damage;
    }
    removeAllEffects(removeDOTS=false) {
        this.reflexiveEffects.forEach((active,effect)=>{
            this.modifiers.subModifiers(effect.modifiers, active.stacks, active.stacks);
        }
        );
        this.reflexiveEffects.clear();
        this.stackingEffect.forEach((active,effect)=>{
            this.modifiers.subModifiers(effect.modifiers);
        }
        );
        this.stackingEffect.clear();
        let effectRemoved = false;
        effectRemoved = this.removeModifierEffects(this.modifierEffects.fromSelf.countSelf) || effectRemoved;
        effectRemoved = this.removeModifierEffects(this.modifierEffects.fromSelf.countTarget) || effectRemoved;
        effectRemoved = this.removeModifierEffects(this.modifierEffects.fromTarget.countSelf) || effectRemoved;
        effectRemoved = this.removeModifierEffects(this.modifierEffects.fromTarget.countTarget) || effectRemoved;
        if (effectRemoved) {
            this.onModifierEffectRemoval();
            this.target.onTargetModifierEffectRemoval();
        }
        this.slowCount = 0;
        this.frostBurnCount = 0;
        this.stun.turns = 0;
        this.sleep.turns = 0;
        if (this.curse.turns > 0) {
            this.modifiers.subModifiers(this.curse.data.enemyModifiers);
        }
        this.curse.turns = 0;
        if (removeDOTS) {
            this.activeDOTs.forEach((activeDOT,id)=>{
                this.activeDOTs.delete(id);
                this.onDOTRemoval(activeDOT.type, false);
                this.target.onTargetDOTRemoval(activeDOT.type, false);
            }
            );
        }
        this.removeComboEffects();
        this.effectRenderer.queueRemoveAll();
        this.rendersRequired.effects = true;
    }
    removeComboEffects() {
        this.comboEffects.forEach((activeEffect,effect)=>{
            this.effectRenderer.queueRemoval(activeEffect);
            this.modifiers.subModifiers(effect.modifiers, activeEffect.stacks, activeEffect.stacks);
        }
        );
        this.comboEffects.clear();
        this.rendersRequired.effects = true;
    }
    addPassives(passiveIDs, save=false, display=true, statUpdate=true) {
        passiveIDs.forEach((id)=>{
            const passive = combatPassives[id];
            this.passives.set(passive, {
                save,
                display
            });
            this.modifiers.addModifiers(passive.modifiers);
        }
        );
        this.rendersRequired.passives = true;
        if (statUpdate)
            this.computeCombatStats();
    }
    removePassives(passiveIDs) {
        passiveIDs.forEach((id)=>{
            const passive = combatPassives[id];
            this.passives.delete(passive);
            this.modifiers.subModifiers(passive.modifiers);
        }
        );
        this.rendersRequired.passives = true;
        this.computeCombatStats();
    }
    removeAllPassives() {
        this.passives.forEach((_,passive)=>{
            this.modifiers.subModifiers(passive.modifiers);
        }
        );
        this.passives.clear();
        this.rendersRequired.passives = true;
        this.computeCombatStats();
    }
    applyEffect(effect, target, damage=0, attack=this.nextAttack) {
        switch (effect.type) {
        case 'DOT':
            this.applyDOT(effect, target, damage);
            break;
        case 'Reflexive':
            this.applyReflexiveEffect(effect, attack);
            break;
        case 'Stacking':
            this.applyStackingEffect(effect, target);
            break;
        case 'Modifier':
            this.applyModifierEffect(effect, target, attack);
            break;
        case 'Sleep':
            this.applySleep(effect, target);
            break;
        case 'Stun':
            this.applyStun(effect, target);
            break;
        case 'Combo':
            this.applyComboEffect(effect, attack);
            break;
        case 'Compound':
            throw new Error('Compound effects cannot be applied directly.');
        }
    }
    applyStackingEffect(effect, target) {
        if (target.modifiers.debuffImmunity !== 0)
            return;
        let existingStacks = target.stackingEffect.get(effect);
        if (existingStacks === undefined) {
            existingStacks = {
                stacks: 0,
            };
            target.stackingEffect.set(effect, existingStacks);
            target.modifiers.addModifiers(effect.modifiers);
            target.computeCombatStats();
            target.rendersRequired.effects = true;
        }
        existingStacks.stacks += effect.stacksToAdd;
        existingStacks.stacks = Math.min(existingStacks.stacks, effect.maxStacks);
    }
    applyReflexiveEffect(effect, attack) {
        let existingEffect = this.reflexiveEffects.get(effect);
        if (existingEffect === undefined) {
            existingEffect = {
                stacks: 0,
                sourceAttack: attack,
                turnsLeft: effect.turns + 1,
            };
            this.reflexiveEffects.set(effect, existingEffect);
            this.rendersRequired.effects = true;
        }
    }
    applyComboEffect(effect, attack) {
        if (this.comboEffects.get(effect) === undefined) {
            this.comboEffects.set(effect, {
                sourceAttack: attack,
                stacks: 0,
            });
        }
    }
    applyCurse(target) {
        target.curse.turns = 3;
        const curse = CURSES[this.spellSelection.curse];
        target.curse.data = curse;
        target.modifiers.addModifiers(curse.enemyModifiers);
        target.computeCombatStats();
        target.rendersRequired.effects = true;
        this.rendersRequired.damageValues = true;
    }
    combatModifierUpdate() {
        this.computeModifiers();
        this.computeCombatStats();
    }
    immuneToDOT(type) {
        let immune = false;
        switch (type) {
        case 'Bleed':
            immune = rollPercentage(this.modifiers.bleedImmunity);
            break;
        case 'Burn':
            immune = rollPercentage(this.modifiers.burnImmunity);
            break;
        case 'Poison':
            immune = rollPercentage(this.modifiers.poisonImmunity);
            break;
        }
        return immune;
    }
    applyDOT(effect, target, damageDealt) {
        if (!rollPercentage(effect.chance) || target.immuneToDOT(effect.subtype))
            return false;
        if (effect.subtype === 'Regen')
            target = this;
        if (!this.manager.allowDuplicateDOTS) {
            let duplicated = false;
            target.activeDOTs.forEach((dot)=>{
                if (dot.type === effect.subtype)
                    duplicated = true;
            }
            );
            if (duplicated)
                return false;
        }
        let totalDamage = effect.damage.reduce(damageReducer(this, target, damageDealt), 0);
        totalDamage += numberMultiplier * this.modifiers.increasedTotalBleedDamage;
        if (effect.subtype !== 'Regen') {
            totalDamage = this.applyDamageModifiers(target, totalDamage);
            totalDamage *= 1 - target.stats.damageReduction / 100;
        }
        let procDamage = Math.floor(totalDamage / effect.procs);
        procDamage = Math.max(procDamage, 1);
        if (totalDamage === 0)
            return false;
        const dotID = this.manager.dotID;
        const dotData = {
            type: effect.subtype,
            damage: procDamage,
            procsLeft: effect.procs,
            interval: effect.interval,
            timer: new Timer('DOT',()=>target.dot(dotID)),
        };
        dotData.timer.start(dotData.interval + TICK_INTERVAL);
        target.activeDOTs.set(dotID, dotData);
        target.rendersRequired.effects = true;
        target.onDOTApplication(effect.subtype);
        return true;
    }
    onDOTApplication(type) {}
    onDOTRemoval(type, statUpdate=true) {}
    onTargetDOTRemoval(type, statUpdate=true) {}
    onModifierEffectApplication() {}
    onModifierEffectRemoval() {}
    onTargetModifierEffectRemoval() {}
    onTargetModifierEffectApplication() {}
    getAttackModifiers(effect) {
        let countedMods;
        let attackMods;
        switch (effect.character) {
        case 'Attacker':
            countedMods = this.modifierEffects.fromSelf;
            switch (effect.countsOn) {
            case 'Attacker':
                attackMods = countedMods.countSelf;
                break;
            case 'Target':
                attackMods = countedMods.countTarget;
                break;
            }
            break;
        case 'Target':
            countedMods = this.target.modifierEffects.fromTarget;
            switch (effect.countsOn) {
            case 'Attacker':
                attackMods = countedMods.countTarget;
                break;
            case 'Target':
                attackMods = countedMods.countSelf;
                break;
            }
            break;
        }
        return attackMods;
    }
    applyModifierEffect(effect, target, attack) {
        if (effect.character === 'Target' && target.modifiers.debuffImmunity > 0)
            return;
        const isSlow = effect instanceof SlowEffect;
        const isFrostburn = effect === frostBurnEffect;
        if (effect.character === 'Target' && isSlow && rollPercentage(target.modifiers.slowImmunity))
            return;
        if (isFrostburn && rollPercentage(target.modifiers.frostBurnImmunity))
            return;
        if (effect === afflictionEffect)
            attack = attacks.Normal;
        let applied = false;
        const attackMap = this.getAttackModifiers(effect);
        let effectMap = attackMap.get(attack);
        if (effectMap === undefined) {
            effectMap = new Map();
            attackMap.set(attack, effectMap);
        }
        let activeData = effectMap.get(effect);
        if (isSlow && attack === attacks.Normal) {
            effectMap.forEach((active,effect)=>{
                if (effect instanceof SlowEffect)
                    activeData = active;
            }
            );
        }
        if (activeData === undefined) {
            activeData = {
                turnsLeft: effect.turns + 1,
                stacks: 1,
            };
            effectMap.set(effect, activeData);
            applied = true;
        } else if (effect.maxStacks > activeData.stacks) {
            activeData.stacks++;
            applied = true;
        }
        if (applied) {
            let updateCharacter;
            switch (effect.character) {
            case 'Attacker':
                updateCharacter = this;
                break;
            case 'Target':
                updateCharacter = target;
                break;
            }
            if (isSlow)
                updateCharacter.slowCount++;
            if (isFrostburn)
                updateCharacter.frostBurnCount++;
            updateCharacter.rendersRequired.effects = true;
            updateCharacter.modifiers.addModifiers(effect.modifiers);
            if (effect.character === 'Target')
                this.onTargetModifierEffectApplication();
            updateCharacter.onModifierEffectApplication();
            updateCharacter.computeCombatStats();
        }
    }
    applySleep(effect, target) {
        if (target.modifiers.sleepImmunity === 0 && target.sleep.turns === 0 && rollPercentage(effect.chance) && (effect.hitpointThreshold === undefined || target.hitpointsPercent <= effect.hitpointThreshold)) {
            target.sleep.turns = effect.turns;
            target.queueNextAction();
            target.rendersRequired.effects = true;
            this.rendersRequired.damageValues = true;
        }
    }
    applyStun(effect, target) {
        if (target.stun.turns === 0 && rollPercentage(effect.chance) && !rollPercentage(target.modifiers.stunImmunity)) {
            target.stun.turns = effect.turns;
            if (rollPercentage(this.modifiers.increasedChanceToIncreaseStunDuration))
                target.stun.turns++;
            target.stun.flavour = effect.flavour;
            target.queueNextAction();
            target.rendersRequired.effects = true;
            this.rendersRequired.damageValues = true;
        }
    }
    tick() {
        this.timers.regen.tick();
        this.timers.act.tick();
        if (this.activeDOTs.size)
            this.activeDOTs.forEach((dot)=>dot.timer.tick());
    }
    getErrorLog() {
        return `Next Action: ${this.nextAction}
Next Attack: ${this.nextAttack.id}
Is Attacking: ${this.isAttacking}
Standard Spell Selected: ${this.spellSelection.standard}
Ancient Spell Selected ${this.spellSelection.ancient}
Aurora Selected: ${this.spellSelection.aurora}
Curse Selected: ${this.spellSelection.curse}`;
    }
    act() {
        let endOfTurn = true;
        switch (this.nextAction) {
        case 'Attack':
            this.attack(this.target, this.nextAttack);
            endOfTurn = this.nextAttack.attackCount === this.attackCount;
            break;
        case 'Nothing':
            break;
        default:
            throw new Error(`Invalid action type: ${this.nextAction}`);
        }
        if (this.stun.turns > 0) {
            this.stun.turns--;
            if (this.stun.turns === 0) {
                this.effectRenderer.queueRemoval(this.stun);
                this.target.rendersRequired.damageValues = true;
            }
            this.rendersRequired.effects = true;
        }
        if (this.sleep.turns > 0) {
            this.sleep.turns--;
            if (this.sleep.turns === 0) {
                this.effectRenderer.queueRemoval(this.sleep);
                this.target.rendersRequired.damageValues = true;
            }
            this.rendersRequired.effects = true;
        }
        if (endOfTurn) {
            this.turnsTaken++;
            let eotHealing = 0;
            if (this.turnsTaken % 2 === 0)
                eotHealing += Math.floor((this.modifiers.increasedEndOfTurnHealing2 / 100) * this.hitpoints);
            if (this.turnsTaken % 3 === 0)
                eotHealing += Math.floor((this.modifiers.increasedEndOfTurnHealing3 / 100) * this.hitpoints);
            if (this.turnsTaken % 5 === 0)
                eotHealing += Math.floor((this.modifiers.increasedEndOfTurnHealing5 / 100) * this.hitpoints);
            if (eotHealing > 0)
                this.heal(eotHealing);
            let statUpdateRequired = false;
            if (this.curse.turns > 0) {
                this.curse.turns--;
                if (this.curse.turns === 0) {
                    statUpdateRequired = true;
                    this.modifiers.subModifiers(this.curse.data.enemyModifiers);
                    this.effectRenderer.queueRemoval(this.curse);
                    this.target.rendersRequired.damageValues = true;
                }
                this.rendersRequired.effects = true;
            }
            let selfEffectRemoved = false;
            selfEffectRemoved = this.countModifierEffectTurns(this.modifierEffects.fromSelf.countSelf) || selfEffectRemoved;
            selfEffectRemoved = this.countModifierEffectTurns(this.modifierEffects.fromTarget.countSelf) || selfEffectRemoved;
            statUpdateRequired || (statUpdateRequired = selfEffectRemoved);
            this.stackingEffect.forEach((activeEffect,effect)=>{
                activeEffect.stacks--;
                if (activeEffect.stacks === 0) {
                    this.removeStackingEffect(effect);
                    statUpdateRequired = true;
                }
                this.rendersRequired.effects = true;
            }
            );
            this.reflexiveEffects.forEach((activeEffect,effect)=>{
                activeEffect.turnsLeft--;
                if (activeEffect.turnsLeft === 0) {
                    this.reflexiveEffects.delete(effect);
                    this.effectRenderer.queueRemoval(activeEffect);
                    this.modifiers.subModifiers(effect.modifiers, activeEffect.stacks, activeEffect.stacks);
                    statUpdateRequired = true;
                }
                this.rendersRequired.effects = true;
            }
            );
            const targetEffectRemoved = this.target.countTargetEffectTurns();
            statUpdateRequired || (statUpdateRequired = targetEffectRemoved);
            if (selfEffectRemoved) {
                this.onModifierEffectRemoval();
                this.target.onTargetModifierEffectRemoval();
            }
            if (targetEffectRemoved) {
                this.onTargetModifierEffectRemoval();
                this.target.onModifierEffectRemoval();
            }
            if (statUpdateRequired) {
                this.computeCombatStats();
                this.target.computeCombatStats();
            }
        }
        this.queueNextAction();
    }
    countTargetEffectTurns() {
        let effectRemoved = false;
        effectRemoved = this.countModifierEffectTurns(this.modifierEffects.fromSelf.countTarget) || effectRemoved;
        effectRemoved = this.countModifierEffectTurns(this.modifierEffects.fromTarget.countTarget) || effectRemoved;
        return effectRemoved;
    }
    countModifierEffectTurns(attackMap) {
        let effectRemoved = false;
        attackMap.forEach((effectMap,attack)=>{
            effectMap.forEach((effectData,effect)=>{
                effectData.turnsLeft--;
                if (effectData.turnsLeft === 0) {
                    effectMap.delete(effect);
                    effectRemoved = true;
                    this.effectRenderer.queueRemoval(effectData);
                    this.modifiers.subModifiers(effect.modifiers, effectData.stacks, effectData.stacks);
                    if (effect instanceof SlowEffect)
                        this.slowCount--;
                    if (effect === frostBurnEffect)
                        this.frostBurnCount--;
                }
                this.rendersRequired.effects = true;
            }
            );
            if (effectMap.size === 0)
                attackMap.delete(attack);
        }
        );
        return effectRemoved;
    }
    removeModifierEffects(attackMap) {
        let effectRemoved = false;
        attackMap.forEach((effectMap)=>{
            effectMap.forEach((effectData,effect)=>{
                this.modifiers.subModifiers(effect.modifiers, effectData.stacks, effectData.stacks);
                effectRemoved = true;
            }
            );
        }
        );
        attackMap.clear();
        return effectRemoved;
    }
    dot(dotID) {
        const dotData = this.activeDOTs.get(dotID);
        if (dotData !== undefined) {
            if (dotData.type === 'Regen') {
                this.heal(dotData.damage);
            } else if (this.immuneToDOT(dotData.type)) {
                dotData.procsLeft = 1;
            } else {
                this.damage(dotData.damage, dotData.type);
                if (this.manager.fightInProgress) {
                    const lifeSteal = Math.floor((this.target.modifiers.getDOTLifesteal(dotData.type) * dotData.damage) / 100);
                    if (lifeSteal > 0)
                        this.target.heal(lifeSteal);
                }
            }
            dotData.procsLeft--;
            this.rendersRequired.effects = true;
            if (dotData.procsLeft === 0) {
                this.activeDOTs.delete(dotID);
                this.effectRenderer.queueRemoval(dotData);
                this.onDOTRemoval(dotData.type);
                this.target.onTargetDOTRemoval(dotData.type);
            } else {
                dotData.timer.start(dotData.interval);
            }
        } else {
            throw new Error(`Tried to deal dot damage for nonexistant DOT: ${dotID}`);
        }
    }
    queueNextAction(noSpec=false) {
        if (this.stun.turns > 0 || this.sleep.turns > 0) {
            this.nextAction = 'Nothing';
            this.attackCount = 0;
            this.isAttacking = false;
            this.firstHit = true;
            this.timers.act.start(this.stats.attackInterval);
        } else if (this.isAttacking && !noSpec) {
            this.nextAction = 'Attack';
            this.timers.act.start(this.nextAttack.attackInterval);
        } else {
            this.nextAction = 'Attack';
            this.firstHit = true;
            if (noSpec && !this.usingAncient) {
                this.nextAttack = attacks.Normal;
            } else {
                const attackRoll = Math.random() * 100;
                let percentTotal = 0;
                for (let i = 0; i < this.availableAttacks.length; i++) {
                    const attack = this.availableAttacks[i];
                    percentTotal += attack.chance;
                    if (percentTotal > attackRoll) {
                        this.nextAttack = attack.attack;
                        break;
                    }
                }
                if (this.isAttackAlreadyActive(this.nextAttack)) {
                    this.nextAttack = attacks.Normal;
                }
            }
            this.attackCount = 0;
            this.isAttacking = false;
            this.timers.act.start(this.stats.attackInterval);
        }
        this.rendersRequired.attackBar = true;
        this.rendersRequired.attackBarMinibar = true;
    }
    isAttackAlreadyActive(attack) {
        if (attack.damage.length === 0) {
            let active = attack.prehitEffects.some((effect)=>this.isEffectActive(effect, attack));
            active || (active = attack.onhitEffects.some((effect)=>this.isEffectActive(effect, attack)));
            return active;
        } else {
            return false;
        }
    }
    isEffectActive(effect, attack) {
        switch (effect.type) {
        case 'Stun':
            return this.target.stun.turns > 0;
        case 'Sleep':
            return this.target.sleep.turns > 0;
        case 'Modifier':
            {
                const attackMap = this.getAttackModifiers(effect);
                const effectMap = attackMap.get(attack);
                if (effectMap === undefined)
                    return false;
                const activeData = effectMap.get(effect);
                return activeData !== undefined;
            }
        default:
            return false;
        }
    }
    renderStats() {
        this.statElements.evasion.melee.forEach((elem)=>(elem.textContent = formatNumber(this.stats.evasion.melee)));
        this.statElements.evasion.ranged.forEach((elem)=>(elem.textContent = formatNumber(this.stats.evasion.ranged)));
        this.statElements.evasion.magic.forEach((elem)=>(elem.textContent = formatNumber(this.stats.evasion.magic)));
        this.statElements.accuracy.forEach((elem)=>(elem.textContent = formatNumber(this.stats.accuracy)));
        this.statElements.maxHitpoints.forEach((elem)=>(elem.textContent = formatNumber(this.stats.maxHitpoints)));
        this.statElements.attackInterval.forEach((elem)=>(elem.textContent = templateLangString('MENU_TEXT', 'SECONDS_SHORT', {
            seconds: formatFixed(this.stats.attackInterval / 1000, 2),
        })));
        this.statElements.damageReduction.forEach((elem)=>(elem.textContent = formatPercent(this.stats.damageReduction)));
        this.rendersRequired.stats = false;
    }
    renderDamageValues() {
        let minHitText;
        let maxHitText;
        if (this.manager.fightInProgress) {
            minHitText = this.formatNormalAttackDamage(this.stats.minHit);
            maxHitText = this.formatNormalAttackDamage(this.stats.maxHit);
        } else {
            minHitText = formatNumber(this.stats.minHit);
            maxHitText = formatNumber(this.stats.maxHit);
        }
        this.statElements.minHit.forEach((elem)=>(elem.textContent = minHitText));
        this.statElements.maxHit.forEach((elem)=>(elem.textContent = maxHitText));
        this.rendersRequired.damageValues = false;
    }
    formatNormalAttackDamage(damage) {
        damage = this.modifyAttackDamage(this.target, attacks.Normal, damage);
        return `(${formatNumber(damage)})`;
    }
    renderHitchance() {
        let text;
        if (this.manager.fightInProgress) {
            text = formatPercent(Math.round(this.hitchance));
        } else {
            text = '-';
        }
        this.statElements.hitChance.forEach((elem)=>(elem.textContent = text));
        this.rendersRequired.hitChance = false;
    }
    renderHitpoints() {
        const text = formatNumber(this.hitpoints);
        this.statElements.hitpoints.forEach((elem)=>(elem.textContent = text));
        const hpRatio = `${Math.floor((this.hitpoints / this.stats.maxHitpoints) * 100)}%`;
        this.statElements.hitpointsBar.forEach((elem)=>(elem.style.width = hpRatio));
        this.rendersRequired.hitpoints = false;
    }
    renderDamageSplashes() {
        this.splashManager.render();
        this.rendersRequired.damageSplash = false;
    }
    renderEffects() {
        this.effectRenderer.removeEffects();
        if (this.stun.turns > 0) {
            this.effectRenderer.addStun(this.stun);
        }
        if (this.sleep.turns > 0) {
            this.effectRenderer.addSleep(this.sleep);
        }
        if (this.curse.turns > 0) {
            this.effectRenderer.addCurse(this.curse);
        }
        this.renderModifierEffect(this.modifierEffects.fromSelf.countSelf, this.noun);
        this.renderModifierEffect(this.modifierEffects.fromSelf.countTarget, this.target.noun);
        this.renderModifierEffect(this.modifierEffects.fromTarget.countSelf, this.noun);
        this.renderModifierEffect(this.modifierEffects.fromTarget.countTarget, this.target.noun);
        this.activeDOTs.forEach((activeDOT)=>{
            this.effectRenderer.addDOT(activeDOT);
        }
        );
        this.reflexiveEffects.forEach((activeEffect,effect)=>{
            this.effectRenderer.addReflexive(activeEffect, effect, this.nextAttack);
        }
        );
        this.stackingEffect.forEach((activeEffect,effect)=>{
            this.effectRenderer.addStacking(activeEffect, effect);
        }
        );
        this.comboEffects.forEach((activeEffect,effect)=>{
            this.effectRenderer.addCombo(activeEffect, effect);
        }
        );
        this.rendersRequired.effects = false;
    }
    renderAttackBar() {
        this.rendersRequired.attackBar = false;
        this.rendersRequired.attackBarMinibar = false;
        let attackText = getLangString('COMBAT_MISC', '9');
        if (!this.timers.act.isActive) {
            this.attackBar.stopAnimation();
            this.attackBarMinibar.stopAnimation();
            this.statElements.attackName.forEach((elem)=>(elem.textContent = attackText));
            return;
        }
        let newStyle = 'bg-info';
        let setStriped = false;
        switch (this.nextAction) {
        case 'Nothing':
            newStyle = 'bg-danger';
            if (this.stun.turns > 0)
                attackText = getLangString('COMBAT_MISC', 'STUNNED');
            else if (this.sleep.turns > 0)
                attackText = getLangString('COMBAT_MISC', 'SLEEPING');
            this.statElements.attackName.forEach((elem)=>(elem.textContent = attackText));
            break;
        case 'Attack':
            if (this.isAttacking) {
                setStriped = true;
                newStyle = 'bg-warning';
            } else if (this.slowCount > 0)
                newStyle = 'bg-slowed';
            else if (this.nextAttack !== attacks.Normal)
                newStyle = 'bg-warning';
            if (this.nextAttack !== attacks.Normal) {
                this.statElements.attackName.forEach((elem)=>{
                    elem.textContent = '';
                    elem.append(...templateLangStringWithNodes('COMBAT_MISC', 'USING_ATTACK', {
                        attackName: createElement('strong', {
                            text: getAttackName(this.nextAttack)
                        })
                    }, {}));
                }
                );
            } else {
                this.statElements.attackName.forEach((elem)=>(elem.textContent = attackText));
            }
            break;
        }
        if (setStriped) {
            this.attackBar.animateStriped();
            this.attackBarMinibar.animateStriped();
        } else {
            this.attackBar.animateProgressFromTimer(this.timers.act);
            this.attackBarMinibar.animateProgressFromTimer(this.timers.act);
        }
        this.attackBar.setStyle(newStyle);
        this.attackBarMinibar.setStyle(newStyle);
    }
    renderModifierEffect(attackMap, turnNoun) {
        attackMap.forEach((effectMap,attack)=>{
            effectMap.forEach((effectData,effect)=>{
                this.effectRenderer.addModifier(effectData, effect, attack, turnNoun);
            }
            );
        }
        );
    }
    render() {
        if (this.rendersRequired.hitChance)
            this.renderHitchance();
        if (this.rendersRequired.hitpoints)
            this.renderHitpoints();
        if (this.rendersRequired.stats)
            this.renderStats();
        if (this.rendersRequired.damageValues)
            this.renderDamageValues();
        if (this.rendersRequired.damageSplash)
            this.renderDamageSplashes();
        if (this.rendersRequired.effects)
            this.renderEffects();
        if (this.rendersRequired.attackBar)
            this.renderAttackBar();
    }
    serialize() {
        const writer = new DataWriter();
        writer.addNumber(this.hitpoints);
        writer.addNumber(this.stun.turns);
        writer.addStunFlavour(this.stun.flavour);
        writer.addNumber(this.sleep.turns);
        writer.addActionType(this.nextAction);
        writer.addNumber(this.attackCount);
        writer.addAttack(this.nextAttack);
        writer.addBool(this.isAttacking);
        writer.addBool(this.firstHit);
        writer.addNumber(this.slowCount);
        writer.addNumber(this.curse.turns);
        writer.addCurse(this.curse.data);
        writer.addBool(this.isAfflicted);
        writer.addChunk(this.timers.act.serialize());
        writer.addChunk(this.timers.regen.serialize());
        writer.addVariableLengthChunk(this.serializeModifierEffects(this.modifierEffects.fromSelf.countSelf));
        writer.addVariableLengthChunk(this.serializeModifierEffects(this.modifierEffects.fromSelf.countTarget));
        writer.addVariableLengthChunk(this.serializeModifierEffects(this.modifierEffects.fromTarget.countSelf));
        writer.addVariableLengthChunk(this.serializeModifierEffects(this.modifierEffects.fromTarget.countTarget));
        writer.addVariableLengthChunk(this.serializeReflexiveEffects());
        writer.addVariableLengthChunk(this.serializeStackingEffects());
        writer.addVariableLengthChunk(this.serializeDOTS());
        writer.addVariableLengthChunk(this.serializePassives());
        writer.addNumber(this.turnsTaken);
        writer.addVariableLengthChunk(this.serializeComboEffects());
        return writer.data;
    }
    deserialize(reader, version) {
        this.hitpoints = reader.getNumber();
        this.stun.turns = reader.getNumber();
        this.stun.flavour = reader.getStunFlavour();
        this.sleep.turns = reader.getNumber();
        this.nextAction = reader.getActionType();
        this.attackCount = reader.getNumber();
        this.nextAttack = reader.getAttack();
        this.isAttacking = reader.getBool();
        this.firstHit = reader.getBool();
        this.slowCount = reader.getNumber();
        this.curse.turns = reader.getNumber();
        this.curse.data = reader.getCurse();
        this.isAfflicted = reader.getBool();
        this.timers.act.deserialize(reader.getChunk(3), version);
        this.timers.regen.deserialize(reader.getChunk(3), version);
        this.deserializeModifierEffects(this.modifierEffects.fromSelf.countSelf, reader.getVariableLengthChunk(), version);
        this.deserializeModifierEffects(this.modifierEffects.fromSelf.countTarget, reader.getVariableLengthChunk(), version);
        this.deserializeModifierEffects(this.modifierEffects.fromTarget.countSelf, reader.getVariableLengthChunk(), version);
        this.deserializeModifierEffects(this.modifierEffects.fromTarget.countTarget, reader.getVariableLengthChunk(), version);
        this.deserializeReflexiveEffects(reader.getVariableLengthChunk(), version);
        this.deserializeStackingEffects(reader.getVariableLengthChunk(), version);
        this.deserializeDOTS(reader.getVariableLengthChunk(), version);
        if (version >= 7) {
            this.deserializePassives(reader.getVariableLengthChunk(), version);
            this.turnsTaken = reader.getNumber();
            this.deserializeComboEffects(reader.getVariableLengthChunk(), version);
        }
    }
    serializeModifierEffects(attackMap) {
        const writer = new DataWriter();
        writer.addNumber(attackMap.size);
        attackMap.forEach((effectMap,attack)=>{
            writer.addAttack(attack);
            writer.addNumber(effectMap.size);
            effectMap.forEach((activeEffect,effect)=>{
                writer.addAttackEffect(effect, attack);
                writer.addNumber(activeEffect.turnsLeft);
                writer.addNumber(activeEffect.stacks);
            }
            );
        }
        );
        return writer.data;
    }
    deserializeModifierEffects(attackMap, reader, version) {
        attackMap.clear();
        const numAttacks = reader.getNumber();
        for (let i = 0; i < numAttacks; i++) {
            const effectMap = new Map();
            const attack = reader.getAttack();
            attackMap.set(attack, effectMap);
            const numEffects = reader.getNumber();
            for (let j = 0; j < numEffects; j++) {
                const effect = reader.getAttackEffect(attack);
                if (effect.type !== 'Modifier')
                    throw new Error(`Error deserializing data, effect is not modifier effect`);
                effectMap.set(effect, {
                    turnsLeft: reader.getNumber(),
                    stacks: reader.getNumber(),
                });
            }
        }
    }
    serializeReflexiveEffects() {
        const writer = new DataWriter();
        writer.addNumber(this.reflexiveEffects.size);
        this.reflexiveEffects.forEach((activeEffect,effect)=>{
            const attack = activeEffect.sourceAttack;
            writer.addAttack(attack);
            writer.addAttackEffect(effect, attack);
            writer.addNumber(activeEffect.stacks);
            writer.addNumber(activeEffect.turnsLeft);
        }
        );
        return writer.data;
    }
    deserializeReflexiveEffects(reader, version) {
        this.reflexiveEffects.clear();
        const numEffects = reader.getNumber();
        for (let i = 0; i < numEffects; i++) {
            const attack = reader.getAttack();
            const effect = reader.getAttackEffect(attack);
            const stacks = reader.getNumber();
            let turns = 0;
            if (version > 3)
                turns = reader.getNumber();
            if (effect.type !== 'Reflexive')
                throw new Error(`Error deserializing data, effect is not reflexive effect`);
            this.reflexiveEffects.set(effect, {
                stacks: stacks,
                sourceAttack: attack,
                turnsLeft: turns,
            });
        }
    }
    serializeStackingEffects() {
        const writer = new DataWriter();
        writer.addNumber(this.stackingEffect.size);
        this.stackingEffect.forEach((activeEffect,effect)=>{
            writer.addNumber(effect.id);
            writer.addNumber(activeEffect.stacks);
        }
        );
        return writer.data;
    }
    deserializeStackingEffects(reader, version) {
        this.stackingEffect.clear();
        const numEffects = reader.getNumber();
        for (let i = 0; i < numEffects; i++) {
            const effect = stackingEffects[reader.getNumber()];
            this.stackingEffect.set(effect, {
                stacks: reader.getNumber(),
            });
        }
    }
    serializeComboEffects() {
        const writer = new DataWriter();
        writer.addNumber(this.comboEffects.size);
        this.comboEffects.forEach((activeEffect,effect)=>{
            const attack = activeEffect.sourceAttack;
            writer.addAttack(attack);
            writer.addAttackEffect(effect, attack);
            writer.addNumber(activeEffect.stacks);
        }
        );
        return writer.data;
    }
    deserializeComboEffects(reader, version) {
        this.comboEffects.clear();
        const numEffects = reader.getNumber();
        for (let i = 0; i < numEffects; i++) {
            const attack = reader.getAttack();
            const effect = reader.getAttackEffect(attack);
            if (effect.type !== 'Combo')
                throw new Error(`Error deserializing data, effect is not combo effect`);
            this.comboEffects.set(effect, {
                sourceAttack: attack,
                stacks: reader.getNumber(),
            });
        }
    }
    serializeDOTS() {
        const writer = new DataWriter();
        writer.addNumber(this.activeDOTs.size);
        this.activeDOTs.forEach((activeDOT)=>{
            writer.addDOTType(activeDOT.type);
            writer.addNumber(activeDOT.damage);
            writer.addNumber(activeDOT.procsLeft);
            writer.addNumber(activeDOT.interval);
            writer.addChunk(activeDOT.timer.serialize());
        }
        );
        return writer.data;
    }
    deserializeDOTS(reader, version) {
        this.activeDOTs.clear();
        const numDOTs = reader.getNumber();
        for (let i = 0; i < numDOTs; i++) {
            const dotID = this.manager.dotID;
            const dotData = {
                type: reader.getDOTType(),
                damage: reader.getNumber(),
                procsLeft: reader.getNumber(),
                interval: reader.getNumber(),
                timer: new Timer('DOT',()=>this.dot(dotID)),
            };
            dotData.timer.deserialize(reader.getChunk(3), version);
            this.activeDOTs.set(dotID, dotData);
        }
    }
    serializePassives() {
        const writer = new DataWriter();
        let passiveCount = 0;
        this.passives.forEach((active,passive)=>{
            if (active.save)
                passiveCount++;
        }
        );
        writer.addNumber(passiveCount);
        this.passives.forEach((active,passive)=>{
            if (active.save) {
                writer.addNumber(passive.id);
                writer.addBool(active.display);
            }
        }
        );
        return writer.data;
    }
    deserializePassives(reader, version) {
        const passiveCount = reader.getNumber();
        for (let i = 0; i < passiveCount; i++) {
            const passiveID = reader.getNumber();
            const display = reader.getBool();
            this.passives.set(combatPassives[passiveID], {
                save: true,
                display
            });
        }
    }
}
class EquipmentStats {
    constructor(stats=[]) {
        this.attackSpeed = 0;
        this.stabAttackBonus = 0;
        this.slashAttackBonus = 0;
        this.blockAttackBonus = 0;
        this.rangedAttackBonus = 0;
        this.magicAttackBonus = 0;
        this.meleeStrengthBonus = 0;
        this.rangedStrengthBonus = 0;
        this.magicDamageBonus = 0;
        this.meleeDefenceBonus = 0;
        this.rangedDefenceBonus = 0;
        this.magicDefenceBonus = 0;
        this.damageReduction = 0;
        this.summoningMaxhit = 0;
        this.addStats(stats);
    }
    addItemStats(item) {
        this.addStats(item.equipmentStats);
    }
    remItemStats(itemID) {
        const item = items[itemID];
        if (isEquipment(item)) {
            this.subtractStats(item.equipmentStats);
        } else {
            throw new Error(`Tried to remove stats of non-equipment item: ${item.name}`);
        }
    }
    addStats(stats) {
        stats.forEach((stat)=>{
            if (stat.key === 'summoningMaxhit') {
                this[stat.key] += Math.round(stat.value * numberMultiplier);
            } else {
                this[stat.key] += stat.value;
            }
        }
        );
    }
    subtractStats(stats) {
        stats.forEach((stat)=>{
            if (stat.key === 'summoningMaxhit') {
                this[stat.key] -= Math.round(stat.value * numberMultiplier);
            } else {
                this[stat.key] -= stat.value;
            }
        }
        );
    }
    resetStats() {
        this.attackSpeed = 0;
        this.stabAttackBonus = 0;
        this.slashAttackBonus = 0;
        this.blockAttackBonus = 0;
        this.rangedAttackBonus = 0;
        this.magicAttackBonus = 0;
        this.meleeStrengthBonus = 0;
        this.rangedStrengthBonus = 0;
        this.magicDamageBonus = 0;
        this.meleeDefenceBonus = 0;
        this.rangedDefenceBonus = 0;
        this.magicDefenceBonus = 0;
        this.damageReduction = 0;
        this.summoningMaxhit = 0;
    }
}
class CharacterStats {
    constructor() {
        this.evasion = {
            melee: 0,
            ranged: 0,
            magic: 0,
        };
        this.minHit = 0;
        this.maxHit = 0;
        this.accuracy = 0;
        this.maxHitpoints = 0;
        this.attackInterval = 0;
        this.damageReduction = 0;
    }
    get averageEvasion() {
        return (this.evasion.melee + this.evasion.ranged + this.evasion.magic) / 3;
    }
    get maxEvasion() {
        return Math.max(this.evasion.melee, this.evasion.ranged, this.evasion.magic);
    }
    getValueTable() {
        const valueTable = [];
        valueTable.push({
            name: 'Melee Evasion',
            value: this.evasion.melee,
        });
        valueTable.push({
            name: 'Ranged Evasion',
            value: this.evasion.ranged,
        });
        valueTable.push({
            name: 'Magic Evasion',
            value: this.evasion.magic,
        });
        valueTable.push({
            name: 'Min Hit',
            value: this.minHit,
        });
        valueTable.push({
            name: 'Max Hit',
            value: this.maxHit,
        });
        valueTable.push({
            name: 'Accuracy',
            value: this.accuracy,
        });
        valueTable.push({
            name: 'Max HP',
            value: this.maxHitpoints,
        });
        valueTable.push({
            name: 'Attack Interval',
            value: this.attackInterval,
        });
        valueTable.push({
            name: 'Damage Reduction',
            value: this.damageReduction,
        });
        return valueTable;
    }
}

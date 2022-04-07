"use strict";
import {getPetsName} from './indexLoc.js';

const SPIRIT_PETS = [{
    get name() {
        return getPetsName("PET_NAME", "0");
    },
    get description() {
        return describeModifierDataPlain(this.modifiers);
    },
    media: CDNDIR + "assets/media/pets/woodcutting.png",
    get acquiredBy() {
        return SKILLS[this.skill].name;
    },
    skill: CONSTANTS.skill.Woodcutting,
    chance: 5,
    modifiers: {
        increasedChanceToDoubleItemsSkill: [[CONSTANTS.skill.Woodcutting, 5]],
    },
    activeInRaid: false,
}, {
    get name() {
        return getPetsName("PET_NAME", "1");
    },
    get description() {
        return `<small>${getPetsName("MISC_STRING", "1")} (Moose)</small><br>${describeModifierDataPlain(this.modifiers)}`;
    },
    media: CDNDIR + "assets/media/pets/fishing.png",
    get acquiredBy() {
        return SKILLS[this.skill].name;
    },
    skill: CONSTANTS.skill.Fishing,
    chance: 5,
    modifiers: {
        increasedChanceToDoubleItemsSkill: [[CONSTANTS.skill.Fishing, 5]],
    },
    activeInRaid: false,
}, {
    get name() {
        return getPetsName("PET_NAME", "2");
    },
    get description() {
        return describeModifierDataPlain(this.modifiers);
    },
    media: CDNDIR + "assets/media/pets/firemaking.png",
    get acquiredBy() {
        return SKILLS[this.skill].name;
    },
    skill: CONSTANTS.skill.Firemaking,
    chance: 1,
    modifiers: {
        increasedGlobalSkillXP: 1,
    },
    activeInRaid: false,
},  {
    get name() {
        return getPetsName("PET_NAME", "20");
    },
    get description() {
        return describeModifierDataPlain(this.modifiers);
    },
    media: CDNDIR + "assets/media/pets/golden_golbin.svg",
    get acquiredBy() {
        return getPetsName("PAGE_NAME", "13");
    },
    killCount: 42069,
    skill: -1,
    modifiers: {
        increasedChanceToDoubleLootCombat: 1,
    },
    activeInRaid: false,
},  {
    get name() {
        return getPetsName("PET_NAME", "22");
    },
    get description() {
        return describeModifierDataPlain(this.modifiers);
    },
    media: CDNDIR + "assets/media/pets/peri.svg",
    get acquiredBy() {
        return slayerAreas[SlayerAreas.Perilous_Peaks].name;
    },
    skill: -1,
    modifiers: {
        increasedMeleeEvasion: 5,
        increasedRangedEvasion: 5,
        increasedMagicEvasion: 5,
    },
    activeInRaid: false,
},  {
    get name() {
        return getPetsName("PET_NAME", "49");
    },
    get description() {
        return `${this.acquiredBy}`;
    },
    media: CDNDIR + "assets/media/pets/festive_chio.png",
    get acquiredBy() {
        return getPetsName("EVENTS", "NAME_0");
    },
    skill: -1,
    modifiers: {},
    activeInRaid: false,
    ignoreCompletion: true,
},];

function getPetUnlockModal(petID) {
    let modal = {
        title: getPetsName("COMPLETION", "LOG_PETS_UNLOCKED"),
        html: '<span class="text-success">' + PETS[petID].name + '</span><br><small class="text-info">' + PETS[petID].description + "</small><div class='h5 font-w300 font-size-sm pt-4 mb-0 text-warning'><em>" + getPetsName("COMPLETION", "LOG_PETS_MISC") + "</em></div>",
        imageUrl: PETS[petID].media,
        imageWidth: 128,
        imageHeight: 128,
        imageAlt: "Pet",
    };
    return modal;
}

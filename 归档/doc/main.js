const useCDN = true;
const CDNVersion = "v018";
const CDNEndpoint = "https://cdn.melvor.net/core";
const DEBUGENABLED = false;
const releaseDate = 1637258400000;
var DEBUG_REPORTER = [];
var CDNDIR = CDNEndpoint + "/" + CDNVersion + "/";
if (!useCDN)
    CDNDIR = "";
const SKILLS = {
    0: {
        get name() {
            return getLangString("SKILL_NAME", "0");
        },
        media: "assets/media/skills/woodcutting/woodcutting.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Woodcutting,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Lumberjacks_Top],
        intName: "Woodcutting",
        skillBorder: "border-woodcutting",
        isPremium: false,
        get skillCape() {
            return Items.Woodcutting_Skillcape;
        },
    },
    1: {
        get name() {
            return getLangString("SKILL_NAME", "1");
        },
        media: "assets/media/skills/fishing/fishing.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Fishing,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Amulet_of_Fishing, CONSTANTS.item.Barbarian_Gloves, CONSTANTS.item.Fishing_Hook, CONSTANTS.item.Sailors_Top],
        intName: "Fishing",
        skillBorder: "border-fishing",
        isPremium: false,
        get skillCape() {
            return Items.Fishing_Skillcape;
        },
    },
    2: {
        get name() {
            return getLangString("SKILL_NAME", "2");
        },
        media: "assets/media/skills/firemaking/firemaking.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Firemaking,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Firemaking",
        skillBorder: "border-firemaking",
        isPremium: false,
        get skillCape() {
            return Items.Firemaking_Skillcape;
        },
    },
    3: {
        get name() {
            return getLangString("SKILL_NAME", "3");
        },
        media: "assets/media/skills/cooking/cooking.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Cooking,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Cooking_Gloves, CONSTANTS.item.Cooking_Apron, CONSTANTS.item.Chefs_Hat, CONSTANTS.item.Chefs_Spoon],
        intName: "Cooking",
        skillBorder: "border-cooking",
        isPremium: false,
        get skillCape() {
            return Items.Cooking_Skillcape;
        },
    },
    4: {
        get name() {
            return getLangString("SKILL_NAME", "4");
        },
        media: "assets/media/skills/mining/mining.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Mining,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Gem_Gloves, CONSTANTS.item.Mining_Gloves, CONSTANTS.item.Miners_Helmet],
        intName: "Mining",
        skillBorder: "border-mining",
        isPremium: false,
        get skillCape() {
            return Items.Mining_Skillcape;
        },
    },
    5: {
        get name() {
            return getLangString("SKILL_NAME", "5");
        },
        media: "assets/media/skills/smithing/smithing.svg",
        hasMastery: true,
        masteryTokenID: CONSTANTS.item.Mastery_Token_Smithing,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Smithing_Gloves],
        intName: "Smithing",
        skillBorder: "border-smithing",
        isPremium: false,
        get skillCape() {
            return Items.Smithing_Skillcape;
        },
    },
    6: {
        get name() {
            return getLangString("SKILL_NAME", "6");
        },
        media: "assets/media/skills/attack/attack.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Attack",
        skillBorder: "border-combat",
        isPremium: false,
        get skillCape() {
            return Items.Attack_Skillcape;
        },
    },
    7: {
        get name() {
            return getLangString("SKILL_NAME", "7");
        },
        media: "assets/media/skills/strength/strength.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Strength",
        skillBorder: "border-combat",
        isPremium: false,
        get skillCape() {
            return Items.Strength_Skillcape;
        },
    },
    8: {
        get name() {
            return getLangString("SKILL_NAME", "8");
        },
        media: "assets/media/skills/defence/defence.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Defence",
        skillBorder: "border-combat",
        isPremium: false,
        get skillCape() {
            return Items.Defence_Skillcape;
        },
    },
    9: {
        get name() {
            return getLangString("SKILL_NAME", "9");
        },
        media: "assets/media/skills/hitpoints/hitpoints.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Hitpoints",
        skillBorder: "border-combat",
        isPremium: false,
        get skillCape() {
            return Items.Hitpoints_Skillcape;
        },
    },
    10: {
        get name() {
            return getLangString("SKILL_NAME", "10");
        },
        media: "assets/media/skills/thieving/thieving.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Thieving,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Thieving_Gloves, CONSTANTS.item.Gloves_of_Silence, CONSTANTS.item.Thievers_Cape, CONSTANTS.item.Thiefs_Moneysack, CONSTANTS.item.Jesters_Hat, CONSTANTS.item.Golbin_Mask, CONSTANTS.item.Boots_Of_Stealth],
        intName: "Thieving",
        skillBorder: "border-thieving",
        isPremium: true,
        get skillCape() {
            return Items.Thieving_Skillcape;
        },
    },
    11: {
        get name() {
            return getLangString("SKILL_NAME", "11");
        },
        media: "assets/media/skills/farming/farming.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Farming,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Bobs_Rake, CONSTANTS.item.Bobs_Gloves, CONSTANTS.item.Seed_Pouch],
        intName: "Farming",
        skillBorder: "border-farming",
        isPremium: false,
        get skillCape() {
            return Items.Farming_Skillcape;
        },
    },
    12: {
        get name() {
            return getLangString("SKILL_NAME", "12");
        },
        media: "assets/media/skills/ranged/ranged.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Ranged",
        skillBorder: "border-ranged",
        isPremium: true,
        get skillCape() {
            return Items.Ranged_Skillcape;
        },
    },
    13: {
        get name() {
            return getLangString("SKILL_NAME", "13");
        },
        media: "assets/media/skills/fletching/fletching.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Fletching,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Fletching",
        skillBorder: "border-fletching",
        isPremium: true,
        get skillCape() {
            return Items.Fletching_Skillcape;
        },
    },
    14: {
        get name() {
            return getLangString("SKILL_NAME", "14");
        },
        media: "assets/media/skills/crafting/crafting.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Crafting,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Crafting",
        skillBorder: "border-crafting",
        isPremium: true,
        get skillCape() {
            return Items.Crafting_Skillcape;
        },
    },
    15: {
        get name() {
            return getLangString("SKILL_NAME", "15");
        },
        media: "assets/media/skills/runecrafting/runecrafting.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Runecrafting,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Runecrafting_Pouch],
        intName: "Runecrafting",
        skillBorder: "border-runecrafting",
        isPremium: true,
        get skillCape() {
            return Items.Runecrafting_Skillcape;
        },
    },
    16: {
        get name() {
            return getLangString("SKILL_NAME", "16");
        },
        media: "assets/media/skills/magic/magic.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Amulet_Of_Incantation],
        intName: "Magic",
        skillBorder: "border-combat",
        isPremium: true,
        get skillCape() {
            return Items.Magic_Skillcape;
        },
    },
    17: {
        get name() {
            return getLangString("SKILL_NAME", "17");
        },
        media: "assets/media/skills/prayer/prayer.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Prayer",
        skillBorder: "border-combat",
        isPremium: true,
        get skillCape() {
            return Items.Prayer_Skillcape;
        },
    },
    18: {
        get name() {
            return getLangString("SKILL_NAME", "18");
        },
        media: "assets/media/skills/slayer/slayer.svg",
        hasMastery: false,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Slayer",
        skillBorder: "border-combat",
        isPremium: true,
        get skillCape() {
            return Items.Slayer_Skillcape;
        },
    },
    19: {
        get name() {
            return getLangString("SKILL_NAME", "19");
        },
        media: "assets/media/skills/herblore/herblore.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Herblore,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Herblore",
        skillBorder: "border-herblore",
        isPremium: true,
        get skillCape() {
            return Items.Herblore_Skillcape;
        },
    },
    20: {
        get name() {
            return getLangString("SKILL_NAME", "20");
        },
        media: "assets/media/skills/agility/agility.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Agility,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Agility",
        skillBorder: "border-agility",
        isPremium: true,
        get skillCape() {
            return Items.Agility_Skillcape;
        },
    },
    21: {
        get name() {
            return getLangString("SKILL_NAME", "21");
        },
        media: "assets/media/skills/summoning/summoning.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Summoning,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [CONSTANTS.item.Necromancer_Hat, CONSTANTS.item.Necromancer_Robes, CONSTANTS.item.Necromancer_Bottoms, CONSTANTS.item.Necromancer_Boots],
        intName: "Summoning",
        skillBorder: "border-summoning",
        isPremium: true,
        get skillCape() {
            return Items.Summoning_Skillcape;
        },
    },
    22: {
        get name() {
            return getLangString("SKILL_NAME", "22");
        },
        media: "assets/media/skills/astrology/astrology.svg",
        masteryTokenID: CONSTANTS.item.Mastery_Token_Astrology,
        hasMastery: true,
        maxLevel: 99,
        miniBarItems: [],
        intName: "Astrology",
        skillBorder: "border-astrology",
        isPremium: true,
        get skillCape() {
            return Items.Astrology_Skillcape;
        },
    },
};
const PAGES = {
    0: {
        get name() {
            return SKILLS[CONSTANTS.skill.Woodcutting].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Woodcutting].media;
        },
        isVisible: true,
        strID: "woodcutting",
        skillID: Skills.Woodcutting,
        showInGameGuide: true,
    },
    1: {
        get name() {
            return getPageName(1);
        },
        media: "assets/media/main/shop_header.svg",
        isVisible: true,
        strID: "shop",
        showInGameGuide: true,
    },
    2: {
        get name() {
            return getPageName(2);
        },
        media: "assets/media/main/bank_header.svg",
        isVisible: true,
        strID: "bank",
        showInGameGuide: true,
    },
    3: {
        get name() {
            return getPageName(3);
        },
        media: "assets/media/main/settings_header.svg",
        isVisible: true,
        strID: "settings",
        showInGameGuide: true,
    },
    4: {
        get name() {
            return getPageName(4);
        },
        media: "assets/media/main/changelog_header.svg",
        isVisible: false,
        strID: "changelog",
        showInGameGuide: false,
    },
    5: {
        get name() {
            return getPageName(5);
        },
        media: "assets/media/main/milestones_header.svg",
        isVisible: true,
        strID: "milestones",
        showInGameGuide: true,
    },
    6: {
        get name() {
            return getPageName(6);
        },
        media: "assets/media/main/statistics_header.svg",
        isVisible: true,
        strID: "statistics",
        showInGameGuide: true,
    },
    7: {
        get name() {
            return SKILLS[CONSTANTS.skill.Fishing].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Fishing].media;
        },
        isVisible: true,
        strID: "fishing",
        skillID: Skills.Fishing,
        showInGameGuide: true,
    },
    8: {
        get name() {
            return SKILLS[CONSTANTS.skill.Firemaking].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Firemaking].media;
        },
        isVisible: true,
        strID: "firemaking",
        skillID: Skills.Firemaking,
        showInGameGuide: true,
    },
    9: {
        get name() {
            return SKILLS[CONSTANTS.skill.Cooking].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Cooking].media;
        },
        isVisible: true,
        strID: "cooking",
        skillID: Skills.Cooking,
        showInGameGuide: true,
    },
    10: {
        get name() {
            return SKILLS[CONSTANTS.skill.Mining].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Mining].media;
        },
        isVisible: true,
        strID: "mining",
        skillID: Skills.Mining,
        showInGameGuide: true,
    },
    11: {
        get name() {
            return SKILLS[CONSTANTS.skill.Smithing].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Smithing].media;
        },
        isVisible: true,
        strID: "smithing",
        skillID: Skills.Smithing,
        showInGameGuide: true,
    },
    12: {
        get name() {
            return getPageName(12);
        },
        media: "assets/media/main/mastery_header.svg",
        isVisible: true,
        strID: "mastery",
        showInGameGuide: true,
    },
    13: {
        get name() {
            return getPageName(13);
        },
        media: "assets/media/skills/combat/combat.svg",
        isVisible: true,
        strID: "combat",
        showInGameGuide: true,
    },
    14: {
        get name() {
            return SKILLS[CONSTANTS.skill.Thieving].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Thieving].media;
        },
        isVisible: true,
        strID: "thieving",
        skillID: Skills.Thieving,
        showInGameGuide: true,
    },
    15: {
        get name() {
            return SKILLS[CONSTANTS.skill.Farming].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Farming].media;
        },
        isVisible: true,
        strID: "farming",
        skillID: Skills.Farming,
        showInGameGuide: true,
    },
    16: {
        get name() {
            return SKILLS[CONSTANTS.skill.Fletching].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Fletching].media;
        },
        isVisible: true,
        strID: "fletching",
        skillID: Skills.Fletching,
        showInGameGuide: true,
    },
    17: {
        get name() {
            return SKILLS[CONSTANTS.skill.Crafting].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Crafting].media;
        },
        isVisible: true,
        strID: "crafting",
        skillID: Skills.Crafting,
        showInGameGuide: true,
    },
    18: {
        get name() {
            return SKILLS[CONSTANTS.skill.Runecrafting].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Runecrafting].media;
        },
        isVisible: true,
        strID: "runecrafting",
        skillID: Skills.Runecrafting,
        showInGameGuide: true,
    },
    19: {
        get name() {
            return SKILLS[CONSTANTS.skill.Herblore].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Herblore].media;
        },
        isVisible: true,
        strID: "herblore",
        skillID: Skills.Herblore,
        showInGameGuide: true,
    },
    20: {
        get name() {
            return getPageName(20);
        },
        media: "assets/media/main/something.svg",
        isVisible: false,
        strID: "archaeology",
        showInGameGuide: false,
    },
    21: {
        get name() {
            return getPageName(21);
        },
        media: "assets/media/main/something.svg",
        isVisible: false,
        strID: "easter",
        showInGameGuide: false,
    },
    22: {
        get name() {
            return getPageName(22);
        },
        media: "assets/media/main/something.svg",
        isVisible: false,
        strID: "caseoffortune",
        showInGameGuide: false,
    },
    23: {
        get name() {
            return getPageName(23);
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Magic].media;
        },
        isVisible: true,
        strID: "magic",
        skillID: Skills.Magic,
        showInGameGuide: true,
    },
    24: {
        get name() {
            return getPageName(24);
        },
        media: "assets/media/main/something.svg",
        isVisible: true,
        strID: "golbinraid",
        showInGameGuide: false,
    },
    25: {
        get name() {
            return getPageName(25);
        },
        media: "assets/media/main/something.svg",
        isVisible: false,
        strID: "christmas2020",
        showInGameGuide: false,
    },
    26: {
        get name() {
            return SKILLS[CONSTANTS.skill.Agility].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Agility].media;
        },
        isVisible: true,
        strID: "agility",
        skillID: Skills.Agility,
        showInGameGuide: true,
    },
    27: {
        get name() {
            return getPageName(27);
        },
        media: "assets/media/main/something.svg",
        isVisible: false,
        strID: "aprilfools2021",
        showInGameGuide: false,
    },
    28: {
        get name() {
            return SKILLS[CONSTANTS.skill.Summoning].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Summoning].media;
        },
        isVisible: true,
        strID: "summoning",
        skillID: Skills.Summoning,
        showInGameGuide: true,
    },
    29: {
        get name() {
            return getPageName(29);
        },
        media: "assets/media/main/tutorial_island.svg",
        isVisible: true,
        strID: "tutorialIsland",
        showInGameGuide: false,
    },
    30: {
        get name() {
            return getLangString("PAGE_NAME_MISC", "4");
        },
        media: "assets/media/main/completion_log.svg",
        isVisible: true,
        strID: "completionLog",
        showInGameGuide: true,
    },
    31: {
        get name() {
            return SKILLS[CONSTANTS.skill.Astrology].name;
        },
        get media() {
            return SKILLS[CONSTANTS.skill.Astrology].media;
        },
        isVisible: true,
        strID: "astrology",
        skillID: Skills.Astrology,
        showInGameGuide: true,
    },
    32: {
        get name() {
            return getLangString("EVENTS", `NAME_${Events.CHRISTMAS2021}`);
        },
        get media() {
            return EVENTS[Events.CHRISTMAS2021].media;
        },
        isVisible: true,
        strID: "christmas2021",
        showInGameGuide: false,
    },
};
const specialEvents = [{
    active: true,
}, {
    active: true,
}, {
    active: true,
}, ];
const gameTitle = "Melvor Idle :: v1.0.3";
var titleNewsID = [];
var currentTitleNewsID = [];
var playFabEventQueue = [];
var gp = 0;
var currentPage = 0;
const us = "w";
const p = 848;
var saveTimestamp = 0;
var itemLog = [];
var isLoaded = false;
let confirmedLoaded = false;
var killCount = [];
const tutorialT = 168;
const ar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var offline = {
    skill: null,
    action: null,
    timestamp: null,
};
const IItemID = p - tutorialT;
var skillsMenu = true;
var combatMenu = true;
var easterLoaded = false;
let inFocus = true;
var currentGamemode = 0;
var steamAchievements = [];
var connectedToSteam = false;
var offlineProgressTimer = null;
var updateTooltipsTimer = null;
var itemNotifyToProcess = [];
var itemNotifyTimer = null;
var tooltipInstances = {
    bank: [],
    spellbook: [],
    minibar: [],
    combatInfo: [],
    specialAttack: [],
    equipmentSets: [],
    masteryModal: [],
    combatXP: [],
    autoEat: [],
    selectItemForMagic: [],
};
const arrSum = (arr)=>arr.reduce((a,b)=>a + b, 0);
var eightSeconds = false;
var currentView = 0;
var lolYouDiedGetRekt = false;
let characterLoading = false;
var firstTimeLoad = true;
var skillXP = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1155, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var skillLevel = [1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var nextLevelProgress = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var skillsUnlocked = [];
var priceToUnlockSkill = [10000, 25000, 50000, 200000, 250000, 400000, 1000000, 2500000, 10000000, 25000000, 50000000, 100000000, 200000000, 500000000, 500000000, 500000000, 500000000, 500000000, 500000000];
var currentSkillLevel = 1;
var numberMultiplier = 10;
var inCharacterSelection = false;
var returnToGameAfterSubmission = false;
var modalQueue = [];
var cloudSaveHeartbeatLevel = 0;
var loadingOfflineProgress = false;
var modalIsOpen = false;
var offlineProgressCache;
var marksFoundOffline = 0;
var IAPPrice = "";
var christmas2021Progress = 0;
var christmas2021PresentProgress = [0, 0, 0, 0, 0];
let shopMenu;
let currentlyOpenMasteryXPModal = -1;
function updateWindow() {
    try {
        setSaveGUID();
        new SimpleBar($(".js-sidebar-scroll")[0]);
        One.helpers("core-bootstrap-tabs");
        $("#modal-spend-mastery-xp").on("hide.bs.modal", ()=>{
            currentlyOpenMasteryXPModal = -1;
        }
        );
        jQuery("#page-overlay").on("click.pixelcave.overlay", (e)=>{
            One._uiApiLayout("side_overlay_close");
        }
        );
        for (let i = 0; i < bank.length; i++) {
            if (bank[i].tab === undefined)
                bank[i].tab = 0;
        }
        for (let i = skillLevel.length; i < Object.keys(SKILLS).length; i++)
            skillLevel.push(1);
        for (let i = skillXP.length; i < Object.keys(SKILLS).length; i++)
            skillXP.push(0);
        for (let i = nextLevelProgress.length; i < Object.keys(SKILLS).length; i++)
            nextLevelProgress.push(0);
        let loadTutorial = false;
        if (!tutorialComplete) {
            if (tutorialProgress >= TUTORIALISLAND.length)
                loadTutorial = false;
            else if (tutorialProgress === -1) {
                loadTutorial = skillLevel.every((level,skillID)=>(skillID === Skills.Hitpoints ? level <= 10 : level <= 3));
                if (currentGamemode === 2 && loadTutorial) {
                    const defaultAdvSkills = [Skills.Attack, Skills.Strength, Skills.Defence, Skills.Hitpoints];
                    loadTutorial = skillLevel.every((level,skillID)=>defaultAdvSkills.includes(skillID) || !skillsUnlocked[skillID]);
                }
            } else {
                loadTutorial = true;
            }
            if (!loadTutorial) {
                tutorialComplete = true;
                if (currentGamemode !== 2) {
                    skillsUnlocked = Object.entries(SKILLS).map(()=>true);
                }
            }
        }
        if (game.stats.General.get(GeneralStats.AccountCreationDate) === 0)
            game.stats.General.set(GeneralStats.AccountCreationDate, Date.now());
        dataDeleted = false;
        numberMultiplier = GAMEMODES[currentGamemode].numberMultiplier;
        fixBankArray();
        cleanSaveFile();
        populateMasteryObject(MASTERY);
        populateMasteryLevelCache();
        updateItemLog();
        buildDataFromItemsArray();
        initializeStatTables();
        shopMenu = new ShopMenu();
        game.mining.populateActiveRockData();
        setupGamemode(currentGamemode);
        game.agility.onLoad();
        game.astrology.onLoad();
        combatManager.initialize();
        createMasteryPoolElements();
        loadMiningOres();
        $("#account-name").text(username);
        removeForceReload();
        updateShop("all");
        loadItemsAlreadyFound();
        game.onLoad();
        game.thieving.onLoad();
        game.firemaking.onLoad();
        game.mining.onLoad();
        game.woodcutting.onLoad();
        showFarmingAreas();
        startSeedTimer(0, 0, true);
        game.smithing.onLoad();
        game.fletching.onLoad();
        game.crafting.onLoad();
        game.runecrafting.onLoad();
        game.herblore.onLoad();
        loadSeeds();
        game.fishing.onLoad();
        game.cooking.onLoad();
        loadCurrentSettings();
        game.summoning.onLoad();
        game.altMagic.onLoad();
        combatMenus.runes.init();
        combatMenus.runes.updateCounts();
        updateAreaRequirements();
        updateSpellbook("all");
        updateEvery10Seconds();
        changeCombatMenu(0);
        combatMenus.prayer.updateForLevel(skillLevel[CONSTANTS.skill.Prayer], player);
        loadPets();
        loadMasteryTab();
        buildSkillsLog();
        buildMasteryLog();
        buildMonsterLog();
        buildPetLog();
        $(".item-log-comp-percent").text(`${getItemCompletionProgress()}`);
        updateDungeonCount();
        updateCompletionLog();
        player.checkEquipmentRequirements();
        buildCustomBankSort();
        loadBank();
        if (loadTutorial) {
            $(".tutorial-sidebar").removeClass("d-none");
            continueTutorial();
            changePage(29, true);
        } else {
            $(".tutorial-sidebar").addClass("d-none");
            $("#tutorial-container").addClass("d-none");
            if (game.isGolbinRaid)
                changePage(Pages.GolbinRaid, true);
            else
                changePage(defaultPageOnLoad, true);
        }
        if (skillLevel[CONSTANTS.skill.Woodcutting] === null)
            skillLevel[CONSTANTS.skill.Woodcutting] = exp.level_to_xp(skillLevel[CONSTANTS.skill.Woodcutting]);
        updateSkillWindow(CONSTANTS.skill.Woodcutting);
        updateSkillWindow(CONSTANTS.skill.Fishing);
        updateSkillWindow(CONSTANTS.skill.Firemaking);
        updateSkillWindow(CONSTANTS.skill.Cooking);
        updateSkillWindow(CONSTANTS.skill.Mining);
        updateSkillWindow(CONSTANTS.skill.Smithing);
        updateSkillWindow(CONSTANTS.skill.Attack);
        updateSkillWindow(CONSTANTS.skill.Strength);
        updateSkillWindow(CONSTANTS.skill.Defence);
        updateSkillWindow(CONSTANTS.skill.Hitpoints);
        updateSkillWindow(CONSTANTS.skill.Thieving);
        updateSkillWindow(CONSTANTS.skill.Farming);
        updateSkillWindow(CONSTANTS.skill.Ranged);
        updateSkillWindow(CONSTANTS.skill.Fletching);
        updateSkillWindow(CONSTANTS.skill.Crafting);
        updateSkillWindow(CONSTANTS.skill.Runecrafting);
        updateSkillWindow(CONSTANTS.skill.Magic);
        updateSkillWindow(CONSTANTS.skill.Prayer);
        updateSkillWindow(CONSTANTS.skill.Slayer);
        updateSkillWindow(CONSTANTS.skill.Herblore);
        updateSkillWindow(CONSTANTS.skill.Attack);
        updateSkillWindow(CONSTANTS.skill.Strength);
        updateSkillWindow(CONSTANTS.skill.Defence);
        updateSkillWindow(CONSTANTS.skill.Hitpoints);
        updateSkillWindow(CONSTANTS.skill.Ranged);
        updateSkillWindow(CONSTANTS.skill.Magic);
        updateSkillWindow(CONSTANTS.skill.Slayer);
        updateSkillWindow(CONSTANTS.skill.Prayer);
        updateSkillWindow(CONSTANTS.skill.Agility);
        updateSkillWindow(CONSTANTS.skill.Summoning);
        for (let i = 0; i < Object.keys(SKILLS).length; i++) {
            if (SKILLS[i].hasMastery && currentGamemode === 2)
                $("#skill-progress-xp-" + i).after(`<span id="adventure-mode-xp-limit-notice-${i}" class="text-danger d-none"><br><i class="fa fa-info-circle mr-1"></i>${getLangString("MENU_TEXT", "ADV_MODE_XP_LIMIT_WARNING")}</span>`);
        }
        initMinibar();
        eventManager.loadEvents();
        createSortableInstances();
        loadCurrentSettings();
        checkForItemsToAddToBank();
        setBackupSaveDetails(backupSave);
        initSteam();
        checkConnectionToCloud();
        updateBuyQty(buyQty);
        loadLore();
        player.initializeAdventureModeXPNotices();
        getLocaleIAPPrice();
        updateUIForLanguageChange();
        game.golbinRaid.onLoad();
        firstTime = 0;
        isLoaded = true;
        characterSelected = true;
        characterLoading = false;
        inCharacterSelection = false;
        $("#m-page-loader").attr("class", "d-none");
        console.log("Game Loaded");
        $("#searchTextbox").click(function(e) {
            updateBankSearchArray();
        });
        Summoning.updateSearchArray();
        initTooltips();
        updateMinibar(PAGES[currentPage].skillID);
        if (location.origin === "https://melvoridle.com") {
            $("#ad-container").css("top", "65px");
            $("#ad-container").css("z-index", "90");
        }
        if (location.pathname.includes("index_noads.php")) {
            $("#ad-container").addClass("d-none");
        }
        One.helpers("core-toggle-class");
        if (location.href === "https://ios.melvoridle.com/index_ads.php")
            $("#ios_ads_sidebar").removeClass("d-none");
        if (location.pathname == "/index_ads.php" && afterCutOff())
            $("#iap_sidebar").removeClass("d-none");
        if (location.origin === "https://steam.melvoridle.com" && localStorage.getItem("steamZoomLevel") !== undefined && localStorage.getItem("steamZoomLevel") !== null) {
            if (!Number.isInteger(localStorage.getItem("steamZoomLevel")))
                adjustZoom(Number.parseFloat(localStorage.getItem("steamZoomLevel")));
            else
                removeItem("steamZoomLevel");
        }
        if (localStorage.getItem("creationDate") === undefined || localStorage.getItem("creationDate") === null)
            localStorage.setItem("creationDate", new Date().getTime());
        if (SETTINGS.general.enabledOfflineCombat || (localStorage.getItem("offlineCombatDismissed") !== null && localStorage.getItem("offlineCombatDismissed") !== undefined))
            $("#offline-combat-alert").addClass("d-none");
        if (SETTINGS.general.continueThievingOnStun || (localStorage.getItem("offlineThievingDismissed") !== null && localStorage.getItem("offlineThievingDismissed") !== undefined))
            $("#offline-thieving-alert").addClass("d-none");
        firstTimeLoad = false;
        window.setTimeout(function() {
            gameUpdate();
            if (!petUnlocked[40] && dungeonCompleteCount[CONSTANTS.dungeon.Into_the_Mist] >= PETS[40].obtained.dungeonCompletion[0][1])
                unlockPet(40);
        }, 5000);
    } catch (e) {
        removeForceReload();
        $("#m-page-loader").attr("class", "d-none");
        $("#game-broke-error-msg").val(e.stack);
        $("#modal-game-broke").modal("show");
        console.log(e);
    }
}
function updateGP(value=0, disableDOMChanges=false) {
    value = Math.floor(value);
    gp += value;
    if (value > 0)
        game.stats.General.add(GeneralStats.TotalGPEarned, value);
    if ((!disableDOMChanges && value !== 0) || !confirmedLoaded) {
        if (confirmedLoaded)
            gpNotify(value);
        const gpText = templateLangString("MENU_TEXT", "GP_AMOUNT", {
            gp: convertGP(gp)
        });
        const gpTooltip = templateLangString("MENU_TEXT", "GP_AMOUNT", {
            gp: numberWithCommas(gp)
        });
        $("#nav-current-gp").text(gpText);
        $("#nav-current-gp").attr("data-original-title", gpTooltip);
        $("#shop-current-gp").text(gpText);
        $("#shop-current-gp").attr("data-original-title", gpTooltip);
        updateTooltips();
        updateShopCosts();
    }
}
function idleChecker(currentSkill) {
    if (game.isGolbinRaid)
        return true;
    if (currentSkill !== CONSTANTS.skill.Woodcutting && game.activeSkill === ActiveSkills.WOODCUTTING) {
        return !game.woodcutting.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Fishing && game.activeSkill === ActiveSkills.FISHING) {
        return !game.fishing.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Firemaking && game.activeSkill === ActiveSkills.FIREMAKING) {
        return !game.firemaking.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Cooking && game.activeSkill === ActiveSkills.COOKING) {
        return !game.cooking.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Mining && game.activeSkill === ActiveSkills.MINING) {
        return !game.mining.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Smithing && game.activeSkill === ActiveSkills.SMITHING) {
        return !game.smithing.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Hitpoints && combatManager.isInCombat) {
        combatManager.stopCombat();
        return false;
    }
    if (currentSkill !== CONSTANTS.skill.Thieving && game.activeSkill === ActiveSkills.THIEVING) {
        return !game.thieving.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Fletching && game.activeSkill === ActiveSkills.FLETCHING) {
        return !game.fletching.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Crafting && game.activeSkill === ActiveSkills.CRAFTING) {
        return !game.crafting.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Runecrafting && game.activeSkill === ActiveSkills.RUNECRAFTING) {
        return !game.runecrafting.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Herblore && game.activeSkill === ActiveSkills.HERBLORE) {
        return !game.herblore.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Magic && game.activeSkill === ActiveSkills.MAGIC) {
        return !game.altMagic.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Agility && game.activeSkill === ActiveSkills.AGILITY) {
        return !game.agility.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Summoning && game.activeSkill === ActiveSkills.SUMMONING) {
        return !game.summoning.stop();
    }
    if (currentSkill !== CONSTANTS.skill.Astrology && game.activeSkill === ActiveSkills.ASTROLOGY) {
        return !game.astrology.stop();
    }
    return false;
}
function updateSkillVisuals(skill) {
    skillNav.updateNav(skill);
    skillProgressDisplay.updateSkill(skill);
}
function updateSkillWindow(skill) {
    if (!loadingOfflineProgress) {
        updateSkillVisuals(skill);
        if (skill === CONSTANTS.skill.Woodcutting) {
            if (!confirmedLoaded) {
                for (let i = 0; i < MASTERY[skill].xp.length; i++) {
                    updateMasteryProgress(CONSTANTS.skill.Woodcutting, i);
                }
            }
        }
        if (skill === CONSTANTS.skill.Mining) {
            if (!confirmedLoaded) {
                for (let i = 0; i < MASTERY[skill].xp.length; i++) {
                    updateMasteryProgress(CONSTANTS.skill.Mining, i);
                }
            }
        }
        if (skill === CONSTANTS.skill.Thieving) {
            if (!confirmedLoaded) {
                for (let i = 0; i < MASTERY[skill].xp.length; i++) {
                    updateMasteryProgress(CONSTANTS.skill.Thieving, i);
                }
            }
        }
        if (skill === CONSTANTS.skill.Farming) {
            for (let i = 0; i < MASTERY[skill].xp.length; i++) {
                updateMasteryLevel(CONSTANTS.skill.Farming, i);
            }
        }
    }
}
function updateLevelProgress(skill) {
    if (!loadingOfflineProgress) {
        let percent;
        if (skillLevel[skill] >= 99) {
            percent = 100;
        } else {
            let currentLevelXP = exp.level_to_xp(skillLevel[skill]);
            let nextLevelXP = exp.level_to_xp(skillLevel[skill] + 1);
            percent = ((skillXP[skill] - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
        }
        nextLevelProgress[skill] = percent;
    }
}
function levelUp(skill, offline=false, render=true) {
    if (skillLevel[skill] < 99) {
        skillLevel[skill] = exp.xp_to_level(skillXP[skill]) - 1;
        skillLevel[skill] = Math.min(skillLevel[skill], 99);
        if (levelUpScreen === 0 || skillLevel[skill] === 99 || offline) {
            let newMilestones = createNewMilestoneModal(skill, currentSkillLevel, skillLevel[skill]);
            if (skillLevel[skill] >= 99) {
                newMilestones += `<div class="h5 font-w400 font-size-sm text-success pt-3">${templateString(getLangString("COMPLETION", "SKILL_LEVEL_99_NOTICE"), {
                    itemName: `<strong>${items[SKILLS[skill].skillCape].name}</strong>`
                })}</div>`;
                showFireworks();
            }
            addModalToQueue(createLevelUpModal(skill));
            if (currentGamemode === 1 && skillLevel[skill] === 99)
                sendDiscordEvent(2, SKILLS[skill].intName);
        }
        if (!loadingOfflineProgress) {
            if (render)
                levelUpNotify(skill);
            else
                combatManager.notifications.add({
                    type: "LevelUp",
                    args: [skill],
                });
        }
        if (render) {
            updateShop("all");
            updateAreaRequirements();
        }
        switch (skill) {
        case CONSTANTS.skill.Woodcutting:
            break;
        case CONSTANTS.skill.Fishing:
            break;
        case CONSTANTS.skill.Firemaking:
            break;
        case CONSTANTS.skill.Cooking:
            break;
        case CONSTANTS.skill.Mining:
            break;
        case CONSTANTS.skill.Smithing:
            break;
        case CONSTANTS.skill.Thieving:
            if (render)
                thievingMenu.updateNPCsForLevel(skillLevel[skill]);
            break;
        case CONSTANTS.skill.Farming:
            break;
        case CONSTANTS.skill.Fletching:
            break;
        case CONSTANTS.skill.Crafting:
            break;
        case CONSTANTS.skill.Hitpoints:
            player.computeAllStats();
            player.heal(numberMultiplier);
            break;
        case CONSTANTS.skill.Magic:
            if (render)
                updateSpellbook("all");
        case CONSTANTS.skill.Attack:
        case CONSTANTS.skill.Strength:
        case CONSTANTS.skill.Defence:
        case CONSTANTS.skill.Ranged:
            player.computeAllStats();
            break;
        case CONSTANTS.skill.Runecrafting:
            break;
        case CONSTANTS.skill.Prayer:
            if (render)
                combatMenus.prayer.updateForLevel(skillLevel[skill], player);
            break;
        case CONSTANTS.skill.Herblore:
            break;
        case CONSTANTS.skill.Agility:
            break;
        case CONSTANTS.skill.Summoning:
            break;
        case CONSTANTS.skill.Astrology:
            break;
        }
        const maxLevel = skillLevel.every((level)=>level >= 99);
        if (maxLevel)
            sendDiscordEvent(1);
        sendPlayFabEvent("level_up_skill", {
            skillID: skill,
            level: skillLevel[skill],
            skillLevels: skillLevel
        });
        updateCompletionLogEntryElement("skills", skill);
        updateTotalUnlockedItems(skill);
    }
    player.rendersRequired.combatLevel = true;
    if (render && !loadingOfflineProgress) {
        player.render();
        player.clearAdventureModeXPNotices();
        updateStats(StatCategories.General);
    }
}
class Exp {
    constructor() {
        this.table = [0];
        this.xpSum = 0;
    }
    equate(level) {
        return Math.floor(level + 300 * Math.pow(2, level / 7));
    }
    level_to_xp(level) {
        if (this.table.length >= level)
            return this.table[level - 1];
        else {
            for (let i = this.table.length; i < level; i++) {
                this.xpSum += this.equate(i);
                this.table.push(Math.floor(this.xpSum / 4));
            }
            return this.table[level - 1];
        }
    }
    xp_to_level(xp, level=1) {
        while (this.level_to_xp(level) < xp)
            level++;
        if (xp <= 0)
            level = 2;
        return level;
    }
}
const exp = new Exp();
function convertGP(currentGP) {
    let textClass = (formatNumberSetting === 0 && currentGP >= 10000000) || (formatNumberSetting === 1 && currentGP >= 1000000) ? "text-success" : "text-warning";
    $("#nav-current-gp").attr("class", textClass);
    return formatNumber(currentGP);
}
function formatNumber(number) {
    let postfix = "";
    if (formatNumberSetting === 0) {
        if (number >= 100000 && number < 10000000) {
            number = Math.floor(number / 1000);
            postfix = getLangString("NUM", "K");
        } else if (number >= 10000000 && number < 10000000000) {
            number = Math.floor(number / 1000000);
            postfix = getLangString("NUM", "M");
        } else if (number >= 10000000000) {
            number = Math.floor(number / 1000000000);
            postfix = getLangString("NUM", "B");
        }
    } else if (formatNumberSetting === 1) {
        if (number >= 100000 && number < 1000000) {
            number = Math.floor(number / 1000);
            postfix = getLangString("NUM", "K");
        } else if (number >= 1000000 && number < 1000000000) {
            number = Math.floor(number / 1000000);
            postfix = getLangString("NUM", "M");
        } else if (number >= 1000000000) {
            number = Math.floor(number / 1000000000);
            postfix = getLangString("NUM", "B");
        }
    }
    return numberWithCommas(number) + postfix;
}
function numberWithCommas(x) {
    if (typeof x === "string") {
        x = parseFloat(x);
    }
    if (typeof x === "number") {
        if (showCommas) {
            try {
                return x.toLocaleString(setLang);
            } catch (e) {
                return x.toLocaleString();
            }
        } else {
            return `${x}`;
        }
    } else {
        console.warn("Tried to format non-number.");
        return x;
    }
}
function unlockSkill(skill) {
    if (!tutorialComplete || currentGamemode !== 2) {
        skillsUnlocked[skill] = true;
        updateSkillWindow(skill);
    } else if (gp >= getPriceToUnlockSkill()) {
        updateGP(-getPriceToUnlockSkill());
        skillsUnlocked[skill] = true;
        updateSkillWindow(skill);
        SwalLocale.fire({
            icon: "success",
            title: getLangString("MENU_TEXT", "SKILL_UNLOCKED"),
            html: `<span class='text-dark'>${getLangString("MENU_TEXT", "YOU_MAY_USE_SKILL")}</span>`,
        });
        let count = 0;
        for (let i = 0; i < skillsUnlocked.length; i++) {
            if (skillsUnlocked[i])
                count++;
        }
        count -= 4;
        sendPlayFabEvent("adv_skill_unlocked", {
            skillID: skill,
            unlockOrder: count
        });
        if (skill === Skills.Astrology)
            game.astrology.onSkillUnlock();
    }
}
function getPriceToUnlockSkill() {
    let count = 0;
    for (let i = 0; i < skillsUnlocked.length; i++) {
        if (skillsUnlocked[i])
            count++;
    }
    return priceToUnlockSkill[count - 4];
}
const checkSkillUnlocked = function(page, skillID) {
    if (skillID < 0)
        return true;
    const p = [false, false, false, false, false, false, false, false, false, false, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true];
    if (afterCutOff() && isAdsPath() && p[skillID] && tutorialComplete) {
        skillLockType = 0;
        return false;
    }
    const pageSkill = PAGES[page].skillID;
    if (pageSkill === undefined) {
        return !(skillID >= 0 && !skillsUnlocked[skillID]);
    } else {
        return skillsUnlocked[pageSkill];
    }
};
var IAPPurchaseInProcess = false;
var IAPTimer;
const performUnlockIAP = function() {
    if (location.origin === "https://ios.melvoridle.com" || location.origin === "https://android.melvoridle.com") {
        try {
            if (location.origin === "https://ios.melvoridle.com") {
                window.bridge.post("make_purchase", {});
            } else if (location.origin === "https://android.melvoridle.com") {
                android.buyItem();
            }
            startIAPPurchaseInterval();
            SwalLocale.fire({
                title: getLangString("MENU_TEXT", "PURCHASE_IN_PROGRESS"),
                html: `<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("MENU_TEXT", "PREMIUM_PURCHASE_INFO_0")}</h5><h5 class="font-w400 text-info font-size-sm">${getLangString("MENU_TEXT", "PREMIUM_PURCHASE_INFO_1")}</h5>`,
                icon: "info",
            });
        } catch (e) {
            console.log(e);
        }
    } else {
        window.open("https://store.steampowered.com/app/1267910/Melvor_Idle/", "_blank").focus();
    }
};
const getLocaleIAPPrice = function() {
    if (location.origin === "https://ios.melvoridle.com") {
        window.bridge.post("iap_price", {}, (results,error)=>{
            IAPPrice = results.price;
        }
        );
    }
};
const startIAPPurchaseInterval = function() {
    clearInterval(IAPTimer);
    IAPTimer = setInterval(function() {
        if (location.origin === "https://ios.melvoridle.com") {
            window.bridge.post("app_purchased", {}, (results,error)=>{
                if (results.purchased)
                    window.location.href = "index_noads.php";
            }
            );
        } else if (location.origin === "https://android.melvoridle.com") {
            getAndroidIAPStatus().then((isPurchased)=>{
                if (isPurchased) {
                    window.location.href = "index_noads.php";
                }
            }
            );
            if (android.isProductPurchased())
                window.location.href = "index_noads.php";
        }
    }, 2000);
};
const getAndroidIAPStatus = function() {
    const isPurchased = new Promise((resolve,reject)=>{
        resolve(android.isProductPurchased());
    }
    );
    return isPurchased;
};
const updateMobilePurchaseStatus = function() {
    if (location.origin === "https://ios.melvoridle.com") {
        window.bridge.post("app_purchased", {}, (results,error)=>{
            if (results.purchased) {
                PlayFabClientSDK.ExecuteCloudScript({
                    FunctionName: "checkValidMobilePurchase",
                    FunctionParameter: {
                        isValid: results.purchased
                    }
                });
            }
        }
        );
    } else if (location.origin === "https://android.melvoridle.com") {
        getAndroidIAPStatus().then((isPurchased)=>{
            if (isPurchased) {
                PlayFabClientSDK.ExecuteCloudScript({
                    FunctionName: "checkValidMobilePurchase",
                    FunctionParameter: {
                        isValid: isPurchased
                    }
                });
            } else if (location.pathname == "/adfree/index.php") {
                PlayFabClientSDK.ExecuteCloudScript({
                    FunctionName: "checkValidMobilePurchase",
                    FunctionParameter: {
                        isValid: "true"
                    }
                });
            }
        }
        );
    }
};
const getSkillLockType = function() {
    if (afterCutOff() && isAdsPath()) {
        skillLockType = 0;
    } else {
        skillLockType = 1;
    }
    return skillLockType;
};
const getLockedTitle = function(skillID=-1, dungeonID=-1) {
    let title = "";
    if (afterCutOff() && isAdsPath()) {
        if (skillID < 0 && dungeonID < 0)
            title += getLangString("IAP", "BTN_MOBILE_Q");
        else if (skillID > 0)
            title += getLangString("MENU_TEXT", "SKILL_LOCKED");
        else if (dungeonID > 0)
            title += getLangString("MENU_TEXT", "DUNGEON_LOCKED");
    } else {
        title += getLangString("MENU_TEXT", "SKILL_LOCKED");
    }
    return title;
};
const getLockedMessage = function(skillID=-1, dungeonID=-1) {
    let msg = "";
    if (afterCutOff() && isAdsPath()) {
        if (skillID < 0 && dungeonID < 0 && setLang != "en")
            msg += `<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("IAP", "DESC_WEB")}</h5>`;
        else if (skillID > 0)
            msg += `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia(SKILLS[skillID].media)}"> ${templateString(getLangString("IAP", "DESC_SKILL"), {
                skillName: SKILLS[skillID].name
            })}</h5>`;
        else if (dungeonID > 0)
            msg += `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia(DUNGEONS[dungeonID].media)}"> ${templateString(getLangString("IAP", "DESC_DUNGEON"), {
                dungeonName: DUNGEONS[dungeonID].name
            })}</h5>`;
        if (setLang == "en")
            msg += `<h5 class="font-w400 text-combat-smoke font-size-sm">Upgrading to the <strong class="text-success">Full Version</strong> unlocks a variety of extra content!</h5><h5 class="font-w400 text-combat-smoke font-size-sm"><strong class="text-success">13</strong> more unique Skills<br><strong class="text-success">7</strong> extra challenging Dungeons<br><strong class="text-success">2</strong> new Gamemodes<br><strong class="text-success">One-time Purchase</strong> only</h5>`;
        msg += `<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("IAP", "CALL_TO_ACTION")}</h5>`;
    } else {
        msg += `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia(SKILLS[skillID].media)}"> ${templateString(getLangString("IAP", "DESC_SKILL"), {
            skillName: SKILLS[skillID].name
        })}</h5>`;
    }
    return msg;
};
const getLockedBtn = function() {
    let msg = "";
    if (location.origin === "https://ios.melvoridle.com") {
        if (IAPPrice.length !== "")
            msg = templateString(getLangString("IAP", "BTN_MOBILE"), {
                price: `${IAPPrice}`
            });
        else
            msg = getLangString("IAP", "BTN_MOBILE");
    } else if (location.origin === "https://android.melvoridle.com") {
        msg = getLangString("IAP", "BTN_MOBILE");
    } else {
        msg = getLangString("IAP", "BTN_WEB");
    }
    return msg;
};
const showPremiumLockedModal = function(skillID=-1, dungeonID=-1) {
    SwalLocale.fire({
        title: getLockedTitle(skillID, dungeonID),
        html: getLockedMessage(skillID, dungeonID),
        showCancelButton: true,
        icon: "warning",
        confirmButtonText: getLockedBtn(),
    }).then((result)=>{
        if (result.value) {
            performUnlockIAP();
        }
    }
    );
};
var skillLockType = 0;
const changePage = function(page, gameLoading=false, toggleSidebar=true, showRaidShop=false, skillID=-1) {
    $("#skill-footer-minibar-items-container").addClass("d-none");
    if (page === -1) {
        if (offline.skill !== null && offline.skill !== undefined) {
            if (offline.skill === Skills.Hitpoints)
                page = Pages.Combat;
            else {
                Object.keys(PAGES).forEach((key)=>{
                    if (PAGES[key].skillID === offline.skill)
                        page = Number.parseInt(key);
                }
                );
            }
        } else if (farmingGlower > 0)
            page = Pages.Farming;
        else
            page = Pages.Bank;
    }
    const pageData = PAGES[page];
    if (pageData.skillID !== undefined && skillID < 0)
        skillID = pageData.skillID;
    if (page === 24 && game.isGolbinRaid)
        changePage(13, false, false);
    else if (page === 13 && !tutorialComplete && tutorialProgress < 6) {
        SwalLocale.fire({
            title: getLangString("TUTORIAL", "PAGE_LOCKED"),
            html: `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia("assets/media/skills/combat/combat.svg")}"> ${getLangString("TUTORIAL", "COMBAT_LOCKED")}</h5>
			<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("TUTORIAL", "CONTINUE_TUTORIAL")}</h5>`,
            icon: "warning",
        });
    } else if (page === 24 && !tutorialComplete) {
        SwalLocale.fire({
            title: getLangString("TUTORIAL", "MINIGAME_LOCKED"),
            html: `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia("assets/media/pets/golden_golbin.svg")}"> ${getLangString("TUTORIAL", "GOLBIN_RAID_LOCKED")}</h5>
			<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("TUTORIAL", "CONTINUE_TUTORIAL")}</h5>`,
            icon: "warning",
        });
    } else if ((currentGamemode === 2 || !tutorialComplete) && !checkSkillUnlocked(page, skillID)) {
        if (skillID < 0)
            skillID = pageData.skillID;
        if (!tutorialComplete) {
            SwalLocale.fire({
                title: getLangString("MENU_TEXT", "SKILL_LOCKED"),
                html: `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia(SKILLS[skillID].media)}"> ${templateString(getLangString("TUTORIAL", "SKILL_LOCKED"), {
                    skillName: SKILLS[skillID].name
                })}</h5>
			<h5 class="font-w400 text-combat-smoke font-size-sm">${getLangString("TUTORIAL", "CONTINUE_TUTORIAL")}</h5>`,
                icon: "warning",
            });
        } else if (currentGamemode === 2) {
            let showConfirm = true;
            if (gp < getPriceToUnlockSkill())
                showConfirm = false;
            SwalLocale.fire({
                title: getLangString("MENU_TEXT", "SKILL_LOCKED"),
                html: `<h5 class="font-w400 text-combat-smoke font-size-sm"><img class="skill-icon-xs mr-1" src="${cdnMedia(SKILLS[skillID].media)}"> ${templateString(getLangString("TUTORIAL", "SKILL_LOCKED"), {
                    skillName: SKILLS[skillID].name
                })}</h5>
			<h5 class="font-w400 text-combat-smoke font-size-sm">${templateString(getLangString("MENU_TEXT", "UNLOCK_FOR"), {
                    gpIcon: `<img class="skill-icon-xs mr-1" src="assets/media/main/coins.svg">`,
                    value: `${numberWithCommas(getPriceToUnlockSkill())}`
                })}</h5>`,
                showCancelButton: true,
                icon: "warning",
                confirmButtonText: getLangString("MENU_TEXT", "UNLOCK"),
                showConfirmButton: showConfirm,
            }).then((result)=>{
                if (result.value) {
                    unlockSkill(skillID);
                }
            }
            );
        }
    } else if (!checkSkillUnlocked(page, skillID) && skillLockType === 0) {
        showPremiumLockedModal(skillID, -1);
    } else {
        $("#" + PAGES[currentPage].strID + "-container").attr("class", "content d-none");
        $("#" + PAGES[page].strID + "-container").attr("class", "content");
        let headerTitle = PAGES[page].name;
        let headerIcon = "assets/media/main/" + PAGES[page].strID + "_header.svg";
        let headerTheme = "content-header bg-" + PAGES[page].strID;
        let headerAltTheme = "bg-" + PAGES[page].strID + " w-100 text-right pr-3";
        let headerClass = "bg-" + PAGES[page].strID;
        switch (page) {
        case CONSTANTS.page.Xmas2020:
            headerIcon = "assets/media/main/xmas_present.svg";
            headerTheme = "content-header bg-easter";
            headerAltTheme = "bg-golbinraid w-100 text-right pr-3";
            headerClass = "bg-easter";
            break;
        case CONSTANTS.page.CaseOfFortune:
            headerIcon = "assets/media/main/caseoffortune.png?2";
            break;
        case CONSTANTS.page.Corruption:
            headerIcon = "assets/media/main/corruption.svg";
            headerTheme = "content-header bg-danger";
            headerAltTheme = "bg-golbinraid w-100 text-right pr-3";
            headerClass = "bg-danger";
            break;
        case CONSTANTS.page.GolbinRaid:
            headerIcon = "assets/media/pets/golden_golbin.svg";
            break;
        case CONSTANTS.page.Combat:
            if (game.isGolbinRaid) {
                headerIcon = "assets/media/pets/golden_golbin.svg";
                headerTheme = "content-header bg-golbinraid";
                headerAltTheme = "bg-golbinraid w-100 text-right pr-3";
                headerClass = "bg-golbinraid";
            }
            break;
        }
        $("#header-title").text(headerTitle);
        $("#header-icon").attr("src", headerIcon);
        $("#header-theme").attr("class", headerTheme);
        $("#header-theme-alt").attr("class", headerAltTheme);
        $("#page-header").attr("class", headerClass);
        currentPage = page;
        switch (page) {
        case CONSTANTS.page.Mining:
            updateShop("pickaxe");
            game.mining.onPageChange();
            break;
        case CONSTANTS.page.Woodcutting:
            updateShop("axe");
            game.woodcutting.onPageChange();
            break;
        case CONSTANTS.page.Firemaking:
            game.firemaking.onPageChange();
            break;
        case CONSTANTS.page.Fishing:
            updateShop("rod");
            game.fishing.onPageChange();
            break;
        case CONSTANTS.page.Cooking:
            if (player.modifiers.autoEquipFoodUnlocked) {
                $("#cooking-food-auto-equip").removeClass("d-none");
            }
            if (SETTINGS.general.allowPerfectCook) {
                $("#cooking-food-enable-perfect").removeClass("d-none");
            }
            game.cooking.onPageChange();
            break;
        case CONSTANTS.page.Combat:
            if (game.isGolbinRaid) {
                raidManager.onPageChange();
            } else {
                updateAreaRequirements();
                combatManager.onPageChange();
            }
            break;
        case CONSTANTS.page.Thieving:
            game.thieving.onPageChange();
            break;
        case CONSTANTS.page.Smithing:
            game.smithing.onPageChange();
            break;
        case CONSTANTS.page.Fletching:
            game.fletching.onPageChange();
            break;
        case CONSTANTS.page.Crafting:
            game.crafting.onPageChange();
            break;
        case CONSTANTS.page.Runecrafting:
            game.runecrafting.onPageChange();
            break;
        case CONSTANTS.page.Herblore:
            game.herblore.onPageChange();
            break;
        case CONSTANTS.page.Summoning:
            game.summoning.onPageChange();
            break;
        case CONSTANTS.page.AltMagic:
            game.altMagic.onPageChange();
            break;
        case CONSTANTS.page.GolbinRaid:
            loadGolbinRaidHistory();
            updateStats(StatCategories.GolbinRaid);
            break;
        case CONSTANTS.page.Shop:
            updateShopCosts();
            if (showRaidShop) {
                shopMenu.showSingleTab("GolbinRaid");
                $("#horizontal-navigation-shop").attr("class", "d-none");
                $("#shop-current-raid-coins-tooltip").removeClass("d-none");
                $("#shop-current-slayer-c").addClass("d-none");
                $("#shop-current-gp-1").addClass("d-none");
                updateRaidCoins();
            } else {
                shopMenu.showAllTabsButRaid();
                $("#horizontal-navigation-shop").attr("class", "d-none d-lg-block mt-2 mt-lg-0");
                $("#shop-current-raid-coins-tooltip").addClass("d-none");
                $("#shop-current-slayer-c").removeClass("d-none");
                $("#shop-current-gp-1").removeClass("d-none");
            }
            updateShop("skillcapes", false);
            updateShop("godUpgrades", false);
            break;
        case CONSTANTS.page.Bank:
            window.setTimeout(function() {
                if (tooltipInstances.bank !== undefined) {
                    tooltipInstances.bank.forEach((instance)=>{
                        instance.destroy();
                    }
                    );
                } else
                    tooltipInstances.bank = [];
                tooltipInstances.bank.length = 0;
                for (let i = 0; i < bank.length; i++)
                    createBankItemEvents(bank[i].id);
            }, 50);
            break;
        case CONSTANTS.page.Farming:
            updateCompostQty();
            break;
        case CONSTANTS.page.Archaeology:
            if (specialEvents[CONSTANTS.specialEvent.aprilFools2020].active) {
                loadScratch();
            }
            break;
        case CONSTANTS.page.Xmas2020:
            if (specialEvents[CONSTANTS.specialEvent.christmas2020].active) {
                loadScratch();
            }
            break;
        case CONSTANTS.page.Easter:
            if (specialEvents[CONSTANTS.specialEvent.easter2020].active) {
                if (!easterLoaded) {
                    setTimeout(function() {
                        mode = 0;
                        score = 0;
                        playdata = [0, 0];
                        dropSpeed = 0.3;
                        mode = 0;
                        delta = 30;
                        initCanvas();
                        easy = document.getElementById("easyMode");
                        easy.onclick = easyMode;
                        normal = document.getElementById("normalMode");
                        normal.onclick = normalMode;
                        hard = document.getElementById("hardMode");
                        hard.onclick = hardMode;
                        window.onresize = function() {
                            if ($(window).width() < 600)
                                canvas.width = width = window.innerWidth - 80;
                            else
                                canvas.width = width = 600;
                            canvas.height = height = 750;
                            drawCanvas();
                        }
                        ;
                        easterLoaded = true;
                    }, 100);
                }
            }
            break;
        case CONSTANTS.page.Astrology:
            game.astrology.onPageChange();
            break;
        case Pages.Statistics:
            updateStats(selectedStatCategory);
            break;
        case Pages.Christmas2021:
            game.eventManager.updateEventUI(Events.CHRISTMAS2021);
            break;
        case Pages.Agility:
            game.agility.onPageChange();
            break;
        }
        if (!gameLoading && toggleSidebar && !window.matchMedia("(min-width: 992px)").matches) {
            One.layout("sidebar_toggle");
        }
        game.renderQueue.combatMinibar = true;
        showFarmingAreas();
        updatePotionHeader();
        updateMinibar(PAGES[currentPage].skillID);
        window.scrollTo(0, 0);
        handleBankSidebarScroll();
        if (page === 29 && !tutorialComplete) {
            $("#tutorial-container").addClass("d-none");
        } else if (!tutorialComplete) {
            $("#tutorial-container").removeClass("d-none");
        }
        const skillID = PAGES[page].skillID;
        if (skillID !== undefined && SKILLS[skillID].hasMastery)
            updateMasteryPoolProgress(skillID);
    }
};
function setToUppercase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function setToLowercase(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}
function updateTooltips() {
    clearTimeout(updateTooltipsTimer);
    updateTooltipsTimer = setTimeout(function() {
        $('[data-toggle="tooltip"]').tooltip({
            sanitize: false,
        });
        $('[data-toggle="popover"]').popover({
            sanitize: false,
        });
    }, 250);
}
$("body").on("click", "#header-equipment-dropdown", function(e) {
    e.stopPropagation();
});
$("body").on("click", "#header-user-options-dropdown", function(e) {
    e.stopPropagation();
});
function itemNotify(itemID, qty) {
    if (showItemNotify === 1) {
        clearTimeout(itemNotifyTimer);
        itemNotifyToProcess.push({
            itemID: itemID,
            qty: qty
        });
        itemNotifyTimer = setTimeout(function() {
            for (let i = 0; i < itemNotifyToProcess.length; i++)
                processItemNotify(itemNotifyToProcess[i].itemID, itemNotifyToProcess[i].qty);
            itemNotifyToProcess = [];
        }, 50);
    }
}
function processItemNotify(itemID, qty) {
    let access = "";
    if (enableAccessibility)
        access = items[itemID].name;
    let qtyInBank = "";
    if (SETTINGS.general.showQtyInItemNotification)
        qtyInBank = " <span class='ml-2'>(" + numberWithCommas(getBankQty(itemID)) + ")</span> ";
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + getItemMedia(itemID) + '" alt="' + items[itemID].name + '"><span class="badge badge-success">+' + numberWithCommas(qty) + qtyInBank + access + "</span></div>",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function gpNotify(qty) {
    if (showGPNotify) {
        let textClass = "success";
        let plus = "+";
        if (qty < 0) {
            textClass = "danger";
            plus = "";
        }
        Toastify({
            text: '<div class="text-center"><img class="notification-img" src="' + CDNDIR + 'assets/media/main/coins.svg" height="32px"><span class="badge badge-' + textClass + '">' + plus + formatNumber(Math.floor(qty)) + "</span></div>",
            duration: 2000,
            gravity: "bottom",
            position: "center",
            backgroundColor: "transparent",
            stopOnFocus: false,
        }).showToast();
    }
}
function stunNotify(damage) {
    Toastify({
        text: `<div class="text-center"><img class="notification-img" src="${cdnMedia(SKILLS[Skills.Thieving].media)}"><span class="badge badge-warning">${getLangString("TOASTS", "STUNNED")} </span> <span class="badge badge-danger"> ${templateLangString("TOASTS", "MINUS_HP", {
            damage: `${damage}`
        })}</span></div>`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function bankFullNotify() {
    Toastify({
        text: `<div class="text-center"><img class="notification-img" src="${cdnMedia("assets/media/main/bank_header.svg")}"><span class="badge badge-danger">${getLangString("TOASTS", "FULL_BANK")}</span></div>`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function levelUpNotify(skill) {
    Toastify({
        text: `<div class="block block-rounded-double bg-dark p-2">
					<div class="media d-flex align-items-center push">
						<div class="mr-2"><img class="skill-icon-md" src="${cdnMedia(SKILLS[skill].media)}"></div>
						<div class="media-body text-left">
							<div class="font-w700 font-size-lg text-success">${getLangString("COMPLETION", "CONGRATS")}</div>
							<div class="font-size-sm">
								${templateLangString("TOASTS", "SKILL_LEVEL_UP", {
            skillName: SKILLS[skill].name,
            level: `${skillLevel[skill]}`
        })}
							</div>
						</div>
					</div>
				</div>`,
        duration: 5000,
        gravity: "top",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function level99Notify(skill) {
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + cdnMedia(SKILLS[skill].media) + '"><span class="badge badge-success">' + templateLangString("TOASTS", "SKILL_LEVEL_UP", {
            skillName: SKILLS[skill].name,
            level: `${skillLevel[skill]}`
        }) + "</span></div>",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
    showNewMilestones(skill);
}
function tutorialNotify() {
    Toastify({
        text: `<div class="block block-rounded-double bg-dark p-2">
					<div class="media d-flex align-items-center push">
						<div class="mr-2"><img class="skill-icon-md" src="${PAGES[29].media}"></div>
						<div class="media-body text-left">
							<div class="font-w700 font-size-lg text-success"><lang-string lang-cat="TUTORIAL" lang-id="MISC_3"></lang-string></div>
							<div class="font-size-sm">
								<lang-string lang-cat="TUTORIAL" lang-id="MISC_4"></lang-string>
							</div>
						</div>
					</div>
				</div>`,
        duration: 5000,
        gravity: "top",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function createNewMilestoneModal(skill, oldLevel, newLevel) {
    let modal = `<div class="h5 font-w400 font-size-sm pt-3 mb-1 text-success">${getLangString("COMPLETION", "SKILL_LEVEL_MILESTONES")}</div>`;
    for (let i = 0; i < MILESTONES[SKILLS[skill].intName].length; i++) {
        if (oldLevel < MILESTONES[SKILLS[skill].intName][i].level && newLevel >= MILESTONES[SKILLS[skill].intName][i].level) {
            modal += `<div class="h5 font-w600 mb-0"><img class="skill-icon-xs mr-2" src="${MILESTONES[SKILLS[skill].intName][i].media}">${MILESTONES[SKILLS[skill].intName][i].name}</div>`;
        }
    }
    return modal;
}
function showNewMilestones(skill) {
    let milestoneMessage = "";
    for (let i = 0; i < MILESTONES[SKILLS[skill].intName].length; i++) {
        if (skillLevel[skill] === MILESTONES[SKILLS[skill].intName][i].level) {
            milestoneMessage = '<div class="text-center"><img class="notification-img" src="' + cdnMedia(SKILLS[skill].media) + '"><img class="notification-img" src="' + MILESTONES[SKILLS[skill].intName][i].media + '"><span class="badge badge-success">MILESTONE UNLOCKED: ' + MILESTONES[SKILLS[skill].intName][i].name + "</span></div>";
            break;
        }
    }
    if (milestoneMessage !== "") {
        Toastify({
            text: milestoneMessage,
            duration: 2000,
            gravity: "bottom",
            position: "center",
            backgroundColor: "transparent",
            stopOnFocus: false,
        }).showToast();
    }
}
function notifyPreserve(skill) {
    if (SETTINGS.general.showItemPreservationNotification)
        notifyPlayer(skill, getLangString("MISC_STRING", "2"), "success");
}
function notifyPlayer(skill, message, type="success") {
    let img = "";
    if (skill === -1)
        img = CDNDIR + "assets/media/main/xmas_present.svg";
    else
        img = cdnMedia(SKILLS[skill].media);
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + img + '"><span class="badge badge-' + type + '">' + message + "</span></div>",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function notifyGloves(skill) {
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + cdnMedia(SKILLS[skill].media) + `"><span class="badge badge-danger">${getLangString("TOASTS", "GLOVES_DEGRADED")}</span></div>`,
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function notifySlayer(qty, type="success") {
    if (!SETTINGS.general.showSlayerCoinNotification)
        return;
    Toastify({
        text: '<div class="text-center"><img class="notification-img" src="' + CDNDIR + 'assets/media/main/slayer_coins.svg"><span class="badge badge-' + type + '"> ' + qty + "</span></div>",
        duration: 2000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function updateMilestoneTab(skill) {
    $("#modal-content-m").html("");
    let milestoneHtml = "";
    milestoneHtml += '<div class="block block-rounded block-link-pop border-top border-' + setToLowercase(SKILLS[skill].intName) + ' border-4x">';
    milestoneHtml += '<div class="block-header">';
    milestoneHtml += '<h3 class="block-title">' + SKILLS[skill].name + "</h3>";
    milestoneHtml += '<div class="block-options"><button type="button" class="btn-block-option" data-dismiss="modal" aria-label="Close"><i class="fa fa-fw fa-times"></i></button></div>';
    milestoneHtml += "</div>";
    milestoneHtml += '<div class="row"><div class="col-12"><div class="block-content">';
    milestoneHtml += '<table class="table table-sm table-vcenter">';
    milestoneHtml += '<thead><tr><th class="text-center" style="width: 65px;">' + getLangString("MENU_TEXT", "MASTERY") + "</th><th>" + getLangString("MENU_TEXT", "UNLOCKS") + "</th></tr></thead><tbody>";
    for (let i = 0; i < MILESTONES[SKILLS[skill].intName].length; i++) {
        milestoneHtml += "<tr>";
        if (skillLevel[skill] >= MILESTONES[SKILLS[skill].intName][i].level) {
            milestoneHtml += '<th class="bg-success text-gray-lighter text-center" scope="row">';
            milestoneHtml += MILESTONES[SKILLS[skill].intName][i].level;
            milestoneHtml += "</th>";
        } else {
            milestoneHtml += '<th class="text-center" scope="row">';
            milestoneHtml += MILESTONES[SKILLS[skill].intName][i].level;
            milestoneHtml += "</th>";
        }
        milestoneHtml += '<td class="font-w600 font-size-sm">';
        milestoneHtml += '<img class="milestone-icon" id="milestone-1-' + i + '" src="' + MILESTONES[SKILLS[skill].intName][i].media + '">';
        milestoneHtml += setToUppercase(MILESTONES[SKILLS[skill].intName][i].name);
        milestoneHtml += "</td></tr>";
    }
    milestoneHtml += "</tbody></table></div></div></div></div>";
    $("#modal-content-m").append(milestoneHtml);
    $("#modal-milestone").modal("show");
}
function selectFromDropTable(itemID) {
    let dropTable = items[itemID].dropTable;
    let totalWeight = 0, itemWeight = 0, i;
    for (let i = 0; i < dropTable.length; i++) {
        totalWeight += dropTable[i][1];
    }
    let random = Math.floor(Math.random() * totalWeight);
    for (let i = 0; i < dropTable.length; i++) {
        itemWeight += dropTable[i][1];
        if (random < itemWeight) {
            return dropTable[i][0];
        }
    }
}
const selectFromLootTable = (function() {
    const weightCache = new Map();
    return (skill,id)=>{
        let dropTable;
        if (skill === CONSTANTS.skill.Hitpoints) {
            dropTable = MONSTERS[id].lootTable;
        }
        let totalWeight = weightCache.get(dropTable);
        if (totalWeight === undefined) {
            totalWeight = dropTable.reduce((prev,drop)=>prev + drop[1], 0);
            weightCache.set(dropTable, totalWeight);
        }
        let itemWeight = 0;
        let random = Math.floor(Math.random() * totalWeight);
        for (let i = 0; i < dropTable.length; i++) {
            itemWeight += dropTable[i][1];
            if (random < itemWeight) {
                return dropTable[i][0];
            }
        }
    }
    ;
}
)();
function updateGloves(gloves, skill) {
    if (glovesTracker[gloves].remainingActions <= 0) {
        notifyGloves(skill);
    }
    gloveCheck();
    updateShop("gloves");
}
function addXP(skill, xp, render=true, dropRares=true, offline=false) {
    let levelIncreased = false;
    if (!isSkillLocked(skill)) {
        currentSkillLevel = skillLevel[skill];
        xp = getSkillXPToAdd(skill, xp);
        skillXP[skill] += xp;
        const combatLevel = getPlayerCombatLevel();
        if (currentGamemode === 2 && SKILLS[skill].hasMastery && skillXP[skill] >= exp.level_to_xp(combatLevel + 1)) {
            skillXP[skill] = exp.level_to_xp(combatLevel + 1) - 1;
            if (render)
                $("#adventure-mode-xp-limit-notice-" + skill).removeClass("d-none");
        }
        if (!tutorialComplete && skill !== CONSTANTS.skill.Hitpoints && skillXP[skill] >= exp.level_to_xp(4)) {
            skillXP[skill] = exp.level_to_xp(4) - 1;
            if (render)
                notifyPlayer(skill, getLangString("MISC_STRING", "TUTORIAL_0"), "danger");
        }
        if (!tutorialComplete && skill === CONSTANTS.skill.Hitpoints && skillXP[skill] >= exp.level_to_xp(11)) {
            skillXP[skill] = exp.level_to_xp(11) - 1;
            if (render)
                notifyPlayer(skill, getLangString("MISC_STRING", "TUTORIAL_1"), "danger");
        }
        levelIncreased = skillXP[skill] > exp.level_to_xp(skillLevel[skill] + 1) && skillLevel[skill] < 99;
        if (levelIncreased) {
            levelUp(skill, offline, render);
        }
        updateLevelProgress(skill);
        if (render)
            updateSkillWindow(skill);
        if (dropRares) {
            setTimeout(()=>{
                if (SKILLS[skill].hasMastery)
                    getMasteryToken(skill);
                rollForRhaelyx(skill);
            }
            , 50);
        }
    }
    return levelIncreased;
}
function getSkillXPToAdd(skill, xp) {
    let xpMultiplier = 1;
    switch (skill) {
    case CONSTANTS.skill.Herblore:
        {
            if (getMasteryPoolProgress(skill) >= masteryCheckpoints[1])
                xpMultiplier += 0.03;
            break;
        }
    case CONSTANTS.skill.Magic:
        {
            if (!combatManager.isInCombat)
                xpMultiplier += (playerModifiers.increasedAltMagicSkillXP - playerModifiers.decreasedAltMagicSkillXP) / 100;
            break;
        }
    case CONSTANTS.skill.Firemaking:
        {
            if (playerModifiers.summoningSynergy_18_19 > 0 && game.firemaking.isBonfireActive > 0 && herbloreBonuses[8].bonus[0] === 0 && herbloreBonuses[8].bonus[1] > 0)
                xpMultiplier += 5 / 100;
            break;
        }
    case CONSTANTS.skill.Thieving:
        {
            if (getMasteryPoolProgress(skill) >= masteryCheckpoints[0])
                xpMultiplier += 0.03;
            break;
        }
    }
    xpMultiplier += getTotalFromModifierArray("increasedSkillXP", skill) / 100;
    xpMultiplier -= getTotalFromModifierArray("decreasedSkillXP", skill) / 100;
    xpMultiplier += (playerModifiers.increasedGlobalSkillXP - playerModifiers.decreasedGlobalSkillXP) / 100;
    return xp * xpMultiplier;
}
function getMasteryToken(skill, offline=false) {
    const tokenChance = getMasteryTokenChance(skill);
    let item = 0;
    if (rollPercentage(tokenChance * 100)) {
        switch (skill) {
        case CONSTANTS.skill.Cooking:
            item = CONSTANTS.item.Mastery_Token_Cooking;
            break;
        case CONSTANTS.skill.Crafting:
            item = CONSTANTS.item.Mastery_Token_Crafting;
            break;
        case CONSTANTS.skill.Farming:
            item = CONSTANTS.item.Mastery_Token_Farming;
            break;
        case CONSTANTS.skill.Firemaking:
            item = CONSTANTS.item.Mastery_Token_Firemaking;
            break;
        case CONSTANTS.skill.Fishing:
            item = CONSTANTS.item.Mastery_Token_Fishing;
            break;
        case CONSTANTS.skill.Fletching:
            item = CONSTANTS.item.Mastery_Token_Fletching;
            break;
        case CONSTANTS.skill.Mining:
            item = CONSTANTS.item.Mastery_Token_Mining;
            break;
        case CONSTANTS.skill.Runecrafting:
            item = CONSTANTS.item.Mastery_Token_Runecrafting;
            break;
        case CONSTANTS.skill.Smithing:
            item = CONSTANTS.item.Mastery_Token_Smithing;
            break;
        case CONSTANTS.skill.Thieving:
            item = CONSTANTS.item.Mastery_Token_Thieving;
            break;
        case CONSTANTS.skill.Woodcutting:
            item = CONSTANTS.item.Mastery_Token_Woodcutting;
            break;
        case CONSTANTS.skill.Herblore:
            item = CONSTANTS.item.Mastery_Token_Herblore;
            break;
        case CONSTANTS.skill.Agility:
            item = CONSTANTS.item.Mastery_Token_Agility;
            break;
        case CONSTANTS.skill.Summoning:
            item = CONSTANTS.item.Mastery_Token_Summoning;
            break;
        case CONSTANTS.skill.Astrology:
            item = CONSTANTS.item.Mastery_Token_Astrology;
            break;
        }
        if (offline)
            return item;
        else {
            if (item > 0)
                addItemToBank(item, 1);
        }
    }
    if (offline)
        return item;
}
function gloveCheck() {
    for (let i = 0; i < glovesTracker.length; i++) {
        if (glovesTracker[i].isActive) {
            const itemID = gloveID[i];
            if (!doesPlayerOwnItem(itemID)) {
                glovesTracker[i].isActive = false;
                glovesTracker[i].remainingActions = 0;
                updateShop("gloves");
            }
        }
    }
}
function doesPlayerOwnItem(itemID) {
    return checkBankForItem(itemID) || player.checkEquipmentSetsForItem(itemID);
}
function toggleMenu(menu) {
    let c = [6, 7, 8, 9, 12, 16, 17, 18];
    let m = [0, 1, 2, 3, 4, 5, 10, 13, 14, 15, 19];
    if (menu === 0) {
        for (let i = 0; i < c.length; i++) {
            $("#nav-skill-tooltip-" + c[i]).toggleClass("d-none");
        }
        if (combatMenu) {
            $("#skill-menu-icon-1").attr("class", "far fa-eye-slash text-muted ml-1");
            combatMenu = false;
        } else {
            $("#skill-menu-icon-1").attr("class", "far fa-eye text-muted ml-1");
            combatMenu = true;
        }
    } else if (menu === 1) {
        $($(".nav-main-heading")[4]).nextUntil("[id=nav-main-heading]").toggleClass("d-none");
        if (skillsMenu) {
            $("#skill-menu-icon").attr("class", "far fa-eye-slash text-muted ml-1");
            skillsMenu = false;
        } else {
            $("#skill-menu-icon").attr("class", "far fa-eye text-muted ml-1");
            skillsMenu = true;
        }
    }
}
function rollForGeneralRareItems(skill, totalBaseActions, petID, interval, tokenID, levelReq) {
    let rareItems = [];
    if (skill !== CONSTANTS.skill.Magic) {
        let tokenChance = getMasteryTokenChance(skill);
        let token = sample_from_binomial(totalBaseActions, tokenChance);
        if (token >= 1)
            rareItems.push({
                itemsGained: tokenID,
                actions: token
            });
    }
    let petChance = getPetChance(petID, interval);
    let getPet = sample_from_binomial(totalBaseActions, petChance);
    if (!petUnlocked[petID]) {
        if (getPet >= 1)
            unlockPet(petID, true);
    }
    if (skill !== CONSTANTS.skill.Magic) {
        petChance = getPetChance(21, interval, skill);
        getPet = sample_from_binomial(totalBaseActions, petChance);
        if (!petUnlocked[21]) {
            if (getPet >= 1)
                unlockPet(21, true);
        }
    }
    let ringHalfChance = dropRingHalfAChance(levelReq);
    let ringHalf = sample_from_binomial(totalBaseActions, ringHalfChance);
    if (ringHalf >= 1) {
        if (playerModifiers.allowSignetDrops > 0)
            rareItems.push({
                itemsGained: CONSTANTS.item.Signet_Ring_Half_A,
                actions: ringHalf
            });
        else {
            rareItems.push({
                itemsGained: CONSTANTS.item.Gold_Topaz_Ring,
                actions: ringHalf
            });
            game.stats.General.add(GeneralStats.SignetRingHalvesMissed, ringHalf);
        }
    }
    if (skill !== CONSTANTS.skill.Magic) {
        let rhaelyxChance = getRhaelyxChance();
        let r = sample_from_binomial(totalBaseActions, rhaelyxChance);
        let stoneChance = getRhaelyxStoneChance();
        let s = sample_from_binomial(totalBaseActions, stoneChance);
        if (r >= 1) {
            let item = getRhaelyxPiece(skill);
            rareItems.push({
                itemsGained: item,
                actions: r
            });
        }
        if (s >= 1)
            rareItems.push({
                itemsGained: CONSTANTS.item.Mysterious_Stone,
                actions: s
            });
    }
    return rareItems;
}
let offlineModalID = 0;
function updateOffline(continueAction=true) {
    if (!game.mining.isActive && offline.skill === Skills.Mining && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        game.mining.onRockClick(offline.action);
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.firemaking.isActive && offline.skill === Skills.Firemaking && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        game.firemaking.selectLog(offline.action);
        game.firemaking.burnLog();
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.woodcutting.isActive && offline.skill === Skills.Woodcutting && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        offline.action.forEach((treeID)=>{
            game.woodcutting.selectTree(Woodcutting.trees[treeID]);
        }
        );
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.herblore.isActive && offline.skill === Skills.Herblore && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        game.herblore.selectRecipeOnClick(offline.action);
        game.herblore.createButtonOnClick();
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.smithing.isActive && offline.skill === Skills.Smithing && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        const oldOfflineMap = new Map([[0, 0], [1, 9], [2, 72], [3, 107], [4, 10], [5, 86], [6, 79], [7, 13], [8, 11], [9, 100], [10, 1], [11, 14], [12, 17], [13, 114], [14, 108], [15, 18], [16, 65], [17, 73], [18, 12], [19, 87], [20, 80], [21, 93], [22, 15], [23, 21], [24, 19], [25, 16], [26, 101], [27, 22], [28, 66], [29, 20], [30, 94], [31, 2], [32, 23], [33, 25], [34, 109], [35, 24], [36, 26], [37, 74], [38, 88], [39, 8], [40, 81], [41, 29], [42, 27], [43, 102], [44, 30], [45, 67], [46, 28], [47, 95], [48, 3], [49, 4], [50, 31], [51, 33], [52, 110], [53, 32], [54, 34], [55, 75], [56, 89], [57, 82], [58, 37], [59, 35], [60, 103], [61, 38], [62, 68], [63, 36], [64, 96], [65, 5], [66, 39], [67, 41], [68, 111], [69, 40], [70, 42], [71, 76], [72, 90], [73, 83], [74, 45], [75, 43], [76, 104], [77, 46], [78, 69], [79, 44], [80, 97], [81, 6], [82, 47], [83, 49], [84, 112], [85, 48], [86, 50], [87, 77], [88, 91], [89, 84], [90, 53], [91, 51], [92, 105], [93, 54], [94, 70], [95, 52], [96, 98], [97, 7], [98, 55], [99, 57], [100, 113], [101, 56], [102, 58], [103, 78], [104, 92], [105, 85], [106, 61], [107, 59], [108, 106], [109, 62], [110, 71], [111, 60], [112, 99], [113, 63], [114, 64], ]);
        const recipeID = oldOfflineMap.get(offline.action);
        if (recipeID !== undefined) {
            game.smithing.selectRecipeOnClick(recipeID);
            game.smithing.createButtonOnClick();
            offline.timestamp = tempTimestamp;
            offline.action = null;
        }
    }
    if (!game.runecrafting.isActive && offline.skill === Skills.Runecrafting && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        const oldOfflineMap = new Map([[0, 0], [1, 1], [2, 20], [3, 32], [4, 35], [5, 2], [6, 21], [7, 36], [8, 34], [9, 3], [10, 22], [11, 39], [12, 40], [13, 14], [14, 33], [15, 38], [16, 43], [17, 4], [18, 23], [19, 44], [20, 10], [21, 37], [22, 42], [23, 47], [24, 5], [25, 15], [26, 41], [27, 46], [28, 45], [29, 24], [30, 16], [31, 6], [32, 25], [33, 48], [34, 26], [35, 51], [36, 52], [37, 11], [38, 17], [39, 50], [40, 55], [41, 56], [42, 27], [43, 49], [44, 54], [45, 59], [46, 60], [47, 12], [48, 18], [49, 53], [50, 58], [51, 63], [52, 57], [53, 62], [54, 19], [55, 61], [56, 7], [57, 64], [58, 67], [59, 68], [60, 28], [61, 66], [62, 71], [63, 72], [64, 8], [65, 29], [66, 65], [67, 70], [68, 75], [69, 76], [70, 30], [71, 13], [72, 80], [73, 69], [74, 74], [75, 79], [76, 31], [77, 81], [78, 9], [79, 73], [80, 78], [81, 82], [82, 77], [83, 83], ]);
        const recipeID = oldOfflineMap.get(offline.action);
        if (recipeID !== undefined) {
            game.runecrafting.selectRecipeOnClick(recipeID);
            game.runecrafting.createButtonOnClick();
            offline.timestamp = tempTimestamp;
            offline.action = null;
        }
    }
    if (!game.altMagic.isActive && offline.skill === Skills.Magic && offline.action !== null) {
        game.altMagic.setFromOldOffline(offline);
    }
    if (!game.crafting.isActive && offline.skill === Skills.Crafting && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        game.crafting.selectRecipeOnClick(offline.action);
        game.crafting.createButtonOnClick();
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.fletching.isActive && offline.skill === Skills.Fletching && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        const oldOfflineMap = new Map([[0, 15], [1, 16], [2, 17], [3, 18], [4, 19], [5, 20], [6, 27], [7, 28], [8, 29], [9, 30], [10, 31], [11, 32], [12, 2], [13, 3], [14, 4], [15, 5], [16, 6], [17, 7], [18, 8], [19, 0], [20, 1], [21, 9], [22, 10], [23, 11], [24, 12], [25, 13], [26, 14], [27, 21], [28, 22], [29, 23], [30, 24], [31, 25], [32, 26], [33, 33], [34, 34], [35, 35], [36, 36], [37, 37], [38, 38], [39, 39], [40, 40], [41, 41], [42, 42], [43, 43], [44, 44], [45, 45], [46, 46], [47, 47], [48, 48], [49, 49], [50, 50], [51, 51], [52, 52], [53, 53], [54, 54], [55, 55], [56, 56], ]);
        const recipeID = oldOfflineMap.get(offline.action[0]);
        const altLogID = offline.action[1];
        if (recipeID !== undefined) {
            game.fletching.selectRecipeOnClick(recipeID);
            if (recipeID === 0 && typeof altLogID === "number" && altLogID < Fletching.recipes[0].alternativeCosts.length)
                game.fletching.selectAltRecipeOnClick(altLogID);
            game.fletching.createButtonOnClick();
            offline.timestamp = tempTimestamp;
            offline.action = null;
        }
    }
    if (!game.summoning.isActive && offline.skill === Skills.Summoning && offline.action !== null) {
        const tempTimestamp = offline.timestamp;
        const masteryID = offline.action;
        game.summoning.selectRecipeOnClick(masteryID);
        game.summoning.createButtonOnClick();
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.fishing.isActive && offline.skill === Skills.Fishing && offline.action !== null && Array.isArray(offline.action)) {
        const tempTimestamp = offline.timestamp;
        const area = Fishing.areas[offline.action[0]];
        game.fishing.onAreaFishSelection(area, area.fish[offline.action[1]]);
        game.fishing.onAreaStartButtonClick(area);
        offline.timestamp = tempTimestamp;
        offline.action = null;
    }
    if (!game.cooking.isActive && offline.skill === Skills.Cooking && offline.action !== null) {
        game.cooking.setFromOldOffline(offline);
        offline.action = null;
    }
    if (!game.agility.isActive && offline.skill === Skills.Agility && offline.action !== null) {
        game.agility.setFromOldOffline(offline);
        offline.action = null;
    }
    if (!game.astrology.isActive && offline.skill === Skills.Astrology && offline.action !== null) {
        game.astrology.setFromOldOffline(offline);
        offline.action = null;
    }
    if (game.activeSkill !== ActiveSkills.OTHER && game.activeSkill !== ActiveSkills.NONE) {
        return game.processOffline();
    }
    return new Promise((resolve,reject)=>{
        try {
            if (!tutorialComplete)
                resolve();
            const skill = offline.skill;
            if (skill === null)
                resolve();
            if (!skillsUnlocked[skill])
                resolve();
            offlineModalID++;
            const modalID = offlineModalID;
            let actions = [];
            let itemsGained = [];
            let msgXP = 0;
            let msgItems = "";
            let totalActions = 0;
            let gpGained = 0;
            let potionsUsed = [0, 0];
            let successfulActions = 0;
            let strXP = 0;
            let FMxpToAdd = 0;
            let usingGloves = false;
            let masteryActions = 0;
            let interval = 0;
            let mPoolProgress = 0;
            let mLevel = 0;
            let baseTotalActions = 0;
            let rareItems = [];
            let actualActions = 0;
            const summoningXP = skillXP[CONSTANTS.skill.Summoning];
            const equippedSummons = [player.equipment.slots.Summon1.item.id, player.equipment.slots.Summon2.item.id];
            const equippedSummonCharges = [player.equipment.slots.Summon1.quantity, player.equipment.slots.Summon2.quantity];
            marksFoundOffline = 0;
            loadingOfflineProgress = true;
            if (skill !== null) {
                let textColour = "";
                if (darkMode)
                    textColour = "color:#fff;";
                let html = `<div id="test-lol-${modalID}" style="min-height:50px;${textColour}"><small><div class="spinner-border spinner-border-sm text-primary mr-2" id="offline-progress-spinner" role="status"></div>${getLangString("MENU_TEXT", "LOADING_OFFLINE_PROGRESS")}</small></div>`;
                const welcomeBackModal = {
                    title: getLangString("MISC_STRING", "3"),
                    html: html,
                    imageUrl: cdnMedia(SKILLS[skill].media),
                    imageWidth: 64,
                    imageHeight: 64,
                    imageAlt: getLangString("MENU_TEXT", "OFFLINE"),
                    allowOutsideClick: false,
                };
                addModalToQueue(welcomeBackModal);
                if (document.getElementById(`test-lol-${modalID}`) !== null)
                    $(".swal2-confirm").attr("disabled", "true");
                let timeoutDelay = 800;
                if (skill === CONSTANTS.skill.Woodcutting)
                    timeoutDelay = 50;
                clearTimeout(offlineProgressTimer);
                offlineProgressTimer = setTimeout(function() {
                    try {
                        let {timeDiff, originalTimeDiff} = getOfflineTimeDiff();
                        switch (offline.skill) {
                        case CONSTANTS.skill.Fishing:
                            if (!offline.action.length) {
                                let hours = Math.floor(timeDiff / 1000 / 60 / 60);
                                if (hours < 1)
                                    hours = 1;
                                let xpRate = Math.floor((1000 * skillLevel[CONSTANTS.skill.Fishing]) / 2);
                                msgXP += hours * xpRate;
                                addXP(CONSTANTS.skill.Fishing, msgXP, false, true, true);
                                updateSkillWindow(CONSTANTS.skill.Fishing);
                                msgItems += "<small>There was an update while you were gone. This update completely changed fishing. This is why you received no items, but I was kind enough to give you some XP. No Reddit threads are required.</small>";
                            }
                            break;
                        case CONSTANTS.skill.Thieving:
                            const timeGone = timeDiff / 1000 / 60 / 60;
                            let goneFor = "";
                            if (timeGone < 1)
                                goneFor = Math.floor(timeGone * 60) + " minutes";
                            else
                                goneFor = Math.floor(timeGone) + " hours";
                            const awayMessage = `
                <h5 class='font-w400 font-size-sm mb-1'>While you were attempting to steal from your mark, you heard a voice from behind you:</h5>
                <h5 class='font-w400 font-size-sm mb-1 text-info font-italic'>"Stop! You violated the law! Pay the court a fine or serve your sentence. Your stolen goods are now forfeit."</h5>
                <h5 class='font-w400 font-size-sm mb-1'>You were caught by the city guard. You served roughly ${goneFor} in jail.</h5>
                <h5 class='font-w400 font-size-sm mb-1'>Perhaps if you had a bit more <span class="text-warning">Stealth</span> you wouldn't have been caught.</h5>`;
                            if (document.getElementById(`test-lol-${modalID}`) !== null) {
                                $(`#test-lol-${modalID}`).html(awayMessage);
                            } else {
                                welcomeBackModal.html = `<div id="test-lol-${modalID}" style="height:auto;">${awayMessage}</div>`;
                            }
                            $(".swal2-confirm").attr("disabled", "");
                            $(".swal2-confirm").removeAttr("disabled");
                            clearOffline();
                            return;
                        }
                        if (marksFoundOffline > 0)
                            console.log(`You found ${marksFoundOffline} Marks Offline`);
                        loadingOfflineProgress = false;
                        let timeGone = timeDiff / 1000 / 60 / 60;
                        let goneFor = "";
                        if (timeGone < 1)
                            goneFor = Math.floor(timeGone * 60) + " minutes";
                        else
                            goneFor = Math.floor(timeGone) + " hours";
                        goneFor += `<br><small class="text-info">${getLangString("MENU_TEXT", "MAX_OFFLINE_TIME")}</small>`;
                        updateSkillWindow(skill);
                        updateSkillWindow(Skills.Summoning);
                        if (gpGained > 0)
                            msgItems += "<br>" + numberWithCommas(gpGained) + ' <img class="skill-icon-xs" src="' + CDNDIR + 'assets/media/main/coins.svg"> ' + getLangString("MENU_TEXT", "GP");
                        if (itemsGained.length) {
                            for (let i = 0; i < itemsGained.length; i++) {
                                if (actions[i] > 0) {
                                    if (addItemToBank(itemsGained[i], actions[i], true, false))
                                        msgItems += "<br>" + numberWithCommas(actions[i]) + ' <img class="skill-icon-xs" src="' + getItemMedia(itemsGained[i]) + '"> ' + items[itemsGained[i]].name;
                                    else
                                        msgItems += "<br>" + templateString(getLangString("MENU_TEXT", "LOST_ITEM_BANK"), {
                                            count: `${numberWithCommas(actions[i])}`,
                                            itemImage: `<img class="skill-icon-xs" src="${getItemMedia(itemsGained[i])}">`,
                                            itemName: items[itemsGained[i]].name
                                        });
                                }
                            }
                        }
                        if (skill !== CONSTANTS.skill.Magic)
                            updateMasteryPoolProgress(skill);
                        let summoningMarksFound = "";
                        if (skill !== CONSTANTS.skill.Magic && marksFoundOffline > 0)
                            summoningMarksFound = "<h5 class='font-w600 mb-1'>" + templateString(getLangString("MENU_TEXT", "YOU_FOUND_MARK"), {
                                count: numberWithCommas(marksFoundOffline),
                                markImage: `<img class='skill-icon-xs mr-2' src='${game.summoning.getMarkImage(Summoning.marksBySkill[skill][0])}'>`,
                                markName: game.summoning.getMarkName(Summoning.marksBySkill[skill][0])
                            });
                        let strengthXPGained = "";
                        let FMXPGained = "";
                        let summoningXPGained = "";
                        let summoningXPAfter = Math.floor(skillXP[CONSTANTS.skill.Summoning] - summoningXP);
                        strXP = Math.floor(getSkillXPToAdd(CONSTANTS.skill.Woodcutting, strXP));
                        FMxpToAdd = Math.floor(getSkillXPToAdd(CONSTANTS.skill.Firemaking, FMxpToAdd));
                        msgXP = Math.floor(getSkillXPToAdd(offline.skill, msgXP));
                        if (summoningXPAfter > 0 && skill !== CONSTANTS.skill.Summoning)
                            summoningXPGained += "<h5 class='font-w600 mb-1'>" + templateString(getLangString("MISC_STRING", "6"), {
                                qty: `<span class='text-success'>${numberWithCommas(summoningXPAfter)}</span>`,
                                skillName: SKILLS[Skills.Summoning].name
                            }) + "</h5>";
                        if (strXP > 0)
                            strengthXPGained += "<h5 class='font-w600 mb-1'>" + templateString(getLangString("MISC_STRING", "6"), {
                                qty: `<span class='text-success'>${numberWithCommas(strXP)}</span>`,
                                skillName: SKILLS[Skills.Strength].name
                            }) + "</h5>";
                        if (FMxpToAdd > 0)
                            FMXPGained += "<h5 class='font-w600 mb-1'>" + templateString(getLangString("MISC_STRING", "6"), {
                                qty: `<span class='text-success'>${numberWithCommas(FMxpToAdd)}</span>`,
                                skillName: SKILLS[Skills.Firemaking].name
                            }) + "</h5>";
                        if (potionsUsed[1] > 0)
                            msgItems += "<br><br>" + numberWithCommas(potionsUsed[1]) + ' <img class="skill-icon-xs" src="' + getItemMedia(potionsUsed[0]) + '"> ' + getLangString("STATISTICS", "POTION_CHARGES_USED");
                        const remainingSummonCharges = [player.equipment.slots.Summon1.quantity, player.equipment.slots.Summon2.quantity];
                        for (let i = 0; i < remainingSummonCharges.length; i++) {
                            if (i === 0)
                                msgItems += "<br>";
                            if (remainingSummonCharges[i] < equippedSummonCharges[i])
                                msgItems += "<br>" + templateString(getLangString("MENU_TEXT", "TABLET_CHARGES_USED"), {
                                    qty: numberWithCommas(equippedSummonCharges[i] - remainingSummonCharges[i]),
                                    tabletImage: `<img class="skill-icon-xs" src="${getItemMedia(equippedSummons[i])}">`,
                                    tabletName: items[equippedSummons[i]].name
                                });
                        }
                        let youWereGone = "<h5 class='font-w400'>" + templateString(getLangString("MISC_STRING", "4"), {
                            timeAway: formatAsTimePeriod(timeDiff)
                        }) + "</h5><h5 class='font-w400 font-size-sm mb-1'>" + getLangString("MISC_STRING", "5") + "</h5><h5 class='font-w600 mb-1'>" + templateString(getLangString("MISC_STRING", "6"), {
                            qty: `<span class='text-success'>${numberWithCommas(msgXP)}</span>`,
                            skillName: SKILLS[skill].name
                        }) + "</h5>" + strengthXPGained + FMXPGained + summoningXPGained + summoningMarksFound + msgItems;
                        if (document.getElementById(`test-lol-${modalID}`) !== null) {
                            $(`#test-lol-${modalID}`).html(youWereGone);
                        } else {
                            let textColour = "";
                            if (darkMode)
                                textColour = "color:#fff;";
                            welcomeBackModal.html = `<div id="test-lol-${modalID}" style="height:auto;${textColour}">${youWereGone}</div>`;
                        }
                        offlineProgressCache = youWereGone;
                        $(".swal2-confirm").attr("disabled", "");
                        $(".swal2-confirm").removeAttr("disabled");
                        updatePotionHeader();
                        if (skill === Skills.Magic)
                            selectMagic(offline.action[0], true);
                        if (!continueAction)
                            clearOffline(true, true);
                        saveData();
                        sendPlayFabEvent("load_offline_progress", {
                            skillID: skill,
                            timeAway: originalTimeDiff,
                            xp: msgXP,
                            skillLevels: skillLevel
                        });
                        deleteScheduledPushNotification("offlineSkill");
                        resolve();
                    } catch (e) {
                        console.error(e);
                        const errorHTML = `<h5 class='font-w600 text-danger mb-1'>${getLangString("ERROR", "OFFLINE_ERROR_0")}</h5><h5 class='font-w600 text-info font-size-sm mb-4'>${getLangString("ERROR", "SKILL_STOPPED")}</h5><h5 class='font-w400 font-size-sm mb-1'>${getLangString("ERROR", "LET_DEV_KNOW")}<br>Skill: ` + offline.skill + "<br>Action: " + offline.action + "<br>Timestamp: " + offline.timestamp + "<br><br>" + e.stack + "</h5>";
                        if (document.getElementById(`test-lol-${modalID}`) !== null) {
                            $(`#test-lol-${modalID}`).html(errorHTML);
                            $(".swal2-confirm").text(getLangString("ERROR", "CONTINUE_TO_GAME"));
                            $(".swal2-confirm").attr("disabled", "");
                            $(".swal2-confirm").removeAttr("disabled");
                        } else {
                            let textColour = "";
                            if (darkMode)
                                textColour = "color:#fff;";
                            welcomeBackModal.html = `<div id="test-lol-${modalID}" style="height:auto;${textColour}">${errorHTML}</div>`;
                            welcomeBackModal.confirmButtonText = getLangString("ERROR", "CONTINUE_TO_GAME");
                        }
                        clearOffline(true, true);
                        loadingOfflineProgress = false;
                        resolve();
                    }
                }, timeoutDelay);
            } else {
                loadingOfflineProgress = false;
                resolve();
            }
        } catch (e) {
            $("#m-page-loader").attr("class", "d-none");
            document.getElementById("game-broke-error-msg").value = e.stack;
            $("#modal-game-broke").modal("show");
            console.error(e);
            resolve();
        }
    }
    );
}
function clearOffline(save=true, force=false) {
    if (!game.disableClearOffline || force) {
        offline.skill = null;
        offline.action = null;
        offline.timestamp = null;
        if (save)
            saveData("all");
        deleteScheduledPushNotification("offlineSkill");
        firstSkillAction = true;
        game.activeSkill = ActiveSkills.NONE;
    }
}
function toggleCombatSkillMenu() {
    $("#combat-skill-progress-menu").toggleClass("d-none");
    $("#combat-skill-menu-open").toggleClass("d-none");
    $("#combat-skill-menu-closed").toggleClass("d-none");
}
function dropRingHalfA(levelReq, rewards=undefined) {
    let chanceForRing = dropRingHalfAChance(levelReq) * 100;
    let itemID = CONSTANTS.item.Gold_Topaz_Ring;
    if (playerModifiers.allowSignetDrops)
        itemID = CONSTANTS.item.Signet_Ring_Half_A;
    if (rollPercentage(chanceForRing)) {
        if (itemID === Items.Gold_Topaz_Ring)
            game.stats.General.inc(GeneralStats.SignetRingHalvesMissed);
        if (rewards === undefined) {
            addItemToBank(itemID, 1);
        } else {
            rewards.addItem(itemID, 1);
        }
    }
}
function initMinibar() {
    tippy(".bank-tab-value-full", {
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
        onShow(instance) {
            instance.setContent(numberWithCommas(bankTabValue));
        },
    });
    tippy(".bank-space-value-full", {
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
        onShow(instance) {
            instance.setContent(numberWithCommas(bankSpaceValue));
        },
    });
    createMinibarSortable();
}
var customMinibarItems = {
    0: [Items.Lumberjacks_Top, Items.Woodcutting_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    1: [Items.Amulet_of_Fishing, Items.Barbarian_Gloves, Items.Fishing_Hook, Items.Sailors_Top, Items.Fishing_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    2: [Items.Firemaking_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    3: [Items.Cooking_Gloves, Items.Cooking_Apron, Items.Chefs_Hat, Items.Chefs_Spoon, Items.Cooking_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    4: [Items.Gem_Gloves, Items.Mining_Gloves, Items.Miners_Helmet, Items.Mining_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    5: [Items.Smithing_Gloves, Items.Smithing_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [Items.Thieving_Gloves, Items.Gloves_of_Silence, Items.Thievers_Cape, Items.Thiefs_Moneysack, Items.Jesters_Hat, Items.Golbin_Mask, Items.Boots_Of_Stealth, Items.Thieving_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    11: [Items.Bobs_Rake, Items.Bobs_Gloves, Items.Seed_Pouch, Items.Farming_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    12: [],
    13: [Items.Fletching_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    14: [Items.Crafting_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    15: [Items.Runecrafting_Pouch, Items.Runecrafting_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    16: [Items.Amulet_Of_Incantation, Items.Magic_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    17: [],
    18: [],
    19: [Items.Herblore_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    20: [Items.Agility_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    21: [Items.Necromancer_Hat, Items.Necromancer_Robes, Items.Necromancer_Bottoms, Items.Necromancer_Boots, Items.Summoning_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
    22: [Items.Astrology_Skillcape, Items.Max_Skillcape, Items.Cape_of_Completion],
};
function updateMinibar(skillID) {
    if (tooltipInstances.minibar !== undefined) {
        tooltipInstances.minibar.forEach((instance)=>{
            instance.destroy();
        }
        );
        tooltipInstances.minibar.length = 0;
    } else
        tooltipInstances.minibar = [];
    if (skillID !== undefined) {
        if (skillID === 0 && playerModifiers.increasedTreeCutLimit > 0)
            $("#minibar-woodcutting-multitree").removeClass("d-none");
        else
            $("#minibar-woodcutting-multitree").addClass("d-none");
        if (checkShopItemPurchased("SkillUpgrades", 30) && (skillID === 13 || skillID === 14))
            $("#minibar-god-upgrade-0").removeClass("d-none");
        else
            $("#minibar-god-upgrade-0").addClass("d-none");
        if (checkShopItemPurchased("SkillUpgrades", 31) && (skillID === 15 || skillID === 19))
            $("#minibar-god-upgrade-1").removeClass("d-none");
        else
            $("#minibar-god-upgrade-1").addClass("d-none");
        if (checkShopItemPurchased("SkillUpgrades", 32) && (skillID === 0 || skillID === 4))
            $("#minibar-god-upgrade-2").removeClass("d-none");
        else
            $("#minibar-god-upgrade-2").addClass("d-none");
        if (checkShopItemPurchased("SkillUpgrades", 33) && (skillID === 2 || skillID === 3 || skillID === 5))
            $("#minibar-god-upgrade-3").removeClass("d-none");
        else
            $("#minibar-god-upgrade-3").addClass("d-none");
        const minibarItems = JSON.parse(JSON.stringify(customMinibarItems[skillID]));
        const itemContainer = document.getElementById("minibar-skill-item-container");
        itemContainer.textContent = "";
        minibarItems.forEach((itemID)=>{
            if (game.stats.itemFindCount(itemID) <= 0)
                return;
            const button = createElement("button", {
                classList: ["btn", "btn-sm", "btn-outline-secondary", "overlay-container", "overlay-bottom"],
                children: [createElement("img", {
                    classList: ["skill-icon-xs"],
                    attributes: [["src", getItemMedia(itemID)]]
                }), createElement("img", {
                    classList: ["skill-icon-xxs", "minibar-equipped", "d-none"],
                    attributes: [["src", "assets/media/main/tick.png"]],
                    id: `minibar-${itemID}-equipped`
                })],
                parent: itemContainer,
            });
            button.onclick = ()=>{
                quickEquipItem(itemID, skillID);
                button.blur();
            }
            ;
            let itemDescription = "";
            if (items[itemID].description !== undefined)
                itemDescription = items[itemID].description;
            const itemTooltip = tippy(button, {
                content: `<div class="text-center"><span class="text-warning">${items[itemID].name}</span><br><small>${itemDescription}<br><span class="text-info">${getLangString("MISC_STRING", "MINIBAR_0")}</span><br><span class="text-danger">${getLangString("MISC_STRING", "MINIBAR_1")}</span></small></div>`,
                placement: "left",
                allowHTML: true,
                interactive: false,
                animation: false,
            });
            tooltipInstances.minibar.push(itemTooltip);
        }
        );
        $("#minibar-milestones").attr("onClick", "updateMilestoneTab(" + skillID + "); this.blur();");
        $("#minibar-mastery").attr("onClick", "showMasteryUnlocks(" + skillID + "); this.blur();");
        if (skillID === CONSTANTS.skill.Magic)
            $("#minibar-mastery").addClass("d-none");
        else
            $("#minibar-mastery").removeClass("d-none");
        let pet = false;
        for (let i = 0; i < PETS.length; i++) {
            if (PETS[i].skill === skillID && petUnlocked[i]) {
                $("#minibar-pet").html(`<img class="skill-icon-xs" src="${PETS[i].media}">`);
                $("#minibar-pet").attr("onClick", "petPet(" + i + "); this.blur();");
                $("#minibar-pet").removeClass("d-none");
                const tooltipPet = tippy("#minibar-pet", {
                    content: '<div class="text-center"><small class="text-success">' + getLangString("MENU_TEXT", "ACTIVE") + '</small><br><span class="text-warning">' + PETS[i].name + "</span><br><small>" + PETS[i].description + "</small></div>",
                    placement: "left",
                    allowHTML: true,
                    interactive: false,
                    animation: false,
                });
                tooltipInstances.minibar = tooltipInstances.minibar.concat(tooltipPet);
                pet = true;
                break;
            }
        }
        if (!pet)
            $("#minibar-pet").addClass("d-none");
        if (showSkillMinibar)
            $("#skill-footer-minibar-container").removeClass("d-none");
        updateMinibarEquippedIcon(skillID);
    } else {
        $("#skill-footer-minibar-container").addClass("d-none");
    }
}
function updateMinibarEquippedIcon(skillID) {
    const minibarItems = JSON.parse(JSON.stringify(customMinibarItems[skillID]));
    if (player.equipment.checkForItemID(CONSTANTS.item.Max_Skillcape))
        $("#minibar-max-cape-equipped").removeClass("d-none");
    else
        $("#minibar-max-cape-equipped").addClass("d-none");
    minibarItems.forEach((itemID)=>{
        if (player.equipment.checkForItemID(itemID))
            $("#minibar-" + itemID + "-equipped").removeClass("d-none");
        else
            $("#minibar-" + itemID + "-equipped").addClass("d-none");
    }
    );
    if (player.equipment.checkForItemID(skillcapeItems[skillID]))
        $("#minibar-skillcape-equipped").removeClass("d-none");
    else
        $("#minibar-skillcape-equipped").addClass("d-none");
}
function toggleSkillMinibar() {
    $("#skill-footer-minibar").toggleClass("d-none");
    $("#skill-footer-minibar-icon").toggleClass("si-arrow-up");
    $("#skill-footer-minibar-icon").toggleClass("si-arrow-down");
}
function quickEquipSkillcape(skill) {
    const itemID = skillcapeItems[skill];
    quickEquipItem(itemID, skill);
}
function quickEquipItem(itemID, skill) {
    const item = items[itemID];
    let quantity = getBankQty(itemID);
    const templateData = {
        itemName: items[itemID].name,
        quantity: `${quantity}`
    };
    if (quantity > 0) {
        if (!equipmentSlotData[item.validSlots[0]].allowQuantity)
            quantity = 1;
        player.equipItem(itemID, player.selectedEquipmentSet, "Default", quantity);
        if (player.equipment.checkForItemID(itemID)) {
            if (quantity > 1) {
                notifyPlayer(skill, templateLangString("TOASTS", "ITEM_QTY_EQUIPPED", templateData), "success");
            } else {
                notifyPlayer(skill, templateLangString("TOASTS", "ITEM_EQUIPPED", templateData), "success");
            }
        } else
            notifyPlayer(skill, templateLangString("TOASTS", "CANT_EQUIP_ITEM", templateData), "danger");
    } else if (player.equipment.checkForItemID(itemID))
        notifyPlayer(skill, templateLangString("TOASTS", "ITEM_ALREADY_EQUIPPED", templateData), "info");
    else
        notifyPlayer(skill, templateLangString("TOASTS", "ITEM_NOT_IN_BANK", templateData), "danger");
}
function setGamemode(gamemode) {
    $("#set-gamemode-" + currentGamemode).attr("class", "btn btn-outline-secondary");
    currentGamemode = gamemode;
    $("#set-gamemode-" + gamemode).attr("class", "btn btn-secondary");
    if (currentGamemode === 0)
        $("#set-gamemode-desc").html("<strong>Standard</strong>: The normal way to play the game. I suggest you start with this mode.");
    else if (currentGamemode === 1)
        $("#set-gamemode-desc").html("<strong>Hardcore</strong>: Account deleted upon death. No passive Hitpoint Regen. 90 bank slot limit. Bank slot tokens still work if limit reached. Harsher Combat penalties.");
}
function createMinibarSortable() {
    Sortable.create(document.getElementById("minibar-skill-item-container"), {
        group: "minibar",
        delay: 200,
        delayOnTouchOnly: getSortableDelayOnTouch(),
        onEnd: function(evt) {
            const skillID = PAGES[currentPage].skillID;
            customMinibarItems[skillID].splice(evt.newIndex, 0, customMinibarItems[skillID].splice(evt.oldIndex, 1)[0]);
            if (DEBUGENABLED) {
                console.log("END: NEW INDEX: " + evt.newIndex + " | OLD INDEX: " + evt.oldIndex);
                console.log(customMinibarItems[skillID]);
            }
        },
        onMove: function() {
            tippy.hideAll();
        },
        onChoose: function(evt) {
            tippy.hideAll();
        },
    });
}
function displayQuickItemEquip() {
    if (isMobile())
        $("#skill-footer-minibar-items-container").toggleClass("d-none");
}
function loadCharacterSelection(returnToGame=false) {
    inCharacterSelection = true;
    returnToGameAfterSubmission = returnToGame;
    for (let i = 0; i < 3; i++)
        $("#character-select-" + i).removeAttr("disabled");
    $("#character-selections").addClass("d-none");
    $("#m-page-loader-test").attr("class", "show");
    $("#character-selections").removeClass("d-none");
    $(".character-selection-toggle").addClass("d-none");
    $(".character-selection-login").addClass("d-none");
    $(".character-selection-toggle-loading").removeClass("d-none");
    $(".character-selection-toggle-loading").prop("disabled", "true");
    processLocalCharacters();
    checkConnectionToCloud();
}
function createCharacterSelectionBox(cloudSave, characterID, saveGame, oldFormat=false) {
    let testNotice = "";
    let saveType = getLangString("CHARACTER_SELECT", "31");
    let saveClass = "text-warning";
    if (isTest) {
        testNotice += `<h5 class='font-w700 font-size-sm text-danger mb-1'>TEST ACCOUNT</h5>`;
    }
    let timestamp = new Date(saveGame.saveTimestamp).toLocaleString() + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    const gamemode = saveGame.currentGamemode;
    const usernameFromSave = saveGame.username;
    let btnDisabled = "";
    if ((gamemode === 1 || gamemode === 2) && afterCutOff() && isAdsPath())
        btnDisabled = "disabled";
    let totalLevelFromSave = saveGame.skillLevel;
    if (totalLevelFromSave !== undefined && totalLevelFromSave !== null)
        totalLevelFromSave = numberWithCommas(arrSum(totalLevelFromSave));
    else
        totalLevelFromSave = 0;
    let gpFromSave = numberWithCommas(saveGame.gp);
    let offlineTaskFromSave = saveGame.offline;
    let styleWidth = "85%";
    let showOptions = `onClick="openCharacterSelectionSettings(${characterID}, '${usernameFromSave}');"`;
    if (cloudSave) {
        saveType = getLangString("CHARACTER_SELECT", "32");
        saveClass = "text-success";
        showOptions = `disabled`;
    }
    let onClick = `selectCharacter(${characterID}, false, ${gamemode})`;
    if (gamemode === 3) {
        saveType += " (Discontinued)";
        onClick = `showDiscontinuedModal()`;
    }
    let characterNameFontSize = "font-size-lg";
    if (usernameFromSave.length >= 15)
        characterNameFontSize = "font-size-md";
    let html = "";
    html += `<div class="btn-group mt-1 mb-1 w-100" role="group" aria-label="Horizontal Primary" style="min-height:155px;">
				<button type="button" class="btn btn-lg ${GAMEMODES[gamemode].btnClass} p-1" style="width:30px">
					#${characterID + 1}
				</button>
				<button type="button" class="btn btn-lg ${GAMEMODES[gamemode].btnClass}" style="width:${styleWidth};" id="character-select-${characterID}" onClick="${onClick}" ${btnDisabled}>
					<div id="character-select-bg-${characterID}" class="bg-gamemode align-left" style="background-image: url('${GAMEMODES[gamemode].media}');"></div>
					<div class="col-12 pl-0" style="z-index: 20;">
						<div class="media d-flex align-items-center push">
							<div class="media-body text-center mr-2">
								${testNotice}
								<h5 class="font-w600 mb-1 pt-2 font-size-sm ${saveClass}">${saveType}</h5>
								<h5 class="font-w600 mb-2 ${characterNameFontSize} text-white">${usernameFromSave}</h5>
								<div role="separator" class="dropdown-divider"></div>
								<h5 class="font-w400 font-size-sm mb-0 text-white">${templateString(getLangString("CHARACTER_SELECT", "71"), {
        level: `${totalLevelFromSave}`
    })} <img class="skill-icon-xs mr-1 ml-3" src="${CDNDIR}assets/media/main/coins.svg"> ${templateLangString("MENU_TEXT", "GP_AMOUNT", {
        gp: `${gpFromSave}`
    })}</h5>
						</div>
					</div>
					<div class="col-12 pl-0">`;
    if (offlineTaskFromSave !== null && offlineTaskFromSave !== undefined) {
        if (offlineTaskFromSave.skill !== null && offlineTaskFromSave.skill !== undefined && (offlineTaskFromSave.skill !== CONSTANTS.skill.Hitpoints || (offlineTaskFromSave.skill === CONSTANTS.skill.Hitpoints && saveGame.SETTINGS.general.enabledOfflineCombat))) {
            let icon;
            let description;
            if (offlineTaskFromSave.skill === CONSTANTS.skill.Hitpoints) {
                icon = `${CDNDIR}assets/media/skills/combat/combat.svg`;
                description = getLangString("PAGE_NAME", "13");
            } else {
                icon = cdnMedia(SKILLS[offlineTaskFromSave.skill].media);
                description = setToUppercase(SKILLS[offlineTaskFromSave.skill].name);
            }
            let currentTimestamp = new Date().getTime();
            const timeAwayDiff = currentTimestamp - offlineTaskFromSave.timestamp;
            const hours = timeAwayDiff / 1000 / 60 / 60;
            const timeAway = hours < 1 ? `${Math.floor(hours * 60)} minutes` : `${Math.floor(hours)} hours`;
            if (setLang === "en")
                html += `<h5 class="font-w400 font-size-sm mb-0 text-white text-center"><img class="skill-icon-xs mr-1" src="${icon}">${description} <span class="font-w400 font-size-xs">since ${timeAway} ago</span></h5>`;
            else
                html += `<h5 class="font-w400 font-size-sm mb-0 text-white text-center"><img class="skill-icon-xs mr-1" src="${icon}">${description} <span class="font-w400 font-size-xs">${formatAsTimePeriod(timeAwayDiff)}</span></h5>`;
        } else
            html += `<h5 class="font-w400 font-size-sm mb-0 text-danger text-center">${getLangString("CHARACTER_SELECT", "29")}</h5>`;
    }
    html += `</div>
					<div class="col-12 pl-0 mt-1">
						<h5 class="font-w400 font-size-xs mb-0 text-warning text-center">${getLangString("CHARACTER_SELECT", "30")} ${timestamp}</h5>
					</div>
				</div></button>
				<button type="button" class="btn btn-lg btn-alt-dark p-1 char-select-setting" ${showOptions}>
					<h5 class="font-w600 font-size-sm mb-0 text-alt-dark"><i class="fa fa-2x fa-user-cog m-2"></i><br>${getLangString("CHARACTER_SELECT", "35")}</h5>
				</button>
			</div>`;
    return html;
}
function showDiscontinuedModal() {
    SwalLocale.fire({
        title: getLangString("CHARACTER_SELECT", "99"),
        html: getLangString("CHARACTER_SELECT", "100"),
        icon: "error",
    });
}
function createNewCharacterElement(characterID=0) {
    let html = `<div class="btn-group mt-2 mb-2 pt-3 w-100" role="group" aria-label="Horizontal Primary">
				<button type="button" class="btn btn-lg btn-alt-success" style="width:80%;" onClick="changePageCharacterSelection(3);">
					<div class="media d-flex align-items-center push">
						<div class="mr-2">
							<img class="shop-img" src="assets/media/main/plus.svg">
						</div>
						<div class="media-body text-left mr-2">
							<h5 class="font-w600 mb-0 text-alt-success">${getLangString("CHARACTER_SELECT", "1")}</h5>
						</div>
					</div>
				</button>`;
    if (!isAdsPath() || !afterCutOff())
        html += `<button type="button" class="btn btn-lg btn-alt-dark char-select-setting" onClick="openImportSave(${characterID});">
					<h5 class="font-w600 font-size-sm mb-0 text-alt-dark"><i class="fa fa-2x fa-file-upload m-2"></i><br>${getLangString("CHARACTER_SELECT", "44")}</h5>
				</button>`;
    html += `</div>`;
    if (isAdsPath() && afterCutOff()) {
        html += `<button role="button" class="w-100 btn btn-lg btn-info mt-3" onClick="showPremiumLockedModal(-1,-1)">${getLangString("IAP", "BTN_MOBILE")}</button>`;
    }
    return html;
}
function compareSaveTimestamps() {
    let keyPrefix = "";
    if (isTest)
        keyPrefix = "MI-test-";
    let saveTimestamps = [];
    let localTimestamp = -1;
    let cloudTimestamp = -1;
    for (let i = 0; i < 5; i++) {
        let keyPrefix = getKeysForCharacter(i);
        if (doesLocalSaveExist(keyPrefix)) {
            const {saveGame, oldFormat} = getLocalSave(keyPrefix);
            let saveGameData = {};
            try {
                let save = localStorage.getItem(`${keyPrefix}saveGame`);
                saveGameData = getSaveFromString(save);
            } catch (e) {
                saveGameData.saveGame = {};
                saveGameData.saveGame.saveTimestamp = getItem(`${keyPrefix}saveTimestamp`);
            }
            if (saveGameData.saveGame["saveTimestamp"] !== null && saveGameData.saveGame["saveTimestamp"] !== undefined)
                localTimestamp = saveGameData.saveGame["saveTimestamp"];
        }
        if (playFabSaves[i] !== null && playFabSaves[i] !== "" && playFabSaves[i] !== undefined)
            cloudTimestamp = getItemFromSave(playFabSaves[i], "saveTimestamp");
        else if (storedCloudSaves[i] !== null && storedCloudSaves[i] !== "")
            cloudTimestamp = getItemFromSave(storedCloudSaves[i], "saveTimestamp");
        saveTimestamps.push({
            local: localTimestamp,
            cloud: cloudTimestamp
        });
    }
    return saveTimestamps;
}
var comparisonShown = false;
function displaySaveTimestampComparison() {
    let saveTimestamps = compareSaveTimestamps();
    if (PlayFabClientSDK.IsClientLoggedIn() && !comparisonShown) {
        comparisonShown = true;
        for (let i = 0; i < 5; i++) {
            if (saveTimestamps[i].local > 0 && saveTimestamps[i].cloud > 0) {
                if (currentView === 0) {
                    if (saveTimestamps[i].local >= saveTimestamps[i].cloud)
                        $("#character-select-" + i).append(`<h5 class="mt-2 mb-0 font-w600 font-size-sm p-1 bg-success rounded">${getLangString("CHARACTER_SELECT", "65")}</h5>`);
                    else
                        $("#character-select-" + i).append(`<h5 class="mt-2 mb-0 font-w600 font-size-sm p-1 bg-danger rounded">${getLangString("CHARACTER_SELECT", "66")}</h5>`);
                } else {
                    if (saveTimestamps[i].cloud >= saveTimestamps[i].local)
                        $("#character-select-" + i).append(`<h5 class="mt-2 mb-0 font-w600 font-size-sm p-1 bg-success rounded">${getLangString("CHARACTER_SELECT", "65")}</h5>`);
                    else
                        $("#character-select-" + i).append(`<h5 class="mt-2 mb-0 font-w600 font-size-sm p-1 bg-danger rounded">${getLangString("CHARACTER_SELECT", "66")}</h5>`);
                }
            }
        }
    }
}
function processLocalCharacters() {
    let charactersFound = [false, false, false, false, false];
    let html = `<button type="button" class="btn btn-lg btn-alt-primary mt-2 mb-2 w-100 d-none character-selection-toggle" onClick="toggleCharacterSelectionView();">${getLangString("CHARACTER_SELECT", "33")}</button>`;
    let emptySlot = -1;
    for (let i = 0; i < 5; i++) {
        const saveKey = getKeysForCharacter(i);
        if (doesLocalSaveExist(saveKey)) {
            const {saveGame, oldFormat} = getLocalSave(saveKey);
            html += createCharacterSelectionBox(false, i, saveGame, oldFormat);
            charactersFound[i] = true;
        } else if (emptySlot < 0) {
            emptySlot = i;
        }
    }
    if (charactersFound.includes(false))
        html += createNewCharacterElement(emptySlot);
    $("#character-selection-container").html(html);
    if (connectedToPlayFab)
        $(".character-selection-toggle").removeClass("d-none");
    $("#character-select-4");
    for (let i = 0; i < 5; i++) {
        $("#character-select-" + i).mouseover(function() {
            $("#character-select-bg-" + i).addClass("opacity-40");
        });
        $("#character-select-" + i).mouseleave(function() {
            $("#character-select-bg-" + i).removeClass("opacity-40");
        });
    }
}
function processCloudCharacters(charID, saveString) {
    let html = "";
    const saveGame = getSaveFromString(saveString).saveGame;
    html += createCharacterSelectionBox(true, charID, saveGame);
    $("#character-selection-container").append(html);
    for (let i = 0; i < 5; i++) {
        $("#character-select-" + i).mouseover(function() {
            $("#character-select-bg-" + i).addClass("opacity-40");
        });
        $("#character-select-" + i).mouseleave(function() {
            $("#character-select-bg-" + i).removeClass("opacity-40");
        });
    }
}
function localiseSwal2() {
    if (setLang !== "en") {
        $(".swal2-confirm").text(getLangString("MENU_TEXT", "CONFIRM"));
        $(".swal2-cancel").text(getLangString("CHARACTER_SELECT", "45"));
    }
}
function resetCharacterSelection(charID) {
    $("#character-select-" + charID).html('<h5 class="font-w600 text-character-select">New Character</h5><img class="skill-icon-md m-2" src="' + CDNDIR + 'assets/media/main/question.svg">');
}
function toggleCharacterSelectionView() {
    $("#character-select-box-0").toggleClass("border-success");
    $("#character-select-box-0").toggleClass("border-warning");
    $("#character-select-box-1").toggleClass("border-success");
    $("#character-select-box-1").toggleClass("border-warning");
    $("#character-select-box-2").toggleClass("border-success");
    $("#character-select-box-2").toggleClass("border-warning");
    comparisonShown = false;
    if (currentView === 0) {
        currentView = 1;
        $("#character-selection-container").html(`<button type="button" class="btn btn-lg btn-alt-primary mt-2 mb-2 w-100 character-selection-toggle" onClick="toggleCharacterSelectionView();">${getLangString("CHARACTER_SELECT", "33")}</button>`);
        $(".character-selection-toggle").text(getLangString("CHARACTER_SELECT", "34"));
        for (let i = 0; i < 5; i++) {
            if (playFabSaves[i] !== null && playFabSaves[i] !== "" && playFabSaves[i] !== undefined)
                processCloudCharacters(i, playFabSaves[i]);
            else if (storedCloudSaves[i] !== null && storedCloudSaves[i] !== "")
                processCloudCharacters(i, storedCloudSaves[i]);
            else
                resetCharacterSelection(i);
        }
        displaySaveTimestampComparison();
    } else {
        currentView = 0;
        $(".character-selection-toggle").text(getLangString("CHARACTER_SELECT", "33"));
        processLocalCharacters();
        displaySaveTimestampComparison();
    }
}
let creatingAccount = false;
const selectCharacter = function(char, confirmed=false) {
    if (!characterLoading) {
        characterLoading = true;
        if (currentCharacter !== char)
            dataDeleted = true;
        else
            dataDeleted = false;
        if (currentView === 0) {
            if (!confirmed && PlayFabClientSDK.IsClientLoggedIn() && autoSaveCloud) {
                let timeStamp = -1;
                let dateText = "???";
                let keyPrefix = getKeysForCharacter(char);
                if (doesLocalSaveExist(keyPrefix)) {
                    const {saveGame, oldFormat} = getLocalSave(keyPrefix);
                    if (saveGame["saveTimestamp"] !== null && saveGame["saveTimestamp"] !== undefined)
                        timeStamp = saveGame["saveTimestamp"];
                }
                if (timeStamp > 0) {
                    if (setLang === "en")
                        dateText = new Date(timeStamp).toDateString() + " " + new Date(timeStamp).toLocaleTimeString() + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
                    else
                        dateText = new Date(timeStamp).toLocaleString(setLang);
                }
                SwalLocale.fire({
                    title: getLangString("CHARACTER_SELECT", "67"),
                    html: `<span class='text-dark'>${getLangString("CHARACTER_SELECT", "69")}</span><br><br><h5 class="font-w600 mb-1">${getLangString("CHARACTER_SELECT", "30")} </h5><span class="text-warning">${dateText}</span>`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: getLangString("MENU_TEXT", "CONFIRM"),
                }).then((result)=>{
                    if (result.value) {
                        currentCharacter = char;
                        dataDeleted = false;
                        characterLoading = false;
                        selectCharacter(char, true);
                    } else {
                        characterLoading = false;
                        dataDeleted = false;
                    }
                }
                );
            } else {
                for (let i = 0; i < 5; i++) {
                    if (char === i) {
                        $("#character-select-" + char).html('<div class="spinner-border spinner-border-sm text-primary skill-icon-md mr-2" role="status"></div>');
                    } else {
                        $("#character-select-" + i).prop("disabled", true);
                        $("#character-select-box-" + i).prop("disabled", true);
                    }
                }
                $(".char-select-setting").prop("disabled", true);
                currentCharacter = char;
                updateKeys();
                if (doesLocalSaveExist(getKeysForCharacter(char)) || creatingAccount) {
                    if (forceReload === undefined)
                        setForceReload(currentCharacter, true);
                    else
                        finaliseLoad();
                } else {
                    setupNewCharacter();
                }
            }
        } else {
            if (!confirmed) {
                let ts = -1;
                let save = playFabSaves[char];
                let saveGameData = getSaveFromString(save);
                if (saveGameData.saveGame["saveTimestamp"] !== null && saveGameData.saveGame["saveTimestamp"] !== undefined)
                    ts = saveGameData.saveGame["saveTimestamp"];
                if (ts > 0)
                    ts = new Date(ts).toDateString() + " " + new Date(ts).toLocaleTimeString() + " " + Intl.DateTimeFormat().resolvedOptions().timeZone;
                SwalLocale.fire({
                    title: getLangString("CHARACTER_SELECT", "68"),
                    html: `<span class='text-dark'>${getLangString("CHARACTER_SELECT", "70")}</span><br><br><h5 class="font-w600 mb-1">Last Saved:</h5><span class="text-warning">${ts}</span>`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: getLangString("MENU_TEXT", "CONFIRM"),
                }).then((result)=>{
                    if (result.value) {
                        currentCharacter = char;
                        dataDeleted = false;
                        characterLoading = false;
                        inCharacterSelection = false;
                        selectCharacter(char, true);
                    } else {
                        characterLoading = false;
                        dataDeleted = false;
                        inCharacterSelection = true;
                    }
                }
                );
            } else {
                for (let i = 0; i < 5; i++) {
                    if (char === i)
                        $("#character-select-" + char).html('<div class="spinner-border spinner-border-sm text-primary skill-icon-md mr-2" role="status"></div>');
                    else {
                        $("#character-select-" + i).prop("disabled", true);
                        $("#character-select-box-" + i).prop("disabled", true);
                    }
                }
                $(".char-select-setting").prop("disabled", true);
                currentCharacter = char;
                updateKeys();
                if (playFabSaves[char] !== null) {
                    setCharacterToSave(char, playFabSaves[char]);
                    if (forceReload === undefined)
                        setForceReload(currentCharacter, true);
                    else
                        finaliseLoad();
                } else {
                    $("#m-page-loader-test").attr("class", "d-none");
                    setForceReload(currentCharacter, true);
                    deleteData();
                    dataDeleted = true;
                    $("#modal-account-create").modal("show");
                }
            }
        }
    }
};
function resetAccountData() {
    if (GAMEMODES[currentGamemode].isPermaDeath) {
        resetVariablesToDefault();
        lolYouDiedGetRekt = true;
        confirmationOnClose = false;
        deleteData();
        dataDeleted = true;
        if (connectedToPlayFab)
            deletePlayFabSave();
        if (connectedToCloud)
            deleteCloudSave();
        else
            location.reload();
    }
}
function rollForRhaelyx(skill, offline=false, rewards=undefined) {
    let gemSkills = [CONSTANTS.skill.Firemaking, CONSTANTS.skill.Cooking, CONSTANTS.skill.Smithing, CONSTANTS.skill.Fletching, CONSTANTS.skill.Crafting, CONSTANTS.skill.Runecrafting, CONSTANTS.skill.Herblore, CONSTANTS.skill.Summoning];
    let circletSkills = [CONSTANTS.skill.Woodcutting, CONSTANTS.skill.Fishing, CONSTANTS.skill.Mining, CONSTANTS.skill.Thieving, CONSTANTS.skill.Farming, CONSTANTS.skill.Agility, CONSTANTS.skill.Astrology];
    let baseDropRate = items[CONSTANTS.item.Crown_of_Rhaelyx].baseDropRate;
    let maxDropRate = items[CONSTANTS.item.Crown_of_Rhaelyx].maxDropRate;
    let dropRate = baseDropRate + arrSum(currentMastery) * 0.00000004;
    if (dropRate > maxDropRate)
        dropRate = maxDropRate;
    dropRate *= 1 + playerModifiers.increasedOffItemChance / 100;
    if (gemSkills.includes(skill) && rollPercentage(dropRate)) {
        if (rewards !== undefined) {
            rewards.addItem(CONSTANTS.item.Jewel_of_Rhaelyx, 1);
        } else if (!offline)
            addItemToBank(CONSTANTS.item.Jewel_of_Rhaelyx, 1);
        else
            return CONSTANTS.item.Jewel_of_Rhaelyx;
    }
    if (circletSkills.includes(skill) && rollPercentage(dropRate)) {
        if (rewards !== undefined) {
            rewards.addItem(CONSTANTS.item.Circlet_of_Rhaelyx, 1);
        } else if (!offline)
            addItemToBank(CONSTANTS.item.Circlet_of_Rhaelyx, 1);
        else
            return CONSTANTS.item.Circlet_of_Rhaelyx;
    }
    let chargeDropRate = items[CONSTANTS.item.Mysterious_Stone].dropRate;
    chargeDropRate *= 1 + playerModifiers.increasedOffItemChance / 100;
    if (game.stats.itemFindCount(Items.Crown_of_Rhaelyx) > 0 && (circletSkills.includes(skill) || gemSkills.includes(skill)) && rollPercentage(chargeDropRate)) {
        if (rewards !== undefined) {
            rewards.addItem(CONSTANTS.item.Mysterious_Stone, 1);
        } else if (!offline)
            addItemToBank(CONSTANTS.item.Mysterious_Stone, 1);
        else
            return CONSTANTS.item.Mysterious_Stone;
    }
    return false;
}
function removeChargeRhaelyx(isOffline=false) {
    if (player.equipment.checkForItemID(CONSTANTS.item.Crown_of_Rhaelyx) && rollPercentage(0.1)) {
        const bankID = getBankId(CONSTANTS.item.Charge_Stone_of_Rhaelyx);
        if (bankID >= 0)
            updateItemInBank(bankID, CONSTANTS.item.Charge_Stone_of_Rhaelyx, -1, false, isOffline);
    }
}
function initTooltips() {
    tippy(".astrology-stardust-0", {
        content: getItemName(CONSTANTS.item.Stardust),
        placement: "top",
        interactive: false,
        animation: false,
    });
    tippy(".astrology-stardust-1", {
        content: getItemName(CONSTANTS.item.Golden_Stardust),
        placement: "top",
        interactive: false,
        animation: false,
    });
    tippy(".mastery-icon", {
        content: getLangString("MENU_TEXT", "MASTERY"),
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy(".melee-icon", {
        content: getLangString("COMBAT_MISC", "MELEE"),
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy(".ranged-icon", {
        content: SKILLS[Skills.Ranged].name,
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy(".magic-icon", {
        content: SKILLS[Skills.Magic].name,
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy(".prayer-icon", {
        content: SKILLS[Skills.Prayer].name,
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy(".prayer-points-icon", {
        content: `<small>${getLangString("COMBAT_MISC", "16")}<br>${getLangString("COMBAT_MISC", "GAINED_FROM_BURYING")}</small>`,
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy(".slayer-icon", {
        content: SKILLS[Skills.Slayer].name,
        placement: "bottom",
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-0", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_0") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-1", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_1") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-2", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_3") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-3", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_2") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-4", {
        content: `<div class='text-center'>${getLangString("COMBAT_MISC", "MENU_6")}</div>`,
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-5", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_5") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy("#combat-menu-item-6", {
        content: "<div class='text-center'>" + getLangString("COMBAT_MISC", "MENU_4") + "</div>",
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    Object.values(attackStyles).forEach((style)=>{
        tippy(`#${style.buttonID}`, {
            content: getAttackStyleTooltip(style),
            placement: "right",
            allowHTML: true,
            interactive: false,
            animation: false,
        });
    }
    );
    tippy(".mastery-pool-icon", {
        content: getLangString("MENU_TEXT", "MASTERY_POOL"),
        placement: "bottom",
        allowHTML: false,
        interactive: false,
        animation: false,
    });
    tippy(".w-1h", {
        content: getLangString("MENU_TEXT", "ONE_HANDED_WEAPON"),
        placement: "bottom",
        allowHTML: false,
        interactive: false,
        animation: false,
    });
    tippy(".w-2h", {
        content: getLangString("MENU_TEXT", "TWO_HANDED_WEAPON"),
        placement: "bottom",
        allowHTML: false,
        interactive: false,
        animation: false,
    });
    tippy("#last-cloud-save-question", {
        content: `<h5 class="font-w400 font-size-sm mb-1">${getLangString("MENU_TEXT", "CLOUD_INFO_TT_0")}<br><span class="text-warning">${getLangString("MENU_TEXT", "CLOUD_INFO_TT_1")}</span></h5>`,
        placement: "bottom",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    let showOnCreate = false;
    if (firstTimeLoad)
        showOnCreate = true;
    tippy(".summoning-combat-bar", {
        content: `<h5 class="font-w400 font-size-sm mb-1 text-center">${getLangString("COMBAT_MISC", "SUMMON_BAR_TT")}</h5>`,
        placement: "top",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy(".buff-preservation", {
        content: `<h5 class="font-w400 font-size-sm mb-1 text-warning text-center">${getLangString("MENU_TEXT", "TOOLTIP_PRESERVE")}</h5><h5 class="font-w400 font-size-sm mb-1 text-danger text-center">${templateString(getLangString("MENU_TEXT", "TOOLTIP_CAPPED"), {
            chance: "80"
        })}</h5><h5 class="font-w400 font-size-sm mb-1 text-center"><small>${getLangString("MENU_TEXT", "TOOLTIP_CHANCE_BELOW")}</small></h5><h5 class="font-w400 font-size-sm mb-1 text-center text-info"><small>In a future update, you will be able to see where your bonuses come from.</small></h5>`,
        placement: "top",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy(".buff-doubling", {
        content: `<h5 class="font-w400 font-size-sm mb-1 text-warning text-center">${getLangString("MENU_TEXT", "TOOLTIP_DOUBLE")}</h5><h5 class="font-w400 font-size-sm mb-1 text-danger text-center">${templateString(getLangString("MENU_TEXT", "TOOLTIP_CAPPED"), {
            chance: "100"
        })}</h5><h5 class="font-w400 font-size-sm mb-1 text-center"><small>${getLangString("MENU_TEXT", "TOOLTIP_CHANCE_BELOW")}</small></h5><h5 class="font-w400 font-size-sm mb-1 text-center text-info"><small>${getLangString("MENU_TEXT", "TOOLTIP_FUTURE_UPDATE")}</small></h5>`,
        placement: "top",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
    tippy(".interval-icon", {
        content: `<h5 class="font-w400 font-size-sm mb-1 text-warning text-center">${getLangString("MENU_TEXT", "TOOLTIP_INTERVAL")}</h5>`,
        placement: "top",
        allowHTML: true,
        interactive: false,
        animation: false,
    });
}
function finaliseLoad() {
    let fromOldSave = false;
    if (!creatingAccount) {
        fromOldSave = loadData();
    }
    updateWindow();
    if (!isLoaded)
        throw new Error("updateWindow failed.");
    if (fromOldSave) {
        saveData();
        removeSaveOld(key);
    }
    $("#m-page-loader-test").attr("class", "d-none");
    updateOffline().then(()=>{
        game.startMainLoop();
        confirmedLoaded = true;
    }
    );
}
function setupNewCharacter() {
    characterLoading = false;
    setGamemode(0);
    if (!confirmedLoaded) {
        $("#character-creation").removeClass("d-none");
    } else
        $("#modal-account-create").modal("show");
}
function checkMediaQuery(mediaQuery) {
    let mq = window.matchMedia(mediaQuery);
    if (mq.matches)
        return true;
    return false;
}
function viewGameGuide(pageID=-1) {
    if (pageID < 0)
        pageID = currentPage;
    if (pageID === Pages.Astrology || pageID === Pages.Shop || pageID === Pages.CompletionLog)
        return;
    if (pageID === Pages.Christmas2021)
        return;
    for (let i = 0; i < Object.keys(PAGES).length; i++) {
        $("#tutorial-page-" + i).addClass("d-none");
        $("#tutorial-page-" + i + "-1").addClass("d-none");
    }
    if (setLang === "en")
        $("#tutorial-page-" + pageID).removeClass("d-none");
    else
        $("#tutorial-page-" + pageID + "-1").removeClass("d-none");
    if (!tutorialComplete && pageID === 13)
        updateTutorialTaskProgress({}, {}, {
            name: "Combat Game Guide",
            qty: 1
        });
    $("#modal-game-guide").modal("show");
}
function generateGaussianNumber($mean, $stdDev) {
    const $randNumA = Math.random();
    const $randNumB = Math.random();
    const $randNumNorm = Math.sqrt(-2.0 * Math.log($randNumA)) * Math.cos(2.0 * 3.141592653589793238462643383279502884197169399375 * $randNumB);
    return $mean + $stdDev * $randNumNorm;
}
function getMean(numActions, probability) {
    return numActions * probability;
}
function getStdDev(numActions, probability) {
    return Math.sqrt(numActions * probability * (1 - probability));
}
function getMasteryTokenChance(skill) {
    let chance = getTotalUnlockedItems(skill) / 18500;
    chance *= 1 + playerModifiers.increasedOffItemChance / 100;
    return chance;
}
function dropRingHalfAChance(levelReq) {
    let chanceForRing = levelReq / 16500000;
    chanceForRing *= 1 + playerModifiers.increasedOffItemChance / 100;
    return chanceForRing;
}
function getRhaelyxChance() {
    let baseDropRate = items[CONSTANTS.item.Crown_of_Rhaelyx].baseDropRate;
    let maxDropRate = items[CONSTANTS.item.Crown_of_Rhaelyx].maxDropRate;
    let dropRate = baseDropRate + arrSum(currentMastery) * 0.00000004;
    if (dropRate > maxDropRate)
        dropRate = maxDropRate;
    dropRate *= 1 + playerModifiers.increasedOffItemChance / 100;
    return dropRate / 100;
}
function getRhaelyxStoneChance() {
    if (game.stats.itemFindCount(Items.Crown_of_Rhaelyx) > 0) {
        let chargeDropRate = items[CONSTANTS.item.Mysterious_Stone].dropRate;
        chargeDropRate *= 1 + playerModifiers.increasedOffItemChance / 100;
        return chargeDropRate / 100;
    } else
        return 0;
}
function getRhaelyxPiece(skill) {
    let gemSkills = [CONSTANTS.skill.Firemaking, CONSTANTS.skill.Cooking, CONSTANTS.skill.Smithing, CONSTANTS.skill.Fletching, CONSTANTS.skill.Crafting, CONSTANTS.skill.Runecrafting, CONSTANTS.skill.Herblore, CONSTANTS.skill.Summoning];
    let circletSkills = [CONSTANTS.skill.Woodcutting, CONSTANTS.skill.Fishing, CONSTANTS.skill.Mining, CONSTANTS.skill.Thieving, CONSTANTS.skill.Farming, CONSTANTS.skill.Agility, CONSTANTS.skill.Astrology];
    if (gemSkills.includes(skill)) {
        return CONSTANTS.item.Jewel_of_Rhaelyx;
    } else if (circletSkills.includes(skill)) {
        return CONSTANTS.item.Circlet_of_Rhaelyx;
    }
}
function getPetChance(petID, timePerAction, forceSkill=false) {
    let skill = PETS[petID].skill;
    if (forceSkill !== false)
        skill = forceSkill;
    return ((timePerAction / 1000) * exp.xp_to_level(skillXP[skill])) / 25000000;
}
function openNextModal() {
    if (modalQueue.length && !(modalIsOpen || Swal.isVisible())) {
        SwalLocale.fire(modalQueue[0]).then((result)=>{
            if (result.isConfirmed) {
                modalIsOpen = false;
                openNextModal();
            }
        }
        );
        modalQueue.splice(0, 1);
        modalIsOpen = true;
    } else if (!modalQueue.length)
        modalIsOpen = false;
}
function addModalToQueue(modal) {
    modalQueue.push(modal);
    openNextModal();
}
function getItemMedia(itemID) {
    let media;
    if (items[itemID].hasAnimation)
        media = items[itemID].mediaAnimation;
    else
        media = items[itemID].media;
    if (useCDN)
        media = CDNDIR + media;
    return media;
}
function getItemMediaAlt(itemID) {
    let media;
    if (items[itemID].hasAnimation)
        media = items[itemID].mediaAnimation;
    else
        media = items[itemID].mediaAlt;
    if (useCDN)
        media = CDNDIR + media;
    return media;
}
function getMiscMedia(localURL) {
    return CDNDIR + localURL;
}
function setDiscordRPCDetails() {}
function initSteam() {
    if (location.origin === "https://steam.melvoridle.com") {
        if (parent.greenworks.initAPI() && parent.greenworks.init())
            connectedToSteam = true;
        else
            console.log("There was an error connecting to Steam. Steam Achievement functionality will not work.");
        if (connectedToSteam)
            checkForSteamAchievements();
    }
}
function checkForSteamAchievements() {
    if (connectedToSteam) {
        let achievementNames = [];
        try {
            achievementNames = parent.greenworks.getAchievementNames();
            for (let i = steamAchievements.length; i < achievementNames.length; i++) {
                steamAchievements.push(0);
            }
        } catch (e) {
            console.log(e);
        }
        let max = true;
        let itemsFound = 0;
        let itemsTotal = items.length;
        let itemsPercentage, petsPercentage, masteryPercentage, monstersPercentage;
        let pets = 0;
        let monstersKilled = 0;
        let monstersTotal = MONSTERS.length;
        let petsTotal = PETS.length;
        for (let i = 0; i < achievementNames.length; i++) {
            switch (achievementNames[i]) {
            case "NEW_ACHIEVEMENT_1_0":
                if (steamAchievements[i] === 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_1":
                for (let f = 0; f < skillLevel.length; f++) {
                    if (skillLevel[f] > 1) {
                        unlockSteamAchievement(achievementNames[i], i);
                        break;
                    }
                }
                break;
            case "NEW_ACHIEVEMENT_1_2":
                for (let f = 0; f < petUnlocked.length; f++) {
                    if (petUnlocked[f]) {
                        unlockSteamAchievement(achievementNames[i], i);
                        break;
                    }
                }
                break;
            case "NEW_ACHIEVEMENT_1_3":
                for (let f = 0; f < skillLevel.length; f++) {
                    if (skillLevel[f] >= 99) {
                        unlockSteamAchievement(achievementNames[i], i);
                        break;
                    }
                }
                break;
            case "NEW_ACHIEVEMENT_1_4":
                if (Object.values(masteryCache).some((m)=>Object.values(m.levels).includes(99))) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_5":
                if (skillLevel[CONSTANTS.skill.Attack] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_6":
                if (skillLevel[CONSTANTS.skill.Strength] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_7":
                if (skillLevel[CONSTANTS.skill.Defence] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_8":
                if (skillLevel[CONSTANTS.skill.Hitpoints] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_9":
                if (skillLevel[CONSTANTS.skill.Ranged] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_10":
                if (skillLevel[CONSTANTS.skill.Magic] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_11":
                if (skillLevel[CONSTANTS.skill.Prayer] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_12":
                if (skillLevel[CONSTANTS.skill.Slayer] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_13":
                if (skillLevel[CONSTANTS.skill.Woodcutting] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_14":
                if (skillLevel[CONSTANTS.skill.Fishing] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_15":
                if (skillLevel[CONSTANTS.skill.Firemaking] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_16":
                if (skillLevel[CONSTANTS.skill.Cooking] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_17":
                if (skillLevel[CONSTANTS.skill.Mining] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_18":
                if (skillLevel[CONSTANTS.skill.Smithing] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_19":
                if (skillLevel[CONSTANTS.skill.Thieving] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_20":
                if (skillLevel[CONSTANTS.skill.Farming] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_21":
                if (skillLevel[CONSTANTS.skill.Fletching] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_22":
                if (skillLevel[CONSTANTS.skill.Crafting] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_23":
                if (skillLevel[CONSTANTS.skill.Runecrafting] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_24":
                if (skillLevel[CONSTANTS.skill.Herblore] >= 99) {
                    unlockSteamAchievement(achievementNames[i], i);
                    break;
                }
                break;
            case "NEW_ACHIEVEMENT_1_25":
                max = true;
                for (let f = 0; f < Object.keys(SKILLS).length; f++) {
                    if (skillLevel[f] < 99)
                        max = false;
                }
                if (max)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_26":
                itemsFound = 0;
                itemsTotal = items.length;
                for (let f = 0; f < items.length; f++) {
                    if (game.stats.itemFindCount(f) > 0 && !items[f].ignoreCompletion)
                        itemsFound++;
                    if (items[f].ignoreCompletion)
                        itemsTotal -= 1;
                }
                itemsPercentage = (itemsFound / itemsTotal) * 100;
                if (itemsPercentage >= 100)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_27":
                {
                    const hasAllPets = PETS.every((pet,id)=>{
                        return pet.ignoreCompletion || petUnlocked[id];
                    }
                    );
                    if (hasAllPets)
                        unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_1_28":
                masteryPercentage = (arrSum(currentMastery) / arrSum(totalMastery)) * 100;
                if (masteryPercentage >= 100)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_29":
                monstersKilled = 0;
                monstersTotal = MONSTERS.length;
                for (let f = 0; f < MONSTERS.length; f++) {
                    if (game.stats.monsterKillCount(f) > 0)
                        monstersKilled++;
                    if (MONSTERS[f].ignoreCompletion) {
                        monstersKilled -= 1;
                        monstersTotal -= 1;
                    }
                }
                monstersPercentage = (monstersKilled / monstersTotal) * 100;
                if (monstersPercentage >= 100)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_30":
                if (completionStats >= 100)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_1_31":
                if (game.stats.monsterKillCount(40) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_0":
                if (game.stats.monsterKillCount(61) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_1":
                if (game.stats.monsterKillCount(77) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_2":
                if (game.stats.monsterKillCount(80) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_3":
                if (game.stats.monsterKillCount(53) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_4":
                if (game.stats.monsterKillCount(43) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_5":
                if (game.stats.monsterKillCount(57) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_6":
                if (game.stats.monsterKillCount(109) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_7":
                if (game.stats.monsterKillCount(48) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_8":
                if (game.stats.monsterKillCount(49) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_9":
                if (game.stats.monsterKillCount(90) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_10":
                if (game.stats.monsterKillCount(96) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_11":
                if (game.stats.monsterKillCount(102) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_12":
                if (game.stats.monsterKillCount(108) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_13":
                if (game.stats.itemFindCount(Items.Amulet_of_Looting) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_14":
                if (game.stats.itemFindCount(Items.Fire_Cape) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_15":
                if (game.stats.itemFindCount(Items.Dragonfire_Shield) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_16":
                if (game.stats.itemFindCount(Items.Stormsnap) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_17":
                if (game.stats.itemFindCount(Items.Cloudburst_Staff) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_18":
                if (game.stats.itemFindCount(Items.Earth_Layered_Shield) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_19":
                if (game.stats.itemFindCount(Items.Big_Ron) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_20":
                if (game.stats.itemFindCount(Items.Lemon) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_21":
                if (game.stats.itemFindCount(Items.Ancient_Ring_Of_Skills) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_22":
                if (game.stats.itemFindCount(Items.Ancient_Ring_Of_Mastery) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_23":
                if (game.stats.itemFindCount(Items.Red_Party_Hat) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_24":
                if (getMaxBankSpace() >= 80 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_25":
                if (getMaxBankSpace() >= 100)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_26":
                if (getMaxBankSpace() >= 200)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_27":
                if (game.stats.Monsters.get(111, MonsterStats.KilledPlayer) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_28":
                if (game.stats.itemFindCount(69) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_29":
                break;
            case "NEW_ACHIEVEMENT_2_30":
                if (game.stats.itemFindCount(Items.Eight) > 0)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_2_31":
                if (skillLevel[CONSTANTS.skill.Attack] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_0":
                if (skillLevel[CONSTANTS.skill.Strength] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_1":
                if (skillLevel[CONSTANTS.skill.Defence] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_2":
                if (skillLevel[CONSTANTS.skill.Hitpoints] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_3":
                if (skillLevel[CONSTANTS.skill.Ranged] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_4":
                if (skillLevel[CONSTANTS.skill.Magic] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_5":
                if (skillLevel[CONSTANTS.skill.Prayer] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_6":
                if (skillLevel[CONSTANTS.skill.Slayer] >= 99 && currentGamemode === 1) {
                    unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_19":
                max = true;
                for (let f = 0; f < Object.keys(SKILLS).length; f++) {
                    if (skillLevel[f] < 99)
                        max = false;
                }
                if (max && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_20":
                itemsFound = 0;
                itemsTotal = items.length;
                for (let f = 0; f < items.length; f++) {
                    if (game.stats.itemFindCount(f) > 0 && !items[f].ignoreCompletion)
                        itemsFound++;
                    if (items[f].ignoreCompletion)
                        itemsTotal -= 1;
                }
                itemsPercentage = (itemsFound / itemsTotal) * 100;
                if (itemsPercentage >= 100 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_21":
                {
                    const hasAllPets = PETS.every((pet,id)=>{
                        return pet.ignoreCompletion || petUnlocked[id];
                    }
                    );
                    if (hasAllPets && currentGamemode === 1)
                        unlockSteamAchievement(achievementNames[i], i);
                }
                break;
            case "NEW_ACHIEVEMENT_3_22":
                masteryPercentage = (arrSum(currentMastery) / arrSum(totalMastery)) * 100;
                if (masteryPercentage >= 100 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_23":
                monstersKilled = 0;
                monstersTotal = MONSTERS.length;
                for (let f = 0; f < MONSTERS.length; f++) {
                    if (game.stats.monsterKillCount(f) > 0)
                        monstersKilled++;
                    if (MONSTERS[f].ignoreCompletion) {
                        monstersKilled -= 1;
                        monstersTotal -= 1;
                    }
                }
                monstersPercentage = (monstersKilled / monstersTotal) * 100;
                if (monstersPercentage >= 100 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_24":
                if (completionStats >= 100 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_25":
                if (game.stats.monsterKillCount(40) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_26":
                if (game.stats.monsterKillCount(61) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_27":
                if (game.stats.monsterKillCount(77) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_28":
                if (game.stats.monsterKillCount(80) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_29":
                if (game.stats.monsterKillCount(53) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_30":
                if (game.stats.monsterKillCount(43) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_3_31":
                if (game.stats.monsterKillCount(57) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_0":
                if (game.stats.monsterKillCount(109) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_1":
                if (game.stats.monsterKillCount(48) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_7":
                if (game.stats.monsterKillCount(49) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_3":
                if (game.stats.monsterKillCount(90) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_4":
                if (game.stats.monsterKillCount(96) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_5":
                if (game.stats.monsterKillCount(102) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_6":
                if (game.stats.monsterKillCount(108) > 0 && currentGamemode === 1)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            case "NEW_ACHIEVEMENT_4_12":
                if (skillLevel[CONSTANTS.skill.Agility] >= 99)
                    unlockSteamAchievement(achievementNames[i], i);
                break;
            }
        }
        let sLevel = 0;
        for (let i = 0; i < Object.keys(SKILLS).length; i++)
            sLevel += skillLevel[i];
        let gm = GAMEMODES[currentGamemode].name;
        parent.greenworks.setRichPresence("currentGamemode", gm);
        parent.greenworks.setRichPresence("skillLevel", "" + sLevel + "");
        parent.greenworks.setRichPresence("steam_display", "#Status_gamemodeSkillLevel");
    }
}
function unlockSteamAchievement(achievementName, i) {
    try {
        parent.greenworks.activateAchievement(achievementName, function() {});
        steamAchievements[i] = 1;
    } catch (e) {
        console.log(e);
    }
}
function resetSteamAchievements() {
    try {
        let achievementNames = parent.greenworks.getAchievementNames();
        steamAchievements = [];
        for (let i = 0; i < achievementNames.length; i++) {
            parent.greenworks.clearAchievement(achievementNames[i], function() {});
            steamAchievements.push(0);
        }
    } catch (e) {
        console.log(e);
    }
}
function cleanSaveFile() {
    for (let i = 0; i < skillXP.length; i++) {
        if (skillXP[i] === null || nextLevelProgress[i] < 0)
            skillXP[i] = exp.level_to_xp(skillLevel[i] + 1);
    }
    const defunctVars = ["farmingAreas", "killCount", "mbucks", "caseInventory", "totalMbucksSpent", "arcXP", "arcLevel", "arcNextLevelProgress", "easterEggs", "easterMaxScores", "totalEasterEggs", "autoSlayerTask", "slayerTaskCompetion"];
    defunctVars.forEach((varName)=>{
        if (getItem(`${key}${varName}`) !== null)
            removeItem(`${key}${varName}`);
    }
    );
    for (let i = 0; i < bank.length; i++) {
        if (bank[i].tab > 11)
            bank[i].tab = 0;
    }
}
function agreeToNotice(noticeID) {
    switch (noticeID) {
    case 0:
        $("#game-notice-0").addClass("d-none");
        $("#character-selection-container").removeClass("d-none");
        break;
    }
}
function checkForItemsToAddToBank() {
    if (game.stats.itemFindCount(Items.Futures_Prophecy) <= 0 && dungeonCompleteCount[CONSTANTS.dungeon.Volcanic_Cave] > 0)
        addItemToBank(CONSTANTS.item.Futures_Prophecy, 1, true, true, true);
    if (game.stats.itemFindCount(Items.Unknown_Evil) <= 0 && dungeonCompleteCount[CONSTANTS.dungeon.Fire_God_Dungeon] > 0)
        addItemToBank(CONSTANTS.item.Unknown_Evil, 1, true, true, true);
    if (game.stats.itemFindCount(Items.Beginning_Of_The_End) <= 0 && dungeonCompleteCount[CONSTANTS.dungeon.Into_the_Mist] > 0)
        addItemToBank(CONSTANTS.item.Beginning_Of_The_End, 1, true, true, true);
}
function animateProgress(div, interval, stayFull=true) {
    resetProgressAnimation(div);
    interval = interval / 1000;
    $(`#${div}`).css("-webkit-animation", "progressBar " + interval + "s linear");
    if (stayFull)
        $(`#${div}`).css("-webkit-animation-fill-mode", "both");
}
function resetProgressAnimation(div) {
    let el = document.getElementById(div);
    el.style.animation = "none";
    el.offsetHeight;
    el.style.animation = null;
    $(`#${div}`).css("-webkit-animation-fill-mode", "none");
    $(`#${div}`).css("width", "0%");
}
function rollPercentage(chance) {
    return chance > Math.random() * 100;
}
function applyModifier(baseStat, modifier, type=0) {
    if (type === 0)
        return Math.floor(baseStat * (1 + modifier / 100));
    else if (type === 1)
        return baseStat + modifier;
    else if (type === 2)
        return Math.floor(baseStat * (1 - modifier / 100));
}
function binomial_distribution(n, p, epsilon=0.00001) {
    let marginals = [];
    let sumOfMarginals = 0;
    let marginal = Math.pow(1 - p, n);
    let odds = p / (1 - p);
    sumOfMarginals += marginal;
    marginals.push(marginal);
    for (let k = 1; k <= n; ++k) {
        marginal *= odds;
        marginal *= (n - k + 1) / k;
        sumOfMarginals += marginal;
        marginals.push(marginal);
        if (1 - sumOfMarginals <= epsilon) {
            break;
        }
    }
    return marginals.map((x)=>x / sumOfMarginals);
}
function sample_from_binomial(numberTrials, chance) {
    let randNumA = Math.random();
    let binomial = binomial_distribution(numberTrials, chance);
    for (const [index,probabilityMass] of binomial.entries()) {
        randNumA -= probabilityMass;
        if (randNumA < 0) {
            return index;
        }
    }
    return binomial.length;
}
function calculateSkillInterval(skillID, baseInterval, action=0, useCharge=true) {
    let interval = baseInterval;
    let decreasedSkillIntervalPercent = getTotalFromModifierArray("decreasedSkillIntervalPercent", skillID);
    let increasedSkillIntervalPercent = getTotalFromModifierArray("increasedSkillIntervalPercent", skillID);
    let decreasedSkillInterval = getTotalFromModifierArray("decreasedSkillInterval", skillID);
    let increasedSkillInterval = getTotalFromModifierArray("increasedSkillInterval", skillID);
    interval = (interval * (1000 + 10 * increasedSkillIntervalPercent - 10 * decreasedSkillIntervalPercent)) / 1000;
    interval -= decreasedSkillInterval;
    interval += increasedSkillInterval;
    if (interval < 250)
        interval = 250;
    return Math.ceil(interval);
}
function calculateChanceToDouble(skill, isCombat=false, baseChance=0, masteryID=0, itemID=0, useCharge=true, interval=1000) {
    if (isCombat)
        baseChance += playerModifiers.increasedChanceToDoubleLootCombat - playerModifiers.decreasedChanceToDoubleLootCombat;
    else
        baseChance += playerModifiers.increasedChanceToDoubleItemsGlobal - playerModifiers.decreasedChanceToDoubleItemsGlobal;
    baseChance += getTotalFromModifierArray("increasedChanceToDoubleItemsSkill", skill) - getTotalFromModifierArray("decreasedChanceToDoubleItemsSkill", skill);
    if (skill === Skills.Farming) {
        baseChance += playerModifiers.increasedChanceDoubleHarvest - playerModifiers.decreasedChanceDoubleHarvest;
    }
    if (baseChance > 100)
        baseChance = 100;
    return baseChance;
}
function getNumberMultiplierValue(value) {
    numberMultiplier = GAMEMODES[currentGamemode].numberMultiplier;
    return value * numberMultiplier;
}
const afterCutOff = function() {
    return true;
};
const isAdsPath = function() {
    if (location.pathname.includes("index_ads.php"))
        return true;
    else
        return false;
};
const createGamemodeSelectionElements = function() {
    let html = "";
    for (let i = 0; i < Object.keys(GAMEMODES).length; i++) {
        let premiumHTML = "";
        let btnDisabled = "";
        if ((i === 1 || i === 2) && afterCutOff() && isAdsPath()) {
            premiumHTML = `<h5 class="font-w600 mb-1 pt-2 font-size-lg text-combat-smoke">${getLangString("CHARACTER_SELECT", "101")}</h5>`;
            btnDisabled = `disabled`;
        }
        if (GAMEMODES[i].endDate <= 0 || new Date().getTime() < GAMEMODES[i].endDate) {
            if (i > 0 && i < 2 && isAdsPath() && afterCutOff()) {
                html += `<button role="button" class="w-100 btn btn-lg btn-info mt-3 mb-3" onClick="showPremiumLockedModal(-1,-1)">${getLangString("IAP", "BTN_MOBILE")}</button>`;
            }
            html += `<div class="btn-group w-100 mt-2 mb-2" role="group" aria-label="Horizontal Primary">
					<button type="button" id="gamemode-select-btn-${i}" class="btn btn-lg ${GAMEMODES[i].btnClass}" style="width:100%;" onClick="setStartingGamemode(${i});" ${btnDisabled}>
						<div id="gamemode-select-bg-${i}" class="bg-gamemode align-right" style="background-image: url('${GAMEMODES[i].media}');"></div>
						<div class="media d-flex align-items-center push">
							<div class="media-body text-left mr-2">
								${premiumHTML}
								${getGamemodeEventStatus(i)}
								${getGamemodeName(i)}
								${getGamemodeSafety(i)}
								${getGamemodeDescription(i)}
								${getGamemodeSelectionRules(i)}
						</div>
					</button>
				</div>`;
        }
    }
    return html;
};
function getGamemodeSelectionRules(gamemode) {
    let html = "";
    for (let i = 0; i < GAMEMODES[gamemode].rules.length; i++)
        html += `<h5 class="font-w400 font-size-sm mb-0 text-white">> ${GAMEMODES[gamemode].rules[i]}</h5>`;
    return html;
}
function getGamemodeSafety(gamemode) {
    if (!GAMEMODES[gamemode].isPermaDeath)
        return `<h5 class="font-w700 font-size-sm mb-1 text-success">${getLangString("GAMEMODES", "GAMEMODE_MISC_0")}</h5>`;
    else
        return `<h5 class="font-w700 font-size-sm mb-1 text-danger">${getLangString("GAMEMODES", "GAMEMODE_MISC_1")}</h5>`;
}
function getGamemodeDescription(gamemode) {
    return `<h5 class="font-w400 font-size-sm mb-1 text-white">${GAMEMODES[gamemode].description}</h5>`;
}
function getGamemodeEventStatus(gamemode) {
    let html = "";
    if (GAMEMODES[gamemode].isEvent)
        html += `<span class="font-w700 font-size-sm p-1 m-1 bg-purple rounded text-white">Limited Event Mode</span>`;
    if (GAMEMODES[gamemode].endDate > 0) {
        let currentTime = new Date();
        let endTime = new Date(GAMEMODES[gamemode].endDate);
        let diff = new Date(endTime.getTime() - currentTime.getTime());
        let days = diff.getUTCDate() - 1;
        let hours = diff.getUTCHours();
        let minutes = diff.getUTCMinutes();
        html += `<span class="font-w400 font-size-sm text-white">${days}d ${hours}h ${minutes}m left to create</span>`;
    }
    return html;
}
function getGamemodeName(gamemode) {
    return `<h5 class="font-w600 mb-1 pt-2 font-size-lg ${GAMEMODES[gamemode].textClass}">${GAMEMODES[gamemode].name}</h5>`;
}
function deleteKeysFromObject(object) {
    Object.keys(object).forEach((el)=>{
        delete object[el];
    }
    );
}
function getAverage(elements=[]) {
    let sum = 0;
    for (let i = 0; i < elements.length; i++)
        sum += elements[i];
    return sum / elements.length;
}
function buildDataFromItemsArray() {
    allotmentSeeds = [];
    herbSeeds = [];
    treeSeeds = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].tier === "Allotment") {
            allotmentSeeds.push({
                itemID: i,
                level: items[i].farmingLevel
            });
        } else if (items[i].tier === "Herb") {
            herbSeeds.push({
                itemID: i,
                level: items[i].farmingLevel
            });
        } else if (items[i].tier === "Tree") {
            treeSeeds.push({
                itemID: i,
                level: items[i].farmingLevel
            });
        }
    }
}
function createItemRecipeElement(itemID, qty=0, elementID="", qtyStyle="bg-secondary", quickBuy=true, size=48, altArt=false) {
    let itemMedia;
    if (itemID === -1)
        itemMedia = CDNDIR + "assets/media/main/xp.svg";
    else if (itemID === -2)
        itemMedia = CDNDIR + "assets/media/main/mastery_header.svg";
    else if (itemID === -3)
        itemMedia = CDNDIR + "assets/media/main/mastery_pool.svg";
    else if (itemID === -4)
        itemMedia = CDNDIR + "assets/media/main/coins.svg";
    else if (itemID === -5)
        itemMedia = CDNDIR + "assets/media/main/slayer_coins.svg";
    else if (itemID === -6 && !altArt)
        itemMedia = CDNDIR + "assets/media/main/timer.svg";
    else if (itemID === -6 && altArt)
        itemMedia = CDNDIR + "assets/media/main/lemon_clock.png";
    else if (itemID === -7)
        itemMedia = CDNDIR + "assets/media/skills/hitpoints/hitpoints.svg";
    else if (itemID === -8)
        itemMedia = CDNDIR + "assets/media/main/question.svg";
    else if (altArt)
        itemMedia = getItemMediaAlt(itemID);
    else
        itemMedia = getItemMedia(itemID);
    const border = getItemRecipeBorder(qtyStyle);
    let imgStyle = "";
    if (border === "border-item-invalid")
        imgStyle = `style="margin:-1px!important;"`;
    if (Number.isInteger(qty))
        qty = numberWithCommas(qty);
    let shopImg = "";
    let shopOnClick = "";
    if (isItemInShop(itemID)[0] >= 0 && quickBuy) {
        shopImg = `<img class="skill-icon-xxs is-in-shop" src="assets/media/main/shop_header.svg">`;
        shopOnClick = `onClick="quickBuyItem(${itemID});"`;
    }
    let qtyElement = `<div class="font-size-sm text-white text-center">
						<small class="badge-pill ${qtyStyle} ${elementID}-qty" id="${elementID}-qty">${qty}</small>
					</div>`;
    if (qty < 0)
        qtyElement = "";
    let html = "";
    html += `<div class="bank-item no-bg btn-light pointer-enabled m-1 resize-${size} ${border} ${elementID}" id="${elementID}" ${shopOnClick}>
				<img class="bank-img p-2 resize-${size}" src="${itemMedia}" id="${elementID}-img" ${imgStyle}>
				${qtyElement}
				${shopImg}
			</div>`;
    return html;
}
function createMonsterLogElement(monsterID, elementID="", bossClass="-boss") {
    let monsterMedia;
    if (monsterID === -8)
        monsterMedia = CDNDIR + "assets/media/main/question.svg";
    else
        monsterMedia = getMonsterMedia(MONSTERS[monsterID]);
    let onClickEvent = "";
    if (monsterID >= 0 && game.stats.monsterKillCount(monsterID) > 0)
        onClickEvent = `onClick="viewMonsterStats(${monsterID});"`;
    let html = "";
    html += `<div class="monster-item${bossClass} no-bg btn-light pointer-enabled m-1 justify-vertical-center ${elementID}" id="${elementID}" ${onClickEvent}>
				<img class="combat-enemy-img-sm${bossClass} p-2" src="${monsterMedia}" id="${elementID}-img">
			</div>`;
    return html;
}
function createPetLogElement(petID, elementID="") {
    let petMedia;
    if (petID === -8)
        petMedia = CDNDIR + "assets/media/main/question.svg";
    else
        petMedia = PETS[petID].media;
    let onClickEvent = "";
    if (petID >= 0 && petUnlocked[petID])
        onClickEvent = `onClick="petPet(${petID});"`;
    let html = "";
    html += `<div class="monster-item no-bg btn-light pointer-enabled m-1 justify-vertical-center ${elementID}" id="${elementID}" ${onClickEvent}>
				<img class="combat-enemy-img-sm p-2" src="${petMedia}" id="${elementID}-img">
			</div>`;
    return html;
}
function getItemRecipeBorder(qtyStyle) {
    if (qtyStyle === "bg-danger")
        return "border-item-invalid";
    else
        return "";
}
function updateItemRecipeBorder(elementID, isInvalid=false) {
    if (!isInvalid) {
        $("#" + elementID).addClass("border-item-invalid");
        $("#" + elementID + "-img").attr("style", "margin: -1px!important");
        $("#" + elementID + "-qty").addClass("bg-danger");
        $("#" + elementID + "-qty").removeClass("bg-primary");
    } else {
        $("#" + elementID).removeClass("border-item-invalid");
        $("#" + elementID + "-img").attr("style", "");
        $("#" + elementID + "-qty").removeClass("bg-danger");
        $("#" + elementID + "-qty").addClass("bg-primary");
    }
}
function getCloudSaveHeartbeatInterval() {
    const initialInterval = 43200000;
    return initialInterval;
}
var progressBarTimer;
function startProgressBarTimer(interval) {
    progressBarTimer = setInterval(function() {
        $("#cut-tree-progress").css("width");
    }, 50);
}
const tenSeconds = 10000;
let tenSecondUpdateTimeout;
var gameVersionChecker = 0;
function updateEvery10Seconds() {
    clearTimeout(tenSecondUpdateTimeout);
    tenSecondUpdateTimeout = setTimeout(function() {
        saveData();
        if (connectedToPlayFab) {
            let currentTime = new Date().getTime();
            if (currentTime - lastLoginTimestamp >= 16 * 60 * 60 * 1000)
                playFabLoginWithCustomID(storedCloudSaves[9]);
            if (currentTime - lastSaveTimestamp >= autoCloudSaveInterval && autoSaveCloud) {
                forceSync(false, false);
                setAutoCloudSaveInterval();
            }
        }
        if (gameVersionChecker % 45 === 0) {
            if (connectedToPlayFab || connectedToPlayFabOffline)
                fetchLatestTitleNews();
            if (SETTINGS.general.pushNotificationOffline && offline.skill !== null)
                sendPushNotification(`offlineSkill`, templateLangString("PUSH_NOTIFICATIONS", "OFFLINE_CAP", {
                    username
                }), 64800000);
        }
        if (gameVersionChecker > 0)
            updateLastCloudSaveTimestamp();
        gameVersionChecker++;
        if (connectedToSteam) {
            let sLevel = 0;
            for (let i = 0; i < Object.keys(SKILLS).length; i++)
                sLevel += skillLevel[i];
            let gm = GAMEMODES[currentGamemode].name;
            parent.greenworks.setRichPresence("currentGamemode", gm);
            parent.greenworks.setRichPresence("skillLevel", "" + sLevel + "");
            parent.greenworks.setRichPresence("steam_display", "#Status_gamemodeSkillLevel");
            try {
                setDiscordRPCDetails();
            } catch (e) {}
        }
        updateTimeRemaining(0);
        updateTimeRemaining(1);
        updateTimeRemaining(2);
        updateEvery10Seconds();
    }, tenSeconds);
}
function viewMonsterStats(mID) {
    const enemyStatHTMLElements = {
        minHit: [],
        maxHit: [document.getElementById("modal-combat-enemy-strength-bonus")],
        accuracy: [document.getElementById("modal-combat-enemy-attack-bonus")],
        attackInterval: [document.getElementById("modal-combat-enemy-attack-speed")],
        damageReduction: [document.getElementById("modal-combat-enemy-damage-reduction")],
        evasion: {
            melee: [document.getElementById("modal-combat-enemy-defence-evasion")],
            ranged: [document.getElementById("modal-combat-enemy-ranged-evasion")],
            magic: [document.getElementById("modal-combat-enemy-magic-evasion")],
        },
        hitChance: [document.getElementById("modal-combat-enemy-chance-to-hit")],
        image: document.getElementById("modal-combat-enemy-img"),
        name: [document.getElementById("modal-combat-enemy-name")],
        attackName: [document.getElementById("modal-combat-enemy-attack-speed-desc")],
        attackType: [document.getElementById("modal-combat-enemy-attack-type")],
        maxHitpoints: [document.getElementById("modal-combat-enemy-hitpoints")],
        levelElements: {
            Combat: [document.getElementById("modal-combat-enemy-combat-level")],
            Attack: [document.getElementById("modal-combat-enemy-attack-level")],
            Strength: [document.getElementById("modal-combat-enemy-strength-level")],
            Defence: [document.getElementById("modal-combat-enemy-defence-level")],
            Ranged: [document.getElementById("modal-combat-enemy-ranged-level")],
            Magic: [document.getElementById("modal-combat-enemy-magic-level")],
            Hitpoints: [],
            Prayer: [],
        },
        locationElements: {
            image: document.getElementById("modal-combat-dungeon-img"),
            name: document.getElementById("modal-combat-dungeon-name"),
        },
    };
    let mStats = new Enemy(MONSTERS[mID],combatManager);
    enemyStatHTMLElements.evasion.melee.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.evasion.melee)));
    enemyStatHTMLElements.evasion.ranged.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.evasion.ranged)));
    enemyStatHTMLElements.evasion.magic.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.evasion.magic)));
    enemyStatHTMLElements.minHit.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.minHit)));
    enemyStatHTMLElements.maxHit.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.maxHit)));
    enemyStatHTMLElements.accuracy.forEach((elem)=>(elem.textContent = numberWithCommas(mStats.stats.accuracy)));
    enemyStatHTMLElements.attackInterval.forEach((elem)=>(elem.textContent = templateLangString("MENU_TEXT", "SECONDS_SHORT", {
        seconds: formatFixed(mStats.stats.attackInterval / 1000, 2)
    })));
    enemyStatHTMLElements.damageReduction.forEach((elem)=>(elem.textContent = formatPercent(mStats.stats.damageReduction)));
    enemyStatHTMLElements.maxHitpoints.forEach((elem)=>(elem.textContent = `${mStats.stats.maxHitpoints}`));
    enemyStatHTMLElements.name.forEach((elem)=>(elem.textContent = mStats.data.name));
    enemyStatHTMLElements.attackType.forEach((elem)=>(elem.src = mStats.getAttackTypeMedia(mStats.attackType)));
    enemyStatHTMLElements.levelElements.Combat.forEach((elem)=>(elem.textContent = `${getMonsterCombatLevel(mID)}`));
    enemyStatHTMLElements.levelElements.Attack.forEach((elem)=>(elem.textContent = `${mStats.levels.Attack}`));
    enemyStatHTMLElements.levelElements.Strength.forEach((elem)=>(elem.textContent = `${mStats.levels.Strength}`));
    enemyStatHTMLElements.levelElements.Defence.forEach((elem)=>(elem.textContent = `${mStats.levels.Defence}`));
    enemyStatHTMLElements.levelElements.Ranged.forEach((elem)=>(elem.textContent = `${mStats.levels.Ranged}`));
    enemyStatHTMLElements.levelElements.Magic.forEach((elem)=>(elem.textContent = `${mStats.levels.Magic}`));
    const image = document.createElement("img");
    image.src = getMonsterMedia(MONSTERS[mID]);
    image.classList.add("combat-enemy-img");
    enemyStatHTMLElements.image.textContent = "";
    enemyStatHTMLElements.image.append(image);
    let enemySpecs = new EnemyAttackPassiveMenu(false);
    enemySpecs.render(mStats.passives, mStats.availableAttacks, mStats);
    $("#modal-view-monster-info").modal("show");
}
var offlineCombatChecks = [false, false, false, false, false];
function showEnableOfflineCombatModal() {
    loadCurrentSettings();
    $("#modal-offline-combat-warning").modal("show");
}
function dismissOfflineCombatAlert() {
    $("#offline-combat-alert").addClass("d-none");
    localStorage.setItem("offlineCombatDismissed", "1");
}
function dismissOfflineThievingAlert() {
    $("#offline-thieving-alert").addClass("d-none");
    localStorage.setItem("offlineThievingDismissed", "1");
}
function toggleOfflineCombatCheckbox(id) {
    offlineCombatChecks[id] = $(`#cb-offline-combat-${id}`).prop("checked");
    updateEnableOfflineCombatBtn();
}
function updateEnableOfflineCombatBtn() {
    if (offlineCombatChecks.includes(false))
        $(`#cb-offline-combat-btn`).prop("disabled", true);
    else
        $(`#cb-offline-combat-btn`).prop("disabled", false);
}
function enableOfflineCombat() {
    if (offlineCombatChecks.includes(false))
        notifyPlayer(CONSTANTS.skill.Attack, getLangString("TOASTS", "OFFLINE_COMBAT_ENABLE_FAILURE"), "danger");
    else {
        SETTINGS.general.enabledOfflineCombat = true;
        $(`.settings-toggle-${41}`).prop("checked", SETTINGS.general.enabledOfflineCombat);
        saveData();
    }
}
function enableOfflineThieving() {
    changeSettingsToggle(4);
    $("#offline-thieving-alert").addClass("d-none");
}
function removeOnHoverQty(hoverElement) {
    $(`${hoverElement}`).off("mouseover");
    $(`${hoverElement}`).off("mouseleave");
}
function applyOnHoverQty(hoverElement, textElement, itemID=-1) {
    $(`${hoverElement}`).on("mouseover", function() {
        if (itemID >= 0)
            $(`${textElement}`).text(numberWithCommas(getBankQty(itemID)));
        else if (itemID === -4)
            $(`${textElement}`).text(numberWithCommas(gp));
        else if (itemID === -5)
            $(`${textElement}`).text(numberWithCommas(player.slayercoins));
    });
    $(`${hoverElement}`).on("mouseleave", function() {
        if (itemID >= 0)
            $(`${textElement}`).text(formatNumber(getBankQty(itemID)));
        else if (itemID === -4)
            $(`${textElement}`).text(formatNumber(gp));
        else if (itemID === -5)
            $(`${textElement}`).text(formatNumber(player.slayercoins));
    });
}
function getItemName(itemID) {
    return getLangString("ITEM_NAME", Items[itemID]);
}
function getMonsterName(mID) {
    return getLangString("MONSTER_NAME", mID);
}
function getPetName(pID) {
    return getLangString("PET_NAME", pID);
}
function getPageName(pID) {
    return getLangString("PAGE_NAME", pID);
}
var pyroInterval;
var forcePyro = false;
function showFireworks(force=false) {
    forcePyro = force;
    const pyro = `<div class="pyro">
					<div class="before"></div>
					<div class="after"></div>
				</div>`;
    $("body").append(pyro);
    startPyroInterval();
}
function removePyro() {
    $(".pyro").remove();
}
function startPyroInterval() {
    clearInterval(pyroInterval);
    pyroInterval = setInterval(function() {
        if (!Swal.isVisible() && !forcePyro) {
            removePyro();
            clearInterval(pyroInterval);
        }
    }, 1000);
}
function notify99ItemMastery(name, media) {
    Toastify({
        text: `<div class="block block-rounded-double bg-dark p-2">
					<div class="media d-flex align-items-center push">
						<div class="mr-2"><img class="skill-icon-md" src="${CDNDIR}assets/media/main/mastery_header.svg"></div>
						<div class="media-body text-left">
							<div class="font-w700 font-size-lg text-success">${getLangString("COMPLETION", "CONGRATS")}</div>
							<div class="font-size-sm">
								<img class="skill-icon-xs mr-1" src="${media}">${templateLangString("COMPLETION", "MASTERY_LEVEL_99", {
            itemName: name
        })}
							</div>
						</div>
					</div>
				</div>`,
        duration: 5000,
        gravity: "top",
        position: "center",
        backgroundColor: "transparent",
        stopOnFocus: false,
    }).showToast();
}
function notifySkillMastery(skill) {
    addModalToQueue({
        title: getLangString("COMPLETION", "CONGRATS"),
        html: `<h5 class="font-w400">${getLangString("MENU_TEXT", "ACHIEVED_100_MASTERY")}</h5><h2 class="text-warning font-w600"><img class="resize-40 mr-1" src="${SKILLS[skill].media}">${SKILLS[skill].name}</h2><h5 class="font-w400 font-size-sm mb-3">${getLangString("MENU_TEXT", "COMPLETION_PROGRESS")} <strong>${formatPercent(completionStats, 2)}</strong></h5>`,
        imageUrl: CDNDIR + "assets/media/main/mastery_header.svg",
        imageWidth: 64,
        imageHeight: 64,
        imageAlt: getLangString("MENU_TEXT", "100_PERCENT_MASTERY"),
    });
    showFireworks();
}
function notifyCompletionYay() {
    addModalToQueue({
        title: getLangString("COMPLETION", "CONGRATS"),
        html: `<h5 class="font-w600 text-success">${getLangString("MENU_TEXT", "ACHIEVED_COMPLETION")}</h5><h5 class="font-w400 font-size-sm">${getLangString("MENU_TEXT", "COMPLETION_MESSAGE")}</h5><h5 class="font-w400 font-size-sm">${getLangString("MENU_TEXT", "COMPLETION_BUY_CAPE")}</h5>`,
        imageUrl: CDNDIR + "assets/media/main/completion_log.svg",
        imageWidth: 128,
        imageHeight: 128,
        imageAlt: getLangString("MENU_TEXT", "100_PERCENT_COMPLETION"),
    });
    showFireworks();
}
function openDiscordLink() {
    if (location.origin === "https://steam.melvoridle.com") {
        try {
            parent.nw.Shell.openExternal("https://discord.gg/melvoridle");
        } catch (e) {
            console.warn("Unable to open Discord URL: " + e);
        }
    } else {
        window.open("https://discord.gg/melvoridle", "_blank").focus();
    }
}
function openWikiLink() {
    if (location.origin === "https://steam.melvoridle.com") {
        try {
            parent.nw.Shell.openExternal("https://wiki.melvoridle.com");
        } catch (e) {
            console.warn("Unable to open Wiki URL: " + e);
        }
    } else {
        window.open("https://wiki.melvoridle.com", "_blank").focus();
    }
}
function showPageLoader() {
    $("#m-page-loader").attr("class", "show");
}
let SwalLocale = Swal.mixin({
    didOpen: ()=>{
        localiseSwal2();
    }
    ,
    customClass: {
        container: "swal-infront",
        confirmButton: "btn btn-primary m-1",
        denyButton: "btn btn-secondary m-1",
        cancelButton: "btn btn-danger m-1",
    },
    buttonsStyling: false,
});
function isIOS() {
    return location.origin === "https://ios.melvoridle.com";
}
function isAndroid() {
    return location.origin === "https://android.melvoridle.com";
}
function isMobile() {
    return location.origin === "https://ios.melvoridle.com" || location.origin === "https://android.melvoridle.com";
}
function isSteam() {
    return location.origin === "https://steam.melvoridle.com";
}
var randomModifiers = {
    equipment: {},
    player: {}
};
function rollRandomModifiers(count=3, key, equipmentSlot=0) {
    if (key === "equipment") {
        if (randomModifiers.equipment[equipmentSlot] === undefined)
            randomModifiers.equipment[equipmentSlot] = {};
        deleteKeysFromObject(randomModifiers.equipment[equipmentSlot]);
    }
    let activeModifiers = filterBannedModifiers(Object.keys(modifierData));
    let rng = [];
    for (let i = 0; i < count; i++) {
        let rngMod = Math.floor(Math.random() * activeModifiers.length);
        let value;
        let maxValue = getRandomModifierMaxValue(count);
        if (modifierData[activeModifiers[rngMod]].length)
            value = [[Math.floor(Math.random() * 21), Math.floor(Math.random() * maxValue)]];
        else
            value = Math.floor(Math.random() * maxValue);
        if ((activeModifiers[rngMod] === "increasedMaxHitFlat" || activeModifiers[rngMod] === "increasedMaxHitpoints") && value > 10)
            value = 10;
        if ((activeModifiers[rngMod] === "decreasedMaxHitFlat" || activeModifiers[rngMod] === "decreasedMaxHitpoints") && value > 10)
            value = 10;
        rng.push({
            modifier: activeModifiers[rngMod],
            value: value
        });
        if (key === "equipment")
            randomModifiers.equipment[equipmentSlot][activeModifiers[rngMod]] = value;
    }
    return rng;
}
function getEquipmentCorruption(equipmentSlot) {
    let cost = getRandomModifierCost(equipmentSlot);
    if (gp >= cost && equippedItems[equipmentSlot] > 0) {
        gp -= cost;
        updateGP();
        let tier = getRandomModifierTier(equipmentSlot);
        let chanceToDestroy = getRandomModifiersDestroyChance(tier);
        if (rollPercentage(chanceToDestroy)) {
            let qty = getItemQtyRandomModifier(equippedItems[equipmentSlot]);
            if (qty[0] > 1) {
                if (equipmentSlot === CONSTANTS.equipmentSlot.Quiver && ammo > 1) {
                    ammo--;
                    equipmentSets[selectedEquipmentSet].ammo--;
                    updateAmmo();
                } else
                    updateItemInBank(qty[1], equippedItems[equipmentSlot], -1);
            } else {
                equippedItems[equipmentSlot] = 0;
                equipmentSets[selectedEquipmentSet].equipment[equipmentSlot] = 0;
                setEquipmentSet(selectedEquipmentSet);
            }
            updateRandomModifierInfo(equipmentSlot);
            notifyPlayer(CONSTANTS.skill.Attack, "Your item was destroyed :(", "danger");
        } else {
            let mods = rollRandomModifiers(tier, "equipment", equipmentSlot);
            updateHTMLRandomMod(equipmentSlot, mods);
        }
    }
}
function loadCorruption() {
    for (let i = 0; i < Object.keys(randomModifiers.equipment).length; i++) {
        let html = `<h5 class="font-w600 font-size-sm mb-2">Current Modifiers:</h5>`;
        for (let j = 0; j < Object.keys(randomModifiers.equipment[Object.keys(randomModifiers.equipment)[i]]).length; j++) {
            let modifier = printPlayerModifier(Object.keys(randomModifiers.equipment[Object.keys(randomModifiers.equipment)[i]])[j], randomModifiers.equipment[Object.keys(randomModifiers.equipment)[i]][Object.keys(randomModifiers.equipment[Object.keys(randomModifiers.equipment)[i]])[j]]);
            html += `<h5 class="font-w400 font-size-sm mb-1 ${modifier[1]}">${modifier[0]}</h5>`;
        }
        $("#corruption-equipment-slot-" + Object.keys(randomModifiers.equipment)[i]).html(html);
    }
}
function updateHTMLRandomMod(equipmentSlot, mods) {
    let html = `<h5 class="font-w600 font-size-sm mb-2">Current Modifiers:</h5>`;
    for (let i = 0; i < mods.length; i++) {
        if (mods[i].value.length)
            modifier = printPlayerModifier(mods[i].modifier, mods[i].value[0]);
        else
            modifier = printPlayerModifier(mods[i].modifier, mods[i].value);
        html += `<h5 class="font-w400 font-size-sm mb-1 ${modifier[1]}">${modifier[0]}</h5>`;
    }
    $("#corruption-equipment-slot-" + equipmentSlot).html(html);
    updatePlayerStats();
}
function getRandomModifiersDestroyChance(tier) {
    let chance = 0;
    if (tier >= 4)
        chance = 10;
    else if (tier >= 3)
        chance = 20;
    else if (tier >= 2)
        chance = 30;
    else if (tier >= 1)
        chance = 40;
    return chance;
}
function getRandomModifierMaxValue(tier) {
    let value = 0;
    if (tier >= 4)
        value = 100;
    else if (tier >= 3)
        value = 76;
    else if (tier >= 2)
        value = 51;
    else if (tier >= 1)
        value = 31;
    return value;
}
function getRandomModifierCost(equipmentSlot) {
    let cost = 0;
    if (equippedItems[equipmentSlot] <= 0)
        return cost;
    cost = items[equippedItems[equipmentSlot]].sellsFor;
    return cost;
}
function getRandomModifierTier(equipmentSlot) {
    let tier = 0;
    if (equippedItems[equipmentSlot] <= 0)
        return tier;
    if (items[equippedItems[equipmentSlot]].sellsFor >= 400000)
        tier = 4;
    else if (items[equippedItems[equipmentSlot]].sellsFor >= 10000)
        tier = 3;
    else if (items[equippedItems[equipmentSlot]].sellsFor >= 200)
        tier = 2;
    else
        tier = 1;
    return tier;
}
function updateRandomModifierInfo(equipmentSlot) {
    if (equippedItems[equipmentSlot] > 0) {
        let cost = getRandomModifierCost(equipmentSlot);
        let tier = getRandomModifierTier(equipmentSlot);
        let qty = getItemQtyRandomModifier(equippedItems[equipmentSlot]);
        $("#corruption-equipment-slot-" + equipmentSlot + "-img").attr("src", items[equippedItems[equipmentSlot]].media);
        $("#corruption-equipment-slot-" + equipmentSlot + "-info").html(`Qty: ${qty[0]} | Tier: ${tier}<br>Cost: <img src="assets/media/main/coins.svg" class="skill-icon-xs mr-2">${numberWithCommas(cost)}`);
    } else {
        $("#corruption-equipment-slot-" + equipmentSlot + "-img").attr("src", "assets/media/bank/" + emptyGear[equipmentSlot] + ".svg");
        $("#corruption-equipment-slot-" + equipmentSlot + "-info").html(`Equip an item pls`);
    }
}
function getItemQtyRandomModifier(itemID) {
    let qty = 1;
    let bankID = getBankId(itemID);
    if (bankID >= 0)
        qty += bank[bankID].qty;
    if (items[itemID].equipmentSlot === CONSTANTS.equipmentSlot.Quiver)
        qty += ammo - 1;
    return [qty, bankID];
}
function deleteKeysFromObject(object) {
    Object.keys(object).forEach((el)=>{
        delete object[el];
    }
    );
}
function activateChaosMode() {
    $("img").toggleClass("spinner-no-border");
}
function getPositiveModifiers() {
    let mods = [];
    Object.keys(modifierData).forEach((modifier)=>{
        if (!modifierData[modifier].isNegative)
            mods.push(modifier);
    }
    );
    mods = filterBannedModifiers(mods);
    return mods;
}
function filterBannedModifiers(modifiers) {
    const bannedModifiers = ["freeBonfires", "golbinRaidWaveSkipCostReduction", "golbinRaidIncreasedMaximumAmmo", "golbinRaidIncreasedMaximumRunes", "golbinRaidIncreasedMinimumFood", "golbinRaidIncreasedPrayerLevel", "golbinRaidIncreasedPrayerPointsStart", "golbinRaidIncreasedPrayerPointsWave", "golbinRaidIncreasedStartingRuneCount", "golbinRaidPassiveSlotUnlocked", "golbinRaidPrayerUnlocked", "golbinRaidStartingWeapon", "freeCompost", "decreasedSecondaryFoodBurnChance", "doubleItemsSkill", "allowSignetDrops", "meleeProtection", "rangedProtection", "magicProtection", "curseImmunity", "itemProtection", "autoLooting", "freeProtectItem", "stunImmunity", "sleepImmunity", "debuffImmunity", "burnImmunity", "poisonImmunity", "bleedImmunity", "increasedRebirthChance", "autoEquipFoodUnlocked", "autoSwapFoodUnlocked", "otherStyleImmunity", "meleeImmunity", "rangedImmunity", "magicImmunity", "slowImmunity", "frostBurnImmunity", "allowLootContainerStacking", "infiniteLootContainer", "summoningSynergy_0_14", "summoningSynergy_9_11", ];
    return modifiers.filter((el)=>!bannedModifiers.includes(el));
}
function createGameGuideNavElement(pageID) {
    let html = "";
    html += `<li class="nav-item d-md-flex flex-md-column">
				<button class="nav-link text-md-start text-left" id="gameguide-nav-${pageID}" onclick="viewGameGuide(${pageID});"><img class="skill-icon-xs mr-1" src="${PAGES[pageID].media}"> ${PAGES[pageID].name}</button>
			</li>`;
    return html;
}
function createGameGuideNav() {
    $("#gameguide-nav").html("");
    let html = "";
    Object.keys(PAGES).forEach((page,id)=>{
        if (PAGES[id].showInGameGuide)
            html += createGameGuideNavElement(id);
    }
    );
    $("#gameguide-nav").html(html);
}

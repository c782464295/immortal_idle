/* 下面这种写法同时将名字和ID写入 */
var Skills;
(function(Skills) {
	Skills[Skills["Woodcutting"] = 0] = "Woodcutting";
	Skills[Skills["Fishing"] = 1] = "Fishing";
	Skills[Skills["Firemaking"] = 2] = "Firemaking";
	Skills[Skills["Cooking"] = 3] = "Cooking";
	Skills[Skills["Mining"] = 4] = "Mining";
	Skills[Skills["Smithing"] = 5] = "Smithing";
	Skills[Skills["Attack"] = 6] = "Attack";
	Skills[Skills["Strength"] = 7] = "Strength";
	Skills[Skills["Defence"] = 8] = "Defence";
	Skills[Skills["Hitpoints"] = 9] = "Hitpoints";
	Skills[Skills["Thieving"] = 10] = "Thieving";
	Skills[Skills["Farming"] = 11] = "Farming";
	Skills[Skills["Ranged"] = 12] = "Ranged";
	Skills[Skills["Fletching"] = 13] = "Fletching";
	Skills[Skills["Crafting"] = 14] = "Crafting";
	Skills[Skills["Runecrafting"] = 15] = "Runecrafting";
	Skills[Skills["Magic"] = 16] = "Magic";
	Skills[Skills["Prayer"] = 17] = "Prayer";
	Skills[Skills["Slayer"] = 18] = "Slayer";
	Skills[Skills["Herblore"] = 19] = "Herblore";
	Skills[Skills["Agility"] = 20] = "Agility";
	Skills[Skills["Summoning"] = 21] = "Summoning";
	Skills[Skills["Astrology"] = 22] = "Astrology";
})(Skills || (Skills = {}));

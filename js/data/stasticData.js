'use strict'
export const GeneralStats = {
	"TotalGPEarned": 0,
	"TotalItemsSold": 1,
	"AccountCreationDate": 2,
	get: function (value) {
		return Object.keys(this).find(key => this[key] === value);
	}
}
export const WoodcuttingStats = {
	"Actions": 0,
	"TimeSpent": 1,
	"LogsCut": 2,
	"DoubleLogsCut": 3,
	"BirdNestsGotten": 4,
	get: function (value) {
		return Object.keys(this).find(key => this[key] === value);
	}
}
export const MiningStats = {
	"Actions": 0,
	"TimeSpent": 1,
	"OresGained": 2,
	"DoubleOresGained": 3,
	"GemsGained": 4,
	get: function (value) {
		return Object.keys(this).find(key => this[key] === value);
	}
}


export const ItemStats = {
	"TimesFound": 0,
	"TimesSold": 1,
	"GpFromSale": 2,
	"TimesLostToDeath": 3,
	"DamageTaken": 4,
	"DamageDealt": 5,
	"HealedFor": 6,
	"TotalAttacks": 7,
	"TimesDied": 8,
	"TimesOpened": 9,
	"MissedAttacks": 10,
	"TimesEaten": 11,
	"TotalAttacks": 12,
	"EnemiesKilled": 13,
	get: function (value) {
		return Object.keys(this).find(key => this[key] === value);
	}
}







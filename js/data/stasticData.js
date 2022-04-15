'use strict'
export const GeneralStats = {
    0:"TotalGPEarned",
	1:"TotalItemsSold",
	2:"AccountCreationDate",
	get:function(value) {
		if(typeof(value) == 'number') {
			return GeneralStats[value] ;
		}else{
			return Object.keys(GeneralStats).find(key => GeneralStats[key] === value);
		}
	}
}
export const WoodcuttingStats = {
    0:"Actions",
	1:"TimeSpent",
	2:"LogsCut",
    3:"DoubleLogsCut",
    4:"BirdNestsGotten",
	get:function(value) {
		if(typeof(value) == 'number') {
			return GeneralStats[value] ;
		}else{
			return Object.keys(GeneralStats).find(key => GeneralStats[key] === value);
		}
	}
}
export const MiningStats = {
    0:"Actions",
	1:"TimeSpent",
	2:"OresGained",
    3:"DoubleOresGained",
    4:"GemsGained",
	get:function(value) {
		if(typeof(value) == 'number') {
			return GeneralStats[value] ;
		}else{
			return Object.keys(GeneralStats).find(key => GeneralStats[key] === value);
		}
	}
}


export const ItemStats = {
    0:"TimesFound",
	1:"TimesSold",
	2:"GpFromSale",
    3:"TimesLostToDeath",
    4:"DamageTaken",
    5:"DamageDealt",
    6:"HealedFor",
    7:"TotalAttacks",
    8:"TimesDied",
    9:"TimesOpened",
    10:"MissedAttacks",
    11:"TimesEaten",
    12:"TotalAttacks",
    13:"EnemiesKilled",
	get:function(value) {
		if(typeof(value) == 'number') {
			return GeneralStats[value] ;
		}else{
			return Object.keys(GeneralStats).find(key => GeneralStats[key] === value);
		}
	}
}



    


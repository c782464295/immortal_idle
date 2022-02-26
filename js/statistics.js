class Statistics{
	constructor(){
		this.Woodcutting = new StatisticsTracker();
		this.Fishing = new StatisticsTracker();
		this.Firemaking = new StatisticsTracker();
    
    }
    serialize(){
        return {
            Woodcutting:this.Woodcutting.serialize(),
            Fishing:this.Fishing.serialize(),
            Firemaking:this.Firemaking.serialize(),
        }
    }
    deserialize(data){
        this.Woodcutting.deserialize(data['Woodcutting']);
        this.Fishing.deserialize(data['Fishing']);
        this.Firemaking.deserialize(data['Firemaking']);
    }
}


var WoodcuttingStats;
(function(WoodcuttingStats) {
	WoodcuttingStats[WoodcuttingStats["Actions"] = 0] = "Actions";
	WoodcuttingStats[WoodcuttingStats["TimeSpent"] = 1] = "TimeSpent";
	WoodcuttingStats[WoodcuttingStats["LogsCut"] = 2] = "LogsCut";
	WoodcuttingStats[WoodcuttingStats["BirdNestsGotten"] = 3] = "BirdNestsGotten";
})(WoodcuttingStats || (WoodcuttingStats = {}));
var FishingStats;
(function(FishingStats) {
	FishingStats[FishingStats["FishCaught"] = 0] = "FishCaught";
	FishingStats[FishingStats["JunkCaught"] = 1] = "JunkCaught";
	FishingStats[FishingStats["SpecialItemsCaught"] = 2] = "SpecialItemsCaught";
	FishingStats[FishingStats["TimeSpent"] = 3] = "TimeSpent";
	FishingStats[FishingStats["Actions"] = 4] = "Actions";
})(FishingStats || (FishingStats = {}));
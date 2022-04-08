'use strict'
import { loc } from './locale.js';
import { global } from './global.js';

/** 用以追踪所有统计数据 */
class StatisticsTracker {
    constructor() {
        this.statistics = new Map();
    }
    add(stat, value) {
        var a_;
        a_ = this.statistics.get(stat) ? this.statistics.get(stat) : 0;
        this.statistics.set(stat, a_ + value);
    }
    set(stat, value) {
        if (value) {
            this.statistics.set(stat, value);
        } else {
            this.statistics.delete(stat);
        }
    }
    inc(stat) {
        this.add(stat, 1);
    }
    get(stat) {
        var _a;
        return (_a = this.statistics.get(stat)) !== null && _a !== void 0 ? _a : 0;
    }
    toJSON() {
        return {
            statistics: [...this.statistics],
        }
    }

    serialize() {
        return JSON.stringify(this);
    }
    deserialize(data) {
        this.statistics.clear();
        //console.log(JSON.parse(data));
        JSON.parse(data)["statistics"].forEach((item, index, array) => {
            this.statistics.set(item[0], item[1]);
        })
    }

}

class MappedStatTracker {
    constructor() {
        this.statsMap = new Map();
    }
    add(id, statID, qty) {
        let tracker = this.statsMap.get(id);
        if (tracker === undefined) {
            tracker = new StatisticsTracker();
            this.statsMap.set(id, tracker);
        }
        tracker.add(statID, qty);
    }
    get(id, statID) {
        const tracker = this.statsMap.get(id);
        if (tracker === undefined) {
            return 0;
        }
        return tracker.get(statID);
    }
    getTracker(id) {
        return this.statsMap.get(id) || new StatTracker();
    }
    toJSON() {
        return {
            statistics: [...this.statsMap],
        }
    }
    serialize() {
        return JSON.stringify(this);
    }
    deserialize(data) {
        this.statsMap.clear();
        //console.log(JSON.parse(data));
        JSON.parse(data)["statistics"].forEach((item, index, array) => {

            let tracker = new StatisticsTracker();
            this.statsMap.set(item[0], tracker);

            let statsItem = item[1]["statistics"];
            console.log(statsItem);
            statsItem.forEach((stat, index, array) => {
                tracker.add(stat[0], stat[1]);
            })

        })
    }
}


class Statistics {
    constructor() {
        this.Mining = new StatisticsTracker();
        this.Woodcutting = new StatisticsTracker();
        this.Fishing = new StatisticsTracker();
        this.Firemaking = new StatisticsTracker();


        this.Gamestats = new StatisticsTracker();

        this.Items = new MappedStatTracker();

    }
    serialize() {
        return {
            Mining: this.Mining.serialize(),
            Woodcutting: this.Woodcutting.serialize(),
            Fishing: this.Fishing.serialize(),
            Firemaking: this.Firemaking.serialize(),

            Gamestats: this.Gamestats.serialize(),
            Items: this.Items.serialize(),
        }
    }
    deserialize(data) {
        this.Mining.deserialize(data['Mining']),
            this.Woodcutting.deserialize(data['Woodcutting']);
        this.Fishing.deserialize(data['Fishing']);
        this.Firemaking.deserialize(data['Firemaking']);

        this.Gamestats.deserialize(data['Gamestats']);
        this.Items.deserialize(data['Items']);
    }
}


let statistics = new Statistics();





const GameStats = {
    AccountCreationDate: 3,
    3: 'AccountCreationDate'
}


var MiningStats;
(function (MiningStats) {
    MiningStats[MiningStats["Actions"] = 0] = "Actions";
    MiningStats[MiningStats["EmptyOresMined"] = 1] = "EmptyOresMined";
    MiningStats[MiningStats["TimeSpent"] = 2] = "TimeSpent";
    MiningStats[MiningStats["OresGained"] = 3] = "OresGained";
    MiningStats[MiningStats["GemsGained"] = 4] = "GemsGained";
    MiningStats[MiningStats["RockHPPreserved"] = 5] = "RockHPPreserved";
    MiningStats[MiningStats["RocksDepleted"] = 6] = "RocksDepleted";
}
)(MiningStats || (MiningStats = {}));


var ItemStats;
(function (ItemStats) {
    ItemStats[ItemStats["TimesFound"] = 0] = "TimesFound";
    ItemStats[ItemStats["TimesSold"] = 1] = "TimesSold";
    ItemStats[ItemStats["GpFromSale"] = 2] = "GpFromSale";
    ItemStats[ItemStats["TimesLostToDeath"] = 3] = "TimesLostToDeath";
    ItemStats[ItemStats["DamageTaken"] = 4] = "DamageTaken";
    ItemStats[ItemStats["DamageDealt"] = 5] = "DamageDealt";
    ItemStats[ItemStats["MissedAttacks"] = 6] = "MissedAttacks";
    ItemStats[ItemStats["TimesEaten"] = 7] = "TimesEaten";
    ItemStats[ItemStats["HealedFor"] = 8] = "HealedFor";
    ItemStats[ItemStats["TotalAttacks"] = 9] = "TotalAttacks";
    ItemStats[ItemStats["AmountUsedInCombat"] = 10] = "AmountUsedInCombat";
    ItemStats[ItemStats["TimeWaited"] = 11] = "TimeWaited";
    ItemStats[ItemStats["TimesDied"] = 12] = "TimesDied";
    ItemStats[ItemStats["TimesGrown"] = 13] = "TimesGrown";
    ItemStats[ItemStats["HarvestAmount"] = 14] = "HarvestAmount";
    ItemStats[ItemStats["EnemiesKilled"] = 15] = "EnemiesKilled";
    ItemStats[ItemStats["TimesOpened"] = 16] = "TimesOpened";
    ItemStats[ItemStats["TimesTransformed"] = 17] = "TimesTransformed";
    ItemStats[ItemStats["TimesBuried"] = 18] = "TimesBuried";
}
)(ItemStats || (ItemStats = {}));

function getGameStatsTableData() {
    let data = {
        title:'游戏统计表',
        headings: [ '游戏时间', 'Place' ],
        rows: [[
            GameStats[GameStats.AccountCreationDate],
            ((Date.now() - statistics.Gamestats.get(GameStats.AccountCreationDate))/36e5).toFixed(2)
        ],
        [ '击杀怪物',
            '3000'
        ]]
    };
    return data;
}

export { statistics, GameStats, getGameStatsTableData };
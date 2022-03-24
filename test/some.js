const project = {
    satellite: {
        id: 'space-satellite',
        title: loc('space_home_satellite_title'),
        desc: loc('space_home_satellite_desc'),
        reqs: { space: 2 },
        cost: {
            Money(offset){ return spaceCostMultiplier('satellite', offset, 72000, 1.22); },
            Knowledge(offset){ return spaceCostMultiplier('satellite', offset, 28000, 1.22); },
            Oil(offset,wiki){ return spaceCostMultiplier('satellite', offset, fuel_adjust(3200,false,wiki), 1.22); },
            Alloy(offset){ return spaceCostMultiplier('satellite', offset, 8000, 1.22); }
        },
        effect(){
            let knowledge = global.race['cataclysm'] ? 2000 : 750;
            if (global.race['cataclysm'] && global.tech['supercollider']){
                let ratio = global.tech['particles'] && global.tech['particles'] >= 3 ? 5 : 10;
                knowledge *= (global.tech['supercollider'] / ratio) + 1;
            }
            let synergy = global.race['cataclysm'] ? `<div>${loc('space_home_satellite_effect2',[loc('space_moon_observatory_title'),25])}</div>` : `<div>${loc('space_home_satellite_effect2',[wardenLabel(), 4])}</div>`;
            return `<div>${loc('plus_max_resource',[knowledge,loc('resource_Knowledge_name')])}</div>${synergy}<div>${loc('space_home_satellite_effect3',[global.civic.scientist.name])}</div>`
        },
        action(){
            if (payCosts($(this)[0])){
                incrementStruct('satellite');
                global['resource']['Knowledge'].max += 750;
                return true;
            }
            return false;
        }
    },
}



const techs = {
    club: {
        id: 'tech-club',
        title: loc('tech_club'),
        desc: loc('tech_club_desc'),
        category: 'agriculture',
        era: 'primitive',
        reqs: {},
        grant: ['primitive',1],
        cost: {
            Lumber(){ return global.race['kindling_kindred'] || global.race['smoldering'] ? 0 : 5; },
            Stone(){ return global.race['kindling_kindred'] || global.race['smoldering'] ? 5 : 0; }
        },
        action(){
            if (payCosts($(this)[0])){
                global.resource.Food.display = true;
                return true;
            }
            return false;
        }
    },
    bone_tools: {
        id: 'tech-bone_tools',
        title: loc('tech_bone_tools'),
        desc: loc('tech_bone_tools_desc'),
        category: 'stone_gathering',
        era: 'primitive',
        reqs: { primitive: 1 },
        grant: ['primitive',2],
        condition(){
            return global.race['soul_eater'] && !global.race['evil'] ? false : true;
        },
        cost: {
            Food(){ return global.race['evil'] && !global.race['smoldering'] ? 0 : 10; },
            Lumber(){ return global.race['evil'] && !global.race['smoldering'] ? 10 : 0; }
        },
        action(){
            if (payCosts($(this)[0])){
                global.resource.Stone.display = true;
                if (global.race['smoldering']){
                    global.resource.Chrysotile.display = true;
                }
                return true;
            }
            return false;
        }
    },
}

function payCrispr(gene){
    let afford = true;
    let costs = genePool[gene].cost;
    Object.keys(costs).forEach(function(res){
        if (res === 'Artifact'){
            if (!global.resource.Artifact || global.resource.Artifact.amount < costs[res]()){
                afford = false;
            }
        }
        else {
            let affix = global.race.universe === 'antimatter' && res === 'Plasmid' ? 'anti' : 'count';
            if (!global.race.hasOwnProperty(res) || global.race[res][affix] < costs[res]()){
                afford = false;
            }
        }
    });

    if (afford){
        Object.keys(costs).forEach(function(res){
            if (res === 'Artifact'){
                global.resource.Artifact.amount -= costs[res]();
            }
            else {
                let affix = global.race.universe === 'antimatter' && res === 'Plasmid' ? 'anti' : 'count';
                global.race[res][affix] -= costs[res]();
            }
        });
        return true;
    }
    return false;
}
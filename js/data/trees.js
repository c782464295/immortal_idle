var TreesTable;
(function (TreesTable) {
    TreesTable[TreesTable["SandleWood"] = 0] = "紫檀木";
    TreesTable[TreesTable["SilkWood"] = 1] = "金丝楠木";
})(TreesTable || (TreesTable = {}));


var Trees = [
    {
        id: TreesTable.SandleWood,
        name: TreesTable[TreesTable.SandleWood],
        levelRequired: 1,
        baseInterval: 250,
        baseExperience: 10,
        media: './assets/normal_tree.svg',
        description:'来自幽暗森林的奇异木材，可以成为诸多材料的原料',
        locked: false
    },
    {
        id: TreesTable.SilkWood,
        name: TreesTable[TreesTable.SilkWood],
        levelRequired: 1,
        baseInterval: 1000,
        baseExperience: 10,
        media: './assets/oak_tree.svg',
        description:'木质间透出条条金丝，好像蕴含着不可小觑的力量',
        locked: true
    },
    
];
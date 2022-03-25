var Trees;
(function (Trees) {
    Trees[Trees["Normal"] = 0] = "Normal";
    Trees[Trees["Oak"] = 1] = "Oak";
    Trees[Trees["Willow"] = 2] = "Willow";
    Trees[Trees["Teak"] = 3] = "Teak";
    Trees[Trees["Maple"] = 4] = "Maple";
    Trees[Trees["Mahogany"] = 5] = "Mahogany";
    Trees[Trees["Yew"] = 6] = "Yew";
    Trees[Trees["Magic"] = 7] = "Magic";
    Trees[Trees["Redwood"] = 8] = "Redwood";
})(Trees || (Trees = {}));

var allitems = [
    {
        id: Trees.Normal,
        name:'原木',
        type: 'normal',
        levelRequired: 1,
        baseInterval: 3000,
        baseExperience: 10,
        media: './svg/normal_tree.svg',
    },
    {
        id: Trees.Oak,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Willow,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Teak,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Maple,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Mahogany,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Yew,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
    {
        id: Trees.Magic,
        name:'橡木',
        type: 'Oak',
        levelRequired: 10,
        baseInterval: 4000,
        baseExperience: 16,
        media: './svg/oak_tree.svg',
    },
]

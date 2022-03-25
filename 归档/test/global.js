export var save = window.localStorage;
export var global = {
    seed: 1,
    warseed: 1,
    resource: {},
    evolution: {},
    tech: {},
    city: {},
    space: {},
    interstellar: {},
    portal: {},
    civic: {},
    race: {},
    genes: {},
    blood: {},
    stats: {
        start: Date.now(),
        days: 0,
        tdays: 0
    },
    event: {
        t: 200,
        l: false
    },
    m_event: {
        t: 499,
        l: false
    },
};
global['settings'] = {
    civTabs: 0,
    showEvolve: true,
    showCiv: false,
    showCity: false,
    showIndustry: false,
    showPowerGrid: false,
    showResearch: false,
    showCivic: false,
    showMil: false,
    showResources: false,
    showMarket: false,
    showStorage: false,
    showAlchemy: false,
    showGenetics: false,
    showSpace: false,
    showAchieve: false,
    animated: true,
    disableReset: false,
    font: 'standard',
    q_merge: 'merge_nearby',
    cLabels: true,
    theme: 'gruvboxDark',
    locale: 'en-US',
    icon: 'star'
};
global.settings['locale'] = 'zh-CN';
global.stats['blood'] = 0;
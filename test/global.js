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
    settings:{
        locale:'default'
    }
};
global.settings['locale'] = 'zh-CN';
import { global } from './global.js';

let strings;
getString(global.Settings.locale);


export function loc(key, variables) {
    return strings[key];
}


export function getItemName(itemID) {
    return strings["itemsname"][itemID];
}

export function getPetsName(itemID) {
    return strings["petsname"][itemID];
}


function getString(locale) {
    let defaultString;

    $.ajaxSetup({ async: false });
    $.getJSON(`strings/strings.${locale}.json`, (data) => { defaultString = data; });
    strings = defaultString;
}

export const locales = {
    'en-US': 'English (US)',
    'es-ES': 'Spanish (ESP)',
    'pt-BR': 'Português (BR)',
    'zh-CN': '简体中文',
    'ko-KR': '한국어',
    'cs-CZ': 'Čeština',
    'ru-RU': 'Русский',
    'im-PL': 'Igpay-Atinlay'
};
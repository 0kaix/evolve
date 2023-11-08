import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createI18n } from 'vue-i18n';
import zh_CN from './locales/zh_CN.js';
import zh_TW from './locales/zh_TW';
import en_US from './locales/en_US.js';
import ru_RU from './locales/ru_RU';
import ja_JP from './locales/ja_JP';
import ko_KR from './locales/ko_KR';

const messages = {
    'zh-CN': zh_CN,
    'zh-TW': zh_TW,
    'en-US': en_US,
    'ru-RU': ru_RU,
    'ja-JP': ja_JP,
    'ko-KR': ko_KR
};
const i18n = createI18n({
    locale: localStorage.getItem('language') || navigator.language || 'zh-CN', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'zh-CN', // 设置备用语言
    messages
});

createApp(App).use(router).use(i18n).mount('#app');

export { i18n }; 
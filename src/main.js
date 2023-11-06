import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import { createI18n } from 'vue-i18n';
import zh_CN from './locales/zh_CN.js';
import en_US from './locales/en_US.js';

const messages = {
    'zh-CN': zh_CN,
    'en-US': en_US
};
const i18n = createI18n({
    locale: localStorage.getItem('language') || navigator.language || 'zh-CN', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'zh-CN', // 设置备用语言
    messages
});

createApp(App).use(router).use(i18n).mount('#app');

export { i18n }; 
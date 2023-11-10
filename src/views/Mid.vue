<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-tabs class="outer-tabs" v-model="tabs.active1">
                <el-tab-pane :label="$t('jinhua')" name="1">
                    <el-button id="jinhuayinzi" class="button-style button-usable progress-button"
                        @click="buttonClick($event)">
                        {{ $t('jinhuayinzi') }}
                        <div class="progress-bar" v-if="buttons.jinhuayinzi.isProcessing"></div>
                    </el-button>
                    <el-tabs v-model="tabs.active2">
                        <el-tab-pane :label="$t('weishengwu')" name="1-1">
                            <div class="button-layout"
                                v-if="buttons.weichi.isShow || buttons.fuzhi.isShow || buttons.shiying.isShow">
                                <div class="button-title">
                                    {{ $t('yuanshishengming') }}
                                </div>
                                <!-- <el-button id="weichi" class="button-style button-usable" @click="buttonClick($event)"
                                    v-if="buttons.weichi.isShow">
                                    {{ $t('weichi') }}
                                </el-button>
                                <el-button id="shiying" class="button-style button-usable " @click="buttonClick($event)"
                                    v-if="buttons.shiying.isShow">
                                    {{ $t('shiying') }}
                                </el-button>
                                <el-button id="fuzhi" class="button-style button-usable" @click="buttonClick($event)"
                                    v-if="buttons.fuzhi.isShow">
                                    {{ $t('fuzhi') }}
                                </el-button> -->

                                <span v-for="(button, index) in hasIsShowButtonAll2Array" :key="button.name">
                                    <el-button :id="button.name" :ref="setButtonRef" class="button-style button-usable"
                                        @click="buttonClick($event)" v-if="button.isShow" style="margin-right: 1rem;">
                                        {{ $t(button.name) }}
                                    </el-button>

                                    <Popover :virtual-ref="buttonRefs[index]">
                                        <template #title>{{ button.title }}</template>
                                        <template #subtitle>{{ button.subtitle }}</template>
                                        <template #content>{{ button.content }}</template>
                                    </Popover>
                                </span>
                            </div>
                            <div class="button-layout">
                                <el-badge ref="badge" :value="count.ceshi" class="button-badge">
                                    <el-button id="ceshi" class="button-style button-usable" @click="buttonClick($event)">
                                        {{ $t('ceshi') }}</el-button>
                                </el-badge>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane :label="$t('shezhi')" name="2">
                    <el-select v-model="language" @change="selectLanguage">
                        <el-option v-for="language in languages" :key="language.value" :label="language.label"
                            :value="language.value" />
                    </el-select>
                </el-tab-pane>
                <el-tab-pane label="" name="3"></el-tab-pane>
                <el-tab-pane label="" name="4"></el-tab-pane>
            </el-tabs>
        </div>

        <!-- <div v-for="(item, index) in items" :key="item.id">
            <el-button :ref="setButtonRef">{{ item.text }}</el-button>
            <Popover :virtual-ref="buttonRefs[index]">
                <template #title>{{ item.title }}</template>
                <template #subtitle>{{ item.subtitle }}</template>
                <template #content>{{ item.content }}</template>
            </Popover>
        </div> -->
    </div>

    <router-view />
</template>
<script setup>
import { useIsMobile } from '@/utils/isMobile.js';
import i18n from '@/utils/i18n.js';
import { ref, computed, watch, nextTick, onBeforeMount, onBeforeUnmount } from 'vue';
import { getInventorys } from '@/js/inventory/index.js';
import Popover from "@/components/Popover.vue";

const { isMobile } = useIsMobile();

const emit = defineEmits(['data-transmission'])
onBeforeMount(() => {
    localStorage.removeItem("progress");
});
onBeforeUnmount(() => {
    clearInterval(progressbarInterval);
});


// const items = ref([
//     {
//         text: 'Button 1',
//         title: 'Title 1',
//         subtitle: 'Subtitle 1',
//         content: 'Content 1',
//     },
//     {
//         text: 'Button 2',
//         title: 'Title 2',
//         subtitle: 'Subtitle 2',
//         content: 'Content 2',
//     },
//     {
//         text: 'Button 3',
//         title: 'Title 3',
//         subtitle: 'Subtitle 3',
//         content: 'Content 3',
//     }
// ])
const buttonRefList = ref([])
const setButtonRef = element => {
    if (element) {
        buttonRefList.value.push(element)
    }
}
const buttonRefs = computed(() => {
    return buttonRefList.value
})
const languages = ref([
    {
        value: 'zh-CN',
        label: '简体中文'
    },
    {
        value: 'zh-TW',
        label: '繁體中文'
    },
    {
        value: 'en-US',
        label: 'English'
    },
    {
        value: 'ru-RU',
        label: 'русский'
    },
    {
        value: 'ja-JP',
        label: '日本語'
    },
    {
        value: 'ko-KR',
        label: '한국어'
    },
])//语言列表

const languageCode = localStorage.getItem('language') || 'zh-CN';
const language = languages.value.find(language => language.value === languageCode).label;



const inventorys = ref(getInventorys())//库存
const tabs = ref({
    active1: "1",
    active2: "1-1"
})//tab标签页
const count = ref({
    ceshi: 0,
})//按钮点击次数
const buttons = ref({
    jinhuayinzi: {
        name: "jinhuayinzi",
        isProcessing: false,
    },
    weichi: {
        name: "weichi",
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        content: 'Content 1',
        isShow: true
    },
    fuzhi: {
        name: "fuzhi",
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        content: 'Content 2',
        isShow: true
    },
    shiying: {
        name: "shiying",
        title: 'Title 3',
        subtitle: 'Subtitle 3',
        content: 'Content 3',
        isShow: true
    },
})

const progressbarDurations = ref({
    jinhuayinzi: 10,
})//进度条动画时长

const hasIsShowButtonAll = computed(() => {
    return Object.fromEntries(Object.entries(buttons.value).filter(([name, button]) => {
        return button.hasOwnProperty('isShow');
    }).map(([name, button]) => {
        return [name, button];
    }));
});//找到所有有isShow属性的按钮，返回该按钮的对象

const hasIsShowButtonAll2Array = computed(() => {
    return Object.entries(hasIsShowButtonAll.value).map(([name, button]) => {
        return button;
    });
});//将该对象转换为数组

const hasIsProcessingButton = computed(() => {
    return Object.fromEntries(Object.entries(buttons.value).filter(([name, button]) => {
        return button.hasOwnProperty('isProcessing');
    }).map(([name, button]) => {
        return [name, button.isProcessing];
    }));
});//找到所有有isProcessing属性的按钮，返回该按钮的isProcessing属性

const buttonIsShow2IsShow = computed(() => {
    return Object.fromEntries(Object.entries(buttons.value).filter(([name, button]) => {
        return button.hasOwnProperty('isShow');
    }).map(([name, button]) => {
        return [name, button.isShow];
    }));
});//找到所有有isShow属性的按钮，返回该按钮的isShow属性

for (const name in hasIsProcessingButton.value) {
    const watchedButton = computed(() => buttons.value[name].isProcessing);
    watch(watchedButton, (newValue, oldValue) => {
        nextTick(() => {
            updateProgressBar(name);
        });
    });
}//监听所有有isProcessing属性的按钮的isProcessing属性的变化

const buttonClick = (event) => {
    const id = event.currentTarget.id;
    if (Object.keys(hasIsProcessingButton.value).includes(id)) {
        buttons.value[id].isProcessing = true;
        let progress = localStorage.getItem('progress') || 1;
        setTimeout(() => {
            buttons.value[id].isProcessing = false;
        }, progressbarDurations.value[id] * (100 - parseFloat(progress)) / 100 * 1000);
    } else if (Object.keys(buttonIsShow2IsShow.value).includes(id)) {
        buttons.value[id].isShow = false;
    } else if (["ceshi1"].includes(id)) {
        const time = new Date().getTime();
        emit('data-transmission', id + "-" + time);
    } else if (["ceshi"].includes(id)) {
        count.value[id] += 1;
        const badgeElement = document.querySelector('.el-badge__content');
        // const content = this.$refs.badge.$el.querySelector('.el-badge__content');
        //获得屏幕分辨率
        // const width = window.screen.width;
        // let width = 1280
        // console.log(width / 1920);
        // if (count.value[id] > 999) {
        //     content.style.right = '2.3rem';
        // } else if (count.value[id] > 99) {
        //     content.style.right = '1.9rem';
        // } else if (count.value[id] > 9) {
        //     content.style.right = '1.5rem';
        // }
    }
}

let progressbarInterval = ref()
const updateProgressBar = (name) => {
    const progressBar = document.querySelector(`#${name} .progress-bar`);
    let progress = localStorage.getItem('progress') || 0;
    progressbarInterval = setInterval(() => {
        if (!progressBar) {
            clearInterval(progressbarInterval);
            return;
        }
        progress = parseFloat(progress) + 0.1;
        progressBar.style.width = progress + '%';
        localStorage.setItem('progress', progress);
        if (progress > 100) {
            clearInterval(progressbarInterval);
            localStorage.removeItem('progress');
        }
    }, progressbarDurations.value[name]);


    // if (progressBar) {
    //     progressBar.style.animationDuration = `${progressbarDurations.value[name]}s`;
    // }
}

const selectLanguage = (label) => {
    i18n.global.locale = label;
    localStorage.setItem('language', label);
    emit('data-transmission', getInventorys());
}
</script>
<style scoped>
.box {
    flex: 2;
    overflow: hidden;
}

.content {
    width: 100%;
    word-break: break-all;
}

.el-tabs {
    --el-tabs-header-height: 2rem;
}


:deep(.el-tabs__item) {
    padding: 0.5rem;
    color: #000000;
}

:deep(.el-tabs__active-bar) {
    background-color: #000000;
}


.outer-tabs {
    padding-left: 1rem;
    padding-right: 1rem;
}

.button-layout {
    text-align: left;
    padding-bottom: 1rem;
    width: 100%;
}

.button-title {
    padding-bottom: 1rem;
}

.button-style {
    width: 10vw;
}

.button-style,
.button-style:focus:not(.button-style:hover) {
    border: 1px solid #000000;
    color: #000000;
}

.button-style:active {
    background-color: #dddddd;
    border: 1px solid #000000;
}


.button-usable {
    background: #ffffff;
}

.button-unusable {
    background: #eeeeee;
}

/* 问题：切换标签页会导致进度条重置 */
.progress-button {
    position: relative;
    background-color: #ffffff;
    border: 1px solid #000000;
    color: #000000;
    cursor: pointer;
    z-index: 1;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #dddddd;
    /* animation: progressBarAnimation 0s linear forwards; */
    z-index: -1;
}

@keyframes progressBarAnimation {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}

.el-badge {
    position: relative;
    margin-right: 1rem;
    --el-badge-radius: 0.5rem;
    --el-badge-font-size: 0.7rem;
    --el-badge-size: 1rem;
}

:deep(.el-badge__content) {
    top: 0.5rem;
    right: 1.1rem;
}

:deep(.el-badge__content--danger) {
    color: #000000;
    background-color: transparent;
    border: 0px;
}

#popover-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>

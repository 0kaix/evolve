<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-tabs class="outer-tabs" v-model="tabs.active1">
                <el-tab-pane :label="$t('evolve')" name="1">
                    <el-tabs v-model="tabs.active2">
                        <el-tab-pane :label="$t('fenzi')" name="1-1">

                            <div class="button-layout">
                                <el-button id="linsuan" class="button-style button-usable" @click="buttonClick($event)">{{
                                    $t('linsuan') }}</el-button>
                                <el-button id="hetang" class="button-style button-usable" @click="buttonClick($event)">{{
                                    $t('hetang') }}</el-button>
                                <el-button id="jianji" class="button-style button-usable" @click="buttonClick($event)">{{
                                    $t('jianji') }}</el-button>
                                <el-button id="anjisuan" class="button-style button-usable" @click="buttonClick($event)">{{
                                    $t('anjisuan') }}</el-button>
                            </div>
                            <div class="button-layout">
                                <el-badge ref="badge" :value="count.rna" class="button-badge">
                                    <el-button id="rna" class="button-style button-usable" @click="buttonClick($event)">{{
                                        $t('rna') }}</el-button>
                                </el-badge>
                                <el-badge :value="count.dna" class="button-badge">
                                    <el-button id="dna" class="button-style button-usable" @click="buttonClick($event)">{{
                                        $t('dna') }}</el-button>
                                </el-badge>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-2"></el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-3"></el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-4"></el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane :label="$t('shezhi')" name="2">
                    <el-select v-model="language" @change="changeLanguage">
                        <el-option v-for="item in languages" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-tab-pane>
                <el-tab-pane label="" name="3"></el-tab-pane>
                <el-tab-pane label="" name="4"></el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <router-view />
</template>
<script>
import isMobile from '@/utils/isMobile.js';
import { i18n } from '@/main.js'
import { getInventorys } from '@/js/inventorys.js';
import weights from '@/js/weights.js';
export default {
    name: 'Mid',
    mixins: [isMobile],
    emits: ['transfer-data'],
    data() {
        return {
            inventorys: getInventorys(),
            weights: weights,
            tabs: {
                active1: "1",
                active2: "1-1"
            },
            count: {
                rna: 0,
                dna: 0
            },
            language: "简体中文",
            languages: [
                {
                    value: 'zh-CN',
                    label: '简体中文'
                },
                {
                    value: 'en-US',
                    label: 'English'
                }
            ],
        }
    },
    methods: {
        buttonClick(event) {
            const id = event.currentTarget.id;
            if (["linsuan", "hetang", "jianji", "anjisuan"].includes(id)) {
                const time = new Date().getTime();
                this.$emit('transfer-data', id + "-" + time);
            } else if (["rna", "dna"].includes(id)) {
                this.count[id] += 1;
                const content = this.$refs.badge.$el.querySelector('.el-badge__content');
                if (this.count[id] > 999) {
                    content.style.right = '2.3rem';
                } else if (this.count[id] > 99) {
                    content.style.right = '1.9rem';
                } else if (this.count[id] > 9) {
                    content.style.right = '1.5rem';
                }
            }
        },
        changeLanguage(label) {
            i18n.global.locale = label;
            this.$emit('transfer-data', getInventorys());
        }
    },
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

.button-style {
    width: 10vw
}

.button-style,
.button-style:focus:not(.button-style:hover) {
    border: 1px solid #000000;
    color: #000000;
}

.button-style:active {
    background-color: #dddddddd;
    border: 1px solid #000000;
}


.button-usable {
    background: #ffffff;
}

.button-unusable {
    background: #eeeeee;
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
</style>

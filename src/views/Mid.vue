<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-tabs class="outer-tabs" v-model="tabs.active1">
                <el-tab-pane label="进化" name="1">
                    <el-tabs v-model="tabs.active2">
                        <el-tab-pane label="分子" name="1-1">
                            <div class="button-layout">
                                <el-button id="linsuan" class="button-style button-usable"
                                    @click="buttonClick($event)">磷酸</el-button>
                                <el-button id="hetang" class="button-style button-usable"
                                    @click="buttonClick($event)">核糖</el-button>
                                <el-button id="xianpl" class="button-style button-usable"
                                    @click="buttonClick($event)">腺嘌呤(A)</el-button>
                                <el-button id="niaopl" class="button-style button-usable"
                                    @click="buttonClick($event)">鸟嘌呤(G)</el-button>
                                <el-button id="baomd" class="button-style button-usable"
                                    @click="buttonClick($event)">胞嘧啶(C)</el-button>
                                <el-button id="niaomd" class="button-style button-usable"
                                    @click="buttonClick($event)">尿嘧啶(U)</el-button>
                                <el-button id="xiongxianmd" class="button-style button-usable"
                                    @click="buttonClick($event)">胸腺嘧啶(T)</el-button>
                            </div>
                            <div class="button-layout">
                                <el-badge ref="badge" :value="count.rna" class="button-badge">
                                    <el-button id="rna" class="button-style button-usable"
                                        @click="buttonClick($event)">RNA</el-button>
                                </el-badge>
                                <el-badge :value="count.dna" class="button-badge">
                                    <el-button id="dna" class="button-style button-usable"
                                        @click="buttonClick($event)">DNA</el-button>
                                </el-badge>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-2"></el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-3"></el-tab-pane>
                        <el-tab-pane v-if="false" label="" name="1-4"></el-tab-pane>
                    </el-tabs>
                </el-tab-pane>
                <el-tab-pane label="设置" name="2">设置</el-tab-pane>
                <el-tab-pane label="" name="3"></el-tab-pane>
                <el-tab-pane label="" name="4"></el-tab-pane>
            </el-tabs>
        </div>
    </div>

    <router-view />
</template>
<script>
import isMobile from '@/utils/isMobile.js';

export default {
    name: 'Mid',
    mixins: [isMobile],
    emits: ['transfer-data'],
    data() {
        return {
            tabs: {
                active1: "1",
                active2: "1-1"
            },
            count: {
                rna: 0,
                dna: 0
            }
        }
    },
    created() {

    },
    methods: {
        buttonClick(event) {
            const id = event.currentTarget.id;
            if (["linsuan", "hetang", "xianpl", "niaopl", "baomd", "niaomd", "xiongxianmd"].includes(id)) {
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

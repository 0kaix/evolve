<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-table :data="inventorys" :show-header="false" size="small">
                <el-table-column prop="name" min-width="60%" align="left" />
                <el-table-column prop="count" min-width="20%" align="left" />
                <el-table-column prop="rate" min-width="20%" align="right" />
            </el-table>
        </div>
    </div>
    <router-view />
</template>
<script>
import isMobile from '@/utils/isMobile.js';
import { getInventorys } from '@/js/inventorys.js';
import weights from '@/js/weights.js';
import { aminoacid2codon } from '@/js/codons.js';

export default {
    name: 'Left',
    props: {
        transferredData: {
            required: true
        }
    },
    mixins: [isMobile],
    data() {
        return {
            inventorys: getInventorys(),
            weights: weights
        }
    },
    watch: {
        transferredData(newValue, oldValue) {
            if (newValue instanceof Array) {
                this.inventorys = newValue
            } else {
                this.updateInventory(newValue)
            }
        },
    },
    created() {
        this.refreshInventory()
    },
    methods: {
        refreshInventory() {
            setInterval(() => {
                this.inventorys.forEach(item => {
                    let rate = Number(item.rate.replace("/s", ""));
                    if (rate != 0) {
                        item.count = item.count + rate;
                        item.count = Number(item.count.toFixed(2));
                    }
                })
            }, 1000)
        },
        updateInventory(newValue) {
            let button = newValue.split("-")[0]
            let value;
            if (button == "jianji") {
                value = this.probability(this.weights[0])
            } else if (newValue.split("-")[0] == "anjisuan") {
                value = this.probability(this.weights[1])
            }
            const item = this.inventorys.find(item => item.id == value);
            if (item) {
                if (button == "linsuan" || button == "hetang" || button == "jianji") {
                    item.count++;
                } else if (button == "anjisuan") {
                    let jianji = aminoacid2codon(value).split("");
                    let count = [0, 0, 0, 0]
                    let countIndex = -1
                    let index = []
                    console.log(jianji);
                    for (let i = 0; i < jianji.length; i++) {
                        if (jianji[i] == "A") {
                            jianji[i] = "xianpiaoling"
                            count[0]++
                            countIndex = 0
                        } else if (jianji[i] == "G") {
                            jianji[i] = "niaopiaoling"
                            count[1]++
                            countIndex = 1
                        } else if (jianji[i] == "C") {
                            jianji[i] = "baomiding"
                            count[2]++
                            countIndex = 2
                        } else if (jianji[i] == "U") {
                            jianji[i] = "niaomiding"
                            count[3]++
                            countIndex = 3
                        }
                        const element = this.inventorys.find(element => element.id == jianji[i]);
                        if (element) {
                            if (element.count - count[countIndex] >= 0) {
                                index.push(this.inventorys.indexOf(element))
                            } else {
                                ElMessage.error(this.$t('kucunbuzu'))
                                index = []
                                break;
                            }
                        }
                    }
                    if (index.length == 3) {
                        for (let i = 0; i < index.length; i++) {
                            this.inventorys[index[i]].count = this.inventorys[index[i]].count - count[i]
                        }
                        this.inventorys.find(item => item.id == value).count++
                    }
                }
            }
        },
        probability(weights) {
            let value;
            const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
            let random = Math.floor(Math.random() * totalWeight);
            for (const [key, weight] of Object.entries(weights)) {
                random -= weight;
                if (random < 0) {
                    value = key;
                    break;
                }
            }
            return value
        }
    },
}
</script>
<style scoped>
.box {
    flex: 1;
    overflow: hidden;
}

.content {
    width: 100%;
    word-break: break-all;
}

:deep(.el-table tbody tr) {
    pointer-events: none;
}

:deep(.el-table .cell),
:deep(.el-table th div) {
    font-size: 0.8rem;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
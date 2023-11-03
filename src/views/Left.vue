<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-table :data="inventory" :show-header="false" size="small">
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
import inventory from '@/js/inventory.js';

export default {
    name: 'Left',
    props: {
        transferredData: {
            type: String,
            required: true
        }
    },
    mixins: [isMobile],
    data() {
        return {
            inventory: inventory,
        }
    },
    watch: {
        transferredData(newValue, oldValue) {
            const item = this.inventory.find(item => item.id == newValue.split("-")[0]);
            if (item) {
                item.count++;
            }
        }
    },
    created() {
        this.refreshInventory()
    },
    methods: {
        refreshInventory() {
            setInterval(() => {
                this.inventory.forEach(item => {
                    let rate = Number(item.rate.replace("/s", ""));
                    if (rate != 0) {
                        item.count = item.count + rate;
                        item.count = Number(item.count.toFixed(2));
                    }
                })
            }, 1000)
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
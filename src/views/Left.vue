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

export default {
    name: 'Left',
    mixins: [isMobile],
    data() {
        return {
            inventory: [
                {
                    name: '核苷酸',
                    count: 0,
                    rate: '0/s',
                }
            ],
            inventoryData: [
                {
                    count: 0,
                    rate: 0,
                }
            ],
        }
    },
    created() {
        this.initInventory();
        this.refreshInventory();
    },
    methods: {
        initInventory() {
            this.inventory.forEach((item, index) => {
                item.count = this.inventoryData[index].count;
                item.rate = this.inventoryData[index].rate + "/s";
            })
        },
        refreshInventory() {
            setInterval(() => {
                this.inventoryData.forEach(item => {
                    if (item.rate != 0) {
                        item.count = item.count + item.rate;
                    }
                })
                this.initInventory();
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

::v-deep .el-table tbody tr {
    pointer-events: none;
}

::v-deep .el-table .cell,
.el-table th div {
    font-size: 0.8rem;
    line-height: 1.2;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
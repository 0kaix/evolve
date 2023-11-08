<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">
            <el-table :data="inventorys" :show-header="false" size="small">
                <el-table-column prop="name" min-width="50%" align="left" />
                <el-table-column prop="count" min-width="25%" align="left" />
                <el-table-column prop="rate" min-width="25%" align="right" />
            </el-table>
        </div>
    </div>
    <router-view />
</template>
<script setup>
import { useIsMobile } from '@/utils/isMobile.js';
import { ref, watch, onMounted } from 'vue';
import { getInventorys } from '@/js/inventory/index.js';
import { saveInventoryData, saveOfflineTime } from '@/utils/save';


const { isMobile } = useIsMobile();
const props = defineProps({
    leftData: {
        required: true
    }
})
const inventorys = ref(getInventorys())
watch(() => props.leftData, (newValue, oldValue) => {
    if (newValue instanceof Array) {
        inventorys.value = newValue
    } else {
        // this.updateInventory(newValue)
    }
})
const refreshInventory = () => {
    // let saveCountDown = 5
    setInterval(() => {
        inventorys.value.forEach(item => {
            let rate = Number(item.rate.replace("/s", ""));
            if (rate != 0) {
                item.count = item.count + rate;
                item.count = Number(item.count.toFixed(3));
            }
        })
        saveInventoryData(inventorys.value)
        saveOfflineTime(new Date().getTime())
        // saveCountDown--
        // if (saveCountDown == 0) {
        //     saveInventoryData(inventorys.value)
        //     saveCountDown = 5
        // }
    }, 1000)
}


// const saveInventoryData = () => {
//     let inventorysDatas = []
//     inventorys.value.forEach(item => {
//         inventorysDatas.push({
//             id: item.id,
//             count: item.count,
//             rate: item.rate.replace("/s", "")
//         })
//     })
//     localStorage.setItem("inventorysDatas", JSON.stringify(inventorysDatas));
// }
onMounted(() => {
    refreshInventory()
})

// export default {
//     name: 'Left',
//     props: {
//         leftData: {
//             required: true
//         }
//     },
//     mixins: [isMobile],
//     data() {
//         return {
//             inventorys: getInventorys(),
//         }
//     },
//     watch: {
//         leftData(newValue, oldValue) {
//             if (newValue instanceof Array) {
//                 this.inventorys = newValue
//             } else {
//                 // this.updateInventory(newValue)
//             }
//         },
//     },
//     created() {
//         this.refreshInventory()
//     },
//     methods: {
//         refreshInventory() {
//             let saveCountDown = 5
//             setInterval(() => {
//                 this.inventorys.forEach(item => {
//                     let rate = Number(item.rate.replace("/s", ""));
//                     if (rate != 0) {
//                         item.count = item.count + rate;
//                         item.count = Number(item.count.toFixed(5));
//                     }
//                 })
//                 saveCountDown--
//                 if (saveCountDown == 0) {
//                     this.saveInventoryData()
//                     saveCountDown = 5
//                 }
//             }, 1000)
//         },
//         saveInventoryData() {
//             let inventorysDatas = []
//             this.inventorys.forEach(item => {
//                 inventorysDatas.push({
//                     id: item.id,
//                     count: item.count,
//                     rate: item.rate.replace("/s", "")
//                 })
//             })
//             localStorage.setItem("inventorysDatas", JSON.stringify(inventorysDatas));
//         },



//     },
// }
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
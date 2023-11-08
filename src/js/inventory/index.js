import i18n from '@/utils/i18n.js';
import inventorysID from '@/js/inventory/id.js'

const translate = (key) => i18n.global.t(key)

// export function getInventorysName() {
//     let inventorys = []
//     inventorysID.forEach((item) => {
//         let name = translate(item)
//         let inventory = { id: item, name: name }
//         inventorys.push(inventory)
//     })
//     return inventorys
// }
const getInventorysName = () => inventorysID.map(item => ({ id: item, name: translate(item) }))//获得库存名称，并根据国际化选项进行翻译

// export function getInventorysData() {
//     // localStorage.clear("inventorysDatas")
//     let localData = localStorage.getItem("inventorysDatas")
//     let inventorysDatas = []
//     if (localData && localData != undefined) {
//         inventorysDatas = JSON.parse(localData)
//     } else {
//         inventorysID.forEach((item) => {
//             let count = 0
//             let rate = 0
//             if (item == "jinhuayinzi") {
//                 rate = 0.00001
//             }
//             let inventorysData = { id: item, count: count, rate: rate }
//             inventorysDatas.push(inventorysData)
//         })
//     }
//     return inventorysDatas
// }
const getInventorysData = () => {
    // localStorage.clear("inventorysDatas")
    let localData = localStorage.getItem("inventorysDatas")
    let inventorysDatas = []
    if (localData && localData != undefined) {
        inventorysDatas = JSON.parse(localData)
    } else {
        inventorysID.forEach((item) => {
            let count = 0
            let rate = 0
            if (item == "jinhuayinzi") {
                rate = 0.01
            }
            let inventorysData = { id: item, count: count, rate: rate }
            inventorysDatas.push(inventorysData)
        })
    }
    return inventorysDatas
}//获得库存数据


const getInventorys = () => {
    const inventorysName = getInventorysName()
    const inventorysData = getInventorysData()
    return inventorysName.map(item => {
        const data = inventorysData.find(element => element.id == item.id);
        data.rate += "/s"
        return Object.assign({}, item, data);
    })
}//将库存名称和库存数据合并

export {
    getInventorys
}

import { i18n } from '@/main.js'
import inventorysID from '@/js/inventory/id.js'

function translate(key) {
    return i18n.global.t(key)
}

export function getInventorysName() {
    let inventorys = []
    inventorysID.forEach((item) => {
        let name = translate(item)
        let inventory = { id: item, name: name }
        inventorys.push(inventory)
    })
    return inventorys
}

export function getInventorysData() {
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
                rate = 0.00001
            }
            let inventorysData = { id: item, count: count, rate: rate }
            inventorysDatas.push(inventorysData)
        })
    }
    return inventorysDatas
}

export function getInventorys() {
    let inventorysName = getInventorysName()
    let inventorysData = getInventorysData()
    let inventorys = inventorysName.map(item => {
        const data = inventorysData.find(element => element.id == item.id);
        data.rate += "/s"
        return Object.assign({}, item, data);
    })
    return inventorys
}

export default {

}
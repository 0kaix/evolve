const saveInventoryData = inventorys => {
    let inventorysDatas = []
    inventorys.forEach(item => {
        inventorysDatas.push({
            id: item.id,
            count: item.count,
            rate: item.rate.replace("/s", "")
        })
    })
    localStorage.setItem("inventorysDatas", JSON.stringify(inventorysDatas));
}//保存库存数据

const saveOfflineTime = (offlineTime) => {
    localStorage.setItem("offlineTime", offlineTime);
}//保存离线时间

export {
    saveInventoryData,
    saveOfflineTime
}
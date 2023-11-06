import { i18n } from '@/main.js'
function translate(key) {
    return i18n.global.t(key)
}

export function getInventorys() {
    let inventorysID = [
        "linsuan",
        "hetang",
        "xianpiaoling",
        "niaopiaoling",
        "baomiding",
        "niaomiding",
        "xiongxianmiding",
        "ganansuan",
        "bingansuan",
        "xieansuan",
        "liangansuan",
        "yiliangansuan",
        "jialiuansuan",
        "puansuan",
        "seansuan",
        "siansuan",
        "laoansuan",
        "banguangansuan",
        "benbingansuan",
        "tiandongxianan",
        "guanxianan",
        "suansuan",
        "tiandongansuan",
        "guansuan",
        "laiansuan",
        "jingansuan",
        "zuansuan",
    ]
    let inventorys = []
    let inventory = {}
    let name = ""
    inventorysID.forEach((item) => {
        name = translate(item)
        inventory = { id: item, name: name, count: 0, rate: '0/s' }
        inventorys.push(inventory)
    })
    return inventorys
}

export default {

}
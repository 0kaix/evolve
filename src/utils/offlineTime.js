import { computed } from "vue";
import i18n from "./i18n";
const offlineTimeData = localStorage.getItem('offlineTime');
const offlineTime = new Date().getTime() - offlineTimeData;
const secondsInDay = 24 * 60 * 60;
const secondsInHour = 60 * 60;
const secondsInMinute = 60;
const translate = (key) => i18n.global.t(key)
let tian = translate("tian");
let xiaoshi = translate("xiaoshi");
let fenzhong = translate("fenzhong");
let miao = translate("miao");
if (i18n.global.locale == "en-US") {
    tian += "s"
    xiaoshi += "s"
    fenzhong += "s"
    miao += "s"
}
const offlineTimeMessage = computed(() => {
    let offlineTime = new Date().getTime() - offlineTimeData;
    let message = translate("huanying");
    if (offlineTimeData) {
        if (offlineTime >= secondsInDay * 1000) {
            const offlineTimeDay = Math.floor(offlineTime / (secondsInDay * 1000));
            message += `${offlineTimeDay}` + translate("tian");
            offlineTime %= secondsInDay * 1000;
        }
        if (offlineTime >= secondsInHour * 1000) {
            const offlineTimeHour = Math.floor(offlineTime / (secondsInHour * 1000));
            message += `${offlineTimeHour}` + translate("xiaoshi");
            offlineTime %= secondsInHour * 1000;
        }
        if (offlineTime >= secondsInMinute * 1000) {
            const offlineTimeMinute = Math.floor(offlineTime / (secondsInMinute * 1000));
            message += `${offlineTimeMinute}` + translate("fenzhong");
            offlineTime %= secondsInMinute * 1000;
        }
        const offlineTimeSecond = Math.floor(offlineTime / 1000);
        message += `${offlineTimeSecond}` + translate("miao");
        return message
    }
})


export {
    offlineTime,
    offlineTimeMessage
}
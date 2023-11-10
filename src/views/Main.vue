<template>
  <div v-if="isMobile">
    <Mobile></Mobile>
  </div>

  <div v-else>
    <div class="top-bar">
      <div class="bar-right">
        V0.0.1
      </div>
    </div>
    <div class="wrapper">
      <Left :left-data="leftData"></Left>
      <Divider />
      <Mid @data-transmission="dataTransmission"></Mid>
      <Divider />
      <Right></Right>
    </div>
    <div class="bottom-bar">
      <div class="bar-right" @click="reset">
        重置
      </div>
    </div>
  </div>
</template>
<script setup>
import Divider from '@/components/Divider.vue'
import Mid from './Mid.vue'
import Left from './Left.vue'
import Right from './Right.vue'
import Mobile from './Mobile.vue'
import { useIsMobile } from '@/utils/isMobile.js';
import { offlineTime, offlineTimeMessage } from '@/utils/offlineTime.js';
import { ref } from 'vue';

const { isMobile } = useIsMobile();
ElNotification.success(offlineTimeMessage.value == undefined ? "欢迎您首次游玩本游戏" : offlineTimeMessage.value)

const leftData = ref('');
const dataTransmission = (data) => {
  leftData.value = data;
}

const reset = () => {
  //弹窗警告
  ElMessageBox.confirm('确定要重置游戏吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    localStorage.clear();
    location.reload();
  })
}

const inventorysDatas = JSON.parse(localStorage.getItem("inventorysDatas"));
if (inventorysDatas) {
  inventorysDatas.forEach(item => {
    let rate = Number(item.rate.replace("/s", ""));
    if (rate > 0) {
      item.count = Number(item.count) + (rate / 10 * offlineTime / 1000);
      item.count = Number(item.count.toFixed(3));
    }
  });
  localStorage.setItem("inventorysDatas", JSON.stringify(inventorysDatas));
}


</script>

<style>
.wrapper {
  display: flex;
  width: 100%;
}

.top-bar {
  background-color: rgba(0, 0, 0, 0.1)
}

.bar-right {
  text-align: right;
  padding-right: 0.5rem;
}

.bottom-bar {
  background-color: rgba(0, 0, 0, 0.1)
}
</style>

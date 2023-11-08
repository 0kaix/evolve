<template>
  <div v-if="isMobile">
    <Mobile></Mobile>
  </div>

  <div v-else>
    <div class="top-bar">
      <div class="version-number">
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
  </div>
</template>
<script setup>
import Divider from '@/components/Divider.vue'
import Mid from './Mid.vue'
import Left from './Left.vue'
import Right from './Right.vue'
import Mobile from './Mobile.vue'
import useIsMobile from '@/utils/isMobile.js';
import { ref } from 'vue';

const { isMobile } = useIsMobile();
const leftData = ref('');
const dataTransmission = (data) => {
  leftData.value = data;
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

.version-number {
  text-align: right;
  padding-right: 0.5rem;
}
</style>

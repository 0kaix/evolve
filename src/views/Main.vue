<template>
  <div v-if="isMobile">
    <Mobile></Mobile>
  </div>

  <div v-else>
    <div class="top-bar">
      <div class=" version-number">
        V0.0.1
      </div>
    </div>
    <div class="wrapper">
      <Left :transferred-data="transferredData"></Left>
      <Divider />
      <Mid @transfer-data="transferData"></Mid>
      <Divider />
      <Right></Right>
    </div>
  </div>
</template>
<script>
import Divider from '@/components/Divider.vue'
import Mid from './Mid.vue'
import Left from './Left.vue'
import Right from './Right.vue'
import Mobile from './Mobile.vue'
import isMobile from '@/utils/isMobile.js';


export default {
  mixins: [isMobile],
  components: {
    Divider,
    Left,
    Mid,
    Right,
    Mobile
  },
  data() {
    return {
      selectedComponent: null,
      transferredData: ''
    }
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    showComponent(componentName) {
      this.selectedComponent = componentName;
    },
    transferData(data) {
      this.transferredData = data;
    }
  },
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

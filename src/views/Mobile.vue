<template>
    <van-tabbar v-model="active">
        <van-tabbar-item @click="showComponent('Left')">库存</van-tabbar-item>
        <van-tabbar-item @click="showComponent('Mid')">操作</van-tabbar-item>
        <van-tabbar-item @click="showComponent('Right')">日志</van-tabbar-item>
    </van-tabbar>
    <component :is="selectedComponent" />
</template>
<script>
import Mid from './Mid.vue'
import Left from './Left.vue'
import Right from './Right.vue'
export default {
    components: {
        Left,
        Mid,
        Right
    },
    name: 'Mobile',
    data() {
        return {
            active: 1,
            selectedComponent: null
        }
    },
    created() {
        this.showComponent('Mid');
    },
    methods: {
        showComponent(componentName) {
            this.selectedComponent = componentName;
        }
    }
}
</script>
<style></style>
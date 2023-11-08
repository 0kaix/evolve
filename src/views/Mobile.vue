<template>
    <van-tabbar v-model="active">
        <van-tabbar-item @click="showComponent('Left')">左边</van-tabbar-item>
        <van-tabbar-item @click="showComponent('Mid')">中间</van-tabbar-item>
        <van-tabbar-item @click="showComponent('Right')">右边</van-tabbar-item>
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
        showComponent(component) {
            this.selectedComponent = component;
        }
    }
}
</script>
<style></style>
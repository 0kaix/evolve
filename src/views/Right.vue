<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">

        </div>
    </div>
    <router-view />
</template>
<script>
import isMobile from '@/utils/isMobile.js';

export default {
    name: 'Right',
    mixins: [isMobile],

}
</script>
<style scoped>
.box {
    flex: 1;
    overflow: hidden;
}

.content {
    width: 100%;
    word-break: break-all;
}
</style>
<template>
    <div v-if="isMobile">

    </div>
    <div v-else class="box">
        <div class="content">

        </div>
    </div>
    <router-view />
</template>
<script setup>
import { useIsMobile } from '@/utils/isMobile.js';

const { isMobile } = useIsMobile();

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
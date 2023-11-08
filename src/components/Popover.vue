<template>
    <el-popover :virtual-ref="buttonRef" width="300" trigger="hover" :hide-after="0" virtual-triggering>
        <template #default>
            <div style="display: flex; gap: 16px; flex-direction: column">
                <div>
                    <p class="title">
                        <slot name="title">
                            子组件标题
                        </slot>
                    </p>
                    <p class="subtitle">
                        <slot name="subtitle">
                            子组件副标题
                        </slot>
                    </p>
                    <p class="content">
                        <slot name="content">
                            子组件内容
                        </slot>
                    </p>
                </div>

            </div>
        </template>
    </el-popover>
</template>
<script setup>
const props = defineProps({
    buttonRef: {
        required: false
    }
})
</script>
<style>
.title {
    margin: 0;
    font-size: 15px;
    font-weight: bold
}

.subtitle {
    margin: 0;
    font-size: 9px;
    color: gray
}

.content {
    margin: 0;
    font-size: 11px;
}
</style>
  
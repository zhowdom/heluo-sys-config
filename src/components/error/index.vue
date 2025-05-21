<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-error')
defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>

<template>
   <div :class="[bem()]">
    something happened error~~~~
   </div>
</template>

<style scoped lang="less">
.heluo-sys-error{}
</style>

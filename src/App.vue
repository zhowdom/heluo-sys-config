<script setup lang="ts">
import Float from '@/components/float/index.vue'
import Upheader from '@/components/upheader/index.vue'
import {useGlobalVisibleControllerStore} from '@/stores'
import { defineAsyncComponent } from 'vue';
import 'animate.css';
import { storeToRefs } from 'pinia'
const Warn = defineAsyncComponent(() => import('@/components/warn/index.vue'))
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-app-wrap')
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
</script>

<template>
  <div :class="[bem(), 'flex-center', 'height100']">
    <Float />
    <Upheader />
    <router-view />    
    <component v-if="globalVisiblePool.warn.state" :is="Warn" />
  </div>
</template>
<style scoped lang="less">
</style>

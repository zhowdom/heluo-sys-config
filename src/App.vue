<script setup lang="ts">
import Float from '@/components/float/index.vue'
import Upheader from '@/components/upheader/index.vue'
import {useGlobalVisibleControllerStore} from '@/stores'
import { defineAsyncComponent, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useLogin } from '@/hooks'
import { message } from 'ant-design-vue';

const Warn = defineAsyncComponent(() => import('@/components/warn/index.vue'))
import { createNamespace } from '@/utils'
import 'animate.css';

const { doLogin } = useLogin()
const { bem } = createNamespace('heluo-sys-app-wrap')
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const curSpaceCode = ref()
doLogin()



window.InformationOnTheRightRoom = (SpaceCode) => {
  curSpaceCode.value = SpaceCode
  globalVisibleControllerStore.globalControlVisible({name: 'manyou_two_pannel', state: false})
  globalVisibleControllerStore.globalControlVisible({name: 'office_dialog', state: true})
}

const closeFirstOfficeDialog = () => {
  globalVisibleControllerStore.globalControlVisible({name: 'manyou_two_pannel', state: true})
  globalVisibleControllerStore.globalControlVisible({name: 'office_dialog', state: false})
}

</script>

<template>
  <div :class="[bem(), 'flex-center', 'height100']">
    <Float />
    <Upheader />
    <router-view />    
    <component v-if="globalVisiblePool.warn.state" :is="Warn" />
    <officeDialog v-if="globalVisiblePool.office_dialog.state" @closeFirstOfficeDialog="closeFirstOfficeDialog" :SpaceCode="curSpaceCode" />
  </div>
</template>
<style scoped lang="less">
</style>

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



// 在楼层页面，全局显示办公室详情窗口方法，供给UE调用
window.InformationOnTheRightRoom = (SpaceCode) => {
  // globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
  curSpaceCode.value = SpaceCode
  // message.info(JSON.stringify(SpaceCode));
  globalVisibleControllerStore.globalControlVisible({name: 'manyou_two_pannel', state: false})
  // visibleOffice.value = true
  globalVisibleControllerStore.globalControlVisible({name: 'office_dialog', state: true})
}

// const visibleOffice = ref(false)
const closeFirstOfficeDialog = () => {
  globalVisibleControllerStore.globalControlVisible({name: 'manyou_two_pannel', state: true})
  globalVisibleControllerStore.globalControlVisible({name: 'office_dialog', state: false})
}

// 模拟UE主动调
// setTimeout(() => {
//   window.InformationOnTheRightRoom('F1W01')
// }, 5000)

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

<script setup lang="ts">
// import logoUrl from '@/assets/usedimg/mask@2x.png'
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import homeTop3Square from '@/components/homeTop3Square/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import smallDeviceinfo from '@/components/smallDeviceinfo/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'
import horizontalCharts from '@/components/horizontalCharts/index.vue'
import verticalCharts from '@/components/verticalCharts/index.vue'



import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { bem } = createNamespace('heluo-sys-home-wrap')
// 包装供UE调用全局方法
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <card name="introduction" position="left"></card>
      <card name="devicetotal" position="left"></card>
    </div>
    <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
    <div :class="[bem('r'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight', 'card-bg-com']">
      <!-- <card name="devicelist" position="right"></card> -->
      <homeTop3Square />
      <verticalCharts />
      <heluoSwiper />
      <!--设备信息小面板-->
      <div class="small-box-deviceinfo-wrap">
        <smallDeviceinfo />
        <smallDeviceinfo />
      </div>
      
      <div style="background: #313e41;width:100%;height: 22vh">
        <cardtitle name="设备使用率排行" />
        <horizontalCharts />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.heluo-sys-home-wrap{
  width: 100%;
  &__r{
    position: relative;
  }
  &__mrgl-auto{
    margin-left: auto;
  }
}
</style>

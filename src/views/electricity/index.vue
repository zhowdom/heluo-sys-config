<script setup lang="ts">
// import logoUrl from '@/assets/usedimg/mask@2x.png'
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'

import warnlogCard from '@/components/warnlogCard/index.vue'
import heluoSwiperSys from '@/components/heluoSwiperSys/index.vue'
import sysStatus from '@/components/sysStatus/index.vue'
import comSubTitle from '@/components/comSubTitle/index.vue'
import heluoSwiperDevice from '@/components/heluoSwiperDevice/index.vue'
import newDeviceItem from '@/components/newDeviceItem/index.vue'
import deviceDetailsPanel from '@/components/deviceDetailsPanel/index.vue'
import devicePureTxtpanel from '@/components/devicePureTxtpanel/index.vue'
import heluoSwiperLinkroom from '@/components/heluoSwiperLinkroom/index.vue'
import heluoSwiperDianwei from '@/components/heluoSwiperDianwei/index.vue'


import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { bem } = createNamespace('heluo-sys-electricity-wrap')
// 包装供UE调用全局方法
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <div>
        <cardtitle name="系统选择" />
        <heluoSwiperSys />
      </div>

 
      <div>
        <cardtitle name="系统状态" />
        <sysStatus />
      </div>

      <!--设备列表-->
      <div>
        <cardtitle name="设备列表" />
        <comSubTitle />
        <heluoSwiper />
        <comSubTitle />
        <heluoSwiperDevice />
        <newDeviceItem />

      </div>

    </div>
    <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
    <div :class="[bem('r'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight', 'card-bg-com']">
      <cardtitle name="设备详情" />
      <comSubTitle />
      <deviceDetailsPanel />
      <div class="device-infos-box">
        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />

        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />

        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />
        <devicePureTxtpanel />
      </div>
      <comSubTitle />
      <heluoSwiperLinkroom />
      <comSubTitle />
      <heluoSwiperDianwei />
      
    </div>
  </div>
</template>

<style scoped lang="less">
.heluo-sys-electricity-wrap{
  width: 100%;
  &__r{
    position: relative;
    .device-infos-box{
      width: 400px;
      display: flex;
      flex-wrap: wrap; /* 允许换行 */
      gap: 16px; /* 元素之间的间距，可调整 */
      padding: 16px; /* 容器内边距，可调整 */
    }
  }
  &__mrgl-auto{
    margin-left: auto;
  }
}
</style>

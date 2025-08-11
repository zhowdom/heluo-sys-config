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
import smallAirCondition from '@/components/smallAirCondition/index.vue'

import {ref, watch} from 'vue'
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

// 控制抽屉显示/隐藏
const drawerOpen = ref(false)
const openDrawer = () => { drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

// 当前选择的系统ID标识符
const curSystemId = ref(0);
const sysRef = ref()

watch(
  // 监听系统更改
  () => sysRef.value?.curActivedIdx,
  (newVal) => {
    curSystemId.value = newVal
  }
)

const handleDeviceChange = (s) => {
  // 根据设备ID来动态展示右侧的设备详情信息弹窗
  openDrawer()
}
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <div>
        <cardtitle name="系统选择" @click="openDrawer" />
        <heluoSwiperSys ref="sysRef" />
      </div>

 
      <div>
        <cardtitle name="系统状态" />
        <sysStatus />
      </div>

      <!--设备列表-->
      <div>
        <cardtitle name="设备列表" />
        <div style="height:10vh;padding-top: 12px;">
          <comSubTitle style="margin-bottom: 20px;" />
          <heluoSwiper />
        </div>
        <!-- <comSubTitle /> -->
        <!-- <heluoSwiperDevice /> -->
        <newDeviceItem @deviceChange="handleDeviceChange" />
        <newDeviceItem @deviceChange="handleDeviceChange" />
        <newDeviceItem @deviceChange="handleDeviceChange" />
        <newDeviceItem @deviceChange="handleDeviceChange" />
        <newDeviceItem @deviceChange="handleDeviceChange" />
        <newDeviceItem @deviceChange="handleDeviceChange" />
        

      </div>

    </div>
    <!-- <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
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
    </div> -->
    
      <a-drawer
      :title="null"
      :closable="false"
      :body-style="{ padding: 0, backgroundColor: 'transparent' }"
      :mask-style="{ backgroundColor: 'transparent' }"
      class="mk-drawer"
      :open="drawerOpen"
      @close="closeDrawer"
      width="480px"
      placement="right"
      @click.stop
    >
    <div class="drawer-wraper">
      <floor :class="[bem('mrgl-auto')]" />
      <div :class="[bem('r'), 'card-bg-com']">
        <cardtitle name="设备详情">
          <template #close>
            <div @click="closeDrawer" class="close-box">&times;</div>
          </template>
        </cardtitle>
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
        <comSubTitle v-if="curSystemId === 0 || curSystemId === 1" />
        <heluoSwiperLinkroom v-if="curSystemId === 0 || curSystemId === 1" />
        <smallAirCondition v-if="curSystemId === 2" />

        <!--机电-智能空调-右下角有设备点位的数据吗？？？这里先注释掉了-->
        <comSubTitle v-if="curSystemId === 0 || curSystemId === 1 || curSystemId === 3" />
        <heluoSwiperDianwei v-if="curSystemId === 0 || curSystemId === 1 || curSystemId === 3" />
        </div>
    </div>
    </a-drawer>
    
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
.drawer-wraper{

  display: flex;
  align-items: center;  /* 垂直居中 */
  justify-content: center; /* 水平居中（可选） */
  height: 100%; /* 高度占满父容器（抽屉内容区） */
  box-sizing: border-box;

  position: relative;
  .close-box{
    position: absolute;
    top:0;
    right:0;
    font-size: 23px;
  }
}
</style>
<style>
.ant-drawer-content-wrapper{
  box-shadow: none!important;
}
.ant-drawer-content-wrapper .mk-drawer{
  background: transparent!important;
}
</style>

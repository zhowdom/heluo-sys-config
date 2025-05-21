<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-float-menu')
import {UeReportType} from '@/types'
import {useUeConnect} from '@/hooks'
import { useRouter } from 'vue-router'
const router = useRouter()
const {ueConnect} = useUeConnect()
const handleToHome = () => {
  router.push({
    name: 'home',
    query: {},
  })
  ueConnect(UeReportType.FLOAT_MENU_HOME, { opt: '首页' })
}
</script>

<template>
   <div :class="[bem(), 'flex-center']">
    <img src="@assets/usedimg/east@3x.png" @click="ueConnect(UeReportType.FLOAT_DIRECTION, { opt: '东' })" />
    <img src="@assets/usedimg/south@3x.png" @click="ueConnect(UeReportType.FLOAT_DIRECTION, { opt: '南' })" />
    <img src="@assets/usedimg/home@3x.png" @click="handleToHome()" />
    <img src="@assets/usedimg/west@3x.png" @click="ueConnect(UeReportType.FLOAT_DIRECTION, { opt: '西' })" />
    <img src="@assets/usedimg/north@3x.png" @click="ueConnect(UeReportType.FLOAT_DIRECTION, { opt: '北' })" />
   </div>
</template>

<style scoped lang="less">
.heluo-sys-float-menu{
  width: 448px;
  height: 62px;
  position: absolute;
  bottom: 26px;
  margin-left: -224px;
  left: 50%;
  z-index: 200;
  background: linear-gradient( 180deg, rgba(69,94,90,0.61) 0%, rgba(12,12,20,0.2) 100%);
  box-shadow: 0px 6px 14px 0px rgba(0,42,72,0.4);
  border-radius: 8px 8px 8px 8px;
  img{
    height: 40px;
    width: 40px;
    cursor: pointer;
  }
}
</style>

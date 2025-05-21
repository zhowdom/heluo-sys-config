<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-weather')
import {useWeather} from '@/hooks'
import {UeReportType} from '@/types'
import {useUeConnect} from '@/hooks'
import {useGlobalVisibleControllerStore} from '@/stores'
const {getWeatherData, weatherInfos} = useWeather()
getWeatherData()
const {ueConnect} = useUeConnect()
const globalVisibleControllerStore = useGlobalVisibleControllerStore()

// for debugger
let toggle = false;
function toggleValue() {
  toggle = !toggle;
  return toggle;
}
</script>

<template>
   <div :class="[bem(), 'flex-center']">
    <div :class="[bem('infos'), 'flex-center']">
      <div :class="[bem('l'), 'flex-center']">
        <img src="@/assets/usedimg/qing@3x.png" @click="globalVisibleControllerStore.globalControlVisible({name: 'home_two_pannel', state: toggleValue()})" />
        <div :class="[bem('info-main')]">
          <p :class="bem('desc')">{{weatherInfos?.wea}}</p>
          <p :class="bem('temp')">{{weatherInfos?.tem}}</p>
        </div>
      </div>
      <div :class="bem('r')">{{weatherInfos?.week}}</div>
    </div>
    <div :class="bem('control')" @click="ueConnect(UeReportType.WEATHER)">天气控制</div>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-weather{
  position: fixed;
  top:10px;
  left: 20px;
  font-size: 16px;
  &__infos{
    img{
      height: 20px;
      width: 20px;
    }
  }
  &__r{
    padding-right: 40px;
  }
  &__control{
    cursor: pointer;
  }
  &__info-main{
    padding: 0 12px 0 8px;
  }
  &__desc{
    font-size: 12px;
  }
}
</style>

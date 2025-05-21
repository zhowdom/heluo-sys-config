<script setup lang="ts">
import { createNamespace } from '@/utils'
import {useFloor} from '@/hooks'
const { bem } = createNamespace('heluo-sys-floor')
import {onMounted} from 'vue'

import {UeReportType, IFloor} from '@/types'
import {useUeConnect} from '@/hooks'
const {ueConnect} = useUeConnect()

const props = defineProps<{
  path?: string
}>();
const {getFloorData, floorData, formatFloor, initFloor, getFloorlisttodevice, floorToDeviceList, getFloorlisttodeviceLoading} = useFloor(props.path)

onMounted(async () => {
  await getFloorData()
  initFloor()
})

defineExpose({
  floorToDeviceList,
  getFloorlisttodeviceLoading
})

const clickWraper = (item:IFloor) => {
  getFloorlisttodevice(item.spaceId)
  ueConnect(UeReportType.FLOOR, {opt: item.spaceCode})
}
</script>

<template>
   <div :class="[bem()]">
    <div :class="[bem('prev'), 'prev']"></div>
    <div class="scroll">
      <ul>
        <li v-for="(item, idx) in floorData" :key="idx" @click="clickWraper(item)">{{formatFloor(item?.spaceCode)}}</li>
      </ul>
    </div>
    <div :class="[bem('next'), 'next']"></div>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-floor{
  width: 88px;
  height: 380px;
  text-align:center;
  margin-right:10px;
  &__prev,&__next{
    height:20px;
    cursor: pointer;
    user-select: none;
    &.disabled{
      opacity: 0.8;
      cursor: not-allowed;
    }
  }
  &__prev{
    background: url('@assets/usedimg/floor-prev.png') no-repeat center / contain;
  }
  &__next{
    background: url('@assets/usedimg/floor-next.png') no-repeat center / contain;
  }
  .scroll{
    height: 340px;
    overflow: hidden;
    margin: 10px 0;
    position: relative;
    ul{
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: transform 0.3s ease-in-out;
    }
    li{
      height: 60px;
      margin-bottom:10px;
      line-height:60px;
      box-sizing: border-box;
      background: url('@assets/usedimg/floor.png') no-repeat center / contain;
      cursor: pointer;
      &.cur,&:hover{
        background: url('@assets/usedimg/floor-cur.png') no-repeat center / contain;
      }
    }
  }
}
</style>

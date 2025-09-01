<template>
    <div :class="[bem(), 'flex-between']" @click="handleEachDevice(props?.infos?.deviceId)">
      <div class="l">{{props?.infos?.modelName}}</div>
      <div class="r">设备编号：{{props?.infos?.deviceCode}}</div>
      <span :class="['point', props?.infos?.status === 'stopped' ? 'red' : '']"></span>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-newDeviceItem')

const props = defineProps(['infos']) 

const handleEachDevice = (deviceId) => {
  emit('deviceChange', deviceId)
}

const emit = defineEmits(['deviceChange'])
</script>
  
<style scoped lang="less">
  .heluo-sys-newDeviceItem{
    width: 95%;
    height: 40px;
    background: #293b42;
    text-indent: 32px;
    position: relative;
    margin: 0 auto 10px auto;
    cursor: pointer;
    border-bottom: 1px solid #293b42;
    border-radius: 3px;
    .point{
      height: 8px;
      width: 8px;
      border-radius: 100%;
      background: #32EAA2FF;
      position: absolute;
      top:14px;
      left: 10px;
      &.red{
        background: #FF6B57FF;
      }
    }
    .l{
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 20px;
    }
    .r{
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
      line-height: 20px;
      padding-right: 10px;
    }
    &:hover{
      background: linear-gradient( 180deg, rgba(45,240,231,0) 0%, rgba(45,240,231,0.3) 100%);
      border-bottom: 1px solid #29E3BF;
    }
  }
</style>
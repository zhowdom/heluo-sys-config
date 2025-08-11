<template>
    <div :class="[bem(), 'flex-between']" @click="handleEachDevice">
      <div class="l">新风机新风</div>
      <div class="r">设备编号：FC-001</div>
      <span class="point"></span>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-newDeviceItem')

const handleEachDevice = () => {
  emit('deviceChange', 'device-id')
}

const emit = defineEmits(['deviceChange'])
</script>
  
<style scoped lang="less">
  .heluo-sys-newDeviceItem{
    width: 100%;
    height: 40px;
    background: linear-gradient( 180deg, rgba(101,124,137,0.05) 0%, rgba(66,100,105,0.3) 100%);
    text-indent: 32px;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
    .point{
      height: 8px;
      width: 8px;
      border-radius: 100%;
      background: #32EAA2FF;
      position: absolute;
      top:14px;
      left: 10px;
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
      background: #2e5756;
    }
  }
</style>
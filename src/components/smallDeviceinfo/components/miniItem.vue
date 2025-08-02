<template>
    <div :class="bem()">
      <p class="name">报警设备</p>
      <p class="red desc">原子吸收罩</p>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-smallDeviceinfo-mini')

</script>
  
<style scoped lang="less">
  .heluo-sys-smallDeviceinfo-mini{
    font-size: 12px;
    .name{
      color: rgba(255,255,255,0.7);
      padding-bottom: 5px;
    }
    .desc{
      color: #fff;
    }
  }
</style>
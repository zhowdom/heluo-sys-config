<template>
    <!--机电-设备详情-右边小豆腐块纯文本信息面板组件-->
    <div :class="bem()">
      <span class="label">设备状态</span>
      <p class="val">施电器有限公司</p>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-puretxt-panel')

</script>
  
<style scoped lang="less">
  .heluo-sys-puretxt-panel{
    width: 176px;
    height: 53px;
    background: rgba(66,100,105,0.2);
    border-radius: 2px 2px 2px 2px;
    border-left: 1px solid rgba(255, 255, 255, .4);
    font-size: 14px;
    padding-left: 15px;
    padding-top: 6px;

    .label{
      color: rgba(255,255,255,0.9);
    }
    .val{
      color: #fff;
      padding-top: 4px;
    }
  }
</style>
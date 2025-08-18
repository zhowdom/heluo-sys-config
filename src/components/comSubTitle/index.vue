<template>
    <!--通用的副标题组件[带背景]-->
    <div :class="bem()">
      <span class="name">{{props?.titleName}}</span>
      <div class="bg">
        <img class="left" src="@/assets/usedimg/comsubtitle-0.png" />
        <img class="center" src="@/assets/usedimg/comsubtitle-1.png" />
        <img class="right" src="@/assets/usedimg/comsubtitle-2.png" />
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-comsubtitle')
const props = defineProps({
  titleName: {
    type: String,
    default: ''
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-comsubtitle{
    position: relative;
    text-align: center;
    width: 110px;
    height: 23px;
    .name{
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: normal;
      font-size: 14px;
      color: #fff;
      position: absolute;
      top:0;
      width: 100%;
      left: 0;
    }
    .bg{
      width: 110px;
      height: 23px;
      .left{
        width: 16px;
        height: 11px;
        margin-top:12px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      .center{
        width: 69px;
        height: 11px;
        margin-top:12px;
        position: absolute;
        bottom: 0;
        left: 16px;
      }
      .right{
        width: 28px;
        height: 18px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
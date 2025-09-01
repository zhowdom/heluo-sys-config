<template>
    <div :class="[bem(), 'flex-between']">
      <div class="each">
        <div class="num">{{props?.infos?.running}}</div>
        <div class="desc">在线设备</div>
      </div>
      <div class="each">
        <div class="num">{{props?.infos?.stopped}}</div>
        <div class="desc">离线设备</div>
      </div>
      <div class="each">
        <div class="num">{{props?.infos?.fault}}</div>
        <div class="desc">维护中</div>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
import {defineProps} from 'vue'
const { bem } = createNamespace('heluo-sys-sysStatus')

const props = defineProps(['infos'])

</script>
  
<style scoped lang="less">
  .heluo-sys-sysStatus{
    gap: 10px;
    height: 14vh;
    margin: 0 20px;
    .each{
      height: 90px;
      width:70px;
      background: url('@assets/usedimg/sysStatus@2x.png');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      position: relative;
      .num{
        font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
        font-weight: bold;
        font-size: 24px;
        color: #FF6B57;
        text-align: center;
        position: absolute;
        top:15px;
        left: 0;
        width: 100%;
      }
      .desc{
        font-size: 14px;
        color: #FFFFFF;
        line-height: 14px;
        text-align: center;
         margin-top:52px;
         position: absolute;
          bottom:-10px;
          left: 0;
          width: 100%;
      }
    }
  }
</style>
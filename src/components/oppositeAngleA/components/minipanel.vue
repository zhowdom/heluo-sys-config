<template>
    <div :class="bem()">
      <div class="name">{{props?.name}}</div>
      <div class="infos"><i>{{props?.unit}}</i><span style="margin-left: 5px;font-size: 11px;">{{props?.val}}</span></div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-opposite-angle-minipanel')
const props = defineProps({
  name: {
    type: String
  },
  val: {
    type: String
  },
  unit: {
    String
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-opposite-angle-minipanel{
    text-align: left;
    padding-left: 22px;
    height: 48px;
    margin-bottom: 2px;
    .name{
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 13px;
      color: #FFFFFF;
    }
    .infos{
      font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
      font-weight: bold;
      font-size: 17px;
      color: #00FBEC;
      text-shadow: 0px 0px 2px rgba(0,0,0,0.25);
      padding-bottom: 6px;
      span{
        color: #fff;
      }
      i{
        font-style: normal;
        font-size: 13px;
      }
    }
  }
</style>
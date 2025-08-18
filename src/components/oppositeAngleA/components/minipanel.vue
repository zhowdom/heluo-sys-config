<template>
    <div :class="bem()">
      <div class="name">{{props?.name}}</div>
      <div class="infos">{{props?.val}}{{props?.unit}}</div>
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
    margin-right: 20px;
    .name{
      font-family: Source Han Sans CN, Source Han Sans CN;
      font-weight: 400;
      font-size: 14px;
      color: #FFFFFF;
    }
    .infos{
      font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
      font-weight: bold;
      font-size: 18px;
      color: #00FBEC;
      text-shadow: 0px 0px 2px rgba(0,0,0,0.25);
    }
  }
</style>
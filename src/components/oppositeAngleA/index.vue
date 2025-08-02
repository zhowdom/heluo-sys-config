<template>
    <div :class="bem()">
      <div class="title">实验室01</div>

      <div class="colum1">
        <minipanel style="margin-bottom: 5px;" />
        <minipanel />
      </div>
      <div class="colum2">
        <minipanel style="margin-bottom: 5px;" />
        <minipanel />
      </div>
      <div class="colum3">
        <minipanel style="margin-bottom: 5px;" />
        <minipanel />
      </div>
      <div class="colum4">
        <minipanel />
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
import minipanel from './components/minipanel.vue'
const { bem } = createNamespace('heluo-sys-opposite-angle-a')
  
</script>
  
<style scoped lang="less">
  .heluo-sys-opposite-angle-a{
    position: relative;
    padding-top: 50px;
    padding-left: 25px;
    width: 368px;
    height: 154px;
    background: url('@assets/usedimg/opposite-angle-a@2x.png') no-repeat center / cover;
    display: flex;
    box-sizing: border-box;
    .title{
      position: absolute;
      top:12px;
      left: 17px;
    }
  }
</style>
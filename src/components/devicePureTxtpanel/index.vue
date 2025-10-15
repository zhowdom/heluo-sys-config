<template>
    <div :class="[bem(), infos?.isAirConditioner ? 'isAirConditioner-panel' : '']">
      <span class="label">{{ infos?.name }}</span>
      <p class="val txtellipsis">{{ infos?.val }}</p>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-puretxt-panel')

const props = defineProps(['infos'])
</script>
  
<style scoped lang="less">
  .heluo-sys-puretxt-panel{
    width: 176px;
    height: 14%;
    background: rgba(35, 53, 57, .8);
    border-radius: 4px;
    border-left: 1px solid #fff;
    font-size: 14px;
    padding-left: 15px;
    box-sizing: border-box;
    margin-top: 10px;
    align-content: center;
    &:nth-child(odd){
      float: left;
    }
    &:nth-child(even){
      float: right;
    }
    .label{
      color: rgba(255,255,255,0.7);
    }
    .val{
      color: #fff;
      padding-top: 10px;
      font-weight: 400;
      font-size: 13px;
    }
  }
  .isAirConditioner-panel{
    height: 13.5%;
    .val{
      padding-top: 1px;
    }
  }
</style>
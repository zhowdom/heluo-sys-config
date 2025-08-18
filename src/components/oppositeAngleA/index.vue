<template>
    <div :class="bem()">
      <div class="title">{{props.name}}222</div>

      <div class="colum1">
        <!-- <minipanel :name="props.infos?.attributeName" :val="props.infos?.value" :unit="props.infos?.attributeCode" /> -->
        <minipanel name="室内温度1" val="23.5" unit="℃" />
        <minipanel name="室内温度" val="23.5" unit="℃" />
      </div>
      <div class="colum2">
        <minipanel name="光照" val="1.0" unit="A" />
        <minipanel name="室内温度" val="54" unit="%" />
      </div>
      <div class="colum3">
        <minipanel name="CO₂" val="23.5" unit="ppm" />
        <minipanel name="甲醛" val="23" unit="mg/m³" />
      </div>
      <div class="colum4">
        <minipanel name="PM2.5" val="23.5" unit="优" />
        <minipanel name="PM2.5" val="23.5" unit="优" />
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
import minipanel from './components/minipanel.vue'
const { bem } = createNamespace('heluo-sys-opposite-angle-a')
const props = defineProps(['infos', 'name'])
</script>
  
<style scoped lang="less">
  .heluo-sys-opposite-angle-a{
    position: relative;
    padding-top: 50px;
    padding-left: 25px;
    width: 368px;
    height: 154px;
    margin: 0 auto;
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
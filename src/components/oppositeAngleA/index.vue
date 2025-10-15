<template>
    <div :class="bem()">
      <div class="title">{{name}}</div>
      <div class="wrap-box flex-between">
        <div class="wrap-box flex-between" v-if="eachinfos?.length <= 5">
            <minipanel :name="eachinfos?.[0]?.name" :val="eachinfos?.[0]?.unitName" :unit="eachinfos?.[0]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[1]?.name" :val="eachinfos?.[1]?.unitName" :unit="eachinfos?.[1]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[2]?.name" :val="eachinfos?.[2]?.unitName" :unit="eachinfos?.[2]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[3]?.name" :val="eachinfos?.[3]?.unitName" :unit="eachinfos?.[3]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[4]?.name" :val="eachinfos?.[4]?.unitName" :unit="eachinfos?.[4]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[5]?.name" :val="eachinfos?.[5]?.unitName" :unit="eachinfos?.[5]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[6]?.name" :val="eachinfos?.[6]?.unitName" :unit="eachinfos?.[6]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[7]?.name" :val="eachinfos?.[7]?.unitName" :unit="eachinfos?.[7]?.values?.[0]?.['value']" />
        </div>
        <div  class="wrap-box flex-between" v-else>
          <div class="colum1">
            <minipanel :name="eachinfos?.[0]?.name" :val="eachinfos?.[0]?.unitName" :unit="eachinfos?.[0]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[1]?.name" :val="eachinfos?.[1]?.unitName" :unit="eachinfos?.[1]?.values?.[0]?.['value']" />
          </div>
          <div class="colum2">
            <minipanel :name="eachinfos?.[2]?.name" :val="eachinfos?.[2]?.unitName" :unit="eachinfos?.[2]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[3]?.name" :val="eachinfos?.[3]?.unitName" :unit="eachinfos?.[3]?.values?.[0]?.['value']" />
          </div>
          <div class="colum3">
            <minipanel :name="eachinfos?.[4]?.name" :val="eachinfos?.[4]?.unitName" :unit="eachinfos?.[4]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[5]?.name" :val="eachinfos?.[5]?.unitName" :unit="eachinfos?.[5]?.values?.[0]?.['value']" />
          </div>
          <div class="colum4">
            <minipanel :name="eachinfos?.[6]?.name" :val="eachinfos?.[6]?.unitName" :unit="eachinfos?.[6]?.values?.[0]?.['value']" />
            <minipanel :name="eachinfos?.[7]?.name" :val="eachinfos?.[7]?.unitName" :unit="eachinfos?.[7]?.values?.[0]?.['value']" />
          </div>
        </div>
      </div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
import minipanel from './components/minipanel.vue'
const { bem } = createNamespace('heluo-sys-opposite-angle-a')
import {computed} from 'vue'
const props = defineProps(['eachinfos', 'name', 'type'])
</script>
  
<style scoped lang="less">
  .heluo-sys-opposite-angle-a{
    position: relative;
    padding-top: 35px;
    width: 368px;
    height: 154px;
    margin: 0 auto;
    background: url('@assets/usedimg/opposite-angle-a@2x.png') no-repeat center / cover;
    display: flex;
    box-sizing: border-box;       
    .wrap-box{
      width: 100%;
      .colum1,.colum2,.colum3,.colum4{
        flex: 1;
      }
    }
    .title{
      position: absolute;
      top:12px;
      // width: 97px;
      height: 28px;
      left: 17px;
      font-size: 14px;
      background: url('@assets/usedimg/s123.png') no-repeat center / cover;
      text-align: center;
    }
  }
</style>
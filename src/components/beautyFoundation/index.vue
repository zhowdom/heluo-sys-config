<template>
    <div :class="bem()">
      <div :class="[bem('top')]">
        <span :class="bem('val')">{{props.infos.attributeValue}}</span>
        <span  :class="bem('unit')">{{props.infos.unitName}}</span>
      </div>
      
      <div class="flex-center">
        <span :class="[bem('subdesc'), 'txtellipsis']">{{props.infos.attributeName}}</span>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
import {IBeautyFoundation} from '@/types'
import {PropType} from 'vue'
const { bem } = createNamespace('heluo-sys-beauty-foundation-wrapper')

const props = defineProps({
  topType: {
    type: Number,
    default: 1
  },
  infos: {
    type: Object as PropType<IBeautyFoundation>
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-beauty-foundation-wrapper{
    /*安防右下角尺寸来的*/
    height: 96px;
    width: 105px;
    background: url('@assets/usedimg/beauty-foundation@2x.png') no-repeat center / cover;
    background-size: 105px 96px;
    &__top{
      padding-top: 13px;
      text-align: center;
    }
    &__val{
      font-family: D-DIN-DIN, D-DIN-DIN;
      font-weight: bold;
      font-size: 20px;
      color: #37EAFF;
    }
    &__unit{
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: normal;
      font-size: 14px;
      color: #FFFFFF;
      padding-left: 5px;
    }
    &__subdesc{
      font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
      font-weight: normal;
      font-size: 14px;
      color: #FFFFFF;
      text-shadow: 0px 2px 3px rgba(0,0,0,0.5);
      max-width: 96%;
    }
  }
</style>

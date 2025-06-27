<script setup lang="ts">
import { PropType, computed } from 'vue'
import {useCard} from '@/hooks'
import { createNamespace } from '@/utils'
import {CardTypeNames} from '@/types'
const { bem } = createNamespace('heluo-sys-card-wrapper')

import cardtitle from '../cardtitle/index.vue'
import seat from '../seat/index.vue'
import cardItem from '../cardItem/index.vue'
import cardItemb from '../cardItemb/index.vue'
import cardItemIntro from '../cardItemIntro/index.vue'
import cardItemTotal from '../cardItemTotal/index.vue'
import cardItemDeviceList from '../cardItemDeviceList/index.vue'

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  position: {
    type: String,
    default: 'left'
  }
})
const {getCardData, cardInfos} = useCard(props.name)
// getCardData() // 二期没有普通类型的卡片展示
const computedH = computed(() => {
  switch(props.name) {
    case 'introduction':
     return '56vh' // 项目介绍卡片高度占整屏高度58%（572/980=0.58）
    case 'devicetotal':
     return '32vh' // 设备总数卡片高度占整屏高度30%（288/980=0.3）
    case 'devicelist':
     return '88vh' // 设备列表卡片高度占整屏高度88%（860/980=0.88）
    default: 
     return '29vh' // 普通常规通用卡片高度占整屏高度29% (286px/980px=0.29)
  }
})
</script>

<template>
   <div :class="bem()" :style="{height: computedH}">
    <cardtitle :name="CardTypeNames[name]" />
    <div :class="[bem('device-card-inner'), 'flex-between']" :data-set="name">
      <!--项目介绍卡片-->
      <template v-if="name === 'introduction'">
        <cardItemIntro />
      </template>
      <!--设备总数卡片-->
      <template v-else-if="name === 'devicetotal'">
        <cardItemTotal />
      </template>
      <!--设备列表（2期改版）卡片-->
      <template v-else-if="name === 'devicelist'">
        <cardItemDeviceList :cardInfos="cardInfos" />
      </template>
      <!--设备态势卡片-->
      <template v-else-if="name === 'devicesituation'">
        <cardItemb :cardInfos="cardInfos" />
      </template>
      <!--智能空调、新风系统等通用样式类卡片-->
      <template v-else>
        <seat :name="name" />
        <cardItem :cardInfos="cardInfos" />
      </template>
    </div>
   </div>
</template>

<style scoped lang="less">
@import url('./index.less');
.heluo-sys-card-wrapper:extend(.cardboxwrap){
  position:relative;
  &__device-card-inner{
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>

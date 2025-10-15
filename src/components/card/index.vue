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
const computedH = computed(() => {
  switch(props.name) {
    case 'introduction':
     return '56vh'
    case 'devicetotal':
     return '32vh'
    case 'devicelist':
     return '88vh'
    default: 
     return '29vh'
  }
})
</script>

<template>
   <div :class="[bem(), 'card-bg-com']" :style="{height: computedH}">
    <cardtitle :name="CardTypeNames[name]" />
    <div :class="[bem('device-card-inner'), 'flex-between']" :data-set="name">
      <template v-if="name === 'introduction'">
        <cardItemIntro />
      </template>
      <template v-else-if="name === 'devicetotal'">
        <cardItemTotal />
      </template>
      <template v-else-if="name === 'devicelist'">
        <cardItemDeviceList :cardInfos="cardInfos" />
      </template>
      <template v-else-if="name === 'devicesituation'">
        <cardItemb :cardInfos="cardInfos" />
      </template>
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

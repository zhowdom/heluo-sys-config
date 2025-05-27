<script setup lang="ts">
import { PropType } from 'vue'
import {useCard} from '@/hooks'
import { createNamespace } from '@/utils'
import {CardTypeNames} from '@/types'
const { bem } = createNamespace('heluo-sys-card-wrapper')

import cardtitle from '../cardtitle/index.vue'
import seat from '../seat/index.vue'
import cardItem from '../cardItem/index.vue'
import cardItemb from '../cardItemb/index.vue'

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
getCardData()
</script>

<template>
   <div :class="bem()">
    <cardtitle :name="CardTypeNames[name]" />
    <div :class="[name === 'devicesituation' ? bem('device-card') : bem('main-card'), 'flex-between']" :data-set="name">
      <template v-if="name === 'devicesituation'">
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
  &__main-card:extend(.maincardbox){
    width: 100%;
  }
  &__device-card{
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>

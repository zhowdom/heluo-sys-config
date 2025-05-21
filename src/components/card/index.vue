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
    <template v-if="name === 'devicesituation'">
      <cardItemb :cardInfos="cardInfos" />
    </template>
    <template v-else>
      <seat :name="name" />
      <cardItem :cardInfos="cardInfos" />
    </template>
   </div>
</template>

<style scoped lang="less">
@import url('./index.less');
.heluo-sys-card-wrapper:extend(.cardboxwrap){
  position:relative;
}
</style>

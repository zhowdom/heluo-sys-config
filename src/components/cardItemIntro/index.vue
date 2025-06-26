<script setup lang="ts">
import { createNamespace } from '@/utils'
import { ICardCommonInfos } from '@/types'
import {useIntroduceInfos} from '@/hooks'
const { bem } = createNamespace('heluo-sys-card-item-intro')
import { PropType, onMounted } from 'vue'
defineProps({
  cardInfos: {
    type: Object as PropType<ICardCommonInfos>,
  }
})
const {introduceInfos, getData} = useIntroduceInfos()
onMounted(() => {
  getData()
})
</script>

<template>
   <div :class="bem()">
    <div :class="bem('img-box')">
      <img :src="introduceInfos.image">
    </div>
    <div class="txt">
      <p class="autoWrap">
      {{introduceInfos.introduction}}
      </p>
    </div>
   </div>
</template>

<style scoped lang="less">
@bdcolor: rgba(98, 201, 175);
.heluo-sys-card-item-intro{
  height: 100%;
  width: 100%;
  &__img-box{
    width: calc(100% - 32px);
    height: 38%;
    padding: 6px;
    border:1px solid @bdcolor;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top:16px;
    &::after {
      position: absolute;
      bottom: 0;
      right: 0;
      content: '';
      display: block;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 6px 6px;
      border-color: transparent transparent #ba2 transparent;
    }
    &::before {
      position: absolute;
      bottom: 78px;
      right: -255px;
      content: '';
      height: 1px;
      width: 100%;
      background: @bdcolor;
      transform: rotate(136deg);
      transform-origin: center;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  .txt{
    height: 52%;
    overflow-y: scroll;
    margin: 16px 0;
  }
  p{
    font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
    font-weight: normal;
    font-size: 14px;
    color: #FFFFFF;
    font-style: normal;
    padding: 0 16px;
  }
}
</style>

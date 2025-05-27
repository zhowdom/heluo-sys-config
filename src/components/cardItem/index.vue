<script setup lang="ts">
import { createNamespace } from '@/utils'
import { ICardCommonInfos } from '@/types'
import { PropType } from 'vue'
const { bem } = createNamespace('heluo-sys-card-item')
defineProps({
  cardInfos: {
    type: Object as PropType<ICardCommonInfos>,
  }
})
</script>

<template>
   <div :class="[bem(), 'flex-wrap', 'flex-between']">
    <div :class="bem('mini')">
      <div :class="bem('name')">总数</div>
      <p :class="bem('val')">{{cardInfos.all}}</p>
    </div>
    <div :class="bem('mini')">
      <div :class="bem('name')">运行状态</div>
      <p :class="bem('val')">{{cardInfos.running}}</p>
    </div>
    <div :class="bem('mini')">
      <div :class="bem('name')">停止</div>
      <p :class="bem('val')">{{cardInfos.stopped}}</p>
    </div>
    <div :class="bem('mini')">
      <div :class="bem('name')">报警</div>
      <p :class="bem('val')">{{cardInfos.fault}}</p>
    </div>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-card-item{
  width:209px;
  // height:172px;
  height:74%;
  margin-right:20px;
  &__mini{
    width: 84px;
    height:61px;
    text-align:center;
    &:last-child{
      p{
        color: #FF6F6F;
      }
    }
  }
  &__name{
    height: 26px;
    line-height:26px;
    background: url('@assets/usedimg/carditem-bg@3x.png') no-repeat center / cover;
    font-size: 1.45rem;
  }
  &__val{
    font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
    font-weight: bold;
    // font-size: 32px;
    font-size: 2.5rem;
    color: #FFFFFF;
    margin-top:6%;
  }
}
</style>

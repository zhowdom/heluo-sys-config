<script setup lang="ts">
import { createNamespace } from '@/utils'
import { ICardCommonInfos } from '@/types'
const { bem } = createNamespace('heluo-sys-card-item-b')
import { PropType } from 'vue'
defineProps({
  cardInfos: {
    type: Object as PropType<ICardCommonInfos>,
  }
})
</script>

<template>
   <div :class="[bem(), 'flex-wrap', 'flex-center']">
    <div :class="[bem('mini'), 'flex-between']">
      <div :class="[bem('l'), 'set-devices-img-media']">
        <img src="@assets/usedimg/taishi-1@3x(1).png">
      </div>
      <div :class="bem('r')">
        <p>接入设备数</p>
        <div class="num set-devices-fts-media">{{cardInfos.exceptionCount}}</div>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="[bem('l'), 'set-devices-img-media']">
        <img src="@assets/usedimg/taishi-2@3x(3).png">
      </div>
      <div :class="bem('r')">
        <p>运行设备数</p>
        <div class="num set-devices-fts-media">{{cardInfos.runingCount}}</div>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="[bem('l'), 'set-devices-img-media']">
        <img src="@assets/usedimg/taishi-3@3x.png">
      </div>
      <div :class="bem('r')">
        <p>故障设备数</p>
        <div class="num set-devices-fts-media">{{cardInfos.offlineCount}}</div>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="[bem('l'), 'set-devices-img-media']">
        <img src="@assets/usedimg/taishi-4@3x(2).png">
      </div>
      <div :class="bem('r')">
        <p>警告设备数</p>
        <div class="num set-devices-fts-media">{{cardInfos.failureCount}}</div>
      </div>
    </div>

   </div>
</template>

<style scoped lang="less">
.heluo-sys-card-item-b{
  height: 100%;
  &__mini{
    width:160px;
    // height:70px;
    height:45%;
    &:nth-child(1),&:nth-child(2){
      margin-top:3%;
    }
    &:nth-child(3),&:nth-child(4){
      margin-top:-10%;
    }
  }
  &__l img{
    width: 100%;
    height: 100%;
  }
  &__r{
    p{
      font-size: 1.5rem;
    }
    .num{
      font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
      font-weight: bold;
      color: #FFFFFF;
      text-align: center;
      padding-top: 1%;
    }
  }
}
</style>

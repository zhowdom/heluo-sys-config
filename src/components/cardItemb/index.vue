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
      <div :class="bem('l')">
        <img src="@assets/usedimg/taishi-1@3x(1).png">
      </div>
      <div :class="bem('r')">
        <p>接入设备数</p>
        <p class="num">{{cardInfos.exceptionCount}}</p>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="bem('l')">
        <img src="@assets/usedimg/taishi-2@3x(3).png">
      </div>
      <div :class="bem('r')">
        <p>运行设备数</p>
        <p class="num">{{cardInfos.runingCount}}</p>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="bem('l')">
        <img src="@assets/usedimg/taishi-3@3x.png">
      </div>
      <div :class="bem('r')">
        <p>故障设备数</p>
        <p class="num">{{cardInfos.offlineCount}}</p>
      </div>
    </div>

    <div :class="[bem('mini'), 'flex-between']">
      <div :class="bem('l')">
        <img src="@assets/usedimg/taishi-4@3x(2).png">
      </div>
      <div :class="bem('r')">
        <p>警告设备数</p>
        <p class="num">{{cardInfos.failureCount}}</p>
      </div>
    </div>

   </div>
</template>

<style scoped lang="less">
.heluo-sys-card-item-b{
  margin-top:20px;
  &__mini{
    width:160px;
    height:70px;
    margin-bottom:10px;
  }
  &__l{
    img{
      width:70px;
      height:75px;
    }
  }
  &__r{
    p.num{
      font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
      font-weight: bold;
      font-size: 21px;
      color: #FFFFFF;
    }
  }
}
</style>

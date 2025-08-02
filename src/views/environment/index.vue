<script setup lang="ts">
// import logoUrl from '@/assets/usedimg/mask@2x.png'
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'
import oppositeAngleA from '@/components/oppositeAngleA/index.vue'
import heluoSwiperPressure from '@/components/heluoSwiperPressure/index.vue'
import warnlogCard from '@/components/warnlogCard/index.vue'


import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { bem } = createNamespace('heluo-sys-home-wrap')
// 包装供UE调用全局方法
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <!--环境实时监测-->
      <div>
        <cardtitle name="环境实时监测" />
        <oppositeAngleA />
      </div>

      <!--温湿度趋势-->
      <div>
        <cardtitle name="温湿度趋势" />
        <heluoSwiper />
        <div style="height: 260px;width: 100%;background: #2e3e42;">曲线统计图</div>
      </div>

      <!--压差实时监测-->
      <div>
        <cardtitle name="压差实时监测" />
        <div class="main-presure">
          <heluoSwiperPressure />
        </div>
        
      </div>

    </div>
    <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
    <div :class="[bem('r'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight', 'card-bg-com']">
      <cardtitle name="余风量趋势" />
      <heluoSwiper />
      <div style="background: #313e41;width:100%;height: 160px;">曲线图表</div>

      <cardtitle name="报警记录" />
      <div class="warnlog-box">
        <warnlogCard />
        <warnlogCard />
        <warnlogCard />
        <warnlogCard />
        <warnlogCard />
        <warnlogCard />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.heluo-sys-home-wrap{
  width: 100%;
  &__r{
    position: relative;
  }
  &__mrgl-auto{
    margin-left: auto;
  }
}
</style>

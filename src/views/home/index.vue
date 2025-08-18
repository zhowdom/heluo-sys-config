<script setup lang="ts">
// import logoUrl from '@/assets/usedimg/mask@2x.png'
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import homeTop3Square from '@/components/homeTop3Square/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import smallDeviceinfo from '@/components/smallDeviceinfo/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'
import horizontalCharts from '@/components/horizontalCharts/index.vue'
import verticalCharts from '@/components/verticalCharts/index.vue'
import {ref, onMounted} from 'vue'


import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
import {home_safe_situationApi} from '@/apis'
import {SwiperPropsType} from '@/types'


const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)

const { bem } = createNamespace('heluo-sys-home-wrap')
// 包装供UE调用全局方法
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}

const listdata = ref([])
const warnList = ref([])
const res_warnList = ref([])
const infos = ref({})
const chartlist = ref([])
const chartData = ref([])

const updateCurIndex = (payload) => {
  warnList.value = res_warnList.value[payload.idx]['details'] || []
}
const get_home_safe_situationApi = async () => {
  const res = await home_safe_situationApi({
    cardCode: 'security_situation'
  })
  // swiper的数据
  listdata.value = (res?.data?.data?.typeDetial || []).map((item, idx) => {
    let {typeCode, typeName, ...a} = item
    if (typeCode !== 'all') {
      return {
        typeCode,
        typeName: typeName + '报警',
        ...a
      }
    }
    return item
  })
  // 接口返回的下面报警列表数据-预先存一份整体
  res_warnList.value = res?.data?.data?.typeDetial || []
  // 下面报警列表数据
  warnList.value = (res?.data?.data?.typeDetial || [])[0]['details'] || []
  // 顶部3大块统计
  infos.value = res?.data?.data?.processSummary
  // 柱状图数据
  chartlist.value = res?.data?.data?.typeSummary || []
}


// 设备使用排行榜
const getDeviceUseRanking = async () => {
  const res = await home_safe_situationApi({
    cardCode: 'device_ranking'
  })
  chartData.value = res?.data?.data || []
}

onMounted(() => {
  get_home_safe_situationApi()
  getDeviceUseRanking()
})
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <card name="introduction" position="left"></card>
      <card name="devicetotal" position="left"></card>
    </div>
    <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
    <div :class="[bem('r'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight', 'card-bg-com']">
      <!-- <card name="devicelist" position="right"></card> -->
      <homeTop3Square :infos="infos" />
      <verticalCharts :chartlist="chartlist" />
      <heluoSwiper :swiper-data="listdata" @updateCurIndex="updateCurIndex" :type="SwiperPropsType.WarnType" />
      <!--设备信息小面板-->
      <div class="small-box-deviceinfo-wrap">
        <div v-for="(item, idx) in warnList" :key="idx">
          <smallDeviceinfo :infos="item" />
        </div>
      </div>
      
      <div style="background: #313e41;width:100%;height: 22vh">
        <cardtitle name="设备使用率排行" />
        <horizontalCharts :chartData="chartData" />
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
  .small-box-deviceinfo-wrap{
    height: 28vh;
    overflow-y: scroll;
    margin: 10px 0;
    box-sizing: border-box;
  }
}
</style>

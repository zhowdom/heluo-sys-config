<script setup lang="ts">
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'
import oppositeAngleA from '@/components/oppositeAngleA/index.vue'
import heluoSwiperPressure from '@/components/heluoSwiperPressure/index.vue'
import warnlogCard from '@/components/warnlogCard/index.vue'
import swiperEcharts from '@/components/swiperEcharts/index.vue'
import curlyLineChartsForWind from '@/components/curlyLineChartsForWind/index.vue'
import composeSwiper from '@/components/composeSwiper/index.vue'


import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
import {ref, onMounted, watch} from 'vue'
import {getSpaceInfoApi_new, roomListApi, sencedeviceApi, warnlistApi, getAllEnvDataLogApi, getEnvironmentDataApi, obtainSpacePressureDifferenceApi} from '@/apis'
import {SwiperPropsType} from '@/types'

const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { bem } = createNamespace('heluo-sys-home-wrap')
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}

const listdata = ref([
  { typeCode: '实验室101'},
  { title: '实验室102'},
  { title: '实验室103'},
  { title: '实验室104'},
  { title: '实验室105'},
  { title: '实验室106'},
  { title: '实验室107'},
])
const listdata2 = ref([
  { title: '传感器1'},
  { title: '传感器2'},
  { title: '传感器3'},
  { title: '传感器4'},
  { title: '传感器5'},
  { title: '传感器6'},
  { title: '传感器7'},
])

const warnlogList = ref([])
const cur_spaceId = ref('')
const cur_spaceName = ref('')
const cur_deviceId = ref('')
const swiperdData = ref([])
const myswiper = ref()
const curEnvironmentInfos = ref()
const all_watchInfos = ref()
const obtainSpacePressureDifferenceList = ref([])

const handleShiYanShi = (payload) => {
  cur_spaceId.value = payload?.queryCode
  cur_spaceName.value = listdata.value.find(v => {
    return v?.spaceId === payload?.queryCode
  })['spaceName']
  temperatureChartData()
}
const handleChuanGanQi = (payload) => {
  cur_deviceId.value = payload?.queryCode
  temperatureChartData()
}

const runRoomListApi = async () => {
  const res = await roomListApi({
    floorId: '',
    systemCode: 'ENVM'
  })
  listdata.value = res?.data?.data || []
  cur_spaceId.value = (res?.data?.data || [])?.[0]?.['spaceId']
  cur_spaceName.value = (res?.data?.data || [])?.[0]?.['spaceName']
}
const runSencedeviceApi = async () => {
  const res = await sencedeviceApi(
    {
    onlineStatus: "",
    spaceId: cur_spaceId.value,
    systemCode: "ENVM",
    typeCode: "EnvironmentalMonitor" 
  }
)
listdata2.value = res?.data?.data || []
  cur_deviceId.value = (res?.data?.data || [])?.[0]?.['deviceId']
}

const temperatureChartData = async () => {
  const res = await getAllEnvDataLogApi({
    deviceId: cur_deviceId.value,
    firstTime: "15:00:00",
    interval: "86400",
    lastNum: "7",
    lastTimeType: "LastDay",
    timeType: "LastTime"
  })
  swiperdData.value = res?.data?.data || []
}


const runGetSpaceInfoApi = async () => {
  const res = await getSpaceInfoApi_new({
    SpaceIds: ''
  })
  curEnvironmentInfos.value = res?.data?.data
}

const runWarnlistApi = async () => {
  const res = await warnlistApi(
    {
      "type": "space_alarm",
      "pageIndex": 1,
      "pageLength": 10000
    }
  )
  warnlogList.value = res?.data?.data || []
}

const getEnvironmentData = async () => {
const res = await getEnvironmentDataApi()
all_watchInfos.value = res?.data?.data
}

const composeQueryCharts = async () => {
  await runRoomListApi()
  await runSencedeviceApi()
  await temperatureChartData()
}

const runobtainSpacePressureDifferenceApi = async () => {
  const res = await obtainSpacePressureDifferenceApi()
  obtainSpacePressureDifferenceList.value = res?.data?.data || []
}

onMounted(async () => {
  await composeQueryCharts()
  runGetSpaceInfoApi()
  runobtainSpacePressureDifferenceApi()
  runWarnlistApi()
  getEnvironmentData()
})

watch(
  () => cur_spaceId.value,
  (newVal) => {
    runSencedeviceApi()
  }
)

</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <div class="card-bg-com">
        <cardtitle name="环境实时监测" />
         <composeSwiper :all_watchInfos="all_watchInfos" />
      </div>

      <div class="card-bg-com">
        <cardtitle name="环境趋势" />
        <div class="com-swiper-wrap" style="height: 6vh;">
          <heluoSwiper :swiper-data="listdata" @updateCurIndex="handleShiYanShi" :type="SwiperPropsType.ShiYanShi" />
        </div>
        <div class="com-swiper-wrap" style="height: 3vh;">
          <heluoSwiper :swiper-data="listdata2" @updateCurIndex="handleChuanGanQi" :type="SwiperPropsType.ChuanGanQi" />
        </div>
        <swiperEcharts :swiperdData="swiperdData" ref="myswiper" />
      </div>

      <div class="card-bg-com">
        <cardtitle name="压差实时监测" />
        <div class="main-presure flex-center">
          <heluoSwiperPressure :list="obtainSpacePressureDifferenceList" />
        </div>
        
      </div>

    </div>
    <floor :class="[bem('mrgl-auto'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight']" />
    <div :class="[bem('r'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? 'animate__backInRight' : 'animate__backOutRight', 'card-bg-com']">
      <cardtitle name="余风量趋势" />
      <div class="com-swiper-wrap">
        <heluoSwiper :swiper-data="listdata" :type="SwiperPropsType.ShiYanShi" />
      </div>
      <curlyLineChartsForWind />

      <cardtitle name="报警记录" />
      <div class="warnlog-box">
        <warnlogCard v-for="(item, idx) in warnlogList" :key="idx" :infos="item" />
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
  .warnlog-box{
    height: calc(63vh - 100px);
    overflow-y: scroll;
  }
}
</style>
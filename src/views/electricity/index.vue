<script setup lang="ts">
// import logoUrl from '@/assets/usedimg/mask@2x.png'
import card from '@/components/card/index.vue'
import floor from '@/components/floor/index.vue'
import heluoSwiper from '@/components/heluoSwiper/index.vue'
import cardtitle from '@/components/cardtitle/index.vue'

import warnlogCard from '@/components/warnlogCard/index.vue'
import heluoSwiperSys from '@/components/heluoSwiperSys/index.vue'
import sysStatus from '@/components/sysStatus/index.vue'
import comSubTitle from '@/components/comSubTitle/index.vue'
import heluoSwiperDevice from '@/components/heluoSwiperDevice/index.vue'
import newDeviceItem from '@/components/newDeviceItem/index.vue'
import deviceDetailsPanel from '@/components/deviceDetailsPanel/index.vue'
import devicePureTxtpanel from '@/components/devicePureTxtpanel/index.vue'
import heluoSwiperLinkroom from '@/components/heluoSwiperLinkroom/index.vue'
import heluoSwiperDianwei from '@/components/heluoSwiperDianwei/index.vue'
import smallAirCondition from '@/components/smallAirCondition/index.vue'

import radioComp from '@/components/lowcodeComps/radio.vue'
import switchComp from '@/components/lowcodeComps/switch.vue'
import textboxComp from '@/components/lowcodeComps/textbox.vue'

import {onMounted, ref, watch, computed} from 'vue'
import { createNamespace } from '@/utils'
import {useGlobalVisibleControllerStore} from '@/stores'
import {storeToRefs} from 'pinia'
import {SysType, SwiperPropsType, UeReportType} from '@/types'
import {commoncardApi, floorlistApi, sencedeviceApi, getGetDeviceDetailsApi, getPointApi, queryControlListApi, queryAllSelectApi, setAttributeValApi} from '@/apis'
import dayjs from 'dayjs';
import {useUeConnect} from '@/hooks'

const globalVisibleControllerStore = useGlobalVisibleControllerStore()
const {globalVisiblePool} = storeToRefs(globalVisibleControllerStore)
const { bem } = createNamespace('heluo-sys-electricity-wrap')

const {ueConnect} = useUeConnect()

// 包装供UE调用全局方法
function SwitchFoldOnlyTwoSide (state:boolean) {
  globalVisibleControllerStore.SwitchFoldOnlyTwoSide(state)
}

// 控制抽屉显示/隐藏
const drawerOpen = ref(false)
const curDeviceId = ref()
const rightPannelDeviceInfos = ref()
const openDrawer = () => { drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

// 当前选择的系统ID标识符
const curSystemId = ref(0);
const curSystemCode = ref('');
const curFloorSpaceId = ref('')
const sysRef = ref()
const floorData = ref([])
const deviceList = ref([])
// 控制点位数据
const controlPointList = ref([])

// 设备控制所需的数据
const controlDataList = ref([])


const handleDeviceChange = (item) => {
  // 根据设备ID来动态展示右侧的设备详情信息弹窗
  curDeviceId.value = item?.deviceId
  // getGetDeviceDetails()
  queryElectricityRightPannelInfos(item)
  openDrawer()
  ueConnect(UeReportType.LOCATION, { opt: item?.deviceCode })
}

const sysInfos = ref()

const runSysInofsApi = async () => {
  const res = await commoncardApi(
    {
    spaceId: curFloorSpaceId.value,
    typeCode: curSystemCode.value
  }
)
sysInfos.value = res?.data?.data
  console.log('系统状态数据', res)
}

// 查询楼层
const queryFloor = async () => {
  const res = await floorlistApi()
  floorData.value = res?.data?.data || []
}

const queryDeviceList = async () => {
  const res = await sencedeviceApi({
    spaceId: curFloorSpaceId.value,
    typeCode: curSystemCode.value
  })
  deviceList.value = res?.data?.data || []
  console.log(res?.data?.data.length, '?????')
}
const handleFloorUpdate = async (payload) => {
  console.log(payload, 'payload')
  curFloorSpaceId.value = payload?.queryCode
  // 拿到当前的spaceId 与 curSystemId.value
  
  queryDeviceList()
}

// 设备详情
const getGetDeviceDetails = async () => {
  const res = await getGetDeviceDetailsApi({id: curDeviceId.value})
  rightPannelDeviceInfos.value = res?.data?.data
}

onMounted(async () => {
  await queryFloor()
  curSystemCode.value = GLOBAL.sysList[0]['code']
  curFloorSpaceId.value = floorData.value[0]['spaceId']
  runSysInofsApi()
  queryDeviceList()
  queryPointInfos()
})

const isAirConditioner = computed(() => {
  return curSystemId.value === SysType.SmartAirConditioner
})

// 测试办公室弹窗
const visible = ref(false)
const test = () => {
  console.log('test')
  visible.value = true
}

// 查询设备点位信息数据
const queryPointInfos = async () => {
  const res = await getPointApi()
  const res2 = await queryControlListApi({onlineStatus: "", SystemCode: "ENVM", spaceId: ""})
  console.log(res, 'pppo')
  console.log(res2, 'pppo22')
}

// queryAllSelectApi, setAttributeValApi
const queryElectricityRightPannelInfos = async (item) => {
  // 查询右侧设备详情、控制区域、点位信息等综合信息区域接口
  const res = await queryAllSelectApi({
    "DeviceId":item?.deviceId,
    "DeviceCode": item?.deviceCode
})
rightPannelDeviceInfos.value = res?.data?.data?.detail
// 只挑选可读写且是[switch|radio|textbox]3类型之一的项目
controlDataList.value = ((res?.data?.data?.['control'] || [])?.[0]?.['attributes'] || []).filter(v => {
  return v?.attributeType === 'readwrite' && (v?.controlType === 'textbox' || v?.controlType === 'switch' || v?.controlType === 'radio')
})

console.log(controlDataList.value, '筛选过后的数据')

// 点位数据
controlPointList.value = res?.data?.data?.realtimedata?.attributeList || []

// 控制接口
  // const res2 = await setAttributeValApi({
  //   attributeCode: 'SFWDSD',
  //   deviceId: '3a1ab7fc2fde70f967fe96f9f6ab58b1',
  //   value: '24'
  // })
  console.log({
    '设备详情、点位、控制查询': res,
  }, '合并接口数据')
}
// radioComp, switchComp, textboxComp
const autoMatchComp = (item) => {
  switch (item?.controlType) {
    case 'textbox':
      return textboxComp
    case 'switch':
      return switchComp
    case 'radio':
      return radioComp
    default:
      console.log(`Not Matched any controlType by: ${item?.controlType}`)
      break;
  }
}
const runclose = () => {
  alert('runclose')
  visible.value = false
}
// handleControlMinus|handleControlPlus
const handleControlMinus = (idx) => {
  controlDataList.value[idx]['realTimeValue']['value']--
}
const handleControlPlus = (idx) => {
  // attributes.realTimeValue.value
  controlDataList.value[idx]['realTimeValue']['value']++
}
watch(
  // 监听系统更改
  () => sysRef.value?.curActivedIdx,
  (newVal) => {
    curSystemId.value = newVal
  }
)
watch(
  // 监听系统更改
  () => sysRef.value?.curActivedSys,
  (newVal) => {
    curSystemCode.value = newVal
    runSysInofsApi()
    queryDeviceList()
  }
)

</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <div :class="[bem('l'), 'animate__animated', globalVisiblePool.home_two_pannel.state ? ' animate__backInLeft' : 'animate__backOutLeft']">
      <div class="card-bg-com">
        <cardtitle name="系统选择" />
        <heluoSwiperSys ref="sysRef" />
      </div>

 
      <div class="card-bg-com">
        <cardtitle name="系统状态" />
        <sysStatus :infos="sysInfos" />
      </div>

      <!--设备列表-->
      <div class="card-bg-com">
        <cardtitle name="设备列表" @click="test" />
        <div style="height:10vh;padding-top: 12px;box-sizing: border-box;">
          <comSubTitle title-name="楼层选择" style="margin-bottom: 20px;" />
          <heluoSwiper :swiper-data="floorData" :type="SwiperPropsType.Floor" @updateCurIndex="handleFloorUpdate" />
        </div>
        <!-- <comSubTitle /> -->
        <!-- <heluoSwiperDevice /> -->
        <div class="device-list">
          <newDeviceItem v-for="(item, index) in deviceList" :key="index" :infos="item" @deviceChange="handleDeviceChange(item)" />
        </div>

      </div>

    </div>
  
      <a-drawer
      :title="null"
      :closable="false"
      :body-style="{ padding: 0, backgroundColor: 'transparent' }"
      :mask-style="{ backgroundColor: 'transparent' }"
      class="mk-drawer"
      :open="drawerOpen"
      @close="closeDrawer"
      width="480px"
      placement="right"
      @click.stop
    >
    <div class="drawer-wraper">
      <floor :class="[bem('mrgl-auto')]" />
      <div :class="[bem('r'), 'card-bg-com']" style="width:400px">
        <cardtitle name="设备详情">
          <template #close>
            <div @click="closeDrawer" class="close-box">&times;</div>
          </template>
        </cardtitle>
        <comSubTitle titleName="基本信息" style="margin: 10px 0 10px 10px;" />
        <deviceDetailsPanel :infos="{name: rightPannelDeviceInfos?.name, code: rightPannelDeviceInfos?.number}" />
        <div :class="['device-infos-box', 'isAirConditioner']">
          <devicePureTxtpanel :infos="{name: '设备状态', val: rightPannelDeviceInfos?.onlineStatusName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '设备编号', val: rightPannelDeviceInfos?.number, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '空间名称', val: rightPannelDeviceInfos?.spaceIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '设备名称', val: rightPannelDeviceInfos?.name, isAirConditioner}" />

          <devicePureTxtpanel :infos="{name: '系统分组', val: rightPannelDeviceInfos?.systemIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '设备类型', val: rightPannelDeviceInfos?.typeIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '品牌', val: rightPannelDeviceInfos?.brandIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '设备型号', val: rightPannelDeviceInfos?.modelIdName, isAirConditioner}" />

          <devicePureTxtpanel :infos="{name: '供应商', val: rightPannelDeviceInfos?.supplierIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '维保商', val: rightPannelDeviceInfos?.ownerIdName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '维保人', val: rightPannelDeviceInfos?.createrNickName, isAirConditioner}" />
          <devicePureTxtpanel :infos="{name: '维保周期', val: dayjs(rightPannelDeviceInfos?.modifyTime).format('YYYY/MM/DD HH:mm:ss'), isAirConditioner}" />
        </div>
        <!-- <comSubTitle title-name="关联房间列表" v-if="curSystemId === SysType.FreshAirSystem || curSystemId === SysType.ExhaustSystem" style="margin-bottom: 10px;" /> -->
        <!-- <heluoSwiperLinkroom v-if="curSystemId === SysType.FreshAirSystem || curSystemId === SysType.ExhaustSystem" /> -->
        <!-- <smallAirCondition v-if="curSystemId === SysType.SmartAirConditioner" /> -->
         <!--暂时先固定288高度，要求要左右两面板高度对齐-->
        <div style="height: 288px;overflow-y: scroll;">
          <comSubTitle title-name="设备控制" v-if="controlDataList.length" style="margin-bottom: 10px;" />
          <component
            v-for="(item, idx) in controlDataList"
            :key="idx"
            :is="autoMatchComp(item)"
            :attributes="item"
            :attributeCode="item?.attributeCode"
            :deviceId="item?.deviceId"
            :idx="idx"
            @controlMinus="handleControlMinus"
            @controlPlus="handleControlPlus"
          ></component>
          <comSubTitle title-name="设备点位数据" v-if="controlPointList.length" style="margin-top: 5px;" />
          <heluoSwiperDianwei :controlPointList="controlPointList" />
        </div>
         
        </div>
    </div>
    </a-drawer>

  </div>
</template>

<style scoped lang="less">
.heluo-sys-electricity-wrap{
  width: 100%;
  &__r{
    position: relative;
    .device-infos-box{
      width: 400px;
      // height: calc(88vh - 306px);
      // height: calc(88vh - 306px); // 除了智能空调系统之后的高度
      // height: calc(88vh - 296px); // 除了智能空调系统之后的高度
      overflow-y: scroll;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      &::after {
        content: "";       /* 空内容 */
        display: block;    /* 块级元素 */
        clear: both;       /* 清除左右浮动 */
        visibility: hidden; /* 隐藏伪元素 */
        height: 0;         /* 高度为0 */
    }
    }
    .isAirConditioner{
      height: calc(88vh - 469px);
      overflow-y: scroll;
    }
  }
  &__mrgl-auto{
    margin-left: auto;
  }
}
.drawer-wraper{

  display: flex;
  align-items: center;  /* 垂直居中 */
  justify-content: center; /* 水平居中（可选） */
  height: 100%; /* 高度占满父容器（抽屉内容区） */
  box-sizing: border-box;

  position: relative;
  .close-box{
    position: absolute;
    top:0;
    right:20px;
    font-size: 23px;
    cursor: pointer;
  }
}
.device-list{
  height: calc(54vh - 150px);
  overflow-y: scroll;
}
</style>
<style>
.ant-drawer-content-wrapper{
  box-shadow: none!important;
}
.ant-drawer-content-wrapper .mk-drawer{
  background: transparent!important;
}
</style>

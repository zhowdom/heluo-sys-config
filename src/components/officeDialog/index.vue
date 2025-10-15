<script setup lang="ts">
import {ref, defineProps, defineEmits, onMounted} from 'vue'
import cardtitle from '@/components/cardtitle/index.vue'
import composeSwiper from '@/components/composeSwiper/index.vue'
import {getEnvironmentDataApi, roomListApi, officeDeviceListApi, officeBriefApi, getGetDeviceDetailsApi, getSpaceNewAllApi, queryAllSelectApi} from '@/apis'
import {SwiperPropsType, UeReportType} from '@/types'
import officeNext from './officeNext.vue'
import {useUeConnect} from '@/hooks'

const props = defineProps(['SpaceCode'])
const {ueConnect} = useUeConnect()

const visible = ref(true)
const showNext = ref(false)

const listdata = ref([])
const cur_spaceId = ref()
const cur_spaceName = ref()

const deviceList = ref([])
const briefInfos = ref()
const imgurl = ref()

const new_device_list = ref([])
const curRoomCode = ref()

const controlPointList = ref([])
const controlDataList = ref([])
const nextDialogBaseInfos = ref({})
const imgState = ref(false)


const emit = defineEmits(['closeFirstOfficeDialog'])

const runRoomListApi = async () => {
  const res = await roomListApi({
    floorId: '',
    systemCode: 'ENVM'
  })
  listdata.value = res?.data?.data || []
  cur_spaceId.value = (res?.data?.data || [])?.[0]?.['spaceId']
  cur_spaceName.value = (res?.data?.data || [])?.[0]?.['spaceName']
}

const handleShiYanShi = (payload) => {
  cur_spaceId.value = payload?.queryCode
  cur_spaceName.value = listdata.value.find(v => {
    return v?.spaceId === payload?.queryCode
  })['spaceName']

}

const all_watchInfos = ref()
const new_all_watchInfos = ref()

const getEnvironmentData = async () => {
const res = await getEnvironmentDataApi()
all_watchInfos.value = res?.data?.data
}

const queryDeviceList = async () => {
  const res = await officeDeviceListApi({
    "spaceId":"3a0bc05da3a865db21d7a733f13278a6", 
    "pageType":"EVN,ELE,SAF",
    "searchKey":"",
    "pageIndex":0,
    "pageLength":1000
})
  deviceList.value = res?.data?.data || []
}

const runofficeBriefApi = async () => {
  const res = await officeBriefApi({
    SpaceCode: props?.SpaceCode
  })
  briefInfos.value = res?.data?.data
}

const rungetSpaceNewAllApi  = async () => {
  const res = await getSpaceNewAllApi(
    {
      SpaceCode: props?.SpaceCode
    }
  )

  new_device_list.value = res?.data?.data?.deviceList || []
  new_all_watchInfos.value = res?.data?.data?.environmentData || []
  curRoomCode.value = res?.data?.data?.spaceInfo?.[0]['number']
  imgurl.value = GLOBAL?.imgURL + res?.data?.data?.spaceInfo?.[0]['image']
  imgState.value = res?.data?.data?.spaceInfo?.[0]['image']
}

const closeOffice = () => {
  visible.value = false
  emit('closeFirstOfficeDialog')
  ueConnect(UeReportType.OFFICE_FIRST_CLOSE, {opt: props?.SpaceCode})
}
onMounted(() => {
  rungetSpaceNewAllApi()
  getEnvironmentData()
  runRoomListApi()
  runofficeBriefApi()
})

const goback = () => {
  showNext.value = false
}

const queryNextOfficeDialogInofs = async (item) => {
  const res = await queryAllSelectApi({
    "DeviceId": item?.deviceId,
    "DeviceCode":item?.deviceCode
  })
nextDialogBaseInfos.value = res?.data?.data?.detail
controlDataList.value = ((res?.data?.data?.['control'] || [])?.[0]?.['attributes'] || []).filter(v => {
  return v?.attributeType === 'readwrite' && (v?.controlType === 'textbox' || v?.controlType === 'switch' || v?.controlType === 'radio')
})

controlPointList.value = res?.data?.data?.realtimedata?.attributeList || []

}

const checkOfficeDetail = (item) => {
  showNext.value = true
  queryNextOfficeDialogInofs(item)
  ueConnect(UeReportType.OFFICE_FIRST_DEVICELIST, {opt: item.deviceCode})
}
</script>

<template>
    <div :class="['office-dialog-wrap', 'card-bg-com', showNext ? 'visible0' : '']" v-if="visible"> 
      <div class="main">
        <div class="header">
          <p>办公室详情</p>
          <CloseOutlined class="close" @click="closeOffice" />
        </div>

        <div class="buttom-main">
           <div class="l">
            <cardtitle name="房间信息" />
            <div class="room-infos">
              <img v-if="imgState" class="brief-img" :src="imgurl" />
              <div class="txt">{{briefInfos?.introduction}}</div>
            </div>
          </div>
          <div class="r">
            <cardtitle name="环境数据" />
            <composeSwiper type="specialType" :all_watchInfos="new_all_watchInfos" />
            <cardtitle name="房间设备列表" />
            <div class="device-list">
              <div v-for="(item, idx) in new_device_list" :key="idx" class="each flex-between" @click="checkOfficeDetail(item)">
                <p class="name">{{item?.deviceName}}</p><span class="status">{{item?.statusName}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <officeNext v-if="showNext" @goback="goback" :controlDataList="controlDataList" :controlPointList="controlPointList" :nextDialogBaseInfos="nextDialogBaseInfos" :curRoomCode="curRoomCode"/>
</template>

<style scoped lang="less">

.office-dialog-wrap{
  height: 620px;
  border-radius: 3px;
  position: fixed;
  width: 620px;
  top:50%;
  transform: translateY(-50%);
  right:10px;
  border-bottom: 1px solid #456a6b;
  z-index: 50;
  &.visible0{
    opacity: 0;
  }
  .main{
    .header{
      position: relative;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #456a6b;
      p{
        text-indent: 20px;
      }
      .close{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right:20px;
        cursor: pointer;
      }
    }
    .buttom-main{
      padding: 16px 10px;
      height: 600px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .l{
        width: 180px;
        .room-infos{
          .brief-img{
            width: 100%;
            height: 108px;
            margin: 7px 0 14px 0;
          }
          .txt{
            height: 367px;
            overflow-y: scroll;
            font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
            font-weight: 400;
            font-size: 12px;
            color: #FFFFFF;
            line-height: 22px;
          }
        }
      }
      .r{
        .device-list{
          height: 220px;
          overflow-y: scroll;
          .each{
            width: 100%;
            height: 36px;
            background: #293b42;
            position: relative;
            margin-bottom: 10px;
            &:hover{
              background: linear-gradient( 180deg, rgba(45,240,231,0) 0%, rgba(45,240,231,0.3) 100%);
              border-bottom: 1px solid #29E3BF;
              box-sizing: border-box;
            }
            .name{
              padding-left: 10px;
              font-size: 13px;
            }
            .status{
              position: absolute;
              top:50%;
              transform: translateY(-50%);
              right: 10px;
              font-size: 12px;
              padding: 3px 5px;
              display: inline-block;
              border-radius: 3px;
              background: #2a4e43;
            }
          }
        }
      }
    }
  }
}
</style>

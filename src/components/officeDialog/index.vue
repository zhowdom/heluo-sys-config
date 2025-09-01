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


// 办公室一级弹窗
const visible = ref(true)
// 是否显示二级详情
const showNext = ref(false)

const listdata = ref([])
const cur_spaceId = ref()
const cur_spaceName = ref()

const deviceList = ref([])
const briefInfos = ref()


// 新-设备列表数据
const new_device_list = ref([])
const curRoomCode = ref()

// 控制点位数据
const controlPointList = ref([])
// 设备控制所需的数据
const controlDataList = ref([])
// 二级办公室详情设备基础信息
const nextDialogBaseInfos = ref({})


const emit = defineEmits(['closeFirstOfficeDialog'])

// 《一》先查询实验室101、102、103swiper列表数据
const runRoomListApi = async () => {
  const res = await roomListApi({
    floorId: '',
    systemCode: 'ENVM'
  })
  listdata.value = res?.data?.data || []
  // 默认选中第一个实验室
  cur_spaceId.value = (res?.data?.data || [])?.[0]?.['spaceId']
  cur_spaceName.value = (res?.data?.data || [])?.[0]?.['spaceName']
  console.log('实验室101、102、103', res)
}

const handleShiYanShi = (payload) => {
  // 获取当前选中的实验室，拿到spaceId
  console.log(payload, 'payload')
  cur_spaceId.value = payload?.queryCode
  cur_spaceName.value = listdata.value.find(v => {
    return v?.spaceId === payload?.queryCode
  })['spaceName']

  console.log(cur_spaceName.value, '909090909')
}


// swiper环境数据
const all_watchInfos = ref()
const new_all_watchInfos = ref()

// 查询所有环境报警指标信息
const getEnvironmentData = async () => {
const res = await getEnvironmentDataApi()
all_watchInfos.value = res?.data?.data
console.log(res, 'iiii9999')
}

// 不传系统ID，传空间ID，查询设备列表
const queryDeviceList = async () => {
  const res = await officeDeviceListApi({
    "spaceId":"3a0bc05da3a865db21d7a733f13278a6", // UE传递空间ID
    "pageType":"EVN,ELE,SAF",
    "searchKey":"",
    "pageIndex":0,
    "pageLength":1000
})
  deviceList.value = res?.data?.data || []
  console.log(res?.data?.data.length, '?????')
}

// 查询带图片的简介
const runofficeBriefApi = async () => {
  const res = await officeBriefApi({
    SpaceCode: 'F0101'
  })
  briefInfos.value = res?.data?.data
}

// 查询办公室一级详情弹窗数据（新）--必须要调
const rungetSpaceNewAllApi  = async () => {
  const res = await getSpaceNewAllApi(
    {
      // SpaceCode: props?.SpaceCode // UE那边主动调这个办公室弹窗，会主动传这个SpaceCode参数给过来
      SpaceCode: 'F0127' // UE那边主动调这个办公室弹窗，会主动传这个SpaceCode参数给过来
    }
  )
  console.log(res, 'res111---查询办公室详情弹窗数据（新）')

  // 第一步拿到设备列表
  new_device_list.value = res?.data?.data?.deviceList || []
  // 拿到环境数据面板-豆腐块信息
  new_all_watchInfos.value = res?.data?.data?.environmentData || []
  console.log(new_all_watchInfos.value, 'M88888')
  // 记录楼层中房间的编号
  curRoomCode.value = res?.data?.data?.spaceInfo?.[0]['number']

}

// 关闭office弹窗-二级office弹窗关闭也用这个
const closeOffice = () => {
  visible.value = false
  emit('closeFirstOfficeDialog')
  // 楼层编号就是UE主动调window.InformationOnTheRightRoom('SpaceCode')传进来，这里直接拿的，一模一样
  ueConnect(UeReportType.OFFICE_FIRST_CLOSE, {opt: props?.SpaceCode})
}
onMounted(() => {
  rungetSpaceNewAllApi()
  getEnvironmentData()
  runRoomListApi()
  // queryDeviceList()
})

// 监听二级办公室详情页面关闭时候
const goback = () => {
  showNext.value = false
}

const queryNextOfficeDialogInofs = async (item) => {
  // 查询右侧设备详情、控制区域、点位信息等综合信息区域接口
  const res = await queryAllSelectApi({
    "DeviceId": item?.deviceId,
    "DeviceCode":item?.deviceCode
  })
console.log('say hello', res?.data?.data)
// 基础设备信息数据
nextDialogBaseInfos.value = res?.data?.data?.detail
// 只挑选可读写且是[switch|radio|textbox]3类型之一的项目
controlDataList.value = ((res?.data?.data?.['control'] || [])?.[0]?.['attributes'] || []).filter(v => {
  return v?.attributeType === 'readwrite' && (v?.controlType === 'textbox' || v?.controlType === 'switch' || v?.controlType === 'radio')
})


console.log(controlDataList.value, '筛选过后的数据')

// 点位数据
controlPointList.value = res?.data?.data?.realtimedata?.attributeList || []
console.log(controlDataList.value, '点位00099过后的数据')

  console.log({
    '设备详情、点位、控制查询': res,
  }, '合并接口数据')
}

// 打开二级办公室详情页面弹窗
const checkOfficeDetail = (item) => {
  // 查询二级办公室室设备详情信息
  showNext.value = true
  // getGetDeviceDetails(item.deviceId)
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
              <img class="brief-img" :src="briefInfos?.imgUrl || 'https://gimg3.baidu.com/topone/src=https%3A%2F%2Fbkimg.cdn.bcebos.com%2Fsmart%2Fa686c9177f3e6709c93d56d9459f883df8dcd100ffc7-bkimg-process%2Cv_1%2Crw_1%2Crh_1%2Cmaxl_800%2Cpad_1%3Fx-bce-process%3Dimage%2Fresize%2Cm_pad%2Cw_348%2Ch_348%2Ccolor_ffffff&refer=http%3A%2F%2Fwww.baidu.com&app=2011&size=w931&n=0&g=0n&er=404&q=75&fmt=auto&maxorilen2heic=2000000?sec=1755795600&t=d1694394435fe82ac021f5f88807187d'" />
              <div class="txt">{{briefInfos?.introduction}}</div>
            </div>
          </div>
          <div class="r">
            <cardtitle name="环境数据" />
            <composeSwiper type="specialType" :all_watchInfos="new_all_watchInfos" />
            <cardtitle name="房间设备列表" />

            <!-- <div class="com-swiper-wrap" style="height: 6vh;">
              <heluoSwiper :swiper-data="listdata" @updateCurIndex="handleShiYanShi" :type="SwiperPropsType.ShiYanShi" />
            </div> -->

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

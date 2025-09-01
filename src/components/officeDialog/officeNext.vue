<script setup lang="ts">
  import {ref, defineEmits, defineProps, watch} from 'vue'
  import dayjs from 'dayjs';
  import {UeReportType} from '@/types'
import {useUeConnect} from '@/hooks'
import beautyFoundation from '@/components/beautyFoundation/index.vue'

import radioComp from '@/components/lowcodeComps/radio.vue'
import switchComp from '@/components/lowcodeComps/switch.vue'
import textboxComp from '@/components/lowcodeComps/textbox.vue'

  const temperatureVal = ref(22)
  const checked = ref(false)

  const props = defineProps(['controlDataList', 'curRoomCode', 'controlPointList', 'nextDialogBaseInfos'])

  const emit = defineEmits(['goback'])
  const {ueConnect} = useUeConnect()
  const goback = () => {
    emit('goback')
    ueConnect(UeReportType.OFFICE_NEXT_CLOSE, {opt: props?.curRoomCode})
  }

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
// handleControlMinus|handleControlPlus
const handleControlMinus = (idx) => {
  props.controlDataList[idx]['realTimeValue']['value']--
}
const handleControlPlus = (idx) => {
  // attributes.realTimeValue.value
  props.controlDataList[idx]['realTimeValue']['value']++
}

  watch(
    () => props?.controlDataList,
    () => {
      console.log('sss', props?.controlDataList)
    }
  )
</script>

<template>
   <div class="officeNext-wrap card-bg-com">
    <div class="top">
      <div @click="goback">
        <LeftOutlined class="prev" />
        <p>办公室详情</p>
      </div>
      
      <CloseOutlined class="close" @click="goback" />
    </div>
    <div class="main">
      <comSubTitle title-name="基本信息" style="margin: 15px 0 20px 10px;" />
      <deviceDetailsPanel :infos="{name: nextDialogBaseInfos?.modelIdName, code: nextDialogBaseInfos?.number}" style="width: 95%;" />
      <div class="toufu">
        <devicePureTxtpanel :infos="{name: '设备状态', val: nextDialogBaseInfos?.onlineStatusName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '设备编号', val: nextDialogBaseInfos?.number, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '空间名称', val: nextDialogBaseInfos?.spaceIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '设备名称', val: nextDialogBaseInfos?.name, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '设备类型', val: nextDialogBaseInfos?.systemIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '系统分类', val: nextDialogBaseInfos?.typeIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '品牌', val: nextDialogBaseInfos?.brandIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '设备型号', val: nextDialogBaseInfos?.modelIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '供应商', val: nextDialogBaseInfos?.supplierIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '维保商', val: nextDialogBaseInfos?.ownerIdName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '维保人', val: nextDialogBaseInfos?.createrNickName, isAirConditioner: false}" class="next-office" />
        <devicePureTxtpanel :infos="{name: '维保周期', val: dayjs(nextDialogBaseInfos?.modifyTime).format('YYYY/MM/DD HH:mm:ss'), isAirConditioner: false}" class="next-office" />
      </div>

      <comSubTitle title-name="设备参数" v-if="controlPointList.length" style="margin-bottom: 20px;" />

      <div class="attribute-box clearfix" style="overflow-x: scroll;height: 100px;">
        <div class="mi-box" :style="{width: `${controlPointList.length * 123}px`}">
          <beautyFoundation v-for="(item, idx) in controlPointList" :key="idx" :infos="item" class="each" />
        </div>
      </div>

      <comSubTitle title-name="设备控制" v-if="controlDataList.length" style="margin-bottom: 20px;" />

      <div class="control-box" style="max-height: 145px;overflow-y: scroll;">
        <component
            v-for="(item, idx) in controlDataList"
            :key="idx"
            :attributeCode="item?.attributeCode"
            :deviceId="item?.deviceId"
            :idx="idx"
            :is="autoMatchComp(item)"
            :attributes="item"
            @controlMinus="handleControlMinus"
            @controlPlus="handleControlPlus"
          ></component>
      </div>
    </div>
   </div>
</template>

<style scoped lang="less">
.officeNext-wrap{
  position: fixed;
  width: 628px;
  height: 800px;
  border-bottom: 1px solid #1C8C76FF;
  top:50%;
  transform: translateY(-50%);
  right:10px;
  z-index: 100;
  .top{
    border-bottom: 1px solid #1C8C76FF;
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    position: relative;
    p{
      text-indent: 46px;
    }
    .prev{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      left:15px;
      cursor: pointer;
    }
    .close{
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      right:15px;
      cursor: pointer;
    }
  }
  .main{
    .toufu{
      height: 280px;
      .next-office{
        width: 188px;
        height: 53px;
        margin-left: 16px;
      }
      .heluo-sys-puretxt-panel:nth-child(even) {
        float: left;
      }
    }
    .attribute-box{
      .each{
        float: left;
        margin-left: 18px;
      }
    }
  }
}
.control-box{
  padding-left: 15px;
  
}

</style>

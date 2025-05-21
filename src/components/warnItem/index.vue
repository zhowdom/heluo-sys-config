<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-warn-item')
import {IWarnInfos} from '@/types'
import {PropType} from 'vue'
import {UeReportType} from '@/types'
import {useUeConnect} from '@/hooks'
const {ueConnect} = useUeConnect()
defineProps({
  warnInfos: {
    type: Object as PropType<IWarnInfos>
  }
})
</script>

<template>
   <div :class="[bem()]" @click="ueConnect(UeReportType.WARN_ITEM, {opt: warnInfos.id})">
      <div :class="[bem('each'), 'flex-between', 'header']">
        <div :class="bem('l')">
          <span class="bolded">{{warnInfos.alarmDesc}}</span>
        </div>
        <div :class="bem('r')">
          <i>报警时间：</i>
          <span>{{new Date(warnInfos.alarmTime).toLocaleString()}}</span>
        </div>
      </div>

      <div :class="[bem('each'), 'flex-between']">
        <div :class="bem('l')">
          <i>报警设备：</i>
          <span>{{warnInfos.deviceIdName}}</span>
        </div>
        <div :class="bem('r')">
          <i>报警点位：</i>
          <span>{{warnInfos.processTypeName}}</span>
        </div>
      </div>

      <div :class="[bem('each'), 'flex-between']">
        <div :class="bem('l')">
          <i>报警状态：</i>
          <span :class="['tobehandle', warnInfos.processStatusName === '已处理' ? 'done' : '']">{{warnInfos.processStatusName}}</span>
        </div>
        <div :class="bem('r')">
          <i>所属系统：</i>
          <span>{{warnInfos.deviceIdSystemIdName}}</span>
        </div>
      </div>

      <div :class="[bem('each'), 'flex-between']">
        <div :class="bem('l')">
          <i>所属位置：</i>
          <span>{{warnInfos.spaceIdName}}</span>
        </div>
        <div :class="bem('r')">
          <i>报警描述：</i>
          <span>{{warnInfos.spaceIdNumber}}</span>
        </div>
      </div>

   </div>
</template>

<style scoped lang="less">
.heluo-sys-warn-item{
  background: rgba(255,255,255,0.1);
  font-size:14px;
  padding: 0 16px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  &__each{
    padding: 12px 0;
    color: #e5e5e6;
    i{
      font-style: normal;
    }
    &.header{
      border-bottom: 1px solid rgba(255,255,255,.2);
    }
    &:not(.header) {
      padding-bottom: 0;
    }
    .tobehandle{
      color: rgba(255, 239, 121, 1);
    }
    .done{
      color: rgba(121, 255, 230, 1);
    }
    .bolded{
      font-weight: bold;
    }
  }
}
</style>

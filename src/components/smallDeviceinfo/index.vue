<template>
    <div :class="bem()">
      <div class="top flex-between">
        <div class="l txtellipsis">
          <span class="name"><span style="padding-right: 5px;">{{props?.infos?.spaceCode}}</span>{{props?.infos?.deviceName}}</span>
          <span class="state">报警</span>
        </div>
        <div class="r">{{dayjs(props?.infos?.time).format('YYYY/MM/DD HH:mm:ss')}}</div>
      </div>
      <div class="main">
        <miniItem class="mc" :infos="{label: '报警设备', desc: props?.infos?.deviceCode + props?.infos?.deviceName}" />
        <miniItem class="mc" :infos="{label: '报警点位', desc: props?.infos?.attributeName}" />
        <miniItem class="mc" :infos="{label: '报警状态', desc: '报警'}" />
        <miniItem class="mc" :infos="{label: '所属系统', desc: props?.infos?.systemName}" />
        <miniItem class="mc" :infos="{label: '所属位置', desc: props?.infos?.spaceName}" />
        <miniItem class="mc" :infos="{label: '报警描述', desc: props?.infos?.alarmDesc}" />
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import miniItem from './components/miniItem.vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-smallDeviceinfo')
import { PropType, defineProps } from 'vue'
import dayjs from 'dayjs';

interface Iprops {
  spaceCode: string
  deviceName: string
  alarmValue: string
  time: string
  deviceCode: string
  spaceName: string
  attributeName: string
  systemName: string
  alarmDesc: string
}
const props = defineProps({
  infos: {
    type: Object as PropType<Iprops>
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-smallDeviceinfo{
    width: calc(100% - 32px);
    background: linear-gradient( 180deg, rgba(101,124,137,0.05) 0%, rgba(66,100,105,0.3) 100%);
    margin: 0 auto;
    .top {
      padding: 10px 10px 0 10px;
      width: 368px;
      box-sizing: border-box;
    }
    .l{
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      width: calc(100% - 125px);
      .state{
        padding-left: 5px;
      }
    }
    .r{
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
    }
    .main{
      display: flex;
      flex-wrap: wrap; /* 允许换行 */
      gap: 10px; /* 子元素之间的间距 */
      padding: 10px;
      width: 368px;
      box-sizing: border-box;
      .mc{
        flex: 1; /* 让子元素等分剩余空间 */
        min-width: calc(33.333% - 10px); /* 确保每行最多3个，减去gap的影响 */
        box-sizing: border-box; /* 确保padding和border不影响宽度计算 */
      }
    }
  }
</style>
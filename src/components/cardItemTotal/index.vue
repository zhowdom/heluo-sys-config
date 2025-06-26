<script setup lang="ts">
import { createNamespace } from '@/utils'
import { ICardCommonInfos } from '@/types'
const { bem } = createNamespace('heluo-sys-card-item-b')
import { PropType, onMounted } from 'vue'
import percentcircle from '../circle/index.vue'
import {useDeviceTotalInfos} from '@/hooks'
defineProps({
  cardInfos: {
    type: Object as PropType<ICardCommonInfos>,
  }
})
const {deviceTotalInfos, getData} = useDeviceTotalInfos()
onMounted(() => {
  getData()
})
</script>

<template>
   <div :class="[bem(), 'flex-between']">
    
    <div :class="bem('two-side')">
      <div class="top">
        <div class="circle">
          <img src="@assets/usedimg/percent.png" />
          <!-- <div class="percent"></div> -->
          <percentcircle :percent="deviceTotalInfos.runningRate" />
          <img class="arrow" src="@assets/usedimg/percent-arrow.png" />
        </div>
      </div>
      <div :class="[bem('min'), 'flex-between']" style="padding: 10px;">
        <div class="l total">总设备</div>
        <div class="r device-ct"><span class="gradientTxt">{{deviceTotalInfos.totalCount}}</span><span>台</span></div>
      </div>
    </div>

    <div :class="[bem('two-side')]">
      <div :class="[bem('min'), 'flex-between']">
        <div class="l online">在线设备</div>
        <div class="r">{{deviceTotalInfos.onlineCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between']">
        <div class="l offline">离线设备</div>
        <div class="r">{{deviceTotalInfos.offlineCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between']">
        <div class="l wran">故障设备</div>
        <div class="r">{{deviceTotalInfos.failureCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between']">
        <div class="l error">异常设备</div>
        <div class="r">{{deviceTotalInfos.wranCount}}</div>
      </div>
    </div>
    
   </div>
</template>

<style scoped lang="less">
.heluo-sys-card-item-b{
  height: 100%;
  width: 100%;
  padding: 0 14px;
  &__two-side{
    width:40%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中整个容器 */
    align-items: center;    /* 水平居中整个容器 */
    gap: 10px; 
    .top{
      height: 64%;
      width: 128px;
      .circle{
        // height: 80%; /*128/160=0.8*/
        height: 128px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        img.arrow{
          height: 25px;
          width: 30px;
          position: absolute;
          bottom: -31px;
          margin-left: -15px;
          left: 50%;
        }
      }
    }
  }
  &__min{
    height:16%;
    width: 100%;
    background: url('@assets/usedimg/rectangle@2x(3).png') no-repeat  right / contain;
    background-size: 100% 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    .l{
      position: relative;
      font-size:14px;
      &::before{
        width:3px;
        height: 12px;
        position: absolute;
        top:50%;
        margin-top: -6px;
        left: -9px;
        content: '';
      }
    }
    .l.online::before{background: #6FD19EFF;}
    .l.offline::before{background: #B2B2B2FF;}
    .l.wran::before{background: #D16F6FFF;}
    .l.error::before{background: #F3C05BFF;}
    .l.total::before{background: transparent;}
    .r{
      font-size: 16px;
    }
  }
  .device-ct{
    span{
      font-size: 12px;
    }
    .gradientTxt{
      font-size: 20px;
      margin-right: 5px;
    }
  }
}


</style>

<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-card-item-b')
import { onMounted } from 'vue'
import percentcircle from '../circle/index.vue'
import {useDeviceTotalInfos} from '@/hooks'
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
          <percentcircle :percent="deviceTotalInfos.runningRate" />
          <img class="arrow" src="@assets/usedimg/percent-arrow.png" />
        </div>
      </div>
      <div :class="[bem('min'), 'flex-between', 'z-0']" style="padding: 10px;">
        <div class="l total">总设备</div>
        <div class="r device-ct"><span class="gradientTxt">{{deviceTotalInfos.totalCount}}</span><span>台</span></div>
      </div>
    </div>

    <div :class="[bem('two-side')]">
      <div :class="[bem('min'), 'flex-between', 'z-1']">
        <div class="l online">在线设备</div>
        <div class="r">{{deviceTotalInfos.onlineCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between', , 'z-2']">
        <div class="l offline">离线设备</div>
        <div class="r">{{deviceTotalInfos.offlineCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between', , 'z-3']">
        <div class="l wran">故障设备</div>
        <div class="r">{{deviceTotalInfos.failureCount}}</div>
      </div>

      <div :class="[bem('min'), 'flex-between', , 'z-4']">
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
    width:44%;
    height: 100%;
    position: relative;
    .z-0{
      bottom: 8%;
      left: 0;
    }
    .z-1{
      top: 8%;
      right: 0;
    }
    .z-2{
      top: calc(8% + 16% + 6.66%);
      right: 0;
    }
    .z-3{
      top: calc(8% + 16% + 6.66% + 16% + 6.66%);
      right: 0;
    }
    .z-4{
      bottom: 8%;
      right: 0;
    }
    .top{
      height: 64%;
      width: 128px;

      position: absolute;
      top:50%;
      margin-top:-65%;
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
    position: absolute;
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

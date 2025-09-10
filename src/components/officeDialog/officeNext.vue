<script setup lang="ts">
  import {ref, defineEmits, defineProps, computed} from 'vue'
  import dayjs from 'dayjs';
  import {UeReportType} from '@/types'
import {useUeConnect} from '@/hooks'
import beautyFoundation from '@/components/beautyFoundation/index.vue'

import radioComp from '@/components/lowcodeComps/radio.vue'
import switchComp from '@/components/lowcodeComps/switch.vue'
import textboxComp from '@/components/lowcodeComps/textbox.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation } from 'swiper/modules';

// 引入 Swiper 样式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];
let swiperInstance0 = null;
let swiperInstance = null;
// 初始化完成后获取实例
const handleSwiperInit = (swiper) => {
  swiperInstance = swiper;
};
const handleSwiperInit0 = (swiper) => {
  swiperInstance0 = swiper;
};


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

const groupedSwiperData = computed(() => {
  const groups = [];
  // 循环切割数组，每次取3个元素
  for (let i = 0; i < props?.controlDataList.length; i += 2) {
    // 从索引i开始，截取3个元素作为一组
    groups.push(props?.controlDataList.slice(i, i + 2));
  }
  return groups;
});

const groupedData = computed(() => {
  const groups = [];
  const groupSize = 5; // 每组5个元素
  // 循环切割数组，每次取5个元素
  for (let i = 0; i < props?.controlPointList.length; i += groupSize) {
    groups.push(props?.controlPointList.slice(i, i + groupSize));
  }
  return groups;
});


// 自定义导航按钮事件
const handlePrev0 = () => {
  if (swiperInstance0) {
    swiperInstance0.slidePrev(); // 切换到上一组
  }
};

const handleNext0 = () => {
  if (swiperInstance0) {
    swiperInstance0.slideNext(); // 切换到下一组
  }
};
const handlePrev = () => {
  if (swiperInstance) {
    swiperInstance.slidePrev(); // 切换到上一组
  }
};

const handleNext = () => {
  if (swiperInstance) {
    swiperInstance.slideNext(); // 切换到下一组
  }
};

</script>

<template>
   <div class="officeNext-wrap card-bg-com">
    <div class="top">
      <div @click="goback">
        <LeftOutlined class="prev" />
        <p>设备详情</p>
      </div>
      
      <CloseOutlined class="close" @click="goback" />
    </div>
    <div class="main">
      <comSubTitle title-name="基本信息" style="margin: 15px 0 20px 10px;" />
      <deviceDetailsPanel :infos="{name: nextDialogBaseInfos?.modelIdName, code: nextDialogBaseInfos?.number, img: nextDialogBaseInfos?.img}" style="width: 95%;" />
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
        <!-- <div class="mi-box" :style="{width: `${controlPointList.length * 123}px`}">
          <beautyFoundation v-for="(item, idx) in controlPointList" :key="idx" :infos="item" class="each" />
        </div> -->

        <div class="mi-box" style="position: relative;">

          <div class="custom-nav prev-btn" @click="handlePrev0" style="top:40px">
            <i class="icon-left"></i>
          </div>
          <div class="custom-nav next-btn" @click="handleNext0" style="top:40px">
            <i class="icon-right"></i>
          </div>

          <swiper
            :modules="modules" 
            slides-per-view="1"
            @swiper="handleSwiperInit0"
            :slide-to-clicked-slide="true"
            space-between="10"
            class="mySwiper"
          >
            <!-- 轮播项 -->
            <swiper-slide v-for="(slide, idx) in groupedData"  :key="idx" class="swiper-item">
              <!-- <beautyFoundation :infos="slide" class="each" /> -->
               <!-- 组内5个元素 -->
                <div class="item-container">
                  <div 
                    v-for="(item, itemIndex) in slide" 
                    :key="itemIndex"
                    class="swiper-item"
                  >
                    <beautyFoundation :infos="item" class="each" />
                  </div>
                </div>

            </swiper-slide>
          </swiper>

        </div>

      </div>

      <comSubTitle title-name="设备控制" v-if="controlDataList.length" style="margin-bottom: 20px;" />

      <div class="control-box" style="max-height: 145px;overflow-y: scroll;position: relative;">
        <!-- <component
            v-for="(item, idx) in controlDataList"
            :key="idx"
            :attributeCode="item?.attributeCode"
            :deviceId="item?.deviceId"
            :idx="idx"
            :is="autoMatchComp(item)"
            :attributes="item"
            @controlMinus="handleControlMinus"
            @controlPlus="handleControlPlus"
          ></component> -->

          <div class="custom-nav prev-btn" @click="handlePrev">
            <i class="icon-left"></i>
          </div>
          <div class="custom-nav next-btn" @click="handleNext">
            <i class="icon-right"></i>
          </div>

          <swiper
            :modules="modules" 
            slides-per-view="1"
            @swiper="handleSwiperInit"
            :slide-to-clicked-slide="true"
            space-between="10"
            class="mySwiper"
          >
            <!-- 轮播项 -->
            <swiper-slide v-for="(group, groupIndex) in groupedSwiperData"  :key="groupIndex" class="swiper-item">
              <!-- 组内元素：每行显示2个 -->
              <div class="group-items">
                <div 
                  v-for="(item, itemIndex) in group"
                  :key="itemIndex"
                  class="group-item"
                >
                  <component
                    :is="autoMatchComp(item)"
                    :attributes="item"
                    :attributeCode="item?.attributeCode"
                    :deviceId="item?.deviceId"
                    :idx="groupIndex + 1 + itemIndex"
                    @controlMinus="handleControlMinus"
                    @controlPlus="handleControlPlus">
                    </component>

                </div>
              </div>

            </swiper-slide>
          </swiper>


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
/*next-prev-btns*/
.custom-nav{
  position: absolute;
  top: 66px;
  height: 26px;
  width: 16px;
  cursor: pointer;
  z-index: 10;
}
.prev-btn{
  background: url('@assets/usedimg/swiper_left@2x.png') no-repeat center / cover;
  left: 0;
}
.next-btn{
  background: url('@assets/usedimg/swiper_right@2x.png') no-repeat center / cover;
  right: 0;
}
</style>

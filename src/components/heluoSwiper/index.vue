<template>
    <div class="swiper-container">
      <div class="custom-nav prev-btn" @click="handlePrev">
        <i class="icon-left"></i>
      </div>
      <div class="custom-nav next-btn" @click="handleNext">
        <i class="icon-right"></i>
      </div>
      <div class="inner">
        <swiper
        :modules="modules" 
        :slides-per-view="slidesPerView"
        @swiper="handleSwiperInit"
        :slide-to-clicked-slide="true"
        space-between="10"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in props?.swiperData" :key="index" class="swiper-item">
          <div v-if="props.type === SwiperPropsType.WarnType" @click="handleClick(item?.typeCode, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.typeName}}</div>
          <div v-if="props.type === SwiperPropsType.ShiYanShi" @click="handleClick(item?.spaceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.spaceName}}</div>
          <div v-if="props.type === SwiperPropsType.ChuanGanQi" @click="handleClick(item?.deviceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.deviceName}}</div>
          <div v-if="props.type === SwiperPropsType.Floor" @click="handleClick(item?.spaceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.spaceName}}</div>
        </swiper-slide>
      </swiper>
      </div>
      
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted, defineEmits, defineProps } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import {SwiperPropsType} from '@/types'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(4);
const curActivedIdx = ref(0)
let swiperInstance = null;

const handleSwiperInit = (swiper) => {
  swiperInstance = swiper;
};

const handlePrev = () => {
  if (swiperInstance) {
    swiperInstance.slidePrev(); 
  }
};

const handleNext = () => {
  if (swiperInstance) {
    swiperInstance.slideNext();
  }
};

const props = defineProps(['swiperData', 'type'])
const emit = defineEmits(['updateCurIndex'])

const modules = [Pagination, Navigation];

const handleClick = (i, idx) => {
  curActivedIdx.value = idx
  emit('updateCurIndex', {
    queryCode: i,
    idx
  })
}

</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  .inner{
    width: calc(100% - 23px);
    margin: 0 auto;
  }
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 26px!important;
  width: 80px!important;
}
:deep(.swiper) {
  // padding-left: 32px !important;
  // padding-right: 32px !important;
}
.each-item-text{
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 14px;
  color: rgba(255,255,255,0.68);
  text-align: center;
  line-height: 22px;
  background: #29393c;
  border-radius: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,.6);
  background: rgba(32,59,65,0.8) rgba(37,57,58,0.8);
  padding-left: 3px;
  padding-right: 3px;
  &.cur{
    background: #112024;
    border: 2px solid #1AE2BE;
  }
  &:hover{
    background: linear-gradient( 180deg, rgba(45,240,231,0) 0%, rgba(45,240,231,0.3) 100%);
    border-bottom: 1px solid #29E3BF;
    box-sizing: border-box;
    border-left: none;
    border-right: none;
    border-top:none;
  }
}

.custom-nav{
  position: absolute;
  top: -1px;
  height: 26px;
  width: 16px;
  cursor: pointer;
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
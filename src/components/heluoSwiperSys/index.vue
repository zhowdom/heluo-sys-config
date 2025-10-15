<template>
    
    <div class="swiper-container flex-center">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="32"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, idx) in slides" :key="item.code" class="swiper-item">
          <div @click="handleClick(item, idx)" :class="['each-item-text', idx === curActivedIdx ? 'cur' : '']">{{item.name}}</div>
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import {SysType} from '@/types'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(3);
const curActivedIdx = ref(0)
const curActivedSys = ref()

const slides = ref(GLOBAL.sysList);

const modules = [Pagination, Navigation];

const handleClick = (i, idx) => {
  curActivedIdx.value = idx
  curActivedSys.value = i?.code
}

defineExpose({
  curActivedIdx,
  curActivedSys
})
</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px;
  height: 10vh;
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 68px!important;/*swiper子项目整体高度，父级继承*/
  width: 92px!important;/*swiper子项目整体宽度，父级继承*/
}
:deep(.swiper) {
  padding-left: 32px !important;
  padding-right: 32px !important;
}
.each-item-text{
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 14px;
  color: rgba(255,255,255,0.68);
  text-align: center;
  border-radius: 8px!important;
  background: rgba(255,255,255,0.06);
  cursor: pointer;
  box-sizing: border-box;
  height: 68px;
  line-height: 68px;
  &.cur{
    background: url('@assets/usedimg/haha.png') no-repeat center / cover;
  }
}
:deep(.swiper-button-next){
  height: 26px;
  width: 16px;
  position: absolute;
  top: 45px;
  right: 0;
  background: url('@assets/usedimg/swiper_right@2x.png') no-repeat center / cover;
  &:after{
    display: none;
  }
}
:deep(.swiper-button-prev){
  height: 26px;
  width: 16px;
  background: url('@assets/usedimg/swiper_left@2x.png') no-repeat center / cover;
  &:after{
    display: none;
  }
  position: absolute;
  top: 45px;
  left: 0;
}
</style>
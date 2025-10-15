<template>
    <div class="swiper-container flex-center">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="0"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, idx) in all_watchInfos" :key="idx" class="swiper-item">
           <oppositeAngleA :eachinfos="item?.attributes" :name="item?.name" :type="type" />
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import {SysType} from '@/types'
  import oppositeAngleA from '@/components/oppositeAngleA/index.vue'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(1);
const curActivedIdx = ref(0)
const curActivedSys = ref()

const props = defineProps(['all_watchInfos', 'type'])
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
  height: 19vh;
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 153px!important;/*swiper子项目整体高度，父级继承*/
  width: 100%!important;/*swiper子项目整体宽度，父级继承*/
}
:deep(.swiper) {
  padding-left: 0 !important;
  padding-right: 0 !important;
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
  top: 88px;
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
  top: 88px;
  left: 0;
}
</style>
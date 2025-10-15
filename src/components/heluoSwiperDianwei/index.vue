<template>
    <div class="swiper-container">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="0"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in slides" :key="index" class="swiper-item dianwei-box">
          <beautyFoundation :infos="item" />
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted, computed } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import beautyFoundation from '../beautyFoundation/index.vue'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  const props = defineProps(['controlPointList'])

const slidesPerView = ref(2);
const curActivedIdx = ref(0)
const isnavigation = ref(true)

const slides = computed(() => props?.controlPointList)

const modules = [Pagination, Navigation];

const handleClick = (i, idx) => {
  curActivedIdx.value = idx
}
</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px;
  padding: 10px 0;
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 72px!important;
}
.dianwei-box{
  position: relative;
  :deep(.heluo-sys-beauty-foundation-wrapper){
    margin: 0 auto;
  }
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
  background: rgba(40, 56, 59);
  cursor: pointer;
  box-sizing: border-box;
  height: 72px;
  line-height: 72px;
  background: url('@assets/usedimg/heluoSwiperLinkroom@2x.png') no-repeat center / cover;
  &.cur{
    background: url('@assets/usedimg/heluoSwiperLinkroom_cur@2x.png') no-repeat center / cover;
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
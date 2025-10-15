<template>
    <div class="swiper-container">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="32"
        ::navigation="true"
        class="mySwiper"
      >
        <swiper-slide v-for="(item, index) in slides" :key="index" class="swiper-item">
          <div @click="handleClick(item.title, index)" :class="['each-item-text', index === curActivedIdx ? 'cur' : '']">{{item.title}}</div>
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(3);
const curActivedIdx = ref(0)
const isnavigation = ref(true)

const slides = ref([
  {
    title: '新风系统',
  },
  {
    title: '排风系统',
  },
  {
    title: '智能空调',
  },
  {
    title: '实验室门禁',
  },
  {
    title: '监控系统',
  },
  {
    title: '消毒系统',
  }
]);

const modules = [Pagination, Navigation];

const handleClick = (i, idx) => {
  curActivedIdx.value = idx
}
</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px;
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 34px!important;
  width: 92px!important;
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
  height: 34px;
  line-height: 34px;
  background: url('@assets/usedimg/k@2x.png') no-repeat center / cover;
  text-indent: 25px;
  &.cur{
    background: url('@assets/usedimg/k_cur@2x.png') no-repeat center / cover;
  }
}
:deep(.swiper-button-next){
  height: 26px;
  width: 16px;
  position: absolute;
  top: 26px;
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
  top: 26px;
  left: 0;
}
</style>
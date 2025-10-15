<template>
    <div class="swiper-container">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="0"
        :navigation="true"
        class="mySwiper"
        @slide-change="handleSlideChange"
      >
        <swiper-slide v-for="(item, index) in slides" :key="index" class="swiper-item">
          <curlyLineCharts :echartdata="slides[currentIndex]" :activeIndex="currentIndex" />
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted, defineProps, watch, defineExpose } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import curlyLineCharts from '../curlyLineCharts/index.vue'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(1);
const curActivedIdx = ref(0)
const isnavigation = ref(true)
const props = defineProps(['swiperdData'])

const slides = ref([]);
const curEchartData = ref([])

const currentIndex = ref(0);
const handleSlideChange = (swiperInstance: any) => {
  currentIndex.value = swiperInstance.activeIndex;
};

watch(
  () => props.swiperdData,
  (newVal) => {
    slides.value = newVal.map(v => {
      return { attributeName: v.attributeName, attributeCode: v.attributeCode, list: v.values, unitName: v.unitName }
    })
  },
  {
    deep: true
  }
)

const modules = [Pagination, Navigation];

defineExpose({
  currentIndex
})

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
  height: 100%!important;/*swiper子项目整体高度，父级继承*/
  width: 100%!important;/*swiper子项目整体宽度，父级继承*/
}
:deep(.swiper) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

:deep(.swiper-button-next){
  height: 26px;
  width: 16px;
  position: absolute;
  top: 55%;
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
  top: 55%;
  left: 0;
}
</style>
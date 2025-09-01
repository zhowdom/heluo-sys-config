<template>
    
    <!-- Swiper 容器 -->
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
        <!-- 轮播项 -->
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
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // 控制可见项目数量的变量
const slidesPerView = ref(1);
// 当前点击激活的项目高亮标记下标
const curActivedIdx = ref(0)
const isnavigation = ref(true)
const props = defineProps(['swiperdData'])

  // 轮播数据
const slides = ref([]);
const curEchartData = ref([])

// 当前索引状态
const currentIndex = ref(0);
// 处理幻灯片切换事件
const handleSlideChange = (swiperInstance: any) => {
  // 获取当前索引（非循环模式用activeIndex，循环模式用realIndex）
  currentIndex.value = swiperInstance.activeIndex;
};

watch(
  () => props.swiperdData,
  (newVal) => {
    slides.value = newVal.map(v => {
      console.log(slides, 'slides看雨哦看')
      return { attributeName: v.attributeName, attributeCode: v.attributeCode, list: v.values, unitName: v.unitName }
    })
  },
  {
    deep: true
  }
)


// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

defineExpose({
  currentIndex
})

</script>
  
<style scoped lang="less">
  /* 自定义 Swiper 容器样式 */
.swiper-container {
  margin: 0 auto;
  width: 400px;
}

/* 自定义轮播项样式 */
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
/* 容器内边距为10px，实现箭头与内容的间距 */
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
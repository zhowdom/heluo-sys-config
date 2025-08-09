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
      >
        <!-- 轮播项 -->
        <swiper-slide v-for="(item, index) in slides" :key="index" class="swiper-item">
          <curlyLineCharts />
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
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

  // 轮播数据
const slides = ref([
  {
    title: '全部',
  },
  {
    title: '1楼',
  },
  {
    title: '2楼',
  },
  {
    title: '3楼',
  },
  {
    title: '4楼',
  },
  {
    title: '5楼',
  },
  {
    title: '6楼',
  },
  {
    title: '7楼',
  },
  {
    title: '8楼',
  },
  {
    title: '9楼',
  }
]);

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

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
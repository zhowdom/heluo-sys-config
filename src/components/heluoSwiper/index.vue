<template>
    <div class="container mx-auto py-12">
    <h2 class="text-2xl font-bold mb-6 text-center">Swiper.js 轮播演示</h2>
    
    <!-- Swiper 容器 -->
    <div class="swiper-container">
      <swiper 
        :modules="modules" 
        :pagination="{ clickable: true }"
        :slides-per-view="slidesPerView"
        :navigation="true"
        class="mySwiper"
      >
        <!-- 轮播项 -->
        <swiper-slide v-for="(item, index) in slides" :key="index">
          <div class="slide-content bg-white rounded-lg shadow-md p-6 text-center">
            <div class="text-4xl mb-4">
              <img :src="item.icon" />
            </div>
            <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // 控制可见项目数量的变量
const slidesPerView = ref(3);

  // 轮播数据
const slides = ref([
  {
    title: '特性一',
    description: 'Swiper.js 是一个强大的现代滑动库',
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg'
  },
  {
    title: '特性二',
    description: '完美支持 Vue3 和 Composition API',
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg'
  },
  {
    title: '特性三',
    description: '提供丰富的插件和自定义选项',
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg'
  },
  {
    title: '特性四',
    description: '响应式设计，适配各种设备',
    icon: '	https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg'
  }
]);

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];
</script>
  
<style>
  /* 自定义 Swiper 容器样式 */
.swiper-container {
  max-width: 800px;
  margin: 0 auto;
}

/* 自定义轮播项样式 */
.slide-content {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 自定义分页指示器颜色 */
.swiper-pagination-bullet-active {
  background-color: #4F46E5 !important;
}

/* 自定义导航按钮颜色 */
.swiper-button-prev,
.swiper-button-next {
  color: #4F46E5 !important;
}
</style>
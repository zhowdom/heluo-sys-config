<template>
    
    <!-- Swiper 容器 -->
    <div class="swiper-container flex-center">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="32"
        :navigation="true"
        class="mySwiper"
      >
        <!-- 轮播项 -->
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
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // 控制可见项目数量的变量
const slidesPerView = ref(3);
// 当前点击激活的项目高亮标记下标
const curActivedIdx = ref(0)

  // 轮播数据
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

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

//点击事件
const handleClick = (i, idx) => {
  console.log(i, '点击项目')
  curActivedIdx.value = idx
}
</script>
  
<style scoped lang="less">
  /* 自定义 Swiper 容器样式 */
.swiper-container {
  margin: 0 auto;
  width: 400px;
  height: 10vh;
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
  height: 68px!important;/*swiper子项目整体高度，父级继承*/
  width: 92px!important;/*swiper子项目整体宽度，父级继承*/
}
/* 容器内边距为10px，实现箭头与内容的间距 */
:deep(.swiper) {
  padding-left: 32px !important;
  padding-right: 32px !important;
}
/* 每一项文字 */
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
  height: 68px;
  line-height: 68px;
  &.cur{
    border: 2px solid #1AE2BE;
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
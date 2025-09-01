<template>
    
    <!-- Swiper 容器 -->
    <div class="swiper-container flex-center">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="0"
        :navigation="true"
        class="mySwiper"
      >
        <!-- 轮播项 -->
        <swiper-slide class="swiper-item">
          <div class="each">
            <beautyFoundation class="mini" :infos="{ attributeValue: 89, unitName: 'Pa', attributeName: '实验室101'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 23, unitName: 'Pa', attributeName: '实验室102'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 45, unitName: 'Pa', attributeName: '实验室103'}" />

            <beautyFoundation class="mini" :infos="{ attributeValue: 17, unitName: 'Pa', attributeName: '实验室104'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 19, unitName: 'Pa', attributeName: '实验室105'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 69, unitName: 'Pa', attributeName: '实验室106'}" />
          </div>
        </swiper-slide>

        <swiper-slide class="swiper-item">
          <div class="each">
            <beautyFoundation class="mini" :infos="{ attributeValue: 39, unitName: 'Pa', attributeName: '实验室107'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 12, unitName: 'Pa', attributeName: '实验室108'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 10, unitName: 'Pa', attributeName: '实验室109'}" />

            <beautyFoundation class="mini" :infos="{ attributeValue: 21, unitName: 'Pa', attributeName: '实验室110'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 51, unitName: 'Pa', attributeName: '实验室111'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 90, unitName: 'Pa', attributeName: '实验室112'}" />
          </div>
        </swiper-slide>

        <swiper-slide class="swiper-item">
          <div class="each">
            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />

            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />
            <beautyFoundation class="mini" :infos="{ attributeValue: 1, unitName: 'Pa', attributeName: '实验室102'}" />
          </div>
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import beautyFoundation from '../beautyFoundation/index.vue'
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // 控制可见项目数量的变量
const slidesPerView = ref(1);
const isnavigation = ref(true)

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

</script>
  
<style scoped lang="less">
  /* 自定义 Swiper 容器样式 */
.swiper-container {
  margin: 0 auto;
  width: 400px!important;
  height: 200px;
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
  height: 202px!important;/*swiper子项目整体高度，父级继承*/
  width: 100%!important;/*swiper子项目整体宽度，父级继承*/
  .each{
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    gap: 0; /* 子元素之间的间距 */
    padding: 0;
    .mini{
      flex: 1; /* 让子元素等分剩余空间 */
      min-width: calc(33.333% - 10px); /* 确保每行最多3个，减去gap的影响 */
      box-sizing: border-box; /* 确保padding和border不影响宽度计算 */
    }
  }
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
  top: 50%;
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
  top: 50%;
  left: 0;
}
</style>
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
        <swiper-slide v-for="item in groupedLabs" :key="item.id" class="swiper-item">
          <div class="each">
            <beautyFoundation v-for="(item, index) in list" :key="index" class="mini" :infos="{ attributeValue: item?.attributes[0]?.['values'][0]['value'], unitName: item?.attributes[0]?.['unitName'], attributeName: item?.name}" />
          </div>
        </swiper-slide>

        

        
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted, computed } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import beautyFoundation from '../beautyFoundation/index.vue'
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  const props = defineProps(['list'])

  // 控制可见项目数量的变量
const slidesPerView = ref(1);
const isnavigation = ref(true)
// 每6子项为一组
const group_nums = 6

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

// 数据分组 - 计算属性，将实验室数据分成每6个一组
  const groupedLabs = computed(() => {
    const groups = [];
    // 遍历所有实验室数据，每6个分为一组
    for (let i = 0; i < props.list.length; i += group_nums) {
      groups.push(props.list.slice(i, i + group_nums));
    }
    
    return groups;
  });

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
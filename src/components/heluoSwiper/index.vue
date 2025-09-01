<template>
    
    <!-- Swiper 容器 -->
    <div class="swiper-container">
      <div class="custom-nav prev-btn" @click="handlePrev">
        <i class="icon-left"></i>
      </div>
      <div class="custom-nav next-btn" @click="handleNext">
        <i class="icon-right"></i>
      </div>
      <div class="inner">
        <swiper
        :modules="modules" 
        :slides-per-view="slidesPerView"
        @swiper="handleSwiperInit"
        :slide-to-clicked-slide="true"
        space-between="10"
        class="mySwiper"
      >
        <!-- 轮播项 -->
        <swiper-slide v-for="(item, index) in props?.swiperData" :key="index" class="swiper-item">
          <div v-if="props.type === SwiperPropsType.WarnType" @click="handleClick(item?.typeCode, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.typeName}}</div>
          <div v-if="props.type === SwiperPropsType.ShiYanShi" @click="handleClick(item?.spaceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.spaceName}}</div>
          <div v-if="props.type === SwiperPropsType.ChuanGanQi" @click="handleClick(item?.deviceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.deviceName}}</div>
          <div v-if="props.type === SwiperPropsType.Floor" @click="handleClick(item?.spaceId, index)" :class="['each-item-text txtellipsis', index === curActivedIdx ? 'cur' : '']">{{item?.spaceName}}</div>
        </swiper-slide>
      </swiper>
      </div>
      
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted, defineEmits, defineProps } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import {SwiperPropsType} from '@/types'
  
  // 引入 Swiper 样式
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  // 控制可见项目数量的变量
const slidesPerView = ref(4);
// 当前点击激活的项目高亮标记下标
const curActivedIdx = ref(0)
let swiperInstance = null;

// 初始化完成后获取实例
const handleSwiperInit = (swiper) => {
  swiperInstance = swiper;
  console.log('Swiper初始化完成');
};

// 自定义导航按钮事件
const handlePrev = () => {
  if (swiperInstance) {
    swiperInstance.slidePrev(); // 切换到上一组
  }
};

const handleNext = () => {
  if (swiperInstance) {
    swiperInstance.slideNext(); // 切换到下一组
  }
};

const props = defineProps(['swiperData', 'type'])
const emit = defineEmits(['updateCurIndex'])

// 注册需要的 Swiper 模块
const modules = [Pagination, Navigation];

//点击事件
const handleClick = (i, idx) => {
  console.log(i, '点击项目')
  curActivedIdx.value = idx
  emit('updateCurIndex', {
    queryCode: i,
    idx
  })
}

</script>
  
<style scoped lang="less">
  /* 自定义 Swiper 容器样式 */
.swiper-container {
  margin: 0 auto;
  width: 400px;
  padding: 0 10px;
  box-sizing: border-box;
  position: relative;
  .inner{
    width: calc(100% - 23px);
    margin: 0 auto;
  }
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
  height: 26px!important;/*swiper子项目整体高度，父级继承*/
  width: 80px!important;/*swiper子项目整体宽度，父级继承*/
}
/* 容器内边距为10px，实现箭头与内容的间距 */
:deep(.swiper) {
  // padding-left: 32px !important;
  // padding-right: 32px !important;
}
/* 每一项文字 */
.each-item-text{
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 14px;
  color: rgba(255,255,255,0.68);
  text-align: center;
  line-height: 22px;
  background: #29393c;
  border-radius: 10px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,.6);
  background: rgba(32,59,65,0.8) rgba(37,57,58,0.8);
  &.cur{
    background: #112024;
    border: 2px solid #1AE2BE;
  }
  &:hover{
    background: linear-gradient( 180deg, rgba(45,240,231,0) 0%, rgba(45,240,231,0.3) 100%);
    border-bottom: 1px solid #29E3BF;
    box-sizing: border-box;
    border-left: none;
    border-right: none;
    border-top:none;
  }
}

.custom-nav{
  position: absolute;
  top: -1px;
  height: 26px;
  width: 16px;
  cursor: pointer;
}
.prev-btn{
  background: url('@assets/usedimg/swiper_left@2x.png') no-repeat center / cover;
  left: 0;
}
.next-btn{
  background: url('@assets/usedimg/swiper_right@2x.png') no-repeat center / cover;
  right: 0;
}
</style>
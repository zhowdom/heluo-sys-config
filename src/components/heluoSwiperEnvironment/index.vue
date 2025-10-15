<template>
    
    <div class="swiper-container">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="32"
        :navigation="true"
        class="mySwiper"
      >
        <swiper-slide class="swiper-item">
          <div class="each">
            <oppositeAngleA />
          </div>
        </swiper-slide>

        <swiper-slide class="swiper-item">
          <div class="each">
            <oppositeAngleA />
          </div>
        </swiper-slide>

        <swiper-slide class="swiper-item">
          <div class="each">
            <oppositeAngleA />
          </div>
        </swiper-slide>
      </swiper>
    </div>
</template>
  
<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Pagination, Navigation } from 'swiper/modules';
  import oppositeAngleA from '../oppositeAngleA/index.vue'
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

const slidesPerView = ref(1);

const modules = [Pagination, Navigation];

</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px;
  height: 240px;
  background: pink;
}

.slide-content {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-item){
  height: 202px!important;
  width: 368px!important;
  .each{
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    gap: 10px; /* 子元素之间的间距 */
    padding: 10px;
    .mini{
      flex: 1; /* 让子元素等分剩余空间 */
      min-width: calc(33.333% - 10px); /* 确保每行最多3个，减去gap的影响 */
      box-sizing: border-box; /* 确保padding和border不影响宽度计算 */
    }
  }
}
:deep(.swiper) {
  padding-left: 32px !important;
  padding-right: 32px !important;
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
<template>
    
    <div class="swiper-container flex-center">
      <swiper 
        :modules="modules" 
        :slides-per-view="slidesPerView"
        :slide-to-clicked-slide="true"
        space-between="0"
        :navigation="true"
        class="mySwiper"
      >
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
  
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  const props = defineProps(['list'])

const slidesPerView = ref(1);
const isnavigation = ref(true)
const group_nums = 6

const modules = [Pagination, Navigation];

  const groupedLabs = computed(() => {
    const groups = [];
    for (let i = 0; i < props.list.length; i += group_nums) {
      groups.push(props.list.slice(i, i + group_nums));
    }
    
    return groups;
  });

</script>
  
<style scoped lang="less">
.swiper-container {
  margin: 0 auto;
  width: 400px!important;
  height: 200px;
}

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
<template>
    <!--测试各个组件静态展示-->
    <beautyFoundation
    :infos="testdata"
    :topType="1"
     />
     <heluoSwiper />
</template>
  
<script setup lang='ts'>
  import beautyFoundation from '@/components/beautyFoundation/index.vue'
  import heluoSwiper from '@/components/heluoSwiper/index.vue'
  import {ref} from 'vue'
  const testdata = ref({
      value: 1,
      unit: '%RH',
      subDesc: '回风湿度'
    })
</script>
  
<style>
  
</style>
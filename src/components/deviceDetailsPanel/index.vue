<template>
    <div :class="bem()">
      <div class="l">
        <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
      </div>
      <div class="r">
        <p class="name">新风组-001</p>
        <p>编号： XF-001</p>
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-deviceDetailsPanel')

</script>
  
<style scoped lang="less">
  .heluo-sys-deviceDetailsPanel{
    background: #233539;
    padding: 12px;
    width: 368px;
    height: 88px;
    display: flex;
    align-items: center;
    color: #b4bbbc;
    .l{
      height: 60px;
      width: 60px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .r{
      padding-left: 15px;
      .name{
        padding-bottom: 10px;
        color: #fff;
      }
    }
  }
</style>
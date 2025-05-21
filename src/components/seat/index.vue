<script setup lang="ts">
import { createNamespace, autoImg } from '@/utils'
const { bem } = createNamespace('heluo-sys-seat')
defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>

<template>
   <div :class="[bem()]">
    <img :class="bem('icon')" :src="autoImg(name, 'seat')" />
    <img :class="bem('seat')" src="@assets/usedimg/seat/base-di@3x.png" />
   </div>
</template>

<style scoped lang="less">
.heluo-sys-seat{
  // width:120px;
  // height:110px;
  width:150px;
  height:140px;
  position:relative;
  margin-top:60px;
  &__icon{
    // height:32px;
    // width:32px;
    height:62px;
    width:62px;
    position:absolute;
    top:20px;
    left:36px;
  }
  &__seat{
    // width:120px;
    // height:110px;
    width:150px;
    height:140px;
    position:absolute;
    bottom:-20px;
    left:0;
  }
}
</style>

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
  width:130px;
  height:130px;
  position:relative;
  margin-left: 15px;
  margin-top: -5%;
  &__icon{
    height:62px;
    width:62px;
    position:absolute;
    top:5%;
    left:35px;
  }
  &__seat{
    width:100%;
    height:100%;
  }
}
</style>

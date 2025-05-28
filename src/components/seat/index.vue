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
   <div :class="[bem(), 'set-comcard-img-media']">
    <!-- <img :class="bem('icon')" :src="autoImg(name, 'seat')" />
    <img :class="bem('seat')" src="@assets/usedimg/seat/base-di@3x.png" /> -->
    <img :class="bem('seat')" :src="autoImg(name, 'seat2')" />
   </div>
</template>

<style scoped lang="less">
.heluo-sys-seat{
  position:relative;
  margin-left: 15px;
  &__seat{
    width:100%;
    height:100%;
  }
}
</style>

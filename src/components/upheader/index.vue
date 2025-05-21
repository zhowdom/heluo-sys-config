<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-header')
import weather from '@/components/weather/index.vue'
import notice from '@/components/notice/index.vue'
import user from '@/components/user/index.vue'
</script>

<template>
   <div :class="[bem(), 'flex-center']">
      <div :class="bem('name')">
         科研建筑智慧运营平台
      </div>
      <weather />
      <notice />
      <user />
   </div>
</template>

<style scoped lang="less">
@headerh: 82px;
.heluo-sys-header{
  height:@headerh;
  width: 100%;
  position: absolute;
  top:0;
  left: 0;
  right:0;
  z-index: 100;
  background: url('@assets/usedimg/header-bg@3x.png') no-repeat center / cover;
  &__name{
   font-size: 20px;
   font-weight: bold;
   color: #fff;
   line-height: calc(@headerh - 20px);
   height: inherit;
  }
}
</style>

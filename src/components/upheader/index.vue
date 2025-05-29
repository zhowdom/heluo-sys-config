<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-header')
import weather from '@/components/weather/index.vue'
import notice from '@/components/notice/index.vue'
import user from '@/components/user/index.vue'
const sysName = ref('')
onMounted(() => {
   // @ts-ignore
   sysName.value = GLOBAL.sysName
})
</script>

<template>
   <div :class="[bem(), 'flex-center']">
      <div :class="bem('name')">
         {{sysName}}
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
  background: url('@assets/usedimg/header-bg@2x.png') no-repeat center / cover;
  &__name{
   font-size: 27px;
   font-weight: bold;
   color: #fff;
   line-height: calc(@headerh - 20px);
   height: 90px;
   filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
  }
}
</style>

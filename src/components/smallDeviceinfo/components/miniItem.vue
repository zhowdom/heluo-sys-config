<template>
    <div :class="bem()">
      <p class="name txtellipsis">{{props?.infos?.label}}</p>
      <p class="red desc txtellipsis">{{props?.infos?.desc}}</p>
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-smallDeviceinfo-mini')
import { PropType, defineProps } from 'vue'
interface Iprops {
  label: string
  desc: string
}
const props = defineProps({
  infos: {
    type: Object as PropType<Iprops>
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-smallDeviceinfo-mini{
    font-size: 12px;
    .name{
      color: rgba(255,255,255,0.7);
      padding-bottom: 5px;
    }
    .desc{
      color: #fff;
    }
    .name,.desc{
      max-width: 109px;
    }
  }
</style>
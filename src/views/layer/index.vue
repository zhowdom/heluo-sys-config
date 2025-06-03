<script setup lang="ts">
import device from '@/components/device/index.vue'
import floor from '@/components/floor/index.vue'
import profession from '@/components/profession/index.vue'
import { createNamespace } from '@/utils'
import {useTemplateRef} from 'vue'
import { useRoute } from 'vue-router'
const { bem } = createNamespace('heluo-sys-layer')
const route = useRoute();
const refFloor = useTemplateRef('refFloor')
const refProfession = useTemplateRef('refProfession')
const spaceId = route.params.spaceId as string;
</script>

<template>
  <div :class="[bem(), 'flex-between']">
    <!-- <floor top="270px" left="0px" path="layer" ref="refFloor" /> -->
    <floor path="layer" ref="refFloor" :spaceId="spaceId" @userChangedFloor="refProfession.LayerHide(true)" />
    <device :floorToDeviceList="refFloor?.floorToDeviceList || []" :loading="refFloor?.getFloorlisttodeviceLoading" />
    <profession :class="bem('mgl-auto')" ref="refProfession" />
  </div>
</template>

<style scoped lang="less">
.heluo-sys-layer {
  height:100%;
  width:100%;
  position:relative;
  &__mgl-auto{
    margin-left: auto;
  }
}
</style>

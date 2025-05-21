<script setup lang="ts">
import {ref} from 'vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-user')
import dropMenu from '@/components/dropMenu/index.vue'
import {useUser} from '@/hooks'
const refUser = ref<HTMLElement>(null!)
const {handleMouseEnter, handleMouseLeave, initialh, visible} = useUser()
</script>

<template>
   <div :class="bem()"
      ref="refUser"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave">
      <div :class="[bem('in'), 'flex-center']">
         <img src="@/assets/usedimg/admin@3x.png" />
         <img :class="bem('arrow')" src="@/assets/usedimg/triangle-down@3x.png" />
      </div>
      <dropMenu v-show="visible" />
   </div>
</template>

<style scoped lang="less">
.heluo-sys-user{
   height: v-bind(initialh);
   position: absolute;
   top:10px;
   right:20px;
   z-index: 10;
   &__in{
      height: 35px;
      width: 60px;
      cursor: pointer;
   img{
      width: 35px;
      height: 35px;
   }
   }
   &__arrow{
      height: 20px!important;
      width: 20px!important;
   }
}
</style>

<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-notice')
import {useWarnTypeStore, useGlobalVisibleControllerStore} from '@/stores'
const {getWarnType, allWarnCount}  = useWarnTypeStore()
const {globalControlVisible}  = useGlobalVisibleControllerStore()
getWarnType()
</script>

<template>
   <div :class="[bem(), 'flex-center']" @click="globalControlVisible({name: 'warn'})">
    <!-- <img src="@/assets/usedimg/notice@3x.png" /> -->
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="17" viewBox="0 0 14 17" fill="none">
      <path d="M8.55663 1.42555C8.55663 0.640637 7.8611 0 7.00272 0C6.14434 0 5.44706 0.638064 5.44706 1.42555C5.44706 1.50669 5.45308 1.58606 5.46707 1.66166C3.31985 2.34801 1.55586 4.45536 1.55586 6.94765V8.91053C1.55586 8.91053 1.55586 11.3842 0.797168 11.4084C0.347279 11.4084 0 11.7292 0 12.123C0 12.5169 0.347279 12.8351 0.776957 12.8351H13.223C13.6552 12.8351 14 12.5161 14 12.1222C14 11.7284 13.6525 11.4111 13.223 11.4111C12.4443 11.4111 12.4443 8.93309 12.4443 8.93309V6.94963C12.4443 4.45378 10.7968 2.34544 8.53312 1.66205C8.54886 1.58368 8.55838 1.50689 8.55838 1.42674L8.55663 1.42575V1.42555ZM9.33359 13.6335C9.33184 14.815 8.56091 16.0395 7.00175 16.0395C5.44259 16.0395 4.67068 14.8188 4.66893 13.6335H9.3334H9.33359Z" fill="white"/>
   </svg>
    <i>{{allWarnCount >= 99 ? '99+' : allWarnCount}}</i>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-notice{
   position: fixed;
   top:10px;
   right:120px;
   background: #677274;
   height: 35px;
   width: 35px;
   border-radius: 100%;
   cursor: pointer;
  img{
   width: 22px;
   height: 22px;
  }
  i{
   background: #DA4343;
   display: inline-block;
   color: #fff;
   font-size: 12px;
   padding: 1px 3px;
   border-radius: 7px;
   font-style: normal;
   position: absolute;
   top:-5px;
   right:-20px;
  }
}
</style>

<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-card-title')
defineProps({
  name: {
    type: String,
    default: ''
  }
})
</script>

<template>
   <div :class="[bem()]">
    {{name}}
   </div>
</template>

<style scoped lang="less">
@h: 50px;
.heluo-sys-card-title{
  height: @h;
  width: 100%;
  background: linear-gradient( 90deg, #00B8BF 0%, rgba(41,227,191,0) 100%);
  position: relative;
  line-height:@h;
  text-indent: 36px;
  &:before{
    content: '';
    width:12px;
    height: 12px;
    position:absolute;
    top:17px;
    left:12px;
    background: #FAEE6D;
    border-radius:100%;
    box-shadow: 0px 0px 5px 0px #FAEE6D;
  }
  &:after{
    content: '';
    height:1px;
    width:100%;
    position: absolute;
    top:0;
    left:0;
    background: linear-gradient(
      90deg,
      rgba(41, 227, 191, 1) 0%,      /* 0%位置：纯红不透明 */
      rgba(41, 227, 191, 1) 20%, /* 中间可加控制点（可选） */
      rgba(41, 227, 191, 0) 100%   /* 100%位置：黄全透明 */
    );
  }

}
</style>

<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-drop-menu')
const menus = [{label: '中台'}, {label: '退出'}]
</script>

<template>
   <div :class="[bem()]">
    <ul>
      <li v-for="(item, idx) in menus" :key="idx">{{item.label}}</li>
    </ul>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-drop-menu{
  border-radius: 4px 4px 4px 4px;
  overflow: hidden;
  text-align: center;
  position: absolute;
  left:-20px;
  top:46px;
  ul{
    background: #647578;
    li{
      height: 40px;
      width: 80px;
      line-height: 40px;
      cursor: pointer;
      &:hover{
        background: url('@assets/usedimg/floor-cur.png') no-repeat center / cover;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-login')
import { useLogin } from '@/hooks'

const { doLogin } = useLogin()
</script>

<template>
   <div :class="[bem(), 'flex-center', 'set-center']">
    <a @click="doLogin">登陆</a>
   </div>
</template>

<style scoped lang="less">
.heluo-sys-login{
  height: 400px;
  width: 500px;
  background: rgba(255,255,255,.5);
  border-radius: 10px;
  a{
    color: #fff;
    background: #66c2ac;
    display: inline-block;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    &:hover{
      font-weight: bold;
    }
  }
}
</style>

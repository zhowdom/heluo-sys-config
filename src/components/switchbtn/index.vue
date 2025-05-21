<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-error')
defineProps({
  checked: {
    type: Boolean,
    default: true
  },
  idx: {
    type: Number
  }
})
</script>

<template>
   <main>
    <input type="checkbox" :id="`switch${idx}`" :checked="checked" hidden>
    <label :for="`switch${idx}`"></label>

    <!-- <input type="checkbox" id="switch-disabled" disabled hidden>
    <label for="switch-disabled" disabled></label>
    <input type="checkbox" id="switch-checked-disabled" checked disabled hidden>
    <label for="switch-checked-disabled" disabled></label> -->
  </main>
</template>

<style scoped lang="less">
main {
  width: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  user-select: none;
  font: 12px / 1 Helvetica, sans-serif;
}
label {
  position: relative;
  width: 40px;
  height: 20px;
  background: lightgrey;
  border-radius: 10px;
  cursor: pointer;
  transition: background .3s;
}
label[disabled] {
  cursor: not-allowed;
  opacity: .5;
}
label::before,
label::after {
  transition: all .3s;
  position: absolute;
}
label::before {
  content: '关';
  top: 4px;
  left: 22px;
  color: white;
}
label::after {
  content: '';
  top: 4px;
  left: 6px;
  width: 12px;
  height: 12px;
  border-radius: 9px;
  background: white;
}
input[type="checkbox"]:checked + label {
  background: #7ae5cb;
}
input[type="checkbox"]:checked + label::before {
  content: '开';
  left: 6px;
}
input[type="checkbox"]:active + label::after {
  width: 23px;
}
input[type="checkbox"]:checked + label::after {
  left: 21px;
}
input[type="checkbox"]:checked:active + label::after {
  left: 16px;
}
</style>

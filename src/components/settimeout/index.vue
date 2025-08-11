<script setup lang="ts">
import {ref} from 'vue'
const btns = ref([
  { name: '开机', val: 1},
  { name: '关机', val: 2}
])
const periods = ref([
  { name: '每天8:00', val: 1},
  { name: '每天8:30', val: 2},
  { name: '每天9:00', val: 3},
  { name: '工作日8:00', val: 4},
  { name: '周末9:00', val: 5},
])
const curIndexBtns = ref(-1)
const curIndexPeriods = ref(-1)
const handleBtns = (idx) => curIndexBtns.value = idx
const handlePeriods = (idx) => curIndexPeriods.value = idx
</script>

<template>
   <div class="settimeout-box">
    <div class="btns flex-between">
      <div @click="handleBtns(idx)" v-for="(item, idx) in btns" :key="idx" :class="[idx === curIndexBtns ? 'cur' : '', 'btncom']">{{item?.name}}</div>
    </div>

    <div class="periods-set">
      <span @click="handlePeriods(idx)" v-for="(item, idx) in periods" :key="idx" :class="[idx === curIndexPeriods ? 'cur' : '']">{{item?.name}}</span>
    </div>
  </div>

</template>

<style scoped lang="less">
.settimeout-box{
  color: #fff;
  font-size: 14px;
  .btns{
    background: rgba(66,100,105,0.2);
    border-radius: 4px;
    .btncom{
    padding: 14px 80px;
    }
    .cur{
      background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
    }
  }
  .periods-set{
    span{
      display: inline-block;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #206EAA;
      margin-right: 8px;
    }
    .cur{
      background: rgba(255,200,93,0.1);
      border-radius: 4px;
      border: 1px solid #FFC85D;
    }
  }

}
</style>

<script setup lang="ts">
import {ref} from 'vue'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons-vue'
const btnsList = ref([
  { name: '开机', val: 1},
  { name: '关机', val: 2}
])

const runmodeList = ref([
  { name: '自动', val: 1},
  { name: '制冷', val: 2},
  { name: '制热', val: 3},
  { name: '送风', val: 4},
])
const speedList = ref([
  { name: '自动', val: 1},
  { name: '低速', val: 2},
  { name: '中速', val: 3},
  { name: '高速', val: 4},
])
const curIndexBtns = ref(-1)
const curIndexRunMode = ref(-1)
const curIndexSpeed = ref(-1)

// 温度调节
const temperatureVal = ref(22);

const handleBtns = (idx) => curIndexBtns.value = idx
const handleRunmode = (idx) => curIndexRunMode.value = idx
const handleSpeed = (idx) => curIndexSpeed.value = idx
</script>

<template>
   <div class="settimeout-box">

    <div class="btns flex-center">
      <div @click="handleBtns(idx)" v-for="(item, idx) in btnsList" :key="idx" :class="[idx === curIndexBtns ? 'cur' : '', 'btncom']">{{item?.name}}</div>
    </div>


    <div class="temperature-box">
      <span>温度调节：</span>
      <MinusCircleOutlined class="minus" />
      <a-input class="a-input" v-model:value="temperatureVal" placeholder="" style="background: transparent;border: 1px solid #2e555c;" />
      <span class="unit">℃</span>
      <PlusCircleOutlined />
    </div>

    <span class="sub-title">运行模式</span>
    <div class="btns4 flex-center">
      <div @click="handleRunmode(idx)" v-for="(item, idx) in runmodeList" :key="idx" :class="[idx === curIndexRunMode ? 'cur' : '', 'btncom4']">{{item?.name}}</div>
    </div>

    <span class="sub-title">风速调节</span>
    <div class="btns4 flex-center">
      <div @click="handleSpeed(idx)" v-for="(item, idx) in speedList" :key="idx" :class="[idx === curIndexSpeed ? 'cur' : '', 'btncom4']">{{item?.name}}</div>
    </div>

    <span class="sub-title">定时控制</span>
    <div class="settimer">设置定时</div>
    
  </div>

</template>

<style scoped lang="less">
.settimeout-box{
  color: #fff;
  font-size: 14px;
  .btns{
    background: rgba(66,100,105,0.2);
    border-radius: 4px;
    height: 3vh;
    line-height: 3vh;
    text-align: center;
    margin-bottom: 15px;
    .btncom{
      flex: 1;
    }
    .cur{
      background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
    }
  }
  .btns4{
    background: rgba(66,100,105,0.2);
    border-radius: 4px;
    height: 3vh;
    line-height: 3vh;
    text-align: center;
    margin-bottom: 15px;
    .btncom4{
      flex: 1;
    }
    .cur{
      background: linear-gradient( 180deg, rgba(26,226,190,0.4) 0%, rgba(0,0,0,0.08) 49%, rgba(26,226,190,0.4) 100%);
      border-radius: 4px;
      border: 1px solid #1AE2BE;
    }
  }

}
.temperature-box{
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  .a-input{
    width: 120px;
  }
  .minus{
    margin: 0 10px;
  }
  .unit{
    margin: 0 10px;
  }
}

.sub-title{
  font-family: Alibaba PuHuiTi 2.0, Alibaba PuHuiTi 20;
  font-weight: normal;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 16px;
  margin-bottom: 10px;
  display: inline-block;
}
.settimer{
  width: 368px;
  height: 3vh;
  background: rgba(66,100,105,0.2);
  border-radius: 4px;
  line-height: 3vh;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
}
</style>

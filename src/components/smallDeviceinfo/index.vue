<template>
    <div :class="bem()">
      <div class="top flex-between">
        <div class="l">
          <span class="name">F010101原子吸收罩</span>
          <span class="state">报警</span>
        </div>
        <div class="r">2025/03/12 24:24:23</div>
      </div>
      <div class="main">
        <miniItem class="mc" />
        <miniItem class="mc" />
        <miniItem class="mc" />
        <miniItem class="mc" />
        <miniItem class="mc" />
        <miniItem class="mc" />
      </div>
    </div>
</template>
  
<script setup lang='ts'>
import miniItem from './components/miniItem.vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-smallDeviceinfo')

</script>
  
<style scoped lang="less">
  .heluo-sys-smallDeviceinfo{
    .l{
      font-size: 14px;
      font-weight: bold;
      color: #FFFFFF;
      .state{
        padding-left: 5px;
      }
    }
    .r{
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
    }
    .main{
      display: flex;
      flex-wrap: wrap; /* 允许换行 */
      gap: 10px; /* 子元素之间的间距 */
      padding: 10px;
      .mc{
        flex: 1; /* 让子元素等分剩余空间 */
        min-width: calc(33.333% - 10px); /* 确保每行最多3个，减去gap的影响 */
        box-sizing: border-box; /* 确保padding和border不影响宽度计算 */
      }
    }
  }
</style>
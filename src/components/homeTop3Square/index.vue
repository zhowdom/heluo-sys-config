<template>
    <div :class="bem()">
      <cardtitle name="安全态势" />
      <div class="main flex-between">
        <div class="l">
          <img src="@/assets/usedimg/hometop3square-0@2x.png" />
          <p class="label">预警总数</p>
          <p class="num warn">{{props?.infos?.total || 0}}</p>
        </div>
        <div class="m">
          <img src="@/assets/usedimg/hometop3square1@2x.png" />
          <p class="label">已处理</p>
          <p class="num done">{{props?.infos?.processedCount || 0}}</p>
        </div>
        <div class="r">
          <img src="@/assets/usedimg/hometop3square2@2x.png" />
          <p class="label">未处理</p>
          <p class="num willdo">{{props?.infos?.unProcessCount || 0}}</p>
        </div>
      </div>
      
    </div>
</template>
  
<script setup lang='ts'>
import cardtitle from '../cardtitle/index.vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-hometop3square')
import { PropType, defineProps } from 'vue'
interface Iprops {
  processedCount: number
  total: number
  unProcessCount: number
}
const props = defineProps({
  infos: {
    type: Object as PropType<Iprops>
  }
})
</script>
  
<style scoped lang="less">
  .heluo-sys-hometop3square{
    /*标题50,组件主体120， 占（170/980）*100 = 17vh*/
    height: 15vh;
    .main{
      padding-bottom: 20px;
      position: relative;
      padding: 0 10px 0 10px;
      .l,.m,.r{
        margin-top:10px;
      }
    }
    
    .l,.m,.r{
      width: 114px;
      height: 73px;
      position: relative;
      img{
        width: 100%;
        height: 73px;
      }
    }
    .label{
      font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
      font-weight: 500;
      font-size: 16px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .num{
      font-family: D-DIN Exp-DINExp, D-DIN Exp-DINExp;
      font-weight: bold;
      font-size: 24px;
      text-align: center;
      position: absolute;
      top: 20px;
      left: 0;
      width: 100%;
    }
    .num.warn{
      /* 设置渐变背景 */
      background: linear-gradient(to bottom, #EACFA2FF, #AA9777FF);
      /* 将背景裁剪为文字形状 */
      -webkit-background-clip: text;
      background-clip: text;
      /* 文字颜色设为透明，显示背景渐变 */
      color: transparent;
      /* 可选：增加文字清晰度 */
      text-shadow: 0 0 1px rgba(0,0,0,0.1);
    }
    .num.done{
      /* 设置渐变背景 */
      background: linear-gradient(to bottom, #97DAB7FF, #71A78CFF);
      /* 将背景裁剪为文字形状 */
      -webkit-background-clip: text;
      background-clip: text;
      /* 文字颜色设为透明，显示背景渐变 */
      color: transparent;
      /* 可选：增加文字清晰度 */
      text-shadow: 0 0 1px rgba(0,0,0,0.1);
    }
    .num.willdo{
      /* 设置渐变背景 */
      background: linear-gradient(to bottom, #98D9DEFF, #709FA3FF);
      /* 将背景裁剪为文字形状 */
      -webkit-background-clip: text;
      background-clip: text;
      /* 文字颜色设为透明，显示背景渐变 */
      color: transparent;
      /* 可选：增加文字清晰度 */
      text-shadow: 0 0 1px rgba(0,0,0,0.1);
    }
  }
</style>
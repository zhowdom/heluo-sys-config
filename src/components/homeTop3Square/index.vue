<template>
    <div :class="bem()">
      <cardtitle name="安全态势" />
      <div class="main flex-between">
        <div class="l">
          <img src="@/assets/usedimg/hometop3square-0@2x.png" />
          <p class="label">预警总数</p>
          <p class="num warn">2390</p>
        </div>
        <div class="m">
          <img src="@/assets/usedimg/hometop3square1@2x.png" />
          <p class="label">已处理</p>
          <p class="num done">2390</p>
        </div>
        <div class="r">
          <img src="@/assets/usedimg/hometop3square2@2x.png" />
          <p class="label">未处理</p>
          <p class="num willdo">2390</p>
        </div>

        <ul>
          <li>预警总数</li>
          <li>已处理</li>
          <li>未处理</li>
        </ul>
      </div>
      
    </div>
</template>
  
<script setup lang='ts'>
import cardtitle from '../cardtitle/index.vue'
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-hometop3square')
  
</script>
  
<style scoped lang="less">
  .heluo-sys-hometop3square{
    .main{
      gap: 10px;
      padding-bottom: 30px;
      position: relative;
    }
    
    ul{
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      li{
        font-family: Alibaba PuHuiTi, Alibaba PuHuiTi;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        line-height: 14px;
        float: left;
        &::before{
          content: '';
          display: inline-block;
          width: 12px;
          height: 12px;
          border-radius: 100%;
        }
        &:nth-child(1)::before {
            background: linear-gradient( 180deg, #FFF4E2 0%, #EACFA2 21%, rgba(184,162,126,0.87) 67%, rgba(170,151,119,0.12) 100%);
        }
        &:nth-child(2)::before {
            background: linear-gradient( 180deg, #EAFFE2 0%, #97DAB7 21%, rgba(113,167,140,0.87) 67%, rgba(113,167,140,0.12) 100%);
        }
        &:nth-child(3)::before {
            background: linear-gradient( 180deg, #E2FDFF 0%, #98D9DE 21%, rgba(119,170,173,0.87) 67%, rgba(112,159,163,0.12) 100%);
        }
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
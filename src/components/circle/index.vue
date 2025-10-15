<script setup lang="ts">
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-circle')
defineProps({
  percent: {
    type: Number,
  }
})

</script>

<template>
   <div :class="bem()">
    <div class="flex-wrapper">
    <div class="single-chart">
      <svg viewBox="0 0 36 36" class="circular-chart orange">
        <path class="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path class="circle"
          :stroke-dasharray="`${percent}, 100`"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" class="percentage">{{percent}}%</text>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#6dcfe9"/>
                <stop offset="100%" stop-color="#6dcfe9"/>
            </linearGradient>
        </defs>
      </svg>
    </div>
  
</div>
  </div>
</template>

<style scoped lang="less">
.heluo-sys-card-item-b{
  height: 100%;
  width: 100%;
}
.flex-wrapper {
  display: flex;
  flex-flow: row nowrap;
  position: absolute;
  top:-3px;
  left: -3px;
}
.single-chart {
  width: 134px;
  justify-content: space-around ;
}
.circular-chart {
  display: block;
  margin: 8px;
  max-width: 100%;
  max-height: 134px;
}
.circle-bg {
  fill: none;
  // stroke: #eee;
  stroke: rgba(49, 67, 73, .2);
  stroke-width: 1.5px;
}
.circle {
  fill: none;
  stroke-width: 1.5px;
  stroke-linecap: round;
  animation: progress 2s ease-out forwards;
}
@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
.circular-chart.orange .circle {
  stroke: url(#gradient); /* 引用渐变 */
}
.percentage {
  fill: #fff;
  font-family: sans-serif;
  font-size: 6px;
  text-anchor: middle;
}
</style>

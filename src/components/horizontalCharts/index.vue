<template>
    <div :class="bem()">
     <div ref="chartRef" class="chart-box"></div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-verticalCharts')

import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['chartData'])

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)

  const colorGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#567795' },  
    { offset: 1, color: '#a7c9e6' } 
  ])
  
  const option = {
    grid: {
      left: 10,    
      right: 40,   
      top: 20,     
      bottom: 10,  
      containLabel: true  
    },
    tooltip: {
      trigger: 'axis', 
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false
      },
      show: false,
      axisTick: {
        show: false
      }
    },
  yAxis: {
      type: 'category',
      data: props?.chartData.map(item => item.deviceName), 
      splitLine: {
        show: false
      },
      axisLabel: {
        color: 'white', 
        fontSize: 12,
        interval: 0 
      }
    },
    series: [
      {
        name: '使用时间',
        type: 'bar',
        data: props?.chartData.map(item => item.hours),
        barWidth: 10, 
        itemStyle: {
          color: colorGradient  
        },
        tooltip: {
          valueFormatter: function (value) {
            return value +'小时'
          }
        },
        label: {
          show: true,
          position: 'right',  
        }
      }
    ]
  }
  
  chartInstance.setOption(option)
}

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}
watch(
  () => props?.chartData,
  (newVal) => {
    initChart()
  }
)
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>
  
<style scoped lang="less">
  .heluo-sys-verticalCharts{
    height: calc(100% - 50px);
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
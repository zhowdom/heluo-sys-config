<template>
    <div :class="bem()">
     <div ref="chartRef" class="chart-box"></div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-verticalCharts')

import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
  grid: {
      left: 15,    
      right: 15,  
      top: 10,     
      bottom: 15,  
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
    
    xAxis: [
    {
      type: 'category',
      data: ['00:00', '06:00', '12:00', '18:00', '19:00', '21:00', '23:00'],
      axisLabel: {
          color: 'white',
          fontSize: 11 
      },
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 25,
      interval: 5,
      nameTextStyle: {
          color: 'white', 
          fontSize: 11, 
          fontWeight: 'bold'
      },
      splitLine: {
          show: true,
          lineStyle: {
              type: 'dashed',
              color: '#b9c2c6'
          }
      },
      axisLabel: {
        formatter: '{value} ³/h',
        color: 'white',
        fontSize: 11
      }
    }
  ],
    series: [
    {
      name: '余风量',
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ³/h';
        }
      },
      lineStyle: {
        width: 2,
        color: '#5eb5ce' 
      },
      itemStyle: {
          color: '#5eb5ce', 
          borderColor: 'white', 
          borderWidth: 2, 
      },
      showSymbol: false,  
      smooth: true,
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
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

onMounted(() => {
  initChart()
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
    /*30vh*/
    height: 20vh;
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
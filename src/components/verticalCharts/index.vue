<template>
    <div :class="bem()">
     <div ref="chartRef" class="chart-box"></div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-verticalCharts')

import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps(['chartlist'])

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
    grid: {
      left: 10,    
      right: 10,   
      top: 30,     
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
    legend: {
      orient: 'horizontal',
      left: 'center',
      top: '0%',
      textStyle: {
        color: 'white',
        fontSize: 11,  
        fontWeight: 'normal'
      },
      icon: 'circle', 
      itemWidth: 10,   
      itemHeight: 10, 
      itemGap: 20,     
    },
    xAxis: [
    {
      type: 'category',
      data: props.chartlist.map(v => v.typeName),
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
          color: 'white', 
          fontSize: 11
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
          }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 25,
      interval: 5,
      splitLine: {
          show: true,
          lineStyle: {
              type: 'dashed',
              color: '#b9c2c6'
          }
      },
      axisLabel: {
        color: 'white',
        fontSize: 11,
        formatter: '{value}'
      }
    }
  ],
    series: [
    {
      name: '告警',
      type: 'bar',
      barWidth: 10,
      tooltip: {
        valueFormatter: function (value) {
          return value + '次'
        }
      },
      itemStyle: {
        color: '#80a68e'
      },
      smooth: true,
      data: props.chartlist.map(v => v.count)
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
  () => props.chartlist,
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
    height: 18vh;
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
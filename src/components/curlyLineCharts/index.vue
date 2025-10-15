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
import dayjs from 'dayjs';

const props = defineProps(['echartdata', 'activeIndex'])

watch(
  () => props.echartdata,
  (newval) => {
    initChart()
  }
)

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  
  const option = {
  grid: {
      left: 15,   
      right: 15,   
      top: 40,     
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
    legend: {
      orient: 'horizontal',
      left: 'center',
      top: '0%',
      textStyle: {
        color: 'white', 
        fontSize: 12,   
        fontWeight: 'normal' 
    },
    },
    xAxis: [
    {
      type: 'category',
      data: props.echartdata && props.echartdata['list'].map(v => dayjs(v.time).format('YY/MM/DD')),
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        color: 'white', 
        fontSize: 11 
    },
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: props.echartdata && Math.max(...props.echartdata?.['list'].map(v => v.value)),
      interval: 5,
      splitLine: {
          show: true,
          lineStyle: {
              type: 'dashed',
              color: '#b9c2c6' 
          }
      },
      nameTextStyle: {
          color: 'white', 
          fontSize: 11,   
          fontWeight: 'bold'
      },
      axisLabel: {
        formatter: `{value} ${props.echartdata && props.echartdata['unitName']}`,
        color: 'white',
        fontSize: 11
      },
    }
  ],
    series: [
    {
      name: props.echartdata && props.echartdata['attributeName'],
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          return value + ` ${props.echartdata && props.echartdata['unitName']}`;
        }
      },
      lineStyle: {
          color: 'orange',
          width: 2
      },
      itemStyle: {
          color: 'orange',
          borderColor: 'white',
          borderWidth: 2
      },
      showSymbol: false, 
      smooth: true,
      data: props.echartdata && props.echartdata['list'].map(v => v.value),
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
    height: calc(60vh - 350px);
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
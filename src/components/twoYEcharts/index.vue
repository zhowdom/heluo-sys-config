<template>
  <!--两个Y轴的曲线案例demo-三期本来有，后来取消了-->
    <div :class="bem()">
     <div ref="chartRef" class="chart-box"></div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-verticalCharts')

import { ref, onMounted, onUnmounted } from 'vue'
// 引入ECharts
import * as echarts from 'echarts'

// 获取图表容器的引用
const chartRef = ref(null)
// 存储图表实例
let chartInstance = null

// 初始化图表
const initChart = () => {
  // 确保容器存在
  if (!chartRef.value) return
  
  // 初始化图表实例
  chartInstance = echarts.init(chartRef.value)
  
  // 图表配置项
  const option = {

    tooltip: {
      trigger: 'axis', // item
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    // legend每条曲线的按钮[可点击]
    legend: {
      orient: 'horizontal',
      left: 'center',
      top: '10%',
    },
    xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  // Y轴
  yAxis: [
    {
      type: 'value',
      name: '温度',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    {
      type: 'value',
      name: '湿度',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
    series: [
    {
      name: '蒸发量', // 蒸发量
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      smooth: true,
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '降雨量', // 降雨量
      type: 'line',
      tooltip: {
        valueFormatter: function (value) {
          return value + ' ml';
        }
      },
      smooth: true,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: '温度', // 温度
      type: 'line',
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value + ' °C';
        }
      },
      smooth: true,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    }
  ]
  }
  
  // 设置图表配置项
  chartInstance.setOption(option)
}

// 监听窗口大小变化，重绘图表
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 组件挂载时初始化图表
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

// 组件卸载时销毁图表
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
    height: 30vh;
    width:400px;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
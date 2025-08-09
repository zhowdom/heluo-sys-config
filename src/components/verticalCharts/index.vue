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
  // 关键配置：控制图表与容器的间距为10px
    grid: {
      left: 10,    // 左间距
      right: 10,   // 右间距
      top: 30,     // 上间距
      bottom: 10,  // 下间距
      containLabel: true  // 确保标签不被裁剪
    },
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
      top: '0%',
      // 设置图例标记为圆形（原点）
      icon: 'circle',  // 核心配置：圆形图标
      itemWidth: 10,   // 原点宽度
      itemHeight: 10,  // 原点高度（与宽度一致确保是正圆）
      itemGap: 20,     // 图例项之间的间距
    },
    xAxis: [
    {
      type: 'category',
      data: ['设备', '能耗', '仪器', '安防', '安全', '环境'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  // Y轴
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 25,
      interval: 5,
      axisLabel: {
        // formatter: '{value} °C'
        formatter: '{value}'
      }
    }
  ],
    series: [
    {
      name: '预警总数',
      type: 'bar',
      tooltip: {
        valueFormatter: function (value) {
          return value
        }
      },
      itemStyle: {
        color: '#dfcca7'
      },
      smooth: true,
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '已处理',
      type: 'bar',
      itemStyle: {
        color: '#9ccaae'
      },
      tooltip: {
        valueFormatter: function (value) {
          return value
        }
      },
      smooth: true,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: '未处理',
      type: 'bar',
      itemStyle: {
        color: '#a8d8da'
      },
      tooltip: {
        valueFormatter: function (value) {
          // return value + ' °C';
          return value
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
    height: 18vh;
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
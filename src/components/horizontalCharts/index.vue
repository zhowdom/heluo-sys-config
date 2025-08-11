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

  // 定义从蓝色到红色的渐变
  const colorGradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: '#567795' },  
    { offset: 1, color: '#a7c9e6' } 
  ])
  
  // 图表数据
  const chartData = [
    { name: '智能照明', value: 12 },
    { name: '空调', value: 80 },
    { name: '多联机模块', value: 120 },
    { name: '消毒剂', value: 50 },
    { name: '空气加湿器', value: 175 }
  ]

  // 图表配置项
  const option = {
// 关键配置：控制图表与容器的间距为10px
    grid: {
      left: 10,    // 左间距
      right: 40,   // 右间距
      top: 20,     // 上间距
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
    xAxis: {
      type: 'value',
      // 隐藏x轴方向的网格线（竖线）
      splitLine: {
        show: false
      },
      show: false,
      // 取消X轴坐标刻度
      axisTick: {
        show: false
      }
      // axisLabel: {
      //   formatter: '{value} 小时'  // x轴显示小时单位
      // }
    },
  // Y轴
  yAxis: {
      type: 'category',
      data: chartData.map(item => item.name),  // 左侧项目名称
      // 隐藏x轴方向的网格线（竖线）
      splitLine: {
        show: false
      },
      axisLabel: {
        color: 'white', // 刻度文字颜色
        fontSize: 12,
        interval: 0  // 确保所有标签都显示
      }
    },
    series: [
      {
        name: '运行时间',
        type: 'bar',
        data: chartData.map(item => item.value),
        barWidth: 10,  // 条的宽度
        itemStyle: {
          color: colorGradient  // 应用渐变色
        },
        label: {
          show: true,
          position: 'right',  // 数值显示在条的右侧
          formatter: '{c}小时'
        }
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
    height: calc(100% - 50px);
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
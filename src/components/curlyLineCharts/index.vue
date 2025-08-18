<template>
  <!--两个Y轴的曲线案例demo-三期本来有，后来取消了-->
    <div :class="bem()">
     <div ref="chartRef" class="chart-box"></div> 
    </div>
</template>
  
<script setup lang='ts'>
import { createNamespace } from '@/utils'
const { bem } = createNamespace('heluo-sys-verticalCharts')

import { ref, onMounted, onUnmounted, defineProps, watch } from 'vue'
// 引入ECharts
import * as echarts from 'echarts'
import dayjs from 'dayjs';

const props = defineProps(['echartdata', 'activeIndex'])

watch(
  () => props.echartdata,
  (newval) => {
    initChart()
  }
)


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
  grid: {
      left: 15,    // 左侧间隙
      right: 15,   // 右侧间隙
      top: 80,     // 顶部间隙
      bottom: 15,  // 底部间隙
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
      top: '10%',
      textStyle: {
        color: 'white', // 核心配置：字体颜色为白色
        fontSize: 12,   // 可选：字体大小
        fontWeight: 'normal' // 可选：字体粗细
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
        color: 'white', // 刻度文字颜色
        fontSize: 11 // 可选：调整文字大小
    },
    }
  ],
  // Y轴
  yAxis: [
    {
      type: 'value',
      // name: '温度', // Y轴顶部的小单位
      min: 0,
      max: 25,
      interval: 5,
      splitLine: {
          show: true, // 显示网格线
          lineStyle: {
              type: 'dashed',
              color: '#b9c2c6' // 网格线颜色设为红色
          }
      },
      nameTextStyle: {
          color: 'white', // 核心配置：名称文字颜色为白色
          fontSize: 11,   // 可选：文字大小
          fontWeight: 'bold' // 可选：文字粗细
      },
      axisLabel: {
        formatter: `{value} ${props.echartdata && props.echartdata['unitName']}`,
        color: 'white', // 刻度文字颜色
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
          color: 'orange', // 橙色线条
          width: 2 // 线条粗细
      },
      itemStyle: {
          color: 'orange', // 橙色数据点
          borderColor: 'white', // 白色边框（可选，增强视觉效果）
          borderWidth: 2 // 边框宽度
      },
      showSymbol: false,  // 不显示数据点标记
      // 可选：鼠标 hover 时也不显示拐点
      // emphasis: {
      //     showSymbol: false
      // },
      smooth: true,
      data: props.echartdata && props.echartdata['list'].map(v => v.value),
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
    height: 27vh;
    width:100%;
    .chart-box{
      height: 100%;
      width: 100%;
    }
  }
</style>
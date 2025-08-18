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

const props = defineProps(['chartlist'])

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
      textStyle: {
        color: 'white', // 核心配置：字体颜色
        fontSize: 11,   // 可选：字体大小
        fontWeight: 'normal' // 可选：字体粗细
      },
      // 设置图例标记为圆形（原点）
      icon: 'circle',  // 核心配置：圆形图标
      itemWidth: 10,   // 原点宽度
      itemHeight: 10,  // 原点高度（与宽度一致确保是正圆）
      itemGap: 20,     // 图例项之间的间距
    },
    xAxis: [
    {
      type: 'category',
      // data: ['设备', '能耗', '仪器', '安防', '安全', '环境'],
      data: props.chartlist.map(v => v.typeName),
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
          color: 'white', // 刻度文字颜色
          fontSize: 11
      },
      axisLine: {
          lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)' // 浅色轴线，与白色刻度搭配
          }
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
      splitLine: {
          show: true, // 显示网格线
          lineStyle: {
              type: 'dashed',
              color: '#b9c2c6' // 网格线颜色设为红色
          }
      },
      axisLabel: {
        // formatter: '{value} °C'
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
  
  // 设置图表配置项
  chartInstance.setOption(option)
}

// 监听窗口大小变化，重绘图表
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
// 组件挂载时初始化图表
onMounted(() => {
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
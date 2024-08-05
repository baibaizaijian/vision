<template>
  <div class="com-container">
    <div class="com-chart" ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  reactive,
  computed,
  onBeforeUnmount,
  triggerRef
} from 'vue'
import { defineComponent } from 'vue'
import instance from '@/utils/request'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import chalk from '@/assets/theme/chalk'
import TextStyleMixin from 'echarts/types/src/model/mixin/textStyle.js'
import Grid from 'echarts/types/src/coord/cartesian/Grid.js'
// 引入主题
// 定义图表数据的类型
interface SellerData {
  name: string
  value: number
}

defineComponent({
  name: 'SellerComponent'
})
echarts.registerTheme('chalk', chalk)
// 引用 DOM 元素
const chart = ref<HTMLElement | null>(null)
// 引用 ECharts 实例
const chartInstance = ref<ECharts | null>(null)
const chartData = ref<SellerData[]>([])
const state = reactive({ currentPage: 1, pageSize: 5 })

const totalPage = computed(() =>
  Math.ceil(chartData.value.length / state.pageSize)
)

const initChart = () => {
  chartInstance.value = echarts.init(chart.value, 'chalk')
  //鼠标移动移除效果
  chartInstance.value.on('mouseover', () => {
    clearInterval(timer.value)
  })
  chartInstance.value.on('mouseout', () => {
    handleInterval()
  })
}

//获取数据

const getData = async () => {
  try {
    const res = await instance.get<SellerData[]>('/seller')
    chartData.value = res.data.sort((a, b) => a.value - b.value)
  } catch (error) {
    console.error('获取数据时出错:', error)
  }
  updated()
  handleInterval()
}

const updated = () => {
  const showDate = chartData.value.slice(
    (state.currentPage - 1) * state.pageSize,
    state.currentPage * state.pageSize
  )
  const sellers = showDate.map((item) => item.name)

  const values = showDate.map((item) => item.value)

  const option = {
    title: {
      text: '▎商家销售统计',
      textStyle: {
        fontSize: 60
      },
      left: 20,
      top: 20
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true //包含坐标轴文字
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: sellers
    },
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'line',
        z: 0,
        lineStyle: {
          width: 66,
          color: '#2d3443'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: values,
        barWidth: 60,
        label: {
          show: true,
          position: 'right',
          textStyle: {
            color: 'white'
          }
        },
        //设置渐变
        itemStyle: {
          barBorderRadius: [0, 30, 30, 0],
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: '#5052EE'
            },
            {
              offset: 1,
              color: '#AB6EE5'
            }
          ])
        }
      }
    ]
  }
  chartInstance.value?.setOption(option)
}

//定时切换
const timer = ref<number | undefined>(undefined)

const handleInterval = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  timer.value = setInterval(() => {
    state.currentPage++
    if (state.currentPage > totalPage.value) state.currentPage = 1
    updated()
  }, 3000)
}

//清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})

onMounted(() => {
  initChart()
  getData()
})
</script>

<style scoped>
/* 样式 */
</style>

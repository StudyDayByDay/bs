<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
  // 监听chartData变化
  // handle就是你watch中需要具体执行的方法
  // deep：就是你需要监听的数据的深度，一般用来监听对象中某个属性的变化
  // immediate：在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    // $nextTick  立即更新这个操作
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    // 释放图表实例
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      /* $parent： 获取当前组件的父组件
        $children：················ 的子组件
        $root：获取new Vue的实例 （即上面的：vm）
        $el: 获取当前组件的DOM元素*/
      // macarons是主题
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
      // 点击事件
      this.chart.on('click', (params) => {
        console.log(params)
        this.$emit('tableClick', params.seriesName, params.name, params.value)
      })
    },
    setOptions({ expectedData, dateData, lineName } = {}) {
      this.chart.setOption({
        xAxis: {
          data: dateData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        // 控制图形在容器中的排版
        grid: {
          left: 10,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        // 提示组件
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        dataZoom: [{
          type: 'slider', // 图表下方的伸缩条
          show: true, // 是否显示
          realtime: true, // 拖动时，是否实时更新系列的视图
          start: 20, // 伸缩条开始位置（1-100），可以随时更改
          end: 80 // 伸缩条结束位置（1-100），可以随时更改
        }],
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: [lineName]
        },
        series: [{
          name: lineName, itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          // smooth:光滑 设置为true就是平滑，false就是直线
          smooth: false,
          type: 'line',
          data: expectedData,
          markLine: {
            data: [
              {
                // yAxis: baseLine,
                // lineStyle: { color: 'red' }
                type: 'average',
                name: '平均值'
              }
            ]
          },
          // FIXME: markLine以上的点特殊显示
          markPoint: {
            data: [
              { name: '最大值', type: 'max' },
              { name: '最小值', type: 'min' }
              // { x: 100, y: 100 }这个是像素点
            ],
            label: {
              formatter: '{c}'
            }
          },
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    }
  }
}
</script>

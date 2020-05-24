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
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
      this.chart.on('click', (params) => {
        console.log(params)
        const timeType = {
          time: params.name,
          type: params.seriesName
        }
        this.$emit('yearList', timeType)
      })
    },
    setOptions({ consumeData, rechargeData, dateData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: dateData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 50,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['消费', '充值']
        },
        series: [{
          name: '消费', itemStyle: {
            normal: {
              color: '#E63F00 ',
              lineStyle: {
                color: '#E63F00 ',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: consumeData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: '充值',
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#00DD00',
              lineStyle: {
                color: '#00DD00',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: rechargeData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>

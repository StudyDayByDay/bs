<template>
  <div>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        <!-- 在这里放一个下拉组件 -->
        <el-tag effect="plain">监控点日水量曲线(单位：m³)</el-tag>
        <line-chart :chart-data="dayChartData" @tableClick="tableClick" />
      </el-col>
      <el-col>
        <!-- 这里放一个table表格 -->
      </el-col>
      <el-col>
        <!-- 这里是第一排的第三个 -->
      </el-col>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        <el-tag effect="plain">监控点小时量曲线(单位：m³)</el-tag>
        <line-chart :chart-data="hourChartData" @tableClick="tableClick" />
      </el-col>
      <el-col>
        <!-- 这里面放第二排的第三个 -->
      </el-col>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col>
        <el-tag effect="plain">监控点小时量曲线(单位：m³)</el-tag>
        <!-- 第三排第一个 -->
      </el-col>
      <el-col>
        <!-- 这里面放第三排的第二个 -->
      </el-col>
      <el-col>
        <!-- 这里面放第三排的第三个 -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
export default {
  name: 'JtEcharts',
  components: {
    LineChart
  },
  data() {
    return {
      dayChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11'],
        lineName: '日水量'
      },
      hourChartData: {
        expectedData: [130, 140, 141, 142, 145, 150, 160, 130, 140, 141, 142, 145, 150, 160, 130, 140, 141, 142, 145, 150, 160, 130, 140, 141],
        dateData: ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00',
          '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00',
          '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00',
          '21:00:00', '22:00:00'],
        lineName: '小时水量'
      }
    }
  },
  methods: {
    tableClick(seriesName, name, value) {
      if (seriesName === '日水量') {
        // 在这里进行取数据并给hourChartData赋值
        // axios.get('***').then(function(response) {
        //   this.hourChartData.dateData = response.data.***
        // })
        alert(seriesName + name + ' ' + value)
      }
    }
  }
}
</script>

<style>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}

.float-button {
position: fixed;
bottom: 50px;
right: 50px;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

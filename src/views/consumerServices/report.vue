<template>
  <div class="dashboard-editor-container">

    <panel-group :sum-value="sumValue" @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一个月消费</el-tag>
      <line-chart :chart-data="lineChartData" @monthList="panelGroup" />
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">近一个月消费TOP10</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="transactionAmount" label="消费金额" />
        <el-table-column prop="transactionType" label="消费类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.transactionType === 'shoppings'">购物</el-tag>
            <el-tag v-else-if="scope.row.transactionType === 'purchases'" type="success">充值</el-tag>
            <el-tag v-else-if="scope.row.transactionType === 'education'" type="warning">教育</el-tag>
            <el-tag v-else type="danger">饮食</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="transactionDate" label="消费时间" />
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年消费</el-tag>
      <nice-chart :chart-data="chart" @yearList="niceChartList" />
    </el-row>

    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="oneLineData">
        <el-table-column property="transactionType" label="消费类型" />
        <el-table-column property="transactionAmount" label="消费金额" />
        <el-table-column property="transactionDate" label="消费时间" />
      </el-table>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="twoLineVisible">
      <el-table :data="twoLineData">
        <el-table-column property="transactionType" label="消费类型" />
        <el-table-column property="transactionAmount" label="消费金额" />
        <el-table-column property="transactionDate" label="消费时间" />
      </el-table>
    </el-dialog>
    <!-- TODO:少了充值处理 -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import NiceChart from './components/NiceChart'
import axios from 'axios'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    NiceChart
  },
  data() {
    return {
      // 未处理的初始数据
      typeData: [],
      totalLineData: {
        diet: { expectedData: [], dateData: [] },
        education: { expectedData: [], dateData: [] },
        purchases: { expectedData: [], dateData: [] },
        shoppings: { expectedData: [], dateData: [] }
      },
      lineChartData: {},
      balanceTableVisible: false,
      tableData: [],
      sumValue: {},
      balanceData: [{
        type: '余额',
        balance: '193'
      }],
      chart: {
        // consumeData, rechargeData, dateData
        consumeData: [80, 100, 121, 104, 105, 90, 100],
        rechargeData: [130, 140, 141, 142, 145, 150, 160],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11']
      },
      type: '',
      oneLineVisible: false,
      twoLineVisible: false,
      oneLineData: [],
      twoLineData: []
    }
  },
  created() {
    var vm = this
    // 试一下并发请求
    axios.all([this.getLineData(), this.getTopTenData()]).then(axios.spread(function(acct, perms) {
      console.log(acct)
      console.log(perms)
      vm.tableData = perms.data.top10
      vm.sumValue = acct.data.sumValue
      vm.handleEchartsData(acct.data.typeDate)
    }))
    this.lineChartData = this.totalLineData.education
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.totalLineData[type]
      // 应该在这个函数里面把type传到图表里面去并且把lineChartData数据更新
      this.type = type
    },
    // 获取点击第一个图表时的日期
    panelGroup(value) {
      this.oneLineData = []
      console.log('llllllllllll' + this.typeData)
      for (var j = 0, len = this.typeData.length; j < len; j++) {
        if (this.typeData[j].transactionDate === value && this.typeData[j].transactionType === this.type) {
          this.oneLineData.push(this.typeData[j])
        }
      }
      this.oneLineVisible = true
      // 利用这里的type和传过来的日期去axios求得数据
    },
    // // 获取点击第二个图表时的日期、类型
    niceChartList(value) {
      // alert(value.time + value.type)
      this.twoLineVisible = true
    },
    // 处理echarts图数据
    handleEchartsData(data) {
      this.typeData = data
      console.log(data)
      console.log(data[0])
      var vm = this
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].transactionType === 'diet') {
          console.log(data[i].transactionType)
          vm.totalLineData.diet.expectedData.push(data[i].transactionAmount)
          vm.totalLineData.diet.dateData.push(data[i].transactionDate)
        } else if (data[i].transactionType === 'education') {
          vm.totalLineData.education.expectedData.push(data[i].transactionAmount)
          vm.totalLineData.education.dateData.push(data[i].transactionDate)
        } else if (data[i].transactionType === 'purchases') {
          vm.totalLineData.purchases.expectedData.push(data[i].transactionAmount)
          vm.totalLineData.purchases.dateData.push(data[i].transactionDate)
        } else {
          vm.totalLineData.shoppings.expectedData.push(data[i].transactionAmount)
          vm.totalLineData.shoppings.dateData.push(data[i].transactionDate)
        }
      }
      console.log(vm.totalLineData)
    },
    getLineData() {
      return axios.get('http://localhost:8080/card/transactions/selectMonth')
    },
    getTopTenData() {
      return axios.get('http://localhost:8080/card/transactions/getTop10')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>

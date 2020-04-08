<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetTableChartData="handleSetTableChartData" />

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">当月借阅详情</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="number" label="图书编号" />
        <el-table-column prop="borrowTime" label="借阅时间" />
        <el-table-column prop="returnTime" label="归还时间" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年借阅情况</el-tag>
      <line-chart :chart-data="lineChartData" @yearList="popUp" />
    </el-row>
    <!-- FIXME: 在没有数据的时候表格会给出提示吗 -->
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="图书名称" />
        <el-table-column prop="number" label="图书编号" />
        <el-table-column prop="borrowTime" label="借阅时间" />
        <el-table-column prop="returnTime" label="归还时间" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- FIXME：写一个因为逾期而交罚款的选项，而且要有对于逾期缴费的统计板块 -->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'

const tableData = {
  borrowed: [
    { name: '白夜行1', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' },
    { name: '白夜行2', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' },
    { name: '白夜行3', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' },
    { name: '白夜行4', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还' },
    { name: '白夜行5', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还' }
  ],
  returned: [
    { name: '白夜行1', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' },
    { name: '白夜行2', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' },
    { name: '白夜行3', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '已归还' }
  ],
  notReturned: [
    { name: '白夜行4', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还' },
    { name: '白夜行5', number: 'QD231', borrowTime: '2020-03-13 16:30:45', returnTime: '2020-03-13 16:30:45', status: '未归还' }
  ]
}

export default {
  name: 'BookReport',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      tableData: tableData.borrowed,
      oneLineVisible: false,
      lineChartData: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        dateData: ['2020-03-05', '2020-03-06', '2020-03-07', '2020-03-08', '2020-03-09', '2020-03-10', '2020-03-11'] }
    }
  },
  methods: {
    handleSetTableChartData(type) {
      if (type !== 'jumpRouter') {
        this.tableData = tableData[type]
      } else {
        this.$prompt('请输入查询的书名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\u4e00-\u9fa5]/,
          inputErrorMessage: '书名格式不正确'
        }).then(({ value }) => {
          // this.$router.push({ path: '/book/borrow', query: { bookId: value }})
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面。
          this.$router.push({ name: 'Borrow', params: { bookId: value }})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    },
    // 这里到时候做一个linechart的mock，把数据请求进来
    popUp(month) {
    //   alert(month)
      this.oneLineVisible = true
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


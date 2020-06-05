<template>
  <div class="dashboard-editor-container">

    <panel-group :sum-value="sumValue" @handleSetTableChartData="handleSetTableChartData" />

    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">当月借阅详情</el-tag>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="tsmc" label="图书名称" />
        <el-table-column prop="tsbh" label="图书编号" />
        <el-table-column prop="jysj" label="借阅时间" />
        <el-table-column prop="ghsj" label="归还时间" />
        <el-table-column prop="ghjzsj" label="归还截至时间" />
        <el-table-column prop="zt" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.zt === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.zt }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="yqqk" label="逾期情况">
          <template slot-scope="scope">
            <el-tag v-show="scope.row.zt === '已归还'" :type="scope.row.yqqk === '未逾期' ? 'success' : 'danger'" disable-transitions>{{ scope.row.yqqk }}</el-tag>
            <el-tag v-show="scope.row.zt === '已归还'" :type="scope.row.yqqk === '未逾期' ? 'success' : 'danger'" disable-transitions>{{ scope.row.je }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-tag effect="plain">近一年借阅情况</el-tag>
      <line-chart :chart-data="lineChartData" @yearList="popUp" />
    </el-row>
    <el-dialog title="详情" :visible.sync="oneLineVisible">
      <el-table :data="lineTableData" border style="width: 100%">
        <el-table-column prop="tsmc" label="图书名称" />
        <el-table-column prop="tsbh" label="图书编号" />
        <el-table-column prop="jysj" label="借阅时间" />
        <el-table-column prop="ghsj" label="归还时间" />
        <el-table-column prop="ghjzsj" label="归还截至时间" />
        <el-table-column prop="zt" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.zt === '已归还' ? 'success' : 'danger'" disable-transitions>{{ scope.row.zt }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import axios from 'axios'

export default {
  name: 'BookReport',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      sumValue: null,
      tableData: null,
      lineTableData: [],
      dialog: null,
      nodeTableData: null,
      totalTableData: {
        borrowed: [],
        returned: [],
        notReturned: []
      },
      oneLineVisible: false,
      lineChartData: {
        expectedData: [],
        dateData: [] }
    }
  },
  created() {
    // 获取初始化数据
    var vm = this
    axios.get('http://localhost:8080/book/getBorrowSituation').then(res => {
      console.log('sdsdsdsd', res)
      vm.totalTableData.borrowed = res.data.borrowed
      vm.totalTableData.returned = res.data.returned
      vm.totalTableData.notReturned = res.data.notReturned
      vm.sumValue = res.data.sumValue
      res.data.lineData.filter(item => {
        vm.lineChartData.expectedData.push(item.num)
        vm.lineChartData.dateData.push(item.time)
      })
      vm.tableData = vm.totalTableData.borrowed
    })
  },
  methods: {
    handleSetTableChartData(type) {
      if (type !== 'jumpRouter') {
        this.tableData = this.totalTableData[type]
      } else {
        this.$prompt('请输入查询的书名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\u4e00-\u9fa5]/,
          inputErrorMessage: '书名格式不正确'
        }).then(({ value }) => {
          // this.$router.push({ path: '/book/borrow', query: { bookId: value }})
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中path不能和params一起使用，否则params将无效。需要用name来指定页面。
          this.$router.push({ name: 'Borrow', params: { bookName: value }})
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
      this.lineTableData = []
      this.totalTableData.borrowed.filter(item => {
        if (item.jysj === month) {
          this.lineTableData.push(item)
        }
      })
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


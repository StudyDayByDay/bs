<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="场地名称" prop="cdmc" />
      <el-table-column label="场地位置" prop="cdwz" />
      <el-table-column label="申请人姓名" prop="sqrxm" />
      <el-table-column label="申请人学号" prop="sqrxh" />
      <el-table-column label="申请时间" prop="sqsj" />
      <el-table-column label="申请原由" prop="sqyy" />
      <el-table-column
        prop="shzt"
        filter-placement="bottom-end"
        label="审核状态"
        :filters="[{ text: '未审核', value: '未审核' }, { text: '已审核', value: '已审核' }]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.shzt === '已审核' ? 'success' : 'danger'">{{ scope.row.shzt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" prop="shsj" />
      <el-table-column label="审核结果" prop="shjg" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" :disabled="scope.row.shzt === '已审核'" round @click="handleEdit(scope.$index, scope.row)">审核</el-button>
          <el-button type="danger" :disabled="scope.row.shzt === '未审核'" round @click="handleDelete(scope.$index, scope.row)">撤销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="场地审核" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审核结果">
          <el-select v-model="form.shjg" placeholder="请选择">
            <el-option label="通过" value="审核通过" />
            <el-option label="不通过" value="审核不通过" />
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
          </el-col>
          <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-time-picker v-model="form.date2" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        cdmc: '创新实验室',
        cdwz: '第六实验楼5楼502',
        sqrxm: '周青',
        sqrxh: '2016081011',
        sqsj: '2020-03-04 14:39:15',
        sqyy: '学习',
        shzt: '未审核',
        shjg: '未审核',
        shsj: '***'
      }, {
        cdmc: '大气实验室',
        cdwz: '第五实验楼2楼203',
        sqrxm: '王鹏强',
        sqrxh: '2016081032',
        sqsj: '2020-03-04 14:39:15',
        sqyy: '学习',
        shzt: '已审核',
        shjg: '审核通过',
        shsj: '2020-03-04 21:27:11'
      },
      {
        cdmc: '大气实验室',
        cdwz: '第一教学楼楼1楼101',
        sqrxm: '张敏玲',
        sqrxh: '2016081032',
        sqsj: '2020-03-04 14:39:15',
        sqyy: '学习',
        shzt: '已审核',
        shjg: '审核不通过',
        shsj: '2020-03-04 21:27:11'
      }],
      dialogFormVisible: false,
      form: {
        shjg: '',
        date1: '',
        date2: ''
      },
      listIndex: null
    }
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true
      // 把当前处理的索引和行对象保存
      this.listIndex = index
    },
    handleDelete(index, row) {
      this.$confirm('此操作将撤销审核结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 撤销操作
        this.tableData[index].shzt = '未审核'
        this.tableData[index].shsj = ''
        // 进行删除一条数据操作
        // axios.delete("/ehrReferralObjPro", {params: param})
        //     .then(function(response) {
        //       }
        this.$message({
          type: 'success',
          message: '撤销成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    onSubmit() {
      this.dialogFormVisible = false
      // 将修改的值放入数组中
      var index = this.listIndex
      this.tableData[index].shzt = this.form.shjg
      this.tableData[index].shsj = this.form.date1 + ' ' + this.form.date2
      // 进行插入数据操作
      // axios({
      //   url: '/user',
      //   method: 'post',
      //   data: {
      //     mc: this.form.mc,
      //     wz: this.form.wz,
      //     fzr: this.form.fzr,
      //     date1: this.form.date1,
      //     date2: this.form.date2
      //   },
      //   transformRequest: [function(data) {
      //     // Do whatever you want to transform the data
      //     let ret = ''
      //     for (let it in data) {
      //       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      //     }
      //     return ret
      //   }],
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      this.listIndex = null
      this.form.shjg = ''
      this.form.date1 = ''
      this.form.date2 = ''
    },
    cancel() {
      this.dialogFormVisible = false
      this.listIndex = null
      this.from = null
    },
    filterTag(value, row) {
      return row.shzt === value
    }
  }
}
</script>

<style>

</style>

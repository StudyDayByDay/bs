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
        :filters="[{ text: '未审核', value: 0 }, { text: '审核通过', value: 1 }, { text: '审核不通过', value: 2 }]"
        :filter-method="filterTag"
      >
        <template slot-scope="scope">
          <el-tag v-show="scope.row.shzt === 0" type="warning">未审核</el-tag>
          <el-tag v-show="scope.row.shzt === 1" type="success">已审核</el-tag>
          <el-tag v-show="scope.row.shzt === 2" type="success">已审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核时间" prop="shsj" />
      <el-table-column label="审核结果" prop="shzt">
        <template slot-scope="scope">
          <el-tag v-show="scope.row.shzt === 0" type="warning">未审核</el-tag>
          <el-tag v-show="scope.row.shzt === 1" type="success">审核通过</el-tag>
          <el-tag v-show="scope.row.shzt === 2" type="danger">审核不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" :disabled="scope.row.shzt !== 0" round @click="handleEdit(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination current-page="4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    <el-dialog title="场地审核" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="审核结果">
          <el-select v-model="form.shjg" placeholder="请选择">
            <el-option label="通过" value="1" />
            <el-option label="不通过" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核时间">
          <el-date-picker v-model="form.auditDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
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
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: 0,
        shjg: '',
        auditDate: ''
      },
      listIndex: null
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getInitData() {
      var vm = this
      axios.get('http://localhost:8080/apply/selectcdgl').then(res => {
        console.log('sdsdas', res)
        vm.tableData = res.data.lists
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(index, row) {
      // 把当前处理的索引和行对象保存
      this.listIndex = index
      this.form.id = ''
      this.form.shjg = ''
      this.form.auditDate = ''
      this.dialogFormVisible = true
    },
    onSubmit() {
      var index = this.listIndex
      var vm = this
      console.log(this.form)
      this.form.id = this.tableData[index].id
      console.log(this.form)
      this.$confirm('确认提交吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.get('http://localhost:8080/apply/update', {
          params: {
            id: vm.form.id,
            shjg: vm.form.shjg,
            auditDate: vm.form.auditDate
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '提交成功!'
            })
            this.getInitData()
            this.dialogFormVisible = false
          } else {
            this.$message.error('提交失败！！！')
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
      this.listIndex = null
      this.form.id = ''
      this.form.shjg = ''
      this.form.auditDate = ''
    },
    filterTag(value, row) {
      return row.shzt === value
    }
  }
}
</script>

<style>

</style>

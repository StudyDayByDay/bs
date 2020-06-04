<template>
  <div>
    <el-row>
      <el-button type="success" round style="margin: 5px 0px 5px 5px" @click="increase()">新增</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="商家名称">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>商家: {{ scope.row.sjmc }}</p>
              <p>位置: {{ scope.row.sjwz }}</p>
              <p>负责人: {{ scope.row.fzr }}</p>
              <p>注册时间: {{ scope.row.zcsj }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag>{{ scope.row.sjmc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="商家位置" prop="sjwz" />
        <el-table-column label="负责人" prop="fzr" />
        <el-table-column label="注册时间" prop="zcsj" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" round @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" round @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-dialog title="编辑商家" :visible.sync="handleFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商家名称">
            <el-input v-model="form.sjmc" />
          </el-form-item>
          <el-form-item label="商家位置">
            <el-input v-model="form.sjwz" placeholder="请填写位置" clearable />
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.fzr" />
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker v-model="form.zcsj" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即修改</el-button>
            <el-button @click="handleFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
    <el-row>
      <el-dialog title="增加商家" :visible.sync="increaseFromVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商家名称">
            <el-input v-model="form.sjmc" />
          </el-form-item>
          <el-form-item label="商家位置">
            <el-input v-model="form.sjwz" placeholder="请填写位置" clearable />
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.fzr" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-date-picker v-model="form.zcsj" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="increaseSubmit('form')">立即创建</el-button>
            <el-button @click="increaseFromVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableData: [],
      form: {
        merchantCode: '',
        sjmc: '',
        sjwz: '',
        fzr: '',
        zcsj: ''
      },
      handleFormVisible: false,
      increaseFromVisible: false,
      listIndex: null
    }
  },
  created() {
    axios.defaults.timeout = 15000
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.withCredentials = true
    this.getInitData()
  },
  methods: {
    getInitData() {
      var vm = this
      // 初始化表格数据
      axios.get('http://localhost:8080/card/merchants/selectAll').then(function(response) {
        vm.tableData = response.data.lists
      })
    },
    handleEdit(index, row) {
      this.form.merchantCode = this.tableData[index].merchantCode
      this.form.sjmc = this.tableData[index].sjmc
      this.form.sjwz = this.tableData[index].sjwz
      this.form.fzr = this.tableData[index].fzr
      this.form.zcsj = this.tableData[index].zcsj
      this.listIndex = index
      this.handleFormVisible = true
    },
    handleDelete(index, row) {
      console.log(row)
      // this.tableData.splice(index, 1)
      var param = { merchantCode: row.merchantCode }
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      // 删除操作
        axios.delete('http://localhost:8080/card/merchants/delete', { params: param })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getInitData()
              this.handleFormVisible = false
            } else {
              this.$message.error('删除失败！！！')
            }
          }).catch(err => console.log(err))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 修改操作
    handleSubmit() {
      this.$confirm('确认修改吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8080/card/merchants/update', this.form)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.getInitData()
              this.handleFormVisible = false
            } else {
              this.$message.error('修改失败！！！')
            }
          }).catch((err) => {
            console.log('sdsd', err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    increase() {
      this.form.sjmc = ''
      this.form.sjwz = ''
      this.form.fzr = ''
      this.form.zcsj = ''
      this.increaseFromVisible = true
    },
    // 生成三位随机数
    getThreeNum() {
      var num = ''
      for (var i = 0; i < 3; i++) {
        num += Math.floor(Math.random() * 10)
      }
      return num
    },
    // 新增
    increaseSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认新增吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.form.merchantCode = this.getThreeNum()
            console.log(this.form)
            axios.post('http://localhost:8080/card/merchants/insert', this.form)
              .then((res) => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '新增商家成功!'
                  })
                  this.getInitData()
                  this.increaseFromVisible = false
                } else {
                  this.$message.error('新增商家失败！！！')
                }
              }).catch((err) => {
                console.log('sdsd', err)
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          console.log('请检查格式!!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>

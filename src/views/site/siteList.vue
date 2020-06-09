<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">场地情况</el-tag>
      <el-table :data="tableData.filter(data => !search || data.cdmc.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
        <el-table-column prop="cdmc" label="场地名称" />
        <el-table-column prop="cdbh" label="场地编号" />
        <el-table-column prop="cdwz" label="场地位置" />
        <el-table-column prop="zt" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.zt === '空闲' ? 'success' : 'danger'" disable-transitions>{{ scope.row.zt }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入场地名称搜索" />
          </template>
          <template slot-scope="scope">
            <!-- 这里禁用的判断不能用三目表达式，用了无效 -->
            <el-button size="mini" type="primary" :disabled="scope.row.zt !== '空闲'" @click="handleEdit(scope.$index, scope.row)">申请</el-button>
            <el-popover placement="bottom" :title="scope.row.cdmc" width="200" trigger="click" :content="scope.row.cdjs">
              <el-button slot="reference" size="mini" type="success">查看详情</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination current-page="4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-row>

    <!-- 自己的申请情况 -->
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-tag effect="plain" style="margin-bottom:16px;">我的申请</el-tag>
      <el-collapse>
        <el-collapse-item v-for="(item, index) in collapseData" :key="index" :title="item.title" :name="index">
          <el-steps :active="item.active">
            <el-step title="已申请" icon="el-icon-s-order" />
            <el-step title="处理中" icon="el-icon-s-custom" />
            <el-step title="处理结果" :description="item.description" :icon="item.icon" />
          </el-steps>
        </el-collapse-item>
      </el-collapse>
      <el-pagination current-page="4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-row>

    <el-dialog title="申请场地" :visible.sync="increaseFromVisible">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="场地名称" prop="cdmc">
          <el-input v-model="form.cdmc" readonly />
        </el-form-item>
        <el-form-item label="申请人" prop="sqr">
          <el-input v-model="form.sqr" />
        </el-form-item>
        <el-form-item label="学号" prop="xh">
          <el-input v-model="form.xh" />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker v-model="form.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="申请原由" prop="yy">
          <el-select v-model="form.yy" placeholder="请选择">
            <el-option label="学习" value="学习" />
            <el-option label="活动" value="活动" />
            <el-option label="办公" value="办公" />
            <el-option label="科研" value="科研" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="applicationSubmit('form')">立即申请</el-button>
          <el-button native-type="submit" @click="increaseFromVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SiteList',
  data() {
    return {
      tableData: [],
      collapseData: [],
      activeNames: ['0'],
      search: '',
      increaseFromVisible: false,
      form: {
        cdbh: 0,
        cdmc: '',
        sqr: '',
        xh: '',
        date: '',
        yy: ''
      },
      apply: {
        sno: '',
        card: '1',
        siteId: '',
        applyTime: '',
        administratorId: '1',
        handleTime: '',
        handleStatus: '0',
        description: ''
      },
      rules: {
        cdmc: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        sqr: [
          { required: true, message: '请输入申请人', trigger: 'change' }
        ],
        xh: [
          { required: true, message: '请输入学号', trigger: 'change' }
        ],
        date: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        yy: [
          { required: true, message: '请选择申请原由', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    var vm = this
    axios.get('http://localhost:8080/site/selectsitevo').then(res => {
      console.log('sdsdas', res)
      vm.tableData = res.data.lists
      vm.collapseData = res.data.applyLists
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    handleEdit(index, row) {
    //   console.log(index, row)
      this.form.sqr = ''
      this.form.xh = ''
      this.form.date = ''
      this.form.yy = ''
      this.increaseFromVisible = true
      this.form.cdmc = this.tableData[index].cdmc
      this.form.cdbh = this.tableData[index].cdbh
    },
    applicationSubmit(forName) {
      // this.increaseFromVisible = false
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.$confirm('确定申请吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.apply.sno = this.form.xh
            this.apply.siteId = this.form.cdbh
            this.apply.applyTime = this.form.date[0] + ' ' + this.form.date[1]
            this.apply.description = this.form.yy
            console.log(this.apply)
            // 插入操作
            axios.post('http://localhost:8080/apply/insert', this.apply)
              .then(res => {
                if (res.data.code === 200) {
                  this.$message({
                    type: 'success',
                    message: '已申请，待审核'
                  })
                  this.increaseFromVisible = false
                } else {
                  this.$message.error('申请失败！！！')
                }
              }).catch(err => console.log(err))
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        } else {
          console.log('e')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>

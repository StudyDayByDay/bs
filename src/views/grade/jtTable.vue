<template>
  <div class="dashboard-editor-container">
    <el-row class="box">
      <div>
        关键字：<el-input v-model="keyWord" placeholder="请输入内容" clearable style="width: 200px" @clear="celarInput()" />
        年份：<el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy" /></div>
      <el-button type="primary" style="margin-left: auto">添加</el-button>
      <el-button type="primary" @click="serach()">查询</el-button>
    </el-row>
    <el-row style="background:#fff;padding:16px 16px 16px;margin-bottom:32px;">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="nf" label="年份" />
        <el-table-column prop="qszdm" label="取水证代码" />
        <el-table-column prop="qszmc" label="取水证名称" />
        <el-table-column prop="tjsj" label="提交时间" />
        <el-table-column prop="shdw" label="审核单位" />
        <el-table-column prop="shyj" label="审核意见" />
        <el-table-column prop="zjnsl" label="总结年水量" />
        <el-table-column prop="spnsl" label="审批年水量" />
        <el-table-column label="提交">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-check" circle @click="handleCheck(scope.$index, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="修改">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="删除">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-row>
    <!-- 提交数据弹出框 -->
    <el-dialog title="上传" :visible.sync="dialogVisible" width="30%">
      <div class="uploadt">
        审批单位：<el-select v-model="siteValue" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="uploadt">
        文件上传：<el-upload
          class="upload-try"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">(请上传盖章版的计划)</div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { jtList } from '@/api/grade'
export default {
  name: 'JtTable',
  data() {
    return {
      tableData: [],
      keyWord: '',
      year: null,
      currentPage: 1,
      dialogVisible: false,
      siteValue: '',
      options: [{
        value: '选项1',
        label: '成都水资源处'
      }, {
        value: '选项2',
        label: '郫都区水资源处'
      }],
      fileList: []
    }
  },
  created() {
    jtList().then(response => {
      console.log('初始化请求数据')
      this.tableData = response.data.items
    }).catch((e) => {
      console.log(e)
    })
  },
  methods: {
    serach() {
      // 在这里把数据的筛选
      // 在这里做axios.get，使用mock
      if (this.keyWord !== '' && this.year !== null) {
        jtList().then(response => {
          console.log('两个都有值得时候，请求数据')
          this.tableData = response.data.items.filter(data => data.nf === this.year && data.qszmc.toLowerCase().includes(this.keyWord.toLowerCase()))
        }).catch((e) => {
          console.log(e)
        })
      } else if (this.keyWord === '' && this.year === null) {
        jtList().then(response => {
          console.log('两个都没值得时候，请求数据')
          this.tableData = response.data.items
        }).catch((e) => {
          console.log(e)
        })
      }
    },
    celarInput() {
      this.keyWord = ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    handleCheck(index, row) {
      this.dialogVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
.box{
    display: flex;
    justify-content:space-between
}
.upload-try{
  display: inline;
  margin: 10px;
}
.el-upload__tip{
  display: inline;
  color: rgb(248, 8, 8);
  font-style: italic;
}
.uploadt{
  margin: 10px;
}
</style>

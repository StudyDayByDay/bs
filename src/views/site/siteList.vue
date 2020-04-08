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
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入场地名称搜索" />
          </template>
          <template slot-scope="scope">
            <!-- 这里禁用的判断不能用三目表达式，用了无效 -->
            <el-button size="mini" type="primary" :disabled="scope.row.zt === '使用中'" @click="handleEdit(scope.$index, scope.row)">申请</el-button>
            <el-button size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="申请场地" :visible.sync="increaseFromVisible">
      <el-form ref="form" :model="form" label-width="80px">
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
            <el-form-item prop="date1">
              <el-date-picker v-model="form.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <!-- <el-col class="line" :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker v-model="form.date2" placeholder="选择结束时间" value-format="HH:mm:ss" style="width: 100%;" />
            </el-form-item>
          </el-col> -->
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
          <el-button @click="increaseFromVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- FIXME：查看详情没有做，用于查看这个场地的详情 -->
    <!-- FIXME：自己的申请没有做，用于查看自己的申请情况 -->
    <!-- FIXME：管理员咋办 -->
  </div>
</template>

<script>
export default {
  name: 'SiteList',
  data() {
    return {
      tableData: [
        { cdmc: '创新实验室', cdbh: 'ADF21', cdwz: '***', zt: '使用中' },
        { cdmc: '大气研究院', cdbh: 'ADF21', cdwz: '***', zt: '空闲' },
        { cdmc: '音频训练室', cdbh: 'ADF2***', cdwz: '***', zt: '使用中' },
        { cdmc: '跆拳道教室', cdbh: 'ADF21', cdwz: '***', zt: '空闲' },
        { cdmc: '电子实验室', cdbh: 'ADF21', cdwz: '***', zt: '使用中' }],
      search: '',
      increaseFromVisible: false,
      form: {
        cdmc: '',
        sqr: '',
        xh: '',
        date1: '',
        yy: ''
      }
    }
  },
  created() {
    // bookList().then(response => {
    //   console.log('sjjjjjjjjjjjjj')
    //   this.tableData = response.data.items
    // }).catch((e) => {})
  },
  methods: {
    handleEdit(index, row) {
    //   console.log(index, row)
      this.form.sqr = ''
      this.form.xh = ''
      this.form.date1 = ''
      this.form.yy = ''
      this.increaseFromVisible = true
      this.form.cdmc = this.tableData[index].cdmc
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    applicationSubmit(forName) {
      this.increaseFromVisible = false
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

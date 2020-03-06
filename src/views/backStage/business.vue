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
            <el-input v-model="form.mc" />
          </el-form-item>
          <el-form-item label="商家位置">
            <el-select v-model="form.wz" placeholder="请选择位置">
              <el-option label="位置一" value="位置一" />
              <el-option label="位置二" value="位置二" />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.fzr" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即创建</el-button>
            <el-button @click="handleFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-row>
    <el-row>
      <el-dialog title="增加商家" :visible.sync="increaseFromVisible">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="商家名称" prop="mc">
            <el-input v-model="form.mc" />
          </el-form-item>
          <el-form-item label="商家位置" prop="wz">
            <el-select v-model="form.wz" placeholder="请选择位置">
              <el-option label="位置一" value="位置一" />
              <el-option label="位置二" value="位置二" />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人" prop="fzr">
            <el-input v-model="form.fzr" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%;" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker v-model="form.date2" placeholder="选择时间" value-format="HH:mm:ss" style="width: 100%;" />
              </el-form-item>
            </el-col>
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
export default {
  data() {
    return {
      tableData: [{
        sjmc: '王记冒菜',
        sjwz: '一食堂一楼A1',
        fzr: '王三顺',
        zcsj: '2020-03-03 22:16:35'
      }, {
        sjmc: '四方小炒',
        sjwz: '一食堂一楼B1',
        fzr: '张三',
        zcsj: '2020-03-03 22:16:35'
      }, {
        sjmc: '麻辣烫',
        sjwz: '二食堂二楼C1',
        fzr: '牛网',
        zcsj: '2020-03-03 22:16:35'
      }, {
        sjmc: '麻辣香锅',
        sjwz: '一食堂一楼D1',
        fzr: '金三顺',
        zcsj: '2020-03-03 22:16:35'
      }],
      form: {
        mc: '',
        wz: '',
        fzr: '',
        date1: '',
        date2: ''
      },
      handleFormVisible: false,
      increaseFromVisible: false,
      listIndex: null,
      rules: {
        mc: [
          { required: true, message: '请输入商家名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        wz: [
          { required: true, message: '请选择位置', trigger: 'change' }
        ],
        fzr: [
          { required: true, message: '请输入负责人姓名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleEdit(index, row) {
      this.form.mc = this.tableData[index].sjmc
      this.form.wz = this.tableData[index].sjwz
      this.form.fzr = this.tableData[index].fzr
      this.form.date1 = this.tableData[index].zcsj.split(' ')[0]
      this.form.date2 = this.tableData[index].zcsj.split(' ')[1]
      this.listIndex = index
      this.handleFormVisible = true
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
    },
    handleSubmit() {
      var index = this.listIndex
      this.tableData[index].sjmc = this.form.mc
      this.tableData[index].sjwz = this.form.wz
      this.tableData[index].fzr = this.form.fzr
      this.tableData[index].zcsj = this.form.date1 + ' ' + this.form.date2
      this.handleFormVisible = false
    },
    increase() {
      this.form.mc = ''
      this.form.wz = ''
      this.form.fzr = ''
      this.form.date1 = ''
      this.form.date2 = ''
      this.increaseFromVisible = true
    },
    increaseSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var list = {}
          list.sjmc = this.form.mc
          list.sjwz = this.form.wz
          list.fzr = this.form.fzr
          list.zcsj = this.form.date1 + ' ' + this.form.date2
          this.tableData.push(list)
          this.increaseFromVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>

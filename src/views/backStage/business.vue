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
      <el-dialog title="增加商家" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商家名称">
            <el-input v-model="form.mc" />
          </el-form-item>
          <el-form-item label="商家位置">
            <el-select v-model="form.wz" placeholder="请选择位置">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="负责人">
            <el-input v-model="form.fzr" />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-col :span="11">
              <el-date-picker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
        sjmc: '王记冒菜',
        sjwz: '一食堂一楼A1',
        fzr: '王三顺',
        zcsj: '2020-03-03 22:16:35'
      }, {
        sjmc: '王记冒菜',
        sjwz: '一食堂一楼A1',
        fzr: '王三顺',
        zcsj: '2020-03-03 22:16:35'
      }, {
        sjmc: '王记冒菜',
        sjwz: '一食堂一楼A1',
        fzr: '王三顺',
        zcsj: '2020-03-03 22:16:35'
      }],
      form: {
        mc: '',
        wz: '',
        fzr: '',
        date1: '',
        date2: ''
      },
      dialogFormVisible: false
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    onSubmit() {
      this.dialogFormVisible = false
    },
    increase() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>

</style>

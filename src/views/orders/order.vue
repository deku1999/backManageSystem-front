<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getOrders">
            <el-button slot="append" icon="el-icon-search" @click="selectOrder"></el-button>
          </el-input>
        </el-col>
      </el-row>
    <el-table stripe style="width: 100%" border :data="tableData">
      <el-table-column type="index"></el-table-column>
      <el-table-column label="订单编号" prop="orderid"></el-table-column>
      <el-table-column label="订单价格" prop="price"></el-table-column>
      <el-table-column label="是否付款" prop="ispay">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.ispay==='true'">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="issend">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.issend==='true'">是</el-tag>
          <el-tag type="danger" v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="createtime">
        <template slot-scope="scope">
          <span>{{scope.row.createtime | getDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialogVisible = true"></el-button>
          <el-button icon="el-icon-location-outline" type="success" size="mini" @click="showLogisticDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 物流信息对话框 -->
    <el-dialog
    title="查看物流进度"
    :visible.sync="logisticDialogVisible"
    width="50%">
    <el-timeline >
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        :color="activity.color"
        :size="activity.size">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
    <span slot="footer" class="dialog-footer">
      <el-button @click="logisticDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="logisticDialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
  <!-- 编辑信息对话框 -->
  <el-dialog
    title="修改地址"
    :visible.sync="editDialogVisible"
    width="50%"
    @closed="$refs.ruleForm.resetFields()">
    <el-form :model="cityData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="省市区/县" prop="city">
          <el-cascader
          v-model="cityData.city"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange">
          </el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="location">
        <el-input v-model="cityData.location" placeholder="请输入详细地址"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmEdit">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import {getOrders} from 'network/order'
import cityData from '../../utils/cityData'
export default {
  name: 'order',
  created() {
    this.getOrders()
    this.options = cityData
  },
  filters: {
    getDate(time) {
      const dateTime = new Date(time)
      const year = dateTime.getFullYear()
      let month = (dateTime.getMonth() + 1)
      month =  month >= 10 ? month: `0${month}`
      let date = dateTime.getDate()
      date = date >= 10? date : `0${date}`
      let hour = dateTime.getHours()
      hour = hour >= 10? hour : `0${hour}`
      let minute = dateTime.getMinutes()
      minute = minute >= 10? minute : `0${minute}`
      let second = dateTime.getSeconds()
      second = second >= 10? second : `0${second}`
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`
    }
  },
  data() {
    return {
      options: [],
      queryInfo: {
        query: '',
        pagenum: 1, //当前页码
        pagesize: 3 //每页最大条数
      },
      total:0,
      tableData: [],
      logisticDialogVisible: false,
      editDialogVisible: false,
      activities: [],
      cityData: {
        city: [],
        location: ''
      },
      rules: {
        city: [
          { required: true, message: '请选择省市区/县', trigger: 'blur' }
        ],
        location: [
           { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    confirmEdit() {
      this.$refs.ruleForm.validate((bool,obj) => {
        if(bool) {
          this.$message.success('编辑地址信息成功')
          this.editDialogVisible = false
        }
      })
    },
    // 级联选择器选中元素触发事件
    handleChange() {
      console.log(this.cityData.city)
    },
    showLogisticDialog(info) {
      this.activities = info.order
      this.logisticDialogVisible = true
    },
    selectOrder() {
      this.getOrders()
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrders()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrders()
    },
    async getOrders() {
      let res = await getOrders(this.queryInfo)
      if(res) {
        this.total = res.data.total
        this.tableData = res.data.result
      }
    }
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 15px;
  }
</style>
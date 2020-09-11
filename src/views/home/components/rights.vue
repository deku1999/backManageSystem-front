<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="tableData" stripe style="width: 100%" border>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="pername" label="权限名称">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column prop="grade" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.grade === 1">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.grade === 2">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[6, 10, 14, 18]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {permissionList} from 'network/home'
export default {
  name: 'rights',
  created() {
    this.permissionList()
  },
  methods: {
    //每页最大条数改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.permissionList()
    },
    //页码改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.permissionList()
    },
    //请求权限列表
    async permissionList() {
      let res = await permissionList(this.queryInfo)
      if(res) {
        this.tableData = res.data.tableData
        this.total = res.data.count
      }
    } 
  },
  data() {
    return {
      queryInfo: {
        // 当前页码
        pagenum: 1,
        // 每页最大显示条数
        pagesize: 6,
      },
      tableData: [],
      total: 0
    }
  }
}
</script>

<style scoped>
</style>
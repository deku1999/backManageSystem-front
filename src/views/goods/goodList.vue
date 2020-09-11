<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8" >
          <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="clearSelect"> 
            <el-button slot="append" icon="el-icon-search" @click="searchGood"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" >
          <el-button type="primary" @click="$router.push('/home/goods/add')">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column  type="index"></el-table-column>
        <el-table-column  label="商品名称" prop="name" width="800"></el-table-column>
        <el-table-column  label="商品价格" prop="price" ></el-table-column>
        <el-table-column  label="商品重量" prop="weight" ></el-table-column>
        <el-table-column  label="创建时间" prop="time" >
          <template slot-scope="scope">
            <span>{{scope.row.time | getDate}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="查看图片" placement="top" :enterable='false'>
              <el-button type="primary" icon="el-icon-thumb" size="mini" @click="seeImg(scope.row)"></el-button>
            </el-tooltip>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGood(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 图片对话框 -->
    <el-dialog
      title="查看图片"
      :visible.sync="ImgdialogVisible"
      width="30%">
      <img :src="imgPath" alt="我是一个图片">
      <span slot="footer" class="dialog-footer">
        <el-button @click="ImgdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ImgdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getGood, deleteGood} from 'network/goods'
export default {
  name: 'goodList',
  created() {
    this.getGood()
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      tableData: [],
      total: 0,
      ImgdialogVisible: false,
      imgUrl: '',
    }
  },
  computed: {
    imgPath() {
      return 'http://localhost:3000/public/' + this.imgUrl
    }
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
  methods: {
    seeImg(info) {
      this.ImgdialogVisible = true
      this.imgUrl = info.imgurl
    },
    deleteGood(info) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await deleteGood(info.id)
          if(res) {
            this.getGood()
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    searchGood() {
      this.getGood()
    },
    clearSelect() {
      this.getGood()
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGood()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGood()
    },
    async getGood() {
      let res = await getGood(this.queryInfo)
      if(res) {
        this.tableData = res.data.result
        this.total = res.data.total
      }
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
img{
  width: 100%;
}
</style>
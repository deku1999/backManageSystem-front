<template>
  <div>
    <!-- 面包蟹导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <div style="margin-top: 0px;">
        <!-- 头部搜索区域 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容"  v-model="userInfo.query" clearable @clear="getUserInfo(userInfo)">
              <el-button slot="append" icon="el-icon-search" @click="getUserInfo(userInfo)"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialog = true">添加用户</el-button>
          </el-col>
        </el-row>
        <!-- 表格区域 -->
        <el-table :data="tableData" style="width: 100%" stripe border>
           <el-table-column type="index"></el-table-column>
           <el-table-column prop="name" label="姓名" ></el-table-column>
           <el-table-column prop="email" label="邮箱"></el-table-column>
           <el-table-column prop="mobile" label="电话"></el-table-column>
           <el-table-column prop="role" label="角色"></el-table-column>
           <el-table-column prop="state" label="状态">
             <template slot-scope="scope">
               <el-switch v-model="scope.row.state" @change="stateChanged(scope.row)">
              </el-switch>
             </template>
           </el-table-column>
           <el-table-column label="操作" width="180">
             <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditForm(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row)"></el-button>
                <el-tooltip class="item" effect="dark" content="分配角色" placement="top-start" :enterable="false"> 
                  <el-button type="warning" icon="el-icon-setting" size="mini" @click="showAllotDialog(scope.row)"></el-button>
                </el-tooltip>
             </template>
           </el-table-column>
        </el-table>
        <!-- 分页区域 -->
         <el-pagination
          @size-change="handleSizeChange" 
          @current-change="handleCurrentChange"
          :current-page="userInfo.pagenum"
          :page-sizes="[2, 3, 4, 5]"
          :page-size="userInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户对话框-->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialog"
        width="50%" @closed="handleAddClose">
        <el-form :model="addFormInfo" :rules="rules" ref="ruleForm" label-width="0" >
          <el-form-item prop="name">
            <el-input v-model="addFormInfo.name" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item  prop="password">
            <el-input v-model="addFormInfo.password" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item  prop="email">
            <el-input v-model="addFormInfo.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item  prop="mobile">
            <el-input v-model="addFormInfo.mobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑信息对话框-->
    <el-dialog
      title="编辑信息"
      :visible.sync="editDialog"
      width="50%"
      @closed="handleEditClose">
      <el-form :model="editFormInfo" :rules="editRules" ref="editForm" label-width="80px" >
          <el-form-item label="用户名">
            <el-input v-model="editFormInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item  prop="eamil" label="邮箱">
            <el-input v-model="editFormInfo.email" ></el-input>
          </el-form-item>
          <el-form-item  prop="mobile" label="手机号">
            <el-input v-model="editFormInfo.mobile" ></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="allotDialogVisible"
      width="40%"
      @closed="handleAllotClose">
      <p>当前的用户：{{currentName}}</p>
      <p>当前的角色：{{currentRole}}</p>
      <p>分配新角色：
        <el-select  placeholder="请选择要分配的角色" v-model="selectedData">
          <el-option :label="item.rolename" :value="item.rolename" 
          v-for="item in roleData" :key="item.id"></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUserInfo,changeState,addUser,editUser,deleteUser,allotRole} from 'network/home'
import {getRole} from 'network/role'
export default {
  name: 'user',
  async created() {
    this.getUserInfo(this.userInfo)
    let res = await getRole()
    if(res) {
      this.roleData = res.data.result
    }
  },
  methods: {
    //封装用户请求方法
     async getUserInfo(info) {
       let res = await getUserInfo(info)
       if(res) {
          console.log(res.data)
          let data = res.data
          this.tableData = data.users
          this.total = data.totalpage
       }
    },
    handleSizeChange(newSize) {
      //每页显示条数改变触发的事件
      this.userInfo.pagesize = newSize
      this.getUserInfo(this.userInfo)
    },
    handleCurrentChange(newPage) {
      //页码改变触发的事件
      this.userInfo.pagenum = newPage
      this.getUserInfo(this.userInfo)
    },
    //用户状态改变函数
    async stateChanged(info) {
      let state = info.state + ''
      let {name} = info
      let res = await changeState(name,state)
      if(res) {
        this.$message.success(res.data.message)
      }
    },
    //删除用户处理方法
    deleteUser(info) {
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await deleteUser(info.name)
          if(res) {
            this.$message.success(res.data.message)
            this.getUserInfo(this.userInfo)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    //添加用户对话框关闭时重置表单
    handleAddClose() {
      this.$refs.ruleForm.resetFields()
    },
    //编辑信息对话框重置
    handleEditClose() {
      this.$refs.editForm.resetFields()
    },
    //弹出编辑信息对话框
    showEditForm(info) {
      let {name, email ,mobile} = info
      this.editFormInfo = {
        name,
        email,
        mobile
      }
      console.log(this.editFormInfo)
      this.editDialog = true
    },
    //编辑信息对话框确定处理
    editUser() {
      this.$refs.editForm.validate(async (bool, obj) => {
        if(bool) {
          let res = await editUser(this.editFormInfo)
          if(res) {
            this.$message.success(res.data.message)
            this.editDialog = false
            this.getUserInfo(this.userInfo)
          }
        }
      })
    },
    //添加用户对话框点击确定发起添加请求
    addUser() {
      this.$refs.ruleForm.validate(async (bool, obj) => {
        if(bool) {
          //发送请求
          let res = await addUser(this.addFormInfo)
          if(res) {
            this.$message.success(res.data.message)
            this.getUserInfo(this.userInfo)
            this.addDialog = false
            console.log('验证通过')
          }
        }
      })
    },
    // 显示分配角色对话框
    showAllotDialog(info) {
      this.currentName = info.name
      this.currentRole = info.role
      this.allotDialogVisible = true
    },
    // 关闭分配角色框重置选中数据
    handleAllotClose() {
      this.selectedData = ''
    },
    // 分配角色
    async allotRole() {
      let res = await allotRole(this.currentName, this.selectedData)
      if(res) {
        this.getUserInfo(this.userInfo)
        this.$message.success(res.data.message)
        this.allotDialogVisible = false
      }
    }
   },
  data() {
    var validatorEmail = (rule, value, callback) => {
      var expEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(expEmail.test(value)) {
        callback()
      }else {
        callback(new Error('请输入合法的邮箱'))
      }
    }
    var validatorMobile = (rule, value, callback) => {
      var expMobile = /^[0-9]\d{10}$/
      if(expMobile.test(value)) {
        callback()
      }else {
        callback(new Error('请输入合法的手机号'))
      }
    }
    return {
      selectedData: '',
      currentName: '',
      currentRole: '',
      addDialog: false,
      editDialog: false,
      roleData: [],
      userInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      //编辑用户信息的表单对象
      editFormInfo: {
        name: '',
        email: '',
        mobile: ''
      },
      //编辑用户信息的校验规则
      editRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validatorEmail ,trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validatorMobile ,trigger: 'blur'}
        ]
      },
      //添加用户表单的信息对象
      addFormInfo :{
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
      //添加用户表单的校验规则
      rules: {
        name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 8, message: '用户名长度需要在 3~8 个字符', trigger: 'blur' }
          ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 12, message: '密码需要在 4~12 个字符', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: validatorEmail ,trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur'},
          { validator: validatorMobile, trigger: 'blur'}
        ]
      },
      tableData: [],
      total:0,
      allotDialogVisible: false
    }
  }
}
</script>

<style scoped>
.el-row{
  margin-bottom: 15px;
}
</style>
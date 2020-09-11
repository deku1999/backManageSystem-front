<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row>
        <el-col :span="24"><el-button type="primary" @click="addDialogVisible = true">添加角色</el-button></el-col>
      </el-row>
      <!-- 表格区域 -->
        <el-table
          :data="roleData"
          stripe
          border
          style="width: 100%">
          <el-table-column type="expand"></el-table-column>
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="rolename" label="角色名称" ></el-table-column>
          <el-table-column prop="roledesc" label="角色描述" ></el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRole(scope.row)">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="showAllotDialog(scope.row)">分配权限</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      @closed="resetAddForm">
      <el-form ref="form" :model="addFormData" label-width="80px" :rules="addFormRules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="addFormData.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="50%"
      @closed="resetEditForm">
      <el-form ref="editForm" :model="editFormData" label-width="80px" :rules="addFormRules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="desc">
          <el-input v-model="editFormData.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="allotDialogVisible"
      width="50%"
      @closed="resetAllotForm">
      <el-tree
        :data="perTree"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="checkedKey"
        :props="defaultProps"
        ref="tree">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allotDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addRole,getRole,editRole,deleteRole,getPermissionTree,editPermissionTree} from 'network/role'
export default {
  name: 'roles',
  async created() {
    this.getInfo()
    let res = await getPermissionTree()
    if(res) {
      this.perTree = res.data.result
    }
  },
  data() {
    return {
      defaultProps: {
          children: 'children',
          label: 'label'
        },
      checkedKey: [],
      //权限树
      perTree: [],
      allotDialogVisible: false,
      // 角色数据
      roleData: [],
      // 添加角色对话框
      addDialogVisible: false,
      editDialogVisible: false,
      addFormData: {
        name: '',
        desc: ''
      },
      editFormData: {
        name: '',
        desc: '',
        id: 0
      },
      addFormRules: {
        name: [
           { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        desc: [
           { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 删除角色id
      deleteID: 0,
      // 分配权限id
      allotID: 0
    }
  },
  methods: {
    // 关闭分配权限对话框时重置方法
    resetAllotForm() {
      this.checkedKey = []
    },
    //确定分配权限
    async allotRoleInfo() {
      let treeList = this.$refs.tree.getCheckedKeys()
      treeList = treeList.join(',')
      let res = await editPermissionTree(this.allotID, treeList)
      if(res) {
        this.getInfo()
        this.$message.success(res.data.message)
        this.allotDialogVisible = false
      }
    },
    // 弹出分配权限对话框
    showAllotDialog(info) {
      let tree = info.roleid
      if(tree) {
          tree = tree.split(',')
      }
      this.allotID = info.id
      this.checkedKey = tree
      console.log(this.checkedKey)
      this.allotDialogVisible = true
    },
    resetAddForm() {
      this.$refs.form.resetFields()
    },
    resetEditForm() {
      this.$refs.editForm.resetFields()
    },
    showEditDialog(info) {
      this.editFormData.name = info.rolename
      this.editFormData.desc = info.roledesc
      this.editFormData.id = info.id
      this.editDialogVisible = true
    },
    // 删除角色
    deleteRole(info) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.deleteID = info.id
          let res = await deleteRole(this.deleteID)
          if(res) {
            this.getInfo()
            this.$message({
            type: 'success',
            message: res.data.message
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 确定编辑用户
    editRoleInfo() {
      this.$refs.editForm.validate(async (bool,obj)=> {
        if(bool) {
          let res = await editRole(this.editFormData)
          if(res) {
            this.getInfo()
            this.$message.success('修改角色信息成功')
            this.editDialogVisible = false
          }
        }else {
          this.$message.error('请提交合法的表单信息')
        }
      })
    },
    // 确定添加用户
    addRoleInfo() {
        this.$refs.form.validate(async (bool,obj) => {
          if(bool) {
            let res = await addRole(this.addFormData)
            if(res) {
              this.$message.success(res.data.message)
              this.addDialogVisible = false
              this.getInfo()
            }
          }else {
            this.$message.error('请提交合法的表单信息')
          }
        })
    },
    // 获取角色信息
    async getInfo() {
      let res = await getRole()
      if(res) {
        this.roleData = res.data.result
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
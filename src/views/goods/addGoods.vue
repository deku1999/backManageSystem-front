<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
        <el-alert title="添加商品信息" type="info" :closable="false" show-icon center></el-alert>
        <el-steps  :active="+nameIndex" finish-status="success" align-center>
          <el-step title="基本信息" ></el-step>
          <el-step title="商品图片" ></el-step>
          <el-step title="商品内容" ></el-step>
        </el-steps>
        <el-form :model="goodForm" :rules="rules" ref="goodForm" label-width="100px" class="demo-ruleForm" label-position="top">
          <el-tabs tab-position="left" v-model="nameIndex">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="goodForm.name" placeholder="请输入商品名称"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input v-model="goodForm.price" type="number" min="1"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="weight">
                <el-input v-model="goodForm.weight" type="number" min="1"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="1">
              <el-upload
                class="upload-demo"
                drag
                action="http://localhost:3000/uploadimg"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :before-upload="beforeUpload"
                :on-success="successUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2mb</div>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="2">
                <quill-editor v-model="goodForm.content"
                ref="myQuillEditor">
                </quill-editor>
                <el-button type='primary' @click="affirmAdd">添加商品</el-button>
            </el-tab-pane>
          </el-tabs>
        </el-form>
    </el-card>
  </div>
</template>

<script>
import {addgood} from 'network/goods'
export default {
  name: 'addGoods',
  methods: {
    affirmAdd() {
      this.$refs.goodForm.validate(async (bool, obj) => {
        if(bool) {
          let time = new Date()
          time = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
          this.goodForm.time = time
          let res = await addgood(this.goodForm)
          if(res) {
            this.$message.success("添加商品成功")
            this.$router.push('/home/goods')
          }
        }else {
          this.$message.error('请填写完表单的必要信息')
        }
      })
    },
    changeIndex(num) {
      this.activeIndex = num
      console.log(this.activeIndex)
    },
    beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M
    },
    successUpload(response, file, fileList) {
      let url = response.url
      url = url.replace("http://localhost:3000/public/",'')
      this.goodForm.imgurl = url
    }
  },
  data() {
    return {
      goodForm: {
        name: '',
        price: '',
        weight: '',
        content: '',
        imgurl: ''
      },
      nameIndex: '0',
      rules: {
        name: [{required: true, message: '请输入商品名称', trigger: 'blur' }],
        price: [{required: true, message: '请输入商品价格', trigger: 'blur' }],
        weight: [{required: true, message: '请输入商品重量', trigger: 'blur' }]
      },
    }
  }
}
</script>

<style scoped>
.el-steps {
  margin: 15px 0;
}
.el-button{
  margin-top: 15px;
}
</style>
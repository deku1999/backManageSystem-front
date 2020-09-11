<template>
  <div id="login">
    <div class="user-login">
      <div class="logo"><img src="~assets/img/logo/logo.jpg" alt=""></div>
      <el-form ref="form" :model="form" label-width="" class="el-form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="用户名"  ref="username" >
            <i slot="prefix" class="el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="密码"  type="password" ref="password" >
            <i slot="prefix" class="el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <div class="login-button">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="reset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLogin} from 'network/login'
export default {
  name: 'login',
  mounted() {
    if(this.form.username==='') {
      this.$refs.username.focus()
    }else if(this.form.password===''){
      this.$refs.password.focus()
    }
  },
  methods: {
    //表单登录
    login() {
      this.$refs.form.validate(async (boolean, obj) => {
        if(boolean) {
          let res = await getLogin(this.form)
          if(res){
              let data = res.data
              if(data.code === 200) {
                window.sessionStorage.setItem('token',data.token)
                this.$message.success('登录成功')
                this.$router.push('/home')
              }else{
                this.$message({
                  type: 'error',
                  message: data.message,
                  duration: 2000
                })
              }
          }
        } 
      })
    },
    //表单重置
    reset() {
      this.$refs.form.resetFields()
    }
  },
  data() {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      rules: {
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped lang="scss">
#login {
  height: 100%;
  background-color: #2b4b6b;
}
.user-login{
  width: 450px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 7px;
}
.el-form{
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px 10px;
  position: absolute;
  bottom: 0;
}
.login-button {
  display: flex;
  justify-content: flex-end;
}
.logo{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 10px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>
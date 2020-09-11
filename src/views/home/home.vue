<template>
  <el-container>
    <!-- 头部 -->
  <el-header>
    <div>
        <img src="~assets/img/home/bdts.jpg" alt="">
        <span>后台管理系统</span>
    </div>
    <div>
        <el-button type="primary" @click="logout">退出</el-button>
    </div>
  </el-header>
  <el-container>
    <!-- 左侧区域 -->
    <el-aside :width="isCollapse? '64px' : '200px'">
      <div @click="checkCollapse">|||</div>
        <el-menu
        background-color="#99ccff"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
        :router="true"
         :default-active="activePath">
        <el-submenu :index="item.id + ''" v-for="item in permissions" :key="item.id">
          <template slot="title">
            <i :class="icons[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
           <el-menu-item :index="'/home'+sonItem.path" v-for="sonItem in item.children" 
           :key="sonItem.id"
           @click="saveActivePath('/home'+sonItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{sonItem.authName}}</span>
              </template>
            </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧区域 -->
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import {getPermission} from 'network/home'
export default {
  name: 'home',
  computed: {
    activePath() {
      return window.sessionStorage.getItem('path')
    }
  },
  data() {
    return {
      permissions: [],
      icons: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-fold',
        '101': 'el-icon-s-goods',
        '102': 'el-icon-s-order',
        '145': 'el-icon-s-marketing'
      },
      isCollapse: false
    }
  },
  async created() {
     const res = await getPermission()
     if(res) {
        this.permissions = res.data.data
     }
  },
  methods: {
    saveActivePath(path) {
      window.sessionStorage.setItem('path',path)
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    checkCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="scss">
.el-container{
  height: 100%;
}
.el-main{
  position: relative;
}
.el-header{
  background-color: skyblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
  div:first-child{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}
.el-menu{
  border-right: none;
  i{
    margin-right: 10px;
  }
}
.el-aside{
  background-color: #99ccff;
  overflow: hidden;
  >div{
    text-align: center;
    color: #fff;
    letter-spacing: 5px;
    cursor: pointer;
    background-color: #6495ED;
    font-size: 10px;
    line-height: 24px;
  }
}
</style>
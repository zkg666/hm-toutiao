<template>
  <el-container class="container" >
    <el-aside :width="show?'200px':'64px'">
      <div class="logo" :class="{littlelogo:!show}"></div>
      <!-- 导航菜单页面 -->
      <el-menu
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="border-right:none"
        router
        :collapse='!show'
        :collapse-transition='false'
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/content">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>s
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 字体图标 -->
        <span class="el-icon-s-fold icon" @click="isopen"></span>
        <!-- 标题 -->
        <span>江苏传智播客科技教育有限公司</span>
        <!-- 右边的下拉菜单 -->
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/yl.jpg" alt class="usericon" />
            <span class="username">大筒木一乐</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    isopen () {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .littlelogo {
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 35px auto;
    }
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
      cursor: pointer;
    }
    .dropdown {
      float: right;
    }
    .usericon {
      width: 35px;
      height: 35px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .username {
      font-weight: 700;
      cursor: pointer;
    }
  }
}
</style>

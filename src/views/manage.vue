<template>
  <div class="manage_page">
    <el-container>
      <el-aside width="200px">
        <el-header>
          <el-link class="title" :underline="false" @click="go_home">
            <b>后台管理系统</b>
          </el-link>
        </el-header>
        <el-menu class="el-menu-vertical" background-color="#343a40" text-color="#c2c7d0" active-text-color="#ffd04b" width router>
          <el-menu-item index="manage"><i class="el-icon-s-home"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
            <el-menu-item index="addUser">添加用户</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>数据管理</template>
            <el-menu-item index="userList">用户列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <headBar></headBar>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer> Copyright © 2022 </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headBar from '@/components/headBar.vue'

export default {
  components: { headBar },
  data() {
    return {
      isCollapse: false,
      menu_icon: 'el-icon-arrow-left',
    }
  },
  methods: {
    go_home() {
      this.$router.push('manage')
    },
  },
}
</script>

<style lang="less" scoped>
@headerHeight: 60px;

.el-header {
  background-color: #343a40;

  line-height: calc(~'@{headerHeight}');
  padding: 0px;
  display: flex;
}

.title {
  width: 220px;
  font-size: 18px;
  color: #c2c7d0;
}

.el-aside {
  // background-color: #545c64;
  color: #c2c7d0;
  overflow-x: hidden;
  // line-height: calc(~'100vh - @{headerHeight}');
}

.el-main {
  color: #333;
}

.el-footer {
  color: #333;
  border-top: 1px solid #e9eef3;
  line-height: calc(~'@{headerHeight}-1px');
  display: flex;
  // justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

body > .el-container {
  margin-bottom: 40px;
}

.el-menu-vertical {
  min-height: calc(~'100vh - @{headerHeight}');
  width: 200px;
}
</style>

<template>
  <div class="head_bar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="right_container">
      <el-button type="info" size="medium" @click="logout" plain>登出</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$router.push({ name: 'login' })
    },
  },
}
</script>

<style lang="less" scoped>
.head_bar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eff2f7;
}

.el-breadcrumb {
  margin-left: 20px;
}

.right_container {
  margin-right: 20px;
}
</style>

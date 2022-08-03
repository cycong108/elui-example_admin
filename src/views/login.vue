<template>
  <div class="login_page">
    <el-card class="box-card" shadow>
      <div slot="header" class="clearfix">
        <span>欢迎使用</span>
      </div>
      <el-form :model="user" status-icon :rules="rules" ref="user">
        <el-form-item prop="user_name">
          <el-input type="text" v-model="user.user_name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="user_pwd">
          <el-input
            type="password"
            v-model="user.user_pwd"
            autocomplete="off"
            placeholder="密码"
            @keyup.enter.native="submitForm('user')"
          ></el-input>
        </el-form-item>
        <el-form-item class="form_button">
          <el-button type="primary" @click="submitForm('user')">提交</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
      </el-form>
      <p class="tip">请输入任意用户名和密码。</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validateUserPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      user: {
        user_name: '',
        user_pwd: '',
      },
      rules: {
        user_name: [{ validator: validateUserName, trigger: 'blur' }],
        user_pwd: [{ validator: validateUserPwd, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push('manage')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.login_page {
  text-align: center;
}

.box-card {
  width: 420px;
  margin: 30vh auto;
}

.form_button {
  text-align: center;
}

.form_button button {
  width: 30%;
}

.tip {
  font-size: 12px;
  color: red;
}
</style>

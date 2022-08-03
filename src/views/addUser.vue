<template>
  <div class="addUser_page">
    <el-row>
      <el-col :span="8">
        <el-form :model="user" :rules="rules" ref="user" label-width="100px">
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="user.user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="user_pwd">
            <el-input type="password" v-model="user.user_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="check_pwd">
            <el-input type="password" v-model="user.check_pwd"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="user.sex" style="margin-left: 8px">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
              <el-radio label="保密"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="16">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="user.born_date"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="user.describe"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('user')">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    var checkPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.user_pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        user_name: '',
        user_pwd: '',
        check_pwd: '',
        name: '',
        sex: '',
        born_date: '',
        describe: '',
      },
      rules: {
        user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        user_pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        check_pwd: [{ validator: checkPwd, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          alert('添加用户成功!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<style scoped></style>

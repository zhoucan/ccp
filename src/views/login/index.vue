<template>
  <div class="wrap">
    <div class="register" v-show="loginOrregister === 'register'">
      <el-form
        :model="formregister"
        :rules="registerRules"
        ref="ruleFormRegister"
      >
        <el-form-item prop="userName">
          <el-input
            v-model="formregister.userName"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formregister.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-row type="flex" justify="space-between">
            <el-col :span="14"
              ><el-input
                v-model="formregister.email"
                placeholder="请输入邮箱"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                type='danger'
                style="width:100%"
                :disabled="isDisabled"
                @click="sendMsg"
                >{{ getCode }}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="formregister.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-button
          type="success"
          round
          @click="registerSubmit('ruleFormRegister')"
          style="width:100%"
          :loading="registerDisbled"
          >注册</el-button
        >
      </el-form>
      <div class="tip">
        <el-link :underline="false" @click="goLogin">已有帐号？去登录</el-link>
      </div>
    </div>

    <div class="login" v-show="loginOrregister === 'sign'">
      <el-form :model="formlogin" :rules="loginRules" ref="ruleFormlogin">
        <el-form-item prop="username">
          <el-input
            v-model="formlogin.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="formlogin.password"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-button
          round
          type="success"
          :loding='loginDisbled'
          @click="loginSubmit('ruleFormlogin')"
          style="width:100%"
          >登录</el-button
        >
      </el-form>
      <div class="tip">
        <el-link :underline="false" @click="goLogin">未登录？去注册</el-link>
      </div>
    </div>
  </div>
</template>

<script>
import { register, sendEmail, login } from '@/api'
export default {
  data () {
    return {
      loginOrregister: 'register',
      registerDisbled: false,
      loginDisbled: false,
      formregister: {
        userName: '',
        password: '',
        email: '',
        code: ''
      },
      formlogin: {
        username: '',
        password: ''
      },
      getCode: '获取验证码',
      time: 20,
      isDisabled: false,
      registerRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    goLogin () {
      if (this.loginOrregister !== 'register') {
        this.loginOrregister = 'register'
        return
      }
      this.loginOrregister = 'sign'
    },
    registerSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.registerDisbled = true
          register(this.formregister).then(res => {
            console.log(res)
            this.registerDisbled = false
          })
        } else {
          console.log('error submit!!')
          this.registerDisbled = false
          return false
        }
      })
    },
    loginSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginDisbled = true
          login(this.formlogin).then(res => {
            localStorage.setItem('token', res.token)
            this.$router.push({ path: '/home' })
            this.loginDisbled = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendMsg () {
      const email = this.formregister.email
      if (email === '') {
        return this.$message({
          message: '邮箱不能为空',
          type: 'warning'
        })
      }
      const validateReg =
        // eslint-disable-next-line no-useless-escape
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      if (!validateReg.test(email)) {
        return this.$message({
          message: '邮箱格式不正确',
          type: 'warning'
        })
      }
      this.isDisabled = true
      const interval = setInterval(() => {
        this.getCode = `${this.time}秒后重发`
        --this.time
        if (this.time < 0) {
          this.getCode = '重新发送'
          this.time = 20
          this.isDisabled = false
          clearInterval(interval)
        }
      }, 1000)

      sendEmail({ email: this.formregister.email }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.tip {
  text-align: center;
  padding-top: 20px;
  cursor: pointer;
}
.tip .el-link,
.tip .el-link.el-link--default:hover {
  color: #fff;
}
.register .el-button--blue {
  color: #0d86dc;
}
.wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.wrap .title {
  font-size: 25px;
  color: #fff;
  margin-bottom: 40px;
}
.register,
.login {
  width: 320px;

  height: 300px;
}
</style>

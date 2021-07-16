<template>
<div>
  <div class="backbtn">
        <el-button @click="goBack"  el-button icon="el-icon-arrow-left" circle></el-button>
   </div>
  <div class="seekpaswd">
 <el-form
        :model="form"
        :rules="rulesform"
        ref="Form"
      >
        <el-form-item prop="email">
          <el-row type="flex" justify="space-between">
            <el-col :span="14"
              ><el-input
                class="inpstyle"
                v-model="form.email"
                placeholder="请输入邮箱"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                round
                class="getcodebtn"
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
            class="inpstyle"
            v-model="form.code"
            placeholder="请输入验证码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
          class="inpstyle"
            type="password"
            v-model="form.passWord"
            prefix-icon="el-icon-lock"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>

        <el-button
          round
          class="btnok"
          @click="Submit('Form')"
          style="width:100%"
          :loading="btnDisbled"
          >找回密码</el-button
        >
      </el-form>
  </div>
</div>

</template>

<script>
import { sendUpdateEmail, retrievePwdByEmail } from '@/api'

export default {
  data () {
    return {
      getCode: '获取验证码',
      isDisabled: false,
      btnDisbled: false,
      time: 20,
      form: {
        email: '',
        code: '',
        passWord: ''

      },
      rulesform: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }

        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    Submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnDisbled = true
          retrievePwdByEmail(this.form).then(res => {
            this.btnDisbled = false
            this.$router.push({ path: '/', query: { redirect: 'sign' } })
          }).catch(() => {
            this.btnDisbled = false
          })
        }
      })
    },
    sendMsg () {
      const email = this.form.email
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
      sendUpdateEmail({ email }).then(res => {
        console.log(res)
      })
    },
    goBack () {
      this.$router.push({ path: '/', query: { redirect: 'sign' } })
    }
  }
}
</script>

<style  scoped>
.btnok,.getcodebtn {
  color:#0d86dc;
}
.seekpaswd{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.inpstyle /deep/ input.el-input__inner{
    border: 0;
    background: transparent;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    color:#fff;
}
.backbtn {
    position: absolute;
    left: 20px;
    top:20px;
}
</style>

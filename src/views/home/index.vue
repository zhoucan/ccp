<template>
  <div class="home">
    <div class="wrap">
         <div
         v-loading="codqrloading"
        id="qrcode"
        ref="qrCodeUrl"
        style="width:180px; height:180px; margin:15px auto;"
      ></div>
      <div class="address">
        <el-link class="txt" :underline="false"
          >复制钱包地址充入要兑换的CCP：</el-link
        >
        <el-link class="txt" :underline="false">{{ cppAddress }}</el-link>
      </div>

      <div class="adressbtn">
        <el-button  round class="copyStr" @click="copy" :data-clipboard-text="copycppAddress">复制地址</el-button>

      </div>
      <div class="withdrawalbtn">
        <el-button type="success" round @click="dialogFormVisible = true" >提现</el-button>
      </div>
      <div class="withdrawallistbtn">
        <el-button type="danger" round @click="goDetail">提现列表</el-button>
      </div>
      <div class="money">
        <p>余额：<span class="mymoney">{{ cppRemains }}</span><span>KB</span></p>
      </div>
      <div class="logout">
        <el-button type="warning" round @click='logout'>退出</el-button>
      </div>
         <div style="margin-top:30px">
          <el-alert show-icon title="提示：2ccp等于3Kb" type="info" effect="light"></el-alert>
         </div>
    </div>
    <el-dialog title="提现" :visible.sync="dialogFormVisible" :closeOnClickModal='false'>
  <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="Rules"
      >
      <el-form-item prop="code">
          <el-row type="flex" justify="space-between">
            <el-col :span="14"
              ><el-input
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button
                type="primary"
                style="width:100%"
                :disabled="isDisabled"
                @click="sendMsg"
                >{{ getCode }}</el-button
              ></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item prop="toAddress">
          <el-input
            v-model="ruleForm.toAddress"
            placeholder="请输入钱包地址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="amount">
          <el-input
            v-model="ruleForm.amount"
            placeholder="请输入提现金额"
          ></el-input>
        </el-form-item>
      </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button type="success" @click="withdrawalSubmit('ruleForm')"  :loading='withdrawalDisabled' style="width:100%">确 定</el-button>
  </div>
</el-dialog>
  </div>

</template>

<script>
import { getUserInfo, sendEmail, cppOutRecharge } from '@/api'
import { mapState } from 'vuex'
import QRCode from 'qrcodejs2'
import ClipboardJS from 'clipboard'
export default {
  data () {
    return {
      cppRemains: 0,
      codqrloading: true,
      timer: null,
      cppAddress: '',
      copycppAddress: '',
      dialogFormVisible: false,
      getCode: '获取验证码',
      time: 20,
      isDisabled: false,
      ruleForm: {
        toAddress: '',
        amount: '',
        email: '',
        code: ''
      },

      Rules: {
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        toAddress: [
          { required: true, message: '请输入钱包地址', trigger: 'blur' }
        ],
        amount: [{ required: true, message: '请输入提现金额', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('user', ['withdrawalDisabled'])

  },
  created () {
    this.getUserInfoFn()
  },
  mounted () {},
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {

    goDetail () {
      this.$router.push({ path: '/detail' })
    },
    setforInterval () {
      this.timer = setInterval(() => {
        this.getUserInfoFn()
      }, 1000 * 10)
    },

    sendMsg () {
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

      sendEmail({ email: this.ruleForm.email }).then(res => {
        console.log(res)
      })
    },
    withdrawalSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit('user/BtnLoding', true)
          cppOutRecharge(this.ruleForm)
            .then(res => {
              this.getUserInfoFn()
              this.$store.commit('user/BtnReset', false)
              this.dialogFormVisible = false
            })
        }
      })
    },
    copy () {
      var clipboard = new ClipboardJS('.copyStr')
      clipboard.on('success', e => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
        clipboard.destroy()
      })
    },
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/')
      clearInterval(this.timer)
    },
    getUserInfoFn () {
      this.codqrloading = true
      clearInterval(this.timer)
      this.$nextTick(() => {
        const qrcode = document.getElementById('qrcode')
        if (qrcode.innerHTML !== '') qrcode.innerHTML = ''
      })
      getUserInfo()
        .then(res => {
          const { cppAddress, email, cppRemain } = res.data
          this.ruleForm.email = email
          this.cppRemains = cppRemain
          this.codqrloading = false
          // eslint-disable-next-line no-unused-vars
          var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: cppAddress,
            width: 180,
            height: 180
          })

          if (cppAddress === null || cppAddress === '' || typeof (cppAddress) === 'undefined') {
            this.newsCppAddress = ''
            this.cppAddress = ''
          } else {
            const newsCppAddress =
            cppAddress.substr(0, 5) +
            '*************************' +
            cppAddress.substr(cppAddress.length - 5, 5)
            this.copycppAddress = cppAddress
            this.cppAddress = newsCppAddress
          }

          this.setforInterval()
        })
    }
  }
}
</script>

<style scoped>
.home /deep/ .el-dialog__body {
  padding-bottom: 0px;
}
.home /deep/ .el-form-item:last-child {
  margin-bottom: 10px;
}
.el-link.el-link--default:hover,
.el-link--white {
  color: #fff;
}
.address {
  margin: 20px 0;
}
.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home .txt {
  color: #fff;
}
.home .wrap {
  width: 300px;
}
#qrcode {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
}
.adressbtn .el-button {
  color: #0d86dc;
}
.wrap > div .el-button {
  width: 100%;
  display: block;
}
.withdrawalbtn {
  margin: 10px 0;
}
.money {
  font-size: 18px;
  padding: 10px 0;
  color: #fff;
}
.money span:nth-child(1) {
  font-size: 24px;
  color: #fff;
}

.money span {
  padding-left: 5px;
  font-size: 16px;
}
.logout {
  margin-top: 15px;
}
@media screen and (max-width: 767px) and (min-width: 375px){
.home /deep/ .el-dialog {
   width: 92%;
}

}
</style>

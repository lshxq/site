<template lang="pug">
.login-index-main
  .mask
    .login-panel(v-loading='loading')
      .title 登录
      .sub-title 田世远的空间
      el-form.login-form(label-wdith='80px' :model='model' ref='loginFormRef' :rules='rules')
        el-form-item(prop='username')
          el-input(v-model.trim='model.username' placeholder='请输入用户名')
        el-form-item(prop='pass')
          el-input(v-model.trim='model.pass' show-password placeholder='请输入密码')
        el-form-item
          el-button.w0(type='primary' @click='login') 登录
        
</template>

<script>
import _ from 'lodash'
import utils from '@/utils.js'

export default {
  created() {
    this.rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" },
      ],
      pass: [
        { required: true, message: "请输入登录密码", trigger: "blur" },
      ],
    };
    this.panoCfg = {
      navbar: false,
      autorotateDelay: 400,
      autorotateSpeed: "0.1rpm",
    }
  },
  data() {
    return {
      loading: false,
      model: {
        username: "",
        pass: "",
      },
      backgrounds: [
        this.getPanoUrl('00.jpg'),
        this.getPanoUrl('01.jpg'),
        this.getPanoUrl('02.jpg'),
        this.getPanoUrl('03.jpg'),
        this.getPanoUrl('04.jpg'),
        this.getPanoUrl('05.jpg'),
        this.getPanoUrl('06.jpg'),
        this.getPanoUrl('07.jpg'),
        this.getPanoUrl('08.jpg'),
        this.getPanoUrl('09.jpg'),
        this.getPanoUrl('10.jpg'),
        this.getPanoUrl('11.jpg'),
        this.getPanoUrl('12.jpg'),
        this.getPanoUrl('13.jpg'),
        this.getPanoUrl('14.jpg'),
      ]
    }
  },
  computed: {
    backgroundComp() {
      const {
        backgrounds
      } = this
      return backgrounds[Math.floor(Math.random() * backgrounds.length)]
    }
  },
   methods: {
    login() {
      const that = this
      const {
        model
      } = that
      that.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          that.loading = true
          that.$axios({
            url: 'user/login',
            method: 'POST',
            data: {
              ...model
            }
          }).then(resp => {
            console.log(resp)
            const msg = _.get(resp, 'data.msg')
            const token = _.get(resp, 'data.token')
            const user = _.get(resp, 'data.user')
            if (msg) {
              that.$message.error(msg)
            } else if (token){
              utils.setCurrentUser(user, token)
              that.goto("personal")
            } else {
              that.$message.error('服务器没有返回登陆token')
            }

          }).finally(() => {
            that.loading = false
          })
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.login-index-main
  height: 100%
  width: 100%
  position: relative

  .mask
    background: #f0f0f0
    position: absolute
    top: 0
    right: 0
    bottom: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    .login-panel
      width: 400px
      background: white
      padding: 30px
      .title
        text-align: center
        margin-bottom: 10px
        font-size: 40px
      .sub-title
        text-align: center
        margin-bottom: 20px
        font-size: 16px

</style>

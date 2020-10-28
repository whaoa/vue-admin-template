<template>
  <div class="login-container border-box relative">
    <p class="header text-center ft32 text-bold mb40">系统登录</p>
    <div class="login-form">
      <el-form ref="loginForm" class="login-form-body" :model="form">
        <el-form-item prop="username" :rules="{ required: true, message: '请输入登录账号', trigger: 'blur' }">
          <el-input
            v-model="form.username"
            placeholder="请输入登录账号"
            prefix-icon="el-icon-user"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item prop="password" :rules="{ required: true, message: '请输入登录密码', trigger: 'blur' }">
          <el-input
            v-model="form.password"
            placeholder="请输入登录密码"
            show-password
            prefix-icon="el-icon-lock"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-form>
      <div class="login-form-operation flex my10">
        <div class="flex-1" />
        <el-link type="primary" :underline="false">忘记密码</el-link>
      </div>
      <div class="login-form-submit">
        <!-- TODO: 登录 Loading -->
        <el-button class="w-full" type="primary" @click="handleLogin">确定</el-button>
      </div>
    </div>
    <div class="footer ft14 text-center">
      <div class="copyright">Copyright © 2020 with Vue.js and ElementUI.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemLogin',
  data () {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async handleLogin () {
      try {
        await this.$refs.loginForm.validate();
        await this.$store.dispatch('user/login', this.form);
        await this.$router.replace('/');
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .login-container {
    min-height: 100vh;
    background: #f0f2f5 url("~@/assets/svg/background.svg") no-repeat 50%;
    background-size: 100%;
    padding: 160px 0;

    .login-form {
      width: 380px;
      margin: auto;
    }

    .footer {
      width: 100%;
      color: #999;
      position: absolute;
      bottom: 20px;
    }
  }
</style>

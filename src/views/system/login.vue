<template>
  <div class="login-container border-box relative">
    <div class="login-form relative">
      <div class="app-qr-code pointer" />
      <el-tabs value="account">
        <el-tab-pane label="账号密码登录" name="account">
          <el-form ref="loginForm" :model="form">
            <el-form-item prop="username" :rules="{ required: true, message: '请输入登录账号', trigger: 'blur' }">
              <el-input v-model="form.username" placeholder="请输入账号" @keydown.native="handleLogin" />
            </el-form-item>
            <el-form-item prop="password" :rules="{ required: true, message: '请输入登录密码', trigger: 'blur' }">
              <el-input v-model="form.password" show-password placeholder="请输入密码" @keydown.native="handleLogin" />
            </el-form-item>
            <!--<el-form-item>-->
            <!--  <div class="flex">-->
            <!--    <el-input class="flex-1" placeholder="请输入图形验证码" />-->
            <!--    <div class="code-img">-->
            <!--      <img src="https://d2.pub/d2-admin/preview/img/login-code.10fef840.png" alt="图片验证码">-->
            <!--    </div>-->
            <!--  </div>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button
                :loading="loading"
                class="btn-login w-full"
                type="primary"
                @click="handleLogin"
              >登 录</el-button>
            </el-form-item>
          </el-form>
          <div class="links">
            <el-link type="primary">终端备案</el-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemLogin',
  data () {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: 'admin',
      },
    };
  },
  methods: {
    async handleLogin () {
      try {
        this.loading = true;
        await this.$refs.loginForm.validate();
        await this.$store.dispatch('user/login', this.form);
        this.$notify({
          type: 'success',
          title: '登录成功',
          message: '欢迎使用！',
        });
        await this.$router.replace('/');
      } catch (e) {
        console.log(e);
        this.loading = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  ::v-deep {
    .el-tabs__header {
      margin-bottom: 32px;
    }
    .el-tabs__item {
      height: 22px;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 24px;
    }

    .el-input__inner {
      height: 52px;
    }
  }

  .login-container {
    min-height: 100vh;
    background: #f0f2f5 url("~@/assets/images/login/background.png") 100% no-repeat;
    padding: 160px 0;

    .login-form {
      width: 400px;
      height: max-content;
      background-color: #fff;
      padding: 32px 50px 120px;
      box-sizing: border-box;
      border-radius: 8px;
      position: absolute;
      right: 380px;
      top: 0;
      bottom: 0;
      margin: auto;

      .app-qr-code {
        width: 54px;
        height: 54px;
        background-image: url("~@/assets/images/login/app_qr-code.png");
        position: absolute;
        top: 10px;
        right: 10px;
      }

      .code-img {
        width: 118px;
        height: 52px;
        border-radius: 4px;
        border: 1px solid #D7DAE0;
        box-sizing: border-box;
        margin-left: 20px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .btn-login {
        height: 56px;
        font-size: 16px;
        font-weight: 600;
      }

      .links {
        margin-top: 16px;
        .el-link {
          text-decoration: underline;
          &::after {
            display: none;
          }
        }
      }
    }
  }
</style>

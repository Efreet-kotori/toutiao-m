<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      class="navbar"
      left-arrow
      title="登录"
      @click-left="backToPrePage"
    >
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 手机号表单 -->
    <van-form class="form" ref="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        label=""
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        label=""
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <!-- 验证码倒计时 -->
          <van-count-down
            :time="60 * 1000"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <!-- 验证码图标 -->
          <van-button
            class="code-btn"
            size="mini"
            round
            native-type="button"
            v-else
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRules } from './rules.js'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },
  methods: {
    backToPrePage () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (e) {
        const status = e.response.status
        let message = '登录错误，请刷新~'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        // }
      }
    },
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (e) {
        if (!e.response) {
          this.$toast.fail(e.message)
        } else {
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    color: #666;
    padding: 0 10px;
  }
}
</style>

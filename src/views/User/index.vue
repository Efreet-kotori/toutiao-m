<template>
  <div>
    <div>
      <van-nav-bar
        class="navbar"
        left-arrow
        title="个人信息"
        @click-left="backToPrePage"
      >
        <template #left> <van-icon name="arrow-left" /> </template>
      </van-nav-bar>
    </div>
    <div>
      <van-cell title="头像" is-link>
        <template #default>
          <van-image round width="0.8rem" height="0.8rem" :src="user.photo" />
        </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="user.name" @click="show1 = true" />
      <van-cell
        title="性别"
        is-link
        :value="user.gender ? '女' : '男'"
        @click="show2 = true"
      />
      <van-cell
        title="生日"
        is-link
        :value="user.birthday"
        @click="show3 = true"
      />
    </div>
    <van-popup v-model="show1" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        @click-left="show1 = false"
        @click-right="
          user.name = message
          show1 = false
        "
      />
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>
    <van-popup v-model="show2" position="bottom" :style="{ height: '50%' }">
      <van-picker
        title="更新性别"
        show-toolbar
        :columns="columns"
        @cancel="show2 = false"
        @confirm="confirm1"
      />
    </van-popup>
    <van-popup v-model="show3" position="bottom" :style="{ height: '50%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="show3 = false"
        @confirm="confirm2"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUser, recomposesUser } from '@/api'
import dayjs from '@/utils/dayjs'
export default {
  data () {
    return {
      user: {},
      show1: false,
      show2: false,
      show3: false,
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2030, 10, 1),
      currentDate: new Date(2021, 0, 17),
      columns: ['男', '女'],
      id: '',
      message: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    backToPrePage () {
      this.recomposesUser()
      this.$router.back()
    },
    async getUser () {
      try {
        const {
          data: { data }
        } = await getUser()
        this.user = data
        this.id = data.id
        this.message = data.name
        console.log(data)
        console.log(this.id)
      } catch (e) {
        this.$toast.fail('请刷新')
      }
    },
    async recomposesUser () {
      try {
        const res = await recomposesUser(this.gender)
        console.log(res)
      } catch (error) {
        this.$toast.fail('请刷新')
      }
    },
    confirm1 (value, index) {
      //   console.log(value)

      this.user.gender = index

      this.show2 = false
      this.recomposesUser()
    },
    confirm2 () {
      //   console.log(dayjs(this.currentDate).format('YYYY-MM-DD'))
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.show3 = false
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
</style>

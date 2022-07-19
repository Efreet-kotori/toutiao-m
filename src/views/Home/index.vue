<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')"
          ><van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 展示弹框 -->
    <EditChannelPopup
      ref="popup"
      :myChannles="myChannels"
      @del-mychannel="delMyChannel"
      @change-active="changeActive"
      @add-Mychannel="addMyChannel"
    ></EditChannelPopup>
  </div>
</template>

<script>
import ArticleList from './commponent/ArticleList.vue'
import EditChannelPopup from './commponent/EditChannelPopup.vue'
import {
  getMyChannels,
  getMyChannelsByLocal,
  setMyChannelsByLocal,
  delMyChannel,
  addMyChannel
} from '@/api'
export default {
  data () {
    return {
      active: 0,
      myChannels: []
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getMyChannels()
  },
  methods: {
    async getMyChannels () {
      try {
        if (!this.isLogin) {
          const mychannels = getMyChannelsByLocal()
          if (mychannels) {
            this.myChannels = mychannels
          } else {
            const { data } = await getMyChannels()
            this.myChannels = data.data.channels
          }
        } else {
          const { data } = await getMyChannels()
          this.myChannels = data.data.channels
        }
      } catch (e) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    showPopup () {
      this.$refs.popup.isShow = true
    },
    changeActive (active) {
      this.active = active
    },
    async delMyChannel (id) {
      // console.log(id)
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setMyChannelsByLocal(this.myChannels)
      } else {
        try {
          await delMyChannel(id)
        } catch (e) {
          return this.$toast.fail('删除失败')
        }
      }
      this.$toast.success('删除成功')
    },
    async addMyChannel (channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        setMyChannelsByLocal(this.myChannels)
      } else {
        try {
          await addMyChannel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加失败')
        }
      }
      this.$toast.success('添加成功')
    }
  },
  components: {
    ArticleList,
    EditChannelPopup
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 277.5px;
    height: 32px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 33px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 100px;
      height: 41px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 15.5px;
      height: 3px;
      background-color: #3296fa;
      bottom: 20px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  width: 33px;
  height: 41px;
  font-size: 20px;
  line-height: 41px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
//头部固定
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 46px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 46px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 46px - 41px - 50px);
  overflow: auto;
}
</style>

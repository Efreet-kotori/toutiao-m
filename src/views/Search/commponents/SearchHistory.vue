<template>
  <div>
    <van-list>
      <van-cell title="搜索历史">
        <template #default>
          <div v-if="isShow" @click="isShow = !isShow">
            <span class="toutiao toutiao-shanchu"></span>
          </div>
          <div v-else>
            <span @click="delList">全部删除 </span>
            <span @click="isShow = !isShow">完成</span>
          </div>
        </template>
      </van-cell>
      <van-cell v-for="(item, index) in [...new Set(this.arr)]" :key="index">
        <template #title>
          <span @click="goResults(item)">{{ item }}</span>
        </template>
        <template #default>
          <van-icon v-if="!isShow" name="close" @click="delList(item)" />
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    keywords: {
      type: String,
      required: true
    },
    arr: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShow: true
    }
  },

  methods: {
    delList (item) {
      this.$emit('delList', item)
    },
    goResults (item) {
      this.$emit('goResults', item)
    }
  }
}
</script>

<style></style>

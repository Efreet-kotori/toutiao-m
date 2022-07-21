<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPage"
        :immediate-check="true"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请重新加载"
      >
        <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false,
      page: 2
    }
  },
  created () {
    this.getSearchResult()
  },
  methods: {
    async getSearchResult () {
      try {
        const { data } = await getSearchResult(this.keywords)
        console.log(data)
        this.list = data.data.results
        console.log(this.list)
      } catch (error) {
        this.$toast.fail('暂无数据')
      }
    },

    async loadNextPage () {
      try {
        const { data } = await getSearchResult(this.keywords, this.page)

        if (data.data.results.length === 0) {
          this.finished = true
        }
        if (this.refreshLoading) {
          this.list.unshift(...data.data.results)
        } else {
          this.list.push(...data.data.results)
        }
        this.page++
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>

<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
      />
    </form>

    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component
      :is="componentName"
      :keywords="keywords"
      :arr="arr"
      @delList="delList"
      @goResults="goResults"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './commponents/SearchHistory.vue'
import SearchResult from './commponents/SearchResult.vue'
import SearchSuggestion from './commponents/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      keywords: '',
      isShowSearchResults: false,
      arr: []
    }
  },
  computed: {
    componentName () {
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  created () {
    const data = localStorage.getItem('HEIMA_TOUTIAO_HISTORY')
    if (data) {
      this.arr.push(...JSON.parse(data))
    }
  },
  methods: {
    onSearch (val) {
      if (this.arr.indexOf(this.keywords)) {
        this.arr.push(this.keywords)
        const data = JSON.stringify(this.arr)
        localStorage.setItem('HEIMA_TOUTIAO_HISTORY', data)
      }
      this.isShowSearchResults = true
    },
    backToPrePage () {
      this.$router.back()
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    },
    delList (i) {
      if (i.isTrusted) {
        this.arr = []
      } else {
        this.arr = this.arr.filter((item) => {
          return item !== i
        })
      }
      const data = JSON.stringify(this.arr)
      localStorage.setItem('HEIMA_TOUTIAO_HISTORY', data)
    },
    goResults (item) {
      this.keywords = item
      this.onSearch()
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>

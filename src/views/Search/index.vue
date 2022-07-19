<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        v-model="keywords"
        show-action
        background="skyblue"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPrePage"
        @focus="visibleSearchSuggestion"
      />
    </form>

    <!-- <SearchHistory />
    <SearchResult />
    <SearchSuggestion /> -->
    <component :is="componentName" :keywords="keywords"></component>
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
      isShowSearchResults: false
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
  methods: {
    onSearch (val) {
      this.isShowSearchResults = true
      this.$toast(val)
    },
    backToPrePage () {
      this.$router.back()
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    }
  }
}
</script>

<style></style>

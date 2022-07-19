<template>
  <div>
    <van-cell v-for="(item, index) in highlightDate" :key="index" icon="search">
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchList: []
    }
  },

  watch: {
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    async getSearchSuggestion () {
      try {
        const { data } = await getSearchSuggestion(this.keywords)
        if (
          (data.data.options.length === 1 && data.data.options[0] === null) ||
          data.data.options.length === 0
        ) {
          this.searchList = []
          this.$toast.fail('搜索建议暂无')
        } else {
          this.searchList = data.data.options.filters(Boolean)
        }
        // console.log(this.searchList)
      } catch (error) {
        this.$toast.fail('请输入正确的搜索内容')
      }
    }
  },
  computed: {
    highlightDate () {
      const reg = new RegExp(this.keywords, 'ig')
      return this.searchList.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style></style>

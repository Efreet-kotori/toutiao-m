import request from '@/utils/request'

/**
 *
 * @param {*} q 搜索的关键词
 * @returns promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

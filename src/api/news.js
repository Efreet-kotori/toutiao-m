import request from '@/utils/request'
/**
 *
 * @param {*} channelId 频道id
 * @param {*} timestamp 获取第一页文章
 * @returns
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 所有频道
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 *
 * @param {*} target 删除用户频道的id
 * @returns
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 *
 * @param {Number} id 频道id
 * @param {Number} seq 添加频道的索引下标
 * @returns
 */
export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels/',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'

export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelsByLocal = (channels) =>
  storage.set(HEIMA_TOUTIAO_CHANNELS, channels)

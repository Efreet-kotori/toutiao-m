// 本地存储
class Storage {
  set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
  // JSON.parse(localStorage.getItem('HEIMA_TOUTIAO_TOKEN')) || {}

  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (e) {
      return value
    }
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}

const storage = new Storage()
export default storage

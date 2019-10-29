// 在这里面写关于设置本地存储等的函数
const KEY = 'HM-TOUTIAO'
const login = {
  setuser (msg) {
    msg = JSON.stringify(msg)
    window.sessionStorage.setItem(KEY, msg)
  },
  getuser () {
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  removeuser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default login

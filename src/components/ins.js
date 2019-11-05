import MyBread from '@/components/index.vue'
import mychannel from '@/components/my-channel.vue'
import myimages from '@/components/my-images.vue'
export default {
  install (Vue) {
    Vue.component('my-mb', MyBread)
    Vue.component('my-channel', mychannel)
    Vue.component('my-images', myimages)
  }
}

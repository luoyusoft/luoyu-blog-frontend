import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import 'view-design/dist/styles/iview.css'
import '@/common/stylus/index.styl'
import App from './App.vue'
import httpRequest from '@/utils/httpRequest'

// iView UI 组件引入
import {
  Row,
  Col,
  Button,
  Progress,
  Tag,
  Icon,
  Affix,
  Rate,
  Modal,
  Message,
  Form,
  FormItem,
  Input,
  Notice,
  Carousel,
  CarouselItem,
  Menu,
  MenuItem,
  Submenu,
  Drawer,
  Divider,
  Spin,
  BackTop
} from 'view-design'

import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

require('@/common/stylus/my-video.css')

Vue.component('iv-row', Row)
Vue.component('iv-col', Col)
Vue.component('iv-button', Button)
Vue.component('iv-progress', Progress)
Vue.component('iv-tag', Tag)
Vue.component('iv-icon', Icon)
Vue.component('iv-affix', Affix)
Vue.component('iv-rate', Rate)
Vue.component('iv-modal', Modal)
Vue.component('iv-form', Form)
Vue.component('iv-form-item', FormItem)
Vue.component('iv-input', Input)
Vue.component('iv-carousel', Carousel)
Vue.component('iv-carousel-item', CarouselItem)
Vue.component('iv-menu', Menu)
Vue.component('iv-menu-item', MenuItem)
Vue.component('iv-submenu', Submenu)
Vue.component('iv-drawer', Drawer)
Vue.component('iv-divider', Divider)
Vue.component('iv-spin', Spin)
Vue.component('iv-back-top', BackTop)

Vue.prototype.$http = httpRequest // Ajax 请求方法
Vue.prototype.$Modal = Modal
Vue.prototype.$Message = Message
Vue.prototype.$Notice = Notice
Vue.prototype.$loadScript = (script, url, callback) => {
  script = script || document.createElement('script')
  if (script.readyState) {
    // IE浏览器
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    // 其他浏览器
    script.onload = function () {
      callback()
    }
  }
  script.src = url
  document.getElementsByTagName('head')[0].appendChild(script)
}
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.$Notice.config({
  top: 70,
  duration: 3
})
let vm = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})

Vue.use(VideoPlayer)

Vue.use({
  vm
})

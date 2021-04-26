import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'view-design'
import Index from '@/components/index/Index'
import store from '@/store'

// 公共区域
// import CommonHeader from '@/components/header/CommonHeader';
import SimpleHeader from '@/components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '@/components/footer/CommonFooter'

// 首页
import HomeContent from '@/components/content/HomeContent'
import ArticleContent from '@/components/content/ArticleContent'
import ArticleListContent from '@/components/content/ArticleListContent'
import TimeLineContent from '@/components/content/TimeLineContent'
import SearchResultContent from '@/components/content/SearchResultContent'
import VideoContent from '@/components/content/VideoContent'
import VideoListContent from '@/components/content/VideoListContent'
import ChatContent from '@/components/content/ChatContent'
import AboutContent from '@/components/content/AboutContent'
import FriendLinkContent from '@/components/content/FriendLinkContent'
import MessageWallContent from '@/components/content/MessageWallContent'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 解决第一次重定向报错问题
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

let router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: HomeContent,
            footer: CommonFooter
          },
          meta: {
            title: 'LuoYu\'s Blog'
          }
        },
        {
          path: 'article/:articleId',
          name: 'article',
          components: {
            header: SimpleHeader,
            content: ArticleContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章 | LuoYu\'s Blog'
          }
        },
        {
          path: 'articles',
          name: 'articles',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章 | LuoYu\'s Blog'
          }
        },
        {
          path: 'search',
          name: 'search',
          components: {
            header: SimpleHeader,
            content: SearchResultContent,
            footer: CommonFooter
          },
          meta: {
            title: '搜索 | LuoYu\'s Blog'
          }
        },
        {
          path: 'video/:videoId',
          name: 'video',
          components: {
            header: SimpleHeader,
            content: VideoContent,
            footer: CommonFooter
          },
          meta: {
            title: '视频 | LuoYu\'s Blog'
          }
        },
        {
          path: 'videos',
          name: 'videos',
          components: {
            header: SimpleHeader,
            content: VideoListContent,
            footer: CommonFooter
          },
          meta: {
            title: '视频 | LuoYu\'s Blog'
          }
        },
        {
          path: 'chat',
          name: 'chat',
          components: {
            header: SimpleHeader,
            content: ChatContent,
            footer: CommonFooter
          },
          meta: {
            title: '聊天室 | LuoYu\'s Blog'
          }
        },
        {
          path: 'friendlink',
          name: 'friendlink',
          components: {
            header: SimpleHeader,
            content: FriendLinkContent,
            footer: CommonFooter
          },
          meta: {
            title: '友链 | LuoYu\'s Blog'
          }
        },
        {
          path: 'timeline',
          name: 'timeline',
          components: {
            header: SimpleHeader,
            content: TimeLineContent,
            footer: CommonFooter
          },
          meta: {
            title: '时光轴 | LuoYu\'s Blog'
          }
        },
        {
          path: 'about',
          name: 'about',
          components: {
            header: SimpleHeader,
            content: AboutContent,
            footer: CommonFooter
          },
          meta: {
            title: '关于 | LuoYu\'s Blog'
          }
        },
        {
          path: 'messagewall',
          name: 'messagewall',
          components: {
            header: SimpleHeader,
            content: MessageWallContent,
            footer: CommonFooter
          },
          meta: {
            title: '留言墙 | LuoYu\'s Blog'
          }
        }
      ]
    }
  ]
})

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  store.commit('loadStatus', true)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  store.commit('loadStatus', false)
  window.scrollTo(0, 0)
})

export default router

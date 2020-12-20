import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'view-design'
import Index from '@/components/index/Index'

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
import ChatLoginContent from '@/components/content/ChatLoginContent'

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
            title: 'LuoYu Blog'
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
            title: '文章 | LuoYu Blog'
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
            title: '文章列表 | LuoYu Blog'
          }
        },
        {
          path: 'articles/category/:id',
          name: 'articles/category',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '文章列表 | LuoYu Blog'
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
            title: '搜索 | LuoYu Blog'
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
            title: '视频 | LuoYu Blog'
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
            title: '视频列表 | LuoYu Blog'
          }
        },
        {
          path: 'chat/login',
          name: 'chat/login',
          components: {
            header: SimpleHeader,
            content: ChatLoginContent,
            footer: CommonFooter
          },
          meta: {
            title: '聊天室登录 | LuoYu Blog'
          }
        },
        {
          path: 'chat/:userId',
          name: 'chat',
          components: {
            header: SimpleHeader,
            content: ChatContent,
            footer: CommonFooter
          },
          meta: {
            title: '聊天室 | LuoYu Blog'
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
            title: '时光轴 | LuoYu Blog'
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
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router

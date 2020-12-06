import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'iview'
import Index from '@/components/index/Index'

// 公共区域
// import CommonHeader from '@/components/header/CommonHeader';
import SimpleHeader from '@/components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '@/components/footer/CommonFooter'

// 首页
import HomeContent from '@/components/content/HomeContent'
import ArticleContent from '@/components/content/ArticleContent'
import BookNoteContent from '@/components/content/BookNoteContent'
import BookContent from '@/components/content/BookContent'
import ArticleListContent from '@/components/content/ArticleListContent'
import BookListContent from '@/components/content/BookListContent'
import TimeLineContent from '@/components/content/TimeLineContent'
import SearchResultContent from '@/components/content/SearchResultContent'

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
            title: '博文列表 | LuoYu Blog'
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
            title: '博文列表 | LuoYu Blog'
          }
        },
        {
          path: 'articles/search',
          name: 'search',
          components: {
            header: SimpleHeader,
            content: SearchResultContent,
            footer: CommonFooter
          },
          meta: {
            title: '博文搜索 | LuoYu Blog'
          }
        },
        {
          path: 'bookNote/:bookNoteId',
          name: 'bookNote',
          components: {
            header: SimpleHeader,
            content: BookNoteContent,
            footer: CommonFooter
          }
        },
        {
          path: 'book/:bookId',
          name: 'book',
          components: {
            header: SimpleHeader,
            content: BookContent,
            footer: CommonFooter
          }
        },
        {
          path: 'books',
          name: 'books',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | LuoYu Blog'
          }
        },
        {
          path: 'books/category/:id',
          name: 'books/category',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | LuoYu Blog'
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
            title: '时间轴 | LuoYu Blog'
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

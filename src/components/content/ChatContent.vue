<template>
  <div class="chat-content" v-cloak>
    <iv-spin v-if="!isReadySuccess" fix>
      <iv-icon type="ios-loading" size=35 class="demo-spin-icon-load" style="color: #1e1f21"></iv-icon>
      <div style="color: #1e1f21">Loading</div>
    </iv-spin>
    <div class="layout-left">
      <chat-page-header></chat-page-header>
      <chat-page-content ref="chat"></chat-page-content>
    </div>
  </div>
</template>

<script>
import ChatPageContent from '@/components/views/Chat/ChatPageContent'
import ChatPageHeader from '@/components/views/Chat/ChatPageHeader'

export default {
  data () {
    return {
      // 定时器
      timer: null,
      isReadySuccess: false
    }
  },
  created () {
    const that = this
    that.timer = setInterval(function () {
      if (document.readyState === 'complete') {
        that.isReadySuccess = true
        window.clearInterval(that.timer)
      }
    }, 500)
  },
  components: {
    'chat-page-content': ChatPageContent,
    'chat-page-header': ChatPageHeader
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.chat.logout()
    next()
  },
  methods: {
    addCodeLineNumber () {
      // 添加行号
      let blocks = this.$refs.article.querySelectorAll('pre code')
      blocks.forEach((block) => {
        window.hljs.highlightBlock(block)
        // 去前后空格并添加行号
        block.innerHTML = '<ul><li>' + block.innerHTML.replace(/(^\s*)|(\s*$)/g, '').replace(/\n/g, '\n</li><li>') + '\n</li></ul>'
      })
    },
    refreshDiectory () {
      /* eslint-disable*/
      new TOC('article-main-page', {
        'level': 5,
        'top': 200,
        'class': 'list',
        'targetId': 'side-toc'
      })
      /* eslint-disable */
      new TocScrollSpy('article-main-page', 'side-toc', {
        'spayLevel': 5,
        'articleMarginTop': 0
      })
    },
    refreshMobileDirectory () {
      /* eslint-disable */
      new TOC('article-main-page', {
        'level': 5,
        'top': 200,
        'class': 'list',
        'targetId': 'sidebar-toc'
      })
      new TocScrollSpy('article-main-page', 'sidebar-toc', {
        'spayLevel': 5,
        'articleMarginTop': 15
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.chat-content
  width auto
  @media only screen and (max-width: 768px)
    margin 5px 5px 10px 5px
  @media screen and (min-width: 768px)
    margin 11px 10px 20px 10px
  @media screen and (min-width: 992px)
    margin 11px 35px 50px 35px
  @media screen and (min-width: 1200px)
    width 1200px
    margin 11px auto 0
  .layout-left, .layout-right
    padding 0
    @media only screen and (max-width: 768px)
      padding 0
    @media screen and (min-width: 768px)
      padding 0
    @media screen and (min-width: 992px)
      padding 0 10px
    @media screen and (min-width: 1200px)
      padding 0 10px
</style>

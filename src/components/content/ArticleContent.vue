<template>
  <div class="article-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="margin-bottom: 50px;">
          <article-page-header :article="article"></article-page-header>
          <article-page-content>
            <article id="article-main-page" class="typo container" slot="content" ref="article"
                     v-html="article.contentFormat">
            </article>
<!--            <mavon-editor-->
<!--              slot="content"-->
<!--              v-model="article.content"-->
<!--              style="z-index:1"-->
<!--              class="md"-->
<!--              :subfield="false"-->
<!--              :defaultOpen="'preview'"-->
<!--              :toolbarsFlag="false"-->
<!--              :editable="false"-->
<!--              :scrollStyle="true"-->
<!--              :boxShadow="false"-->
<!--            />-->
          </article-page-content>
          <article-page-footer :postId="article.id"></article-page-footer>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend :module=0></recommend>
          <iv-affix :offset-top="50">
            <side-toc style="margin-top: 15px;"></side-toc>
          </iv-affix>
        </div>
      </iv-col>
    </iv-row>
    <iv-modal v-model="spinShow" :closable="false" :mask-closable="false" cancel-text="返回" @on-ok="getArticle" @on-cancel="goBack">
      <p slot="header" style="color:black;text-align:center">
        <span>校验密码查看文章内容</span>
      </p>
      <div style="text-align:center">
        <iv-input type="text" placeholder="请输入密码" v-model="password"></iv-input>
      </div>
    </iv-modal>
  </div>
</template>
<script type="text/ecmascript-6">
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import About from '@/components/views/About'
import SideToc from '@/components/views/SideToc'
import Recommend from '@/components/views/Recommend'
import TOC from '@/common/js/MarkdownToc'
// TOC滚动监听
import TocScrollSpy from '@/common/js/TocScrollSpy'
import MavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  data () {
    return {
      article: {},
      spinShow: true,
      password: ''
    }
  },
  components: {
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'about': About,
    'side-toc': SideToc,
    'recommend': Recommend,
    'mavon-editor': MavonEditor.mavonEditor
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
    goBack () {
      this.spinShow = false
      this.$router.go(-1)
    },
    getArticle () {
      let params = {
        password: this.password
      }
      this.$http.getArticle(this.$route.params.articleId, params).then((response) => {
        if (response && response.code === 200) {
          this.article = response.data
          // 更新目录、高亮代码
          this.$nextTick(function () {
            this.addCodeLineNumber()
            this.refreshDiectory()
            this.refreshMobileDirectory()
            document.title = this.article.title + ' | Jinhx'
          })
        } else {
          this.spinShow = true
        }
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
  .article-content
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

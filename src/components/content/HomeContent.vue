<template>
  <div class="home-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <div class="layout-left">
          <a href="https://luoyublog.com"><img height="100%" width="100%" :src="imgUrl"></a>
<!--          <section-title :mainTitle="'文章'" :subTitle="'Articles'" :tipText="'View More'" :tipHref="'/articles'">-->
<!--            <title-menu-filter @filterByMenu="refreshArticle"  slot="menu" :menu-filter-list="articleDefaultFilterList"></title-menu-filter>-->
<!--          </section-title>-->
<!--          <article-list-cell v-for="article in articleList" :article="article" :key="article.title" :type="'article'"></article-list-cell>-->
<!--          <section-title :mainTitle="'阅读'" :subTitle="'Books'" :tipText="'View More'" :tipHref="'/books'">-->
<!--            <title-menu-filter @filterByMenu="refreshBook"  slot="menu"></title-menu-filter>-->
<!--          </section-title>-->
<!--          <book-list-cell v-for="book in bookList" :book="book" :key="book.title" :type="'book'"></book-list-cell>-->
<!--          <section-title :mainTitle="'笔记'" :subTitle="'Notes'" :tipText="'View More'" :tipHref="'/books'">-->
<!--            <title-menu-filter @filterByMenu="refreshBookNote"  slot="menu" :menu-filter-list="bookNoteFilterList"></title-menu-filter>-->
<!--          </section-title>-->
<!--          <book-note-list-cell v-for="bookNote in bookNoteList" :bookNote="bookNote" :key="bookNote.title"></book-note-list-cell>-->
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <about></about>
<!--          <recommend></recommend>-->
<!--          <hot-read></hot-read>-->
          <friend-links style="margin-top:15px;"></friend-links>
<!--          <tag-wall :type=0 style="margin-top: 15px;"></tag-wall>-->
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import BookNoteListCell from '@/components/views/BookNote/BookNoteListCell'
import BookListCell from '@/components/views/Book/BookListCell'
import SectionTitle from '@/components/views/SectionTitle/SectionTitle'
import TitleMenuFilter from '@/components/views/SectionTitle/TitleMenuFilter'
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle'
import ArchiveListCell from '@/components/views/Archive/ArchiveListCell'
import About from '@/components/views/About'
import FriendLinks from '@/components/views/FriendLinks'
import TagWall from '@/components/views/TagWall'
import Recommend from '@/components/views/Recommend'
import HotRead from '@/components/views/HotRead'
import SideToc from '@/components/views/SideToc'
import merge from 'lodash/merge' // 合并对象工具
import {ArticleDefaultFilterList, DefaultLimitSize} from '@/common/js/const'
export default {
  data () {
    return {
      imgUrl: '/static/img/home.jpg',
      articleList: [],
      bookNoteList: [],
      bookList: [],
      articleDefaultFilterList: ArticleDefaultFilterList,
      pageParam: {
        page: 1,
        limit: DefaultLimitSize
      },
      bookNoteFilterList: JSON.parse(JSON.stringify(ArticleDefaultFilterList))
    }
  },
  components: {
    'article-list-cell': ArticleListCell,
    'book-note-list-cell': BookNoteListCell,
    'book-list-cell': BookListCell,
    'section-title': SectionTitle,
    'title-menu-filter': TitleMenuFilter,
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent,
    'archive-list-time-title': ArchiveListTimeTitle,
    'archive-list-cell': ArchiveListCell,
    'about': About,
    'friend-links': FriendLinks,
    'side-toc': SideToc,
    'tag-wall': TagWall,
    'recommend': Recommend,
    'hot-read': HotRead
  },
  created: function () {
    let param = {}
    param.latest = true
    this.refreshArticle(param)
    // this.refreshBook(param)
    // this.refreshBookNote(param)
  },
  methods: {
    refreshArticle (param) {
      if (param.hasOwnProperty('latest')) {
        param.like = false
        param.read = false
      } else if (param.hasOwnProperty('like')) {
        param.latest = false
        param.read = false
      } else if (param.hasOwnProperty('read')) {
        param.like = false
        param.latest = false
      }
      let params = merge(param, this.pageParam)
      this.$http({
        url: this.$http.adornUrl('/articles?categoryId=&'),
        params: this.$http.adornParams(params, false),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          this.articleList = response.data.list
        }
      })
    },
    refreshBook (param) {
      let params = merge(param, this.pageParam)
      this.$http({
        url: this.$http.adornUrl('/books'),
        params: this.$http.adornParams(params, false),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          this.bookList = response.data.list
          this.bookList.forEach(book => {
            book.coverType = 2
          })
        }
      })
    },
    refreshBookNote (param) {
      let params = merge(param, this.pageParam, false)
      this.$http({
        url: this.$http.adornUrl('/bookNotes'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          this.bookNoteList = response.data.list
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .home-content
    display: table-cell
    vertical-align: middle
    text-align: center
    width auto
    @media only screen and (max-width: 768px)
      margin 5px 5px 10px 5px
    @media screen and (min-width: 768px)
      margin 10px 10px 20px 10px
    @media screen and (min-width: 992px)
      margin 15px 35px 50px 35px
    @media screen and (min-width: 1200px)
      width 1200px
      margin 15px auto 0
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

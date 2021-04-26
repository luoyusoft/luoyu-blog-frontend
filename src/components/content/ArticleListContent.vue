<template>
  <div class="article-list-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="margin-bottom: 50px;">
          <article-list-header v-if="categoryList.length>0" @filterByMenu="filterByMenu"
                               @filterByCategory="filterByCategory"
                               :categorys="categoryList"
                               :defaultCategory="selected_category"
                               :mainTitle="'文章'" :sub-title="'随便读读'" ></article-list-header>
          <article-list-cell v-for="article in articleList" :article="article" :key="article.id"></article-list-cell>
          <browse-more @browseMore="browseMore" :noMoreData="noMoreData" ref="browseMore"></browse-more>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend :module=0></recommend>
          <tag-wall :module=0 style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import ArticleListHeader from '@/components/views/Article/ArticleListHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
import merge from 'lodash/merge'
import {treeDataTranslate} from '@/utils'
export default {
  data () {
    return {
      articleList: [],
      categoryList: [],
      selected_category: this.$route.query.categoryId,
      currentPage: 1,
      pageSize: 15,
      categoryId: this.$route.query.categoryId,
      menuParams: {
        latest: true
      },
      noMoreData: false
    }
  },
  created () {
    this.listArticle()
    this.listCategory()
  },
  methods: {
    listArticle () {
      let params = {
        categoryId: this.categoryId,
        limit: this.pageSize,
        page: this.currentPage
      }
      params = merge(params, this.menuParams)
      if (params.hasOwnProperty('latest')) {
        params.like = false
        params.read = false
      } else if (params.hasOwnProperty('like')) {
        params.latest = false
        params.read = false
      } else if (params.hasOwnProperty('read')) {
        params.like = false
        params.latest = false
      }
      this.$http({
        url: this.$http.adornUrl('/articles'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          if (response.data.totalPage <= response.data.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.articleList = response.data.list
        }
      })
    },
    listCategory () {
      let params = {}
      params.module = 0
      this.$http({
        url: this.$http.adornUrl('/operation/categories'),
        method: 'get',
        params: this.$http.adornParams(params)
      }).then((response) => {
        if (response && response.code === 200) {
          this.categoryList = treeDataTranslate(response.data)
        }
      })
    },
    filterByMenu (params) {
      this.resetCurrentPage()
      this.menuParams = params
      this.listArticle()
    },
    filterByCategory (params) {
      this.resetCurrentPage()
      this.categoryId = params
      this.listArticle()
    },
    resetCurrentPage () {
      this.currentPage = 1
    },
    browseMore () {
      this.currentPage++
      let params = {
        categoryId: this.categoryId,
        limit: this.pageSize,
        page: this.currentPage
      }
      params = merge(params, this.menuParams)
      if (params.hasOwnProperty('latest')) {
        params.like = false
        params.read = false
      } else if (params.hasOwnProperty('like')) {
        params.latest = false
        params.read = false
      } else if (params.hasOwnProperty('read')) {
        params.like = false
        params.latest = false
      }
      this.$http({
        url: this.$http.adornUrl('/articles'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          if (response.data.totalPage <= response.data.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.articleList = this.articleList.concat(response.data.list)
        }
      }).then(response => {
        this.$refs.browseMore.stopLoading()
      }).catch(error => {
        this.$refs.browseMore.stopLoading()
        console.log(error)
      })
    }
  },
  components: {
    'article-list-header': ArticleListHeader,
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'article-list-cell': ArticleListCell,
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .article-list-content
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
      margin-bottom 50px
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

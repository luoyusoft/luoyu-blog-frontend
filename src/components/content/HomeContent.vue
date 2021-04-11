5<template>
  <div class="home-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17" :xl="17">
        <div class="layout-left" style="margin-bottom: 50px;">
<!--          <a :href="'/'"><img height="100%" width="100%" :src="imgUrl"></a>-->
<!--          <section-title :mainTitle="'文章'" :subTitle="'Articles'" :tipText="'View More'" :tipHref="'/articles?page=&limit=&latest=&categoryId=&latest=true&like=false&read=false'">-->
<!--            <title-menu-filter @filterByMenu="refreshArticle"  slot="menu" :menu-filter-list="articleDefaultFilterList"></title-menu-filter>-->
<!--          </section-title>-->
          <iv-carousel autoplay loop :autoplay-speed="6000" arrow="always" class="carousel">
            <iv-carousel-item v-for="(item,index) in carouselArticleList" :key="index">
              <a :href="'/article/'+item.id" style="position: relative;">
                <img width="100%" :src="item.cover" :title="item.title" alt="" class="carousel-img custom-img">
<!--                <a :href="'/article/'+item.id" v-html="item.title" style="margin-top:10px;display:block;text-align:center">{{item.title}}</a>-->
                <span v-html="item.title" style="font-size:16px;color: #f7f9fe;width:90%;position: absolute; bottom: 150%; left: 5%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">item.title</span>
              </a>
            </iv-carousel-item>
          </iv-carousel>
<!--          <home-article-list-cell :homelArticleList="homelArticleList"></home-article-list-cell>-->
          <article-list-cell v-for="article in articleList" :article="article" :key="article.title" :type="'article'"></article-list-cell>
          <browse-more @browseMore="browseMore" :noMoreData="noMoreData" ref="browseMore"></browse-more>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <about></about>
<!--          <recommend></recommend>-->
          <hot-read style="margin-top: 15px;"></hot-read>
          <friend-links style="margin-top: 15px;"></friend-links>
<!--          <tag-wall :type=0 style="margin-top: 15px;"></tag-wall>-->
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import HomeArticleListCell from '@/components/views/Article/HomeArticleListCell'
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
import BrowseMore from '@/components/views/BrowseMore'
import SideToc from '@/components/views/SideToc'
import merge from 'lodash/merge' // 合并对象工具
import {ArticleDefaultFilterList, DefaultLimitSize} from '@/common/js/const'
export default {
  data () {
    return {
      imgUrl: '/static/img/home.jpg',
      articleList: [],
      carouselArticleList: [],
      homelArticleList: [],
      articleDefaultFilterList: ArticleDefaultFilterList,
      pageParam: {
        page: 1,
        limit: DefaultLimitSize
      },
      noMoreData: false
    }
  },
  components: {
    'article-list-cell': ArticleListCell,
    'home-article-list-cell': HomeArticleListCell,
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
    'hot-read': HotRead,
    'browse-more': BrowseMore
  },
  created: function () {
    let param = {}
    param.latest = true
    this.refreshArticle(param)
  },
  methods: {
    browseMore () {
      this.pageParam.page++
      let params = {
        limit: this.pageParam.limit,
        page: this.pageParam.page,
        latest: true,
        like: false,
        read: false
      }
      this.$http({
        url: this.$http.adornUrl('/articles?categoryId=&'),
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
    },
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
          // for (let i = 0; i < 3; i++) {
          //   this.homelArticleList.push(this.articleList.shift())
          // }
        }
      })
      this.$http({
        url: this.$http.adornUrl('/operation/recommends'),
        method: 'get',
        params: this.$http.adornParams({
          'module': 0
        })
      }).then((response) => {
        if (response && response.code === 200) {
          this.carouselArticleList = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .custom-img{
    -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
    filter: brightness(100%);
    opacity: 1;
  }
  .custom-img:hover {
    -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
    filter: brightness(95%);
    opacity: 0.95;
  }
  .home-content
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
  .carousel
    @media only screen and (max-width: 499px)
      height 270px
    @media screen and (min-width: 500px)
      height 480px
  .carousel-img
    @media only screen and (max-width: 499px)
      height 220px
    @media screen and (min-width: 500px)
      height 450px
</style>

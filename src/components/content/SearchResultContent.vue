<template>
  <div class="article-list-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <section-title :mainTitle="'搜索关键字'" :subTitle="'\'' + this.$route.query.keyword + '\''"> </section-title>
        <section-title :mainTitle="'文章'" :subTitle="'Articles'" :tipText="'View More'" :tipHref="'/articles?page=&limit=&latest=&categoryId=&latest=true&like=false&read=false'"></section-title>
        <article-list-cell v-for="article in articleList" :article="article" :key="article.createTime"></article-list-cell>
        <div v-if="noArticle">暂无相关文章</div>

        <section-title :mainTitle="'视频'" :subTitle="'Videos'" :tipText="'View More'" :tipHref="'/videos?page=&limit=&latest=&categoryId=&latest=true&like=false&watch=false'"></section-title>
        <video-list-cell v-for="video in videoList" :video="video" :key="video.createTime"></video-list-cell>
        <div v-if="noVideo" style="clear: both">暂无相关视频</div>
      </iv-col>
<!--      <iv-col :xs="0" :sm="0" :md="0" :lg="7">-->
<!--        <div class="layout-right">-->
<!--          <recommend :type=0></recommend>-->
<!--          <tag-wall :type=0 style="margin-top: 15px;"></tag-wall>-->
<!--        </div>-->
<!--      </iv-col>-->
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
// mixin
import {mixin} from '@/utils'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import ArticleListCell from '@/components/views/Article/ArticleListCell'
import VideoListCell from '@/components/views/Video/VideoListCell'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import SectionTitle from '@/components/views/SectionTitle/SectionTitle'
export default {
  data () {
    return {
      articleList: [],
      videoList: [],
      noArticle: false,
      noVideo: false
    }
  },
  mixins: [mixin],
  created () {
    this.listSearch()
  },
  methods: {
    listSearch () {
      this.$http({
        url: this.$http.adornUrl('/search'),
        type: 'get',
        params: this.$http.adornParams({keyword: this.$route.query.keyword})
      }).then((response) => {
        if (response && response.code === 200) {
          this.articleList = response.data.articleList
          this.videoList = response.data.videoList
          if (this.articleList.length < 1) {
            this.noArticle = true
          }
          if (this.videoList.length < 1) {
            this.noVideo = true
          }
        }
      })
    }
  },
  components: {
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'article-list-cell': ArticleListCell,
    'video-list-cell': VideoListCell,
    'recommend': Recommend,
    'tag-wall': TagWall,
    'section-title': SectionTitle
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";
  .article-list-content
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

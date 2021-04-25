<template>
  <div class="video-list-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="margin-bottom: 50px;">
          <video-list-header v-if="categoryList.length>0" @filterByMenu="filterByMenu"
                               @filterByCategory="filterByCategory"
                               :categorys="categoryList"
                               :defaultCategory="selected_category"
                               :mainTitle="'视频列表'" :sub-title="'随便看看'" ></video-list-header>
          <video-list-cell v-for="video in videoList" :video="video" :key="video.id"></video-list-cell>
          <browse-more style="clear: both" @browseMore="browseMore" :noMoreData="noMoreData"  ref="browseMore"></browse-more>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend :module=1></recommend>
          <tag-wall :module=1 style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import VideoListHeader from '@/components/views/Video/VideoListHeader'
import VideoPageContent from '@/components/views/Video/VideoPageContent'
import VideoPageFooter from '@/components/views/Video/VideoPageFooter'
import VideoListCell from '@/components/views/Video/VideoListCell'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'
import BrowseMore from '@/components/views/BrowseMore'
import merge from 'lodash/merge'
import {treeDataTranslate} from '@/utils'

export default {
  data () {
    return {
      videoList: [],
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
    this.listVideo()
    this.listCategory()
  },
  methods: {
    listVideo () {
      let params = {
        categoryId: this.categoryId,
        limit: this.pageSize,
        page: this.currentPage
      }
      params = merge(params, this.menuParams)
      if (params.hasOwnProperty('latest')) {
        params.like = false
        params.watch = false
      } else if (params.hasOwnProperty('like')) {
        params.latest = false
        params.watch = false
      } else if (params.hasOwnProperty('watch')) {
        params.like = false
        params.latest = false
      }
      this.$http({
        url: this.$http.adornUrl('/videos'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          if (response.data.totalPage <= response.data.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.videoList = response.data.list
        }
      })
    },
    listCategory () {
      let params = {}
      params.module = 1
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
      this.listVideo()
    },
    filterByCategory (params) {
      this.resetCurrentPage()
      this.categoryId = params
      this.listVideo()
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
        params.watch = false
      } else if (params.hasOwnProperty('like')) {
        params.latest = false
        params.watch = false
      } else if (params.hasOwnProperty('watch')) {
        params.like = false
        params.latest = false
      }
      this.$http({
        url: this.$http.adornUrl('/videos'),
        params: this.$http.adornParams(params),
        method: 'get'
      }).then((response) => {
        if (response && response.code === 200) {
          if (response.data.totalPage <= response.data.currPage) {
            this.noMoreData = true
          } else {
            this.noMoreData = false
          }
          this.videoList = this.videoList.concat(response.data.list)
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
    'video-list-header': VideoListHeader,
    'video-page-content': VideoPageContent,
    'video-page-footer': VideoPageFooter,
    'video-list-cell': VideoListCell,
    'recommend': Recommend,
    'tag-wall': TagWall,
    'browse-more': BrowseMore
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.video-list-content
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

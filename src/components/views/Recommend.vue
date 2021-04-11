<template>
  <div class="recommend">
    <panel :title="title">
      <div slot="content" class="content">
        <div class="top" v-if="topRecommend">
          <a :href="'/' + topRecommend.uri + '/' + topRecommend.linkId">
            <p class="title">{{topRecommend.title | textLineBreak(20)}}</p>
            <div class="tags">
              <iv-tag  :color="tag.id | mapTagColor" v-for="(tag) in topRecommend.tagList" :key="tag.id">{{tag.name}}</iv-tag>
            </div>
            <p class="info">
              <span class="time">{{topRecommend.createTime | socialDate}}</span>
              <span class="likes" style="color: #878D99"><iv-icon type="md-thumbs-up"></iv-icon> {{topRecommend.likeNum}}</span>
<!--              <span class="comments"><a><iv-icon type="md-text"></iv-icon> {{topRecommend.commentNum}} </a></span>-->
              <span class="readings" style="color: #878D99" v-if="module === 0"><iv-icon type="md-eye"></iv-icon> {{topRecommend.readNum}}</span>
              <span class="readings" style="color: #878D99" v-if="module === 1"><iv-icon type="md-eye"></iv-icon> {{topRecommend.watchNum}}</span>
            </p>
            <!--<div class="img">-->
              <!--<img :src="topRecommend.cover" alt="">-->
            <!--</div>-->
<!--            <p class="desc">{{topRecommend.description | textLineBreak(60)}}</p>-->
          </a>
        </div>
        <ul class="others">
          <li v-for="recommend in recommendList" :key="recommend.id">
            <a :href="'/' + recommend.uri + '/' +recommend.linkId">
              <p class="title">{{recommend.title | textLineBreak(20)}}</p>
              <p class="info">
                <span class="time">{{recommend.createTime | socialDate}}</span>
                <span class="likes" style="color: #878D99"><iv-icon type="md-thumbs-up"></iv-icon> {{recommend.likeNum}}</span>
<!--                <span class="comments"><a ><iv-icon type="md-text"></iv-icon> {{recommend.commentNum}} </a></span>-->
                <span class="readings" style="color: #878D99" v-if="module === 0"><iv-icon type="md-eye"></iv-icon> {{recommend.readNum}}</span>
                <span class="readings" style="color: #878D99" v-if="module === 1"><iv-icon type="md-eye"></iv-icon> {{recommend.watchNum}}</span>
              </p>
            </a>
          </li>
        </ul>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils/index'
import Panel from '@/components/utils/Panel'

export default {
  props: {
    module: Number
  },
  data () {
    return {
      recommendList: [],
      topRecommend: {},
      title: ''
    }
  },
  mixins: [mixin],
  created () {
    this.listRecommend()
  },
  methods: {
    listRecommend () {
      if (this.module === 0) {
        this.title = '推荐阅读'
      }
      if (this.module === 1) {
        this.title = '推荐观看'
      }
      this.$http({
        url: this.$http.adornUrl('/operation/recommends'),
        method: 'get',
        params: this.$http.adornParams({
          'module': this.module
        })
      }).then((response) => {
        if (response && response.code === 200) {
          this.recommendList = response.data
          this.recommendList.forEach(recommendListItem => {
            if (recommendListItem.module === 0) {
              recommendListItem.uri = 'article'
            }
            if (recommendListItem.module === 1) {
              recommendListItem.uri = 'video'
            }
          })
          this.topRecommend = this.recommendList.shift()
        }
      })
    }
  },
  components: {
    'panel': Panel
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .recommend
    .content
      padding 5px 20px
    .top, .others
      a
        display block
        overflow hidden
        .tags
          margin-bottom 10px
        .title
          text-align justify
          color $color-gradually-gray-81
          font-size 16px
          line-height 23px
          margin-bottom 5px
        .info
          margin 5px 0 0px
          span
            font-size 13px
            line-height 18px
            font-weight 100
            color $color-secondary-info
            + span
              float right
              margin-left 10px
          a
            display inline-block
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
        .img
          padding-bottom: 40%
          width: 100%
          height: 0
          margin 5px 0
          overflow hidden
          img
            width 100%
            transition: All 0.4s ease-in-out
            transform: scale(1.0)
            zoom: 1.0
        .desc
          text-align justify
          color $color-secondary-info
          font-size 13px
          line-height 20px
          margin 5px 0 0
        &:hover
          .title
            color $color-main-primary
          img
            transition: All 0.4s ease-in-out
            transform: scale(1.05)
            zoom: 1.05
    .others
      li
        list-style-type none
        margin-top 10px
        padding-top 10px
        border-top 1px solid $color-border

</style>

<template>
  <div class="video-cell">
    <iv-row >
      <iv-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-left: 0;padding-right: 0;">
        <a :href="'/video/'+video.id">
          <img height="150" width="120" :src="video.cover" alt="">
        </a>
        <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: center;line-height: 20px;width: 80%;margin-left: 10%;margin-top: 3px"><a :href="'/video/'+video.id" v-html="video.title" class="title">{{video.title}}</a></p>
        <p style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align: center;line-height: 15px;width: 80%;margin-left: 10%;font-size: 8px">（<a :href="'/video/'+video.id" v-html="video.alternateName" class="title-other">{{video.alternateName}}</a>）</p>
        <p style="text-align: center;width: 80%;margin-left: 10%"><iv-rate style="font-size: 12px" allow-half disabled v-model="star"></iv-rate><span style="color: #f5a623;font-size: 12px;">{{ video.score }}</span></p>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'

export default {
  data () {
    return {
      star: Number(this.video.score)
    }
  },
  props: {
    video: {
      Type: Object
    },
    type: ''
  },
  mixins: [mixin],
  methods: {
    likePost (post) {
      this.$http({
        url: this.$http.adornUrl('/video/like/' + post.id),
        method: 'put',
        data: this.$http.adornData()
      }).then((response) => {
        if (response && response.code === 200) {
          post.likeNum += 1
          this.$Message.success('点赞成功')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";

  .video-cell
    @media only screen and (max-width: 768px)
      width: 50%
    @media screen and (min-width: 768px)
      width: 25%
    float: left
    display: table-cell
    vertical-align: middle
    text-align: center
    margin-bottom 15px
    > a
      display block
      cursor default
      border 1px solid $color-border
      &:hover
        border 1px solid $color-border-hover
        box-shadow 2px 2px 3px $color-border
      .text-wrapper
        padding 20px 20px 0 20px
        text-align left
        @media only screen and (max-width: 768px)
          padding 15px 15px 0 15px
        .title
          font-size 23px
          font-weight 100
          line-height 27px
          span.special
            border-radius $border-radius
            font-size 12px
            font-weight 100
            padding 3px 5px
            margin-left 1px
            vertical-align top
            color $default-background-color
            background $view-design-secondary-warning-color
            cursor pointer
          a
            color $color-typegraphy-title
            cursor pointer
            &:hover
              color $color-typegraphy-title-hover
              text-decoration underline
        .info
          margin-top 10px
          font-size 14px
          line-height 18px
          font-weight 200
          a
            color: #777
            cursor pointer
            &:hover
              color $color-main-primary
              text-decoration underline
          .publish-time
            margin-left 20px
        .line
          width 50px
          margin-top 30px
          border-1px(rgba(7, 17, 27, 0.4))
          &::after
            margin-bottom 15px
        .tags
          /*cursor: pointer;*/
          margin: 8px 0
        .desc
          color #666
          font-size 14px
          line-height 20px
          font-weight 200
          margin-top: 8px
          a
            color $color-main-primary
            font-weight 500
            cursor pointer
            &:hover
              text-decoration underline
        .operate_info
          font-size 14px
          margin 15px 0 20px
          span
            margin-right 8px
            + span
              margin-left 8px
            a
              cursor pointer
              &:hover
                color $color-main-primary
                text-decoration underline
      .img-wrapper
        padding-bottom: 85%
        width: 100%
        height: 0
        overflow hidden
        &.big-image
          padding-bottom 26%
        img
          width 100%
  .title
    color $color-gradually-gray-101
  .title-other
    color $color-gradually-gray-51
  .title:hover
    color #409eff
  .title-other:hover
    color #409eff
</style>

<template>
  <div class="video-page-header">
    <iv-row>
      <iv-col :xs="24" :sm="16" :md="16" :lg="16" style="padding-left: 0;padding-right: 0;">
        <p class="info">
          <span class="author">By / <a>{{ video.author }}</a></span>
          <span class="publish-time">  At / <a>{{ video.createTime | socialDate }}</a></span>
          <span class="publish-time">  Update / <a>{{ video.updateTime | socialDate }}</a></span>
        </p>
      </iv-col>
      <iv-col :xs="24" :sm="8" :md="8" :lg="8" style="padding-left: 0;padding-right: 0;">
        <p class="operate_info">
          <span class="readings"><a ><iv-icon type="eye"></iv-icon> {{video.watchNum}} 观看</a></span> |
          <span class="likes"><a @click="likePost(video)"><iv-icon type="heart"></iv-icon> {{video.likeNum}} 点赞</a></span>
        </p>
      </iv-col>
    </iv-row>
    <iv-row  style="margin-top: 10px">
      <iv-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-left: 0;padding-right: 0;">
        <img height="180" width="150" style="float: left;margin-right: 30px" :src="video.cover" alt="">
        <p class="info">
          <span class="author">制片国家/地区 / <a>{{ video.productionRegion }}</a></span>
        </p>
        <p class="info">
          <span class="author">上映日期 / <a>{{ video.releaseTime }}</a></span>
        </p>
        <p class="info">
          <span class="author">导演 / <a>{{ video.director }}</a></span>
          <span class="publish-time">编剧 / <a>{{ video.screenwriter }}</a></span>
        </p>
        <p class="info">
        </p>
        <p class="info">
          <span class="author">片长 / <a>{{ video.duration }}</a></span>
          <span class="publish-time">语言 / <a>{{ video.language }}</a></span>
        </p>
        <p class="info">
          <span class="author">评分 / <a>{{ video.score }}</a></span>
        </p>
        <p class="info">
          <span class="author">主演 / <a>{{ video.toStar }}</a></span>
        </p>
      </iv-col>
    </iv-row>
    <a style="text-align: center;line-height: 30px;margin-left: 5px" v-if="!isShowSynopsis" @click="isShowSynopsis = !isShowSynopsis">剧情简介 >></a>
    <a style="text-align: center;line-height: 30px;margin-left: 5px" v-if="isShowSynopsis" @click="isShowSynopsis = !isShowSynopsis">剧情简介 VV</a>
    <div style="margin-top: 5px;background: blanchedalmond" class="abstract" v-if="isShowSynopsis">
      <p v-html="video.synopsis">
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'
export default {
  data () {
    return {
      isShowSynopsis: true
    }
  },
  props: {
    video: {}
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

<style lang="stylus" rel="stylesheet/stylus">
@import "../../../common/stylus/index.styl";

.video-page-content
  text-align left
  padding 25px 5px 10px 5px
  @media only screen and (max-width: 768px)
    padding-top 10px
  @media screen and (min-width: 768px)
    padding-top 10px
  @media screen and (min-width: 992px)
    padding-top 25px
  .tags
    margin-bottom 18px
  .title
    font-size 27px
    line-height 33px
    font-weight 500
    color $color-typegraphy-title
    margin-bottom 23px
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
  .operate_info
    text-align right
    font-size 14px
    margin 15px 0
    @media only screen and (max-width: 768px)
      text-align left
    span
      margin-right 10px
      + span
        margin-left 10px
      a
        cursor pointer
        &:hover
          color $color-main-primary
          text-decoration underline
  .abstract
    color $default-desc-color
    border 1px dashed $default-border-color
    background $default-border-color
    @media only screen and (max-width: $responsive-sm)
      padding 8px
      margin-top 8px
      font-size 13px
      line-height 18px
    @media screen and (min-width: $responsive-sm)
      padding 15px
      margin-top 8px
      font-size 14px
      line-height 24px
    @media screen and (min-width: $responsive-md)
      padding 20px
      margin-top 15px
      line-height 28px
    @media screen and (min-width: $responsive-lg)
      padding 20px
      margin-top 15px
      line-height 28px
</style>

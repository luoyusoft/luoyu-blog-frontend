<template>
  <div class="article-page-header">
    <div class="tags">
      <iv-tag :color="tag.id | mapTagColor" v-for="(tag) in article.tagList" :key="tag.id" style="margin-right: 5px;">{{tag.name}}</iv-tag>
    </div>
    <p class="title">{{article.title}}</p>
    <iv-row>
      <iv-col :xs="24" :sm="10" :md="10" :lg="10" style="padding-left: 0;padding-right: 0;">
        <p class="info">
          <span class="author">By / <a>{{ article.author }}</a></span>
          <span class="publish-time">  At / <a>{{ article.createTime | socialDate }}</a></span>
          <span class="publish-time">  Update / <a>{{ article.updateTime | socialDate }}</a></span>
        </p>
      </iv-col>
      <iv-col :xs="24" :sm="14" :md="14" :lg="14" style="padding-left: 0;padding-right: 0;">
        <p class="operate_info">
          <span class="readings"><a ><iv-icon type="md-eye"></iv-icon> {{article.readNum}} 阅读</a></span> |
          <span class="likes"><a @click="updateArticle(article)"><iv-icon type="md-thumbs-up"></iv-icon> {{article.likeNum}} 点赞</a></span>
        </p>
      </iv-col>
    </iv-row>
    <p class="abstract" v-if="article.description">
      {{article.description}}
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'
export default {
  props: {
    article: {}
  },
  mixins: [mixin],
  methods: {
    updateArticle (post) {
      this.$http.updateArticle(post.id).then((response) => {
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

  .article-page-header
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

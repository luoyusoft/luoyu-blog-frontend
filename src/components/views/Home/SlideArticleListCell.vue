<template>
  <div class="article-cell box">
    <a>
      <div class="box1" style="position: relative;" align="center" v-for="article in slidelArticleList" :article="article" :key="article.title">
        <a :href="'/article/'+article.id">
          <img :src="article.cover" class="custom-img" :title="article.title" height="100%" width="100%" alt="">
          <span v-html="article.title" style="font-size:12px;color: #f7f9fe;width:90%;position: absolute; bottom: 5%; left: 5%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">article.title</span>
        </a>
      </div>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils/index'

export default {
  props: {
    slidelArticleList: {
      Type: Array
    }
  },
  mixins: [mixin]
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";

  .article-cell
    margin-bottom 25px
    margin-top 20px
    > a
      display block
      cursor default
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
        padding-bottom: 70%
        width: 100%
        height: 0
        //overflow hidden
        &.big-image
          padding-bottom 26%
        img
          width 90%
  .box1{
    width: 200px;
    margin-left: 5%;
    height: 130px;
    display: inline-block;/*行内块元素*/
  }
  .box{
    white-space: nowrap;/*文本不会换行，文本会在在同一行上继续*/
    overflow-y:auto;/*可滑动*/
  }
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
  .custom-img{
    -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
    filter: brightness(80%);
    opacity: 1;
  }
  .custom-img:hover {
    -webkit-filter: brightness(100%); /* Chrome, Safari, Opera */
    filter: brightness(65%);
    opacity: 0.9;
  }
</style>

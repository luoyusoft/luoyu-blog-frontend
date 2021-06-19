<template>
  <div class="archive-list-cell">
    <div class="info" >
      <iv-tag class="time-tag border-tag" style="border: 0 solid red !important;background-color: rgba(255,0,0,0) !important;">{{ post.createTime | socialDate}}</iv-tag>
      <div class="base-info">
        <iv-icon v-if="!post.open" type="ios-lock" style="float: left;padding-top: 4px;padding-right: 2px"></iv-icon>
        <a class="title" @click="toLink(post)">
          {{post.title}}
        </a>
        <a class="see-desc" @click.stop="seeDesc()" :class="{show: showDesc}">查看简介
          <iv-icon v-show="!showDesc" type="md-arrow-dropright">
          </iv-icon><iv-icon v-show="showDesc" type="md-arrow-dropdown"></iv-icon>
        </a>
        <p class="desc" :class="{show: showDesc}">{{post.description}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'

export default {
  name: 'archive-list-cell',
  props: {
    post: {
      Type: Object
    }
  },
  mixins: [mixin],
  data () {
    return {
      showDesc: false
    }
  },
  methods: {
    seeDesc () {
      this.showDesc = !this.showDesc
    },
    toLink (article) {
      this.$Modal.confirm({
        title: '',
        content: '<p style="color: black">该文章未公开，查看内容需要提供密码</p>',
        onOk: () => {
          this.$router.push({ path: '/article/' + article.id })
        },
        onCancel: () => {
        }
      })
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl"

  .archive-list-cell
    position relative
    padding 15px 0
    &::after
      content ''
      position absolute
      min-height 25px
      top 0
      bottom 0
      left 17px
      width 4px
      background $default-link-hover-color
    .info
      display flex
      font-size 15px
      line-height 25px
      margin-left 45px
      cursor pointer
      @media only screen and (max-width: 720px)
        font-size 13px
      .ivu-tag-text
        color $color-gradually-gray-101
        font-size 15px !important
      .time-tag
        flex-shrink 0
      .base-info
        a.title
          //margin-left 5px
          font-weight 300
          color $color-gradually-gray-101
          cursor pointer
          &:hover
            color $default-title-hover-color
        a.see-desc
          color $color-gradually-gray-101
          font-size 13px
          margin-left 5px
          font-weight 100
          cursor pointer
          > i
            transition: All 0.4s ease-in-out
            transform rotateX(180deg)
          &:hover,&.show
            color $default-desc-hover-color
          &.show
            > i
              transform rotateX(0deg)
        .desc
          font-size 14px
          font-weight 300
          margin-left 27px
          color $color-gradually-gray-41
          overflow hidden
          max-height 0
          transition All 0.4s ease-in-out
          &.show
            max-height 250px
</style>

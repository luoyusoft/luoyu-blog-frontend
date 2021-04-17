<template>
  <div class="friendlink-page-content">
    <a :href=friendLink.url target="_blank">
      <iv-row >
        <iv-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-left: 0;padding-right: 0;">
          <img class="avatar" :src="friendLink.avatar" alt="">
          <div style="float: right;margin-top: 15px;width: 100px;height: 60px">
            <p style="line-height: 30px;font-size: 15px;color: #fff">{{friendLink.title}}</p>
            <p style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;word-wrap: break-word;word-break: break-all;line-height: 20px;font-size: 10px;color: #fff">{{friendLink.description}}</p>
          </div>
        </iv-col>
      </iv-row>
    </a>
  </div>
</template>

<script type="text/ecmascript-6">
import { mixin } from '@/utils'

export default {
  data () {
    return {
      linkList: []
    }
  },
  props: {
    friendLink: {
      Type: Object
    },
    type: ''
  },
  mixins: [mixin]
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../../common/stylus/index.styl";

.friendlink-page-content
  @media only screen and (max-width: 768px)
    width: 80%
    margin-left 10%
  @media screen and (min-width: 768px)
    width: 30%
    margin-left 3%
  cursor: pointer
  float: left
  //display: table-cell
  vertical-align: middle
  margin-bottom 15px
  background #393a3d
  border-radius $border-radius
  overflow: hidden
  > a
    display flex
    transform: translate(0, 0)
    transition: all 0.2s ease-in
    &:hover
      transform: translate(20px, 0)
      transition: all 0.2s ease-in-out
      .link
        color $color-main-primary
  img.background
    position absolute
    top 0
    left 0
    right 0
    width 100%
    height 125px
    z-index 1
  img.avatar
    position relative
    margin 15px 15px 15px 15px
    width 60px
    height 60px
    border 2px solid $color-gradually-gray-91
    border-radius 50%
    z-index 9

.title
  color $color-gradually-gray-101
.title-other
  color $color-gradually-gray-51
.title:hover
  color #409eff
.title-other:hover
  color #409eff
</style>

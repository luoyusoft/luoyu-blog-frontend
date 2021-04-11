<template>
  <div class="common-footer">
    <p class="copyright">
      <a href="http://www.miibeian.gov.cn/" target="_blank">{{ siteInfo.icp }}</a>
      <span>|</span>
      {{ siteInfo.copyright }}
      <span>|</span>
      <span v-html="siteInfo.copyright_desc"></span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      siteInfo: {
        icp: '粤ICP备19047700号',
        copyright: '版权所有 © 2019 - 2020',
        copyright_desc: '以商业目的使用本网站内容需获许可，非商业目的使用授权遵循CC BY-NC 4.0'
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .common-footer
    font-weight 300
    line-height 100px
    text-align center
    margin-top 20px
    padding-top 10px
    color $default-title-color
    //border-top 1px solid $default-border-color
    background #1e1f21
    @media only screen and (max-width: $responsive-sm)
      font-size 13px
    @media screen and (min-width: $responsive-sm)
      font-size 14px
    @media screen and (min-width: $responsive-md)
      font-size 15px
    @media screen and (min-width: $responsive-lg)
      font-size 15px
    .copyright
      //margin 10px
      color #fff
      a
        color #fff
        &:hover
          color $default-link-hover-color
</style>

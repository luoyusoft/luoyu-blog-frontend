<template>
  <div class="common-footer">
    <iv-modal :title="'微信扫码，或搜索「码农要充电」关注'" v-model="showGZH" :footer-hide="true" :scrollable="true">
      <img src="../../assets/icon/gongzhonghao.png" alt="" title="码农要充电">
    </iv-modal>
<!--    <iv-drawer title="微信扫码，或搜索「码农要充电」关注" placement="right" width="330px" v-model="showGZH">-->
<!--      <img src="../../assets/icon/gongzhonghao.png" alt="" title="码农要充电" style="width: 300px; height: 300px; text-align: center">-->
<!--    </iv-drawer>-->
    <div>
      <a class="custom-a" :href="'/friendlink'" style="font-size: 16px">友链</a>
      <span style="color: #7e8c8d">｜</span>
      <a :href="'/chat'" style="font-size: 16px" class="custom-a">聊天室<a class="custom-a" :href="'/chat'" style="font-size: 12px">（暂不适配移动端）</a></a>
      <ul class="social">
          <li><a @click="showGZH = true" style="font-size: 5px"><img src="../../assets/icon/gongzhonghao.png" alt="" title="码农要充电" style="width: 30px; height: 30px"></a></li>
          <li><a href="https://www.jianshu.com/u/ede51a29ab7e" target="_blank" style="font-size: 10px"><img src="../../assets/icon/jianshu.png" alt="" title="简书" style="width: 30px; height: 30px"></a></li>
          <li><a href="https://github.com/Jinhx128" target="_blank" style="font-size: 10px"><img src="../../assets/icon/github.png" alt="" title="GitHub" style="width: 30px; height: 30px"></a></li>
          <li><a href="https://weibo.com/u/1836134790?topnav=1&wvr=6&topsug=1&is_all=1" target="_blank" style="font-size: 10px"><img src="../../assets/icon/weibo.png" alt="" title="微博" style="width: 30px; height: 30px"></a></li>
        </ul>
    </div>
    <div style="margin-top: 20px">
      <p class="copyright">
        <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ siteInfo.icp }}</a>
        <span>|</span>
        {{ siteInfo.copyright }}
        <span>|</span>
        <span v-html="siteInfo.copyright_desc"></span>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      showGZH: false,
      siteInfo: {
        icp: '豫ICP备2021011338号',
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
    line-height 25px
    text-align center
    margin-top 20px
    padding-top 50px
    padding-bottom 40px
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
    .custom-a
      color #7e8c8d
      &:hover
        color $color-gradually-gray-101
  .social
    text-align center
    padding 0 20px
    margin-top 35px
    > li
      padding 8px
      display inline-block
      a
        display block
        width: 40px
        height: 35px
        margin: auto
        img
          width 100%
</style>

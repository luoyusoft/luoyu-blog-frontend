<template>
  <div class="about-content" v-cloak>
    <iv-spin v-if="!isReadySuccess" fix>
      <iv-icon type="ios-loading" size=35 class="demo-spin-icon-load" style="color: #1e1f21"></iv-icon>
      <div style="color: #1e1f21">Loading</div>
    </iv-spin>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <about-page-header></about-page-header>
          <about-page-content></about-page-content>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import AboutPageHeader from '@/components/views/About/AboutPageHeader'
import AboutPageContent from '@/components/views/About/AboutPageContent'

export default {
  data () {
    return {
      article: {},
      // 定时器
      timer: null,
      isReadySuccess: false
    }
  },
  components: {
    'about-page-header': AboutPageHeader,
    'about-page-content': AboutPageContent
  },
  created () {
    const that = this
    that.timer = setInterval(function () {
      if (document.readyState === 'complete') {
        that.isReadySuccess = true
        window.clearInterval(that.timer)
      }
    }, 500)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.about-content
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

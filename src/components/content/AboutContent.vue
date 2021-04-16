<template>
  <div class="about-content" v-cloak>
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
      article: {}
    }
  },
  components: {
    'about-page-header': AboutPageHeader,
    'about-page-content': AboutPageContent
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

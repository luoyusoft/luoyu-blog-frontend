<template>
  <div class="timeline-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="margin-bottom: 50px;">
          <timeline-page-header></timeline-page-header>
          <timeline-page-content></timeline-page-content>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <recommend :module=0></recommend>
          <tag-wall :module=0 style="margin-top: 15px;"></tag-wall>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import TimeLinePageHeader from '@/components/views/TimeLine/TimeLinePageHeader'
import TimeLinePageContent from '@/components/views/TimeLine/TimeLinePageContent'
import Recommend from '@/components/views/Recommend'
import TagWall from '@/components/views/TagWall'

export default {
  components: {
    'timeline-page-header': TimeLinePageHeader,
    'timeline-page-content': TimeLinePageContent,
    'recommend': Recommend,
    'tag-wall': TagWall
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .timeline-content
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
      margin-bottom 50px
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

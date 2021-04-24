<template>
  <div class="messagewall-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
          <messagewall-page-header></messagewall-page-header>
          <messagewall-page-content></messagewall-page-content>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import MessageWallPageContent from '@/components/views/MessageWall/MessageWallPageContent'
import MessageWallPageHeader from '@/components/views/MessageWall/MessageWallPageHeader'

export default {
  components: {
    'messagewall-page-content': MessageWallPageContent,
    'messagewall-page-header': MessageWallPageHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.messagewall-content
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

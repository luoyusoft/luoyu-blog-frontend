<template>
  <div class="friendlink-content">
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left" style="margin-bottom: 50px;">
          <friendlink-page-header></friendlink-page-header>
          <friendlink-page-content v-for="friendLink in friendLinkList" :friendLink="friendLink" :key="friendLink.id"></friendlink-page-content>
          <friendlink-page-footer style="clear: both"></friendlink-page-footer>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>

<script type="text/ecmascript-6">
import FriendLinkPageContent from '@/components/views/FriendLink/FriendLinkPageContent'
import FriendLinkPageHeader from '@/components/views/FriendLink/FriendLinkPageHeader'
import FriendLinkPageFooter from '@/components/views/FriendLink/FriendLinkPageFooter'

export default {
  data () {
    return {
      friendLinkList: []
    }
  },
  components: {
    'friendlink-page-content': FriendLinkPageContent,
    'friendlink-page-header': FriendLinkPageHeader,
    'friendlink-page-footer': FriendLinkPageFooter
  },
  created () {
    this.listFriendLink()
  },
  methods: {
    listFriendLink () {
      this.$http({
        url: this.$http.adornUrl('/operation/friendlinks'),
        method: 'get',
        params: this.$http.adornParams()
      }).then((response) => {
        if (response && response.code === 200) {
          this.friendLinkList = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.friendlink-content
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

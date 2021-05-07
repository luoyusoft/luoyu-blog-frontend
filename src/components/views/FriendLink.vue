<template>
  <div class="friend-link">
    <panel :title="'友链'">
      <ul class="link-list" slot="content">
        <li v-for="friendLink in friendLinkList" :key="friendLink.id">
          <a :href="friendLink.url" target="_blank">
            <img :src="friendLink.avatar" alt="">
            <div class="right">
              <p class="title">{{friendLink.title}}</p>
              <p class="link">{{friendLink.url}}</p>
            </div>
          </a>
        </li>
      </ul>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
import Panel from '@/components/utils/Panel'

export default {
  data () {
    return {
      friendLinkList: []
    }
  },
  created () {
    this.listFriendLinks()
  },
  components: {
    'panel': Panel
  },
  methods: {
    listFriendLinks () {
      this.$http.listFriendLinks().then((response) => {
        if (response && response.code === 200) {
          this.friendLinkList = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .friend-link
    position relative
    ul.link-list
      padding 15px 0
      li
        padding 2px 25px
        a
          display flex
          transform: translate(0, 0)
          transition: all 0.2s ease-in
          &:hover
            transform: translate(30px, 0)
            transition: all 0.2s ease-in-out
            .link
              color $color-main-primary
          img
            flex 0 0 50px
            width 50px
            height 50px
            margin 5px 0
          .right
            display flex
            flex-direction column
            padding-left 12px
            height 60px
            line-height 60px
            p
              flex 1
              text-align left
              &.title
                height 35px
                line-height 45px
                font-size 17px
                //color $color-main-primary
              &.link
                height 15px
                line-height 15px
                font-weight 100

</style>

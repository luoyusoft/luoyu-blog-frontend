<template>
  <div :class="style">
    <router-view name="header"></router-view>
    <router-view name="content"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      style: 'main-wrapper-style'
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.changeStyle()
  },
  created () {
    this.changeStyle()
  },
  methods: {
    changeStyle () {
      this.$nextTick(() => {
        if (this.$route.path.replace(/\//g, '') === '') {
          this.style = 'main-wrapper-style'
          return
        }
        let path = this.$route.path.split('/')
        if (path[1] === 'articles') {
          this.style = 'main-wrapper-style'
          return
        }
        if (path[1] === 'videos') {
          this.style = 'main-wrapper-style'
          return
        }
        if (path[1] === 'chat') {
          this.style = 'chat'
          return
        }
        this.style = 'other-wrapper-style'
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .other-wrapper-style
    background-color #ffffff
    width 100%
    margin 0 auto
  .main-wrapper-style
    background-color #f7f9fe
    width 100%
    margin 0 auto
</style>

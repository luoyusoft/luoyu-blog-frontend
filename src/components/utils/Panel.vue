<template>
  <div class="panel">
    <h5>
      <h6>&nbsp;{{ title }}</h6>
    </h5>
    <slot name="content"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    title: {
      default: ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl";

  .panel
    position relative
    background #fff
    border 1px solid $color-border
    box-shadow inset 0 0 8px -5px rgba(81, 81,81,0.2)
    h5
      font-size 18px
      padding 13px 20px 13px
      line-height 18px
      text-align left
      font-weight: bolder
    h6
      border-left 5px solid $default-link-hover-color
      font-weight: bolder
</style>

<template>
  <div class="messagewall-cell">
    <div v-if="messagewall.replyId === -1">
      <p style="color: white;margin-left: 20px">{{ messagewall.floorNum }}楼</p>
      <img class="head-img" :src="messagewall.profile" alt="">
      <p style="color: white;font-size: 18px">{{ messagewall.name }}</p>
      <p style="color: #CFCFCF;margin-top: 10px;">{{ messagewall.createTime.substring(0,10) }} <a class="reply-a" @click="replyMessageWall(messagewall.id,messagewall.name,messagewall.floorNum)">回复</a></p>
      <p style="color: white;margin-top: 12px" >{{ messagewall.comment }}</p>
      <div style="margin-top: 20px;border:1px solid #CCC"></div>
    </div>
    <div v-else>
      <div class="childCommont">
        <img class="head-img" :src="messagewall.profile" alt="">
        <p style="color: white;font-size: 18px">{{ messagewall.name }}</p>
        <p style="color: #CFCFCF;margin-top: 10px;">{{ messagewall.createTime.substring(0,10) }} <a class="reply-a" @click="replyMessageWall(messagewall.id,messagewall.name,messagewall.floorNum)">回复</a></p>
        <p style="color: white;margin-top: 12px" >@{{ messagewall.replyName }}&nbsp;&nbsp;{{ messagewall.comment }}</p>
        <div style="margin-top: 20px;border:1px solid #CCC"></div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">

export default {
  props: {
    messagewall: {
      Type: Object
    },
    replyMessageWall: {
      type: Function,
      default: null
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/index.styl";

  .messagewall-cell
    margin-bottom 15px
    margin-top 15px
    background #393a3d
    border-radius $border-radius
    overflow hidden

  /* 留言记录区*/
  .stack {
    margin-top: 20px
    margin-left: auto
    margin-right: auto
    margin-bottom: 5%
    width: 90%
  }

  /* 回复框 */
  .commons_div {
    display: inline-block
    background-color: #EFEFEF
    text-align: center
    padding: 1.25rem
    margin-left: 1.25rem
    border-radius: 0.625rem
    position: relative
  }

  /* 回复者 回复时间 信息 */
  .commons_info {
    margin: 0.9375rem 0 0.9375rem 4.375rem
  }

  /* 子回复 */
  .childCommont {
    margin-left: 30px
  }

  /* 头像 */
  .head-img {
    float left
    position relative
    margin 15px 15px 15px 15px
    width 40px
    height 40px
    border 2px solid $color-gradually-gray-91
    border-radius 50%
    z-index 9
  }

  .reply-a
    color $color-gradually-gray-101
    margin-left 10px
    text-decoration underline
    font-size 15px
    font-style italic
  .reply-a:hover
    color $color-gradually-gray-81

  /* 回复角标 */
  .commons_div > .reply {
    width: 1%
    height: 1%
    background-color: #F60
    border: 0 none
    border-radius: 0.3125rem
    position: absolute
    float: right
    top: 0
    right: 0
    display: block
    cursor: pointer
  }
</style>

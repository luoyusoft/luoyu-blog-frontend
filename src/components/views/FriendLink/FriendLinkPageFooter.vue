<template>
  <div class="article-page-footer" v-cloak>
    <iv-row >
      <iv-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-left: 0;padding-right: 0;">
        <div style="margin-top: 20px;border:1px solid #CCC"></div>
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">本站信息</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 50px;font-size: 15px;">网站名称：落雨</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">网站简介：看山是山！看山不是山！看山还是山！</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">网站地址：https://luoyublog.com/</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">头像地址：https://minio.luoyublog.com/img/20210415/f87450316b7b427ea4747401ac2d4514.jpg</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">欢迎交换友链，多多串门，互相踩踩</p>
        <div style="margin-top: 20px;border:1px solid #CCC"></div>
        <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">交换须知</p>
        <ul style="margin-top: 50px;font-size: 15px;">
          <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">1. 请先添加本站链接</li>
          <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">2. 提供：站点名称、简介、链接、头像地址</li>
        </ul>
        <div style="margin-top: 20px;margin-bottom: 50px;border:1px solid #CCC"></div>
      </iv-col>
    </iv-row >
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
      article: {}
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.about-title
  color #fff
.about-content
  color #d7d5d6
</style>

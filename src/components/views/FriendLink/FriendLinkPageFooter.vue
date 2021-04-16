<template>
  <div>
    <iv-row >
      <iv-col :xs="24" :sm="24" :md="24" :lg="24" style="padding-left: 0;padding-right: 0;">
        <div style="margin-top: 20px;border:1px solid #CCC"></div>
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">本站信息</p>
          <ul style="margin-top: 30px;font-size: 15px;">
            <li class="about-content" style="margin-top: 20px;margin-left: 40px;list-style-type:disc">网站名称：落雨</li>
            <li class="about-content" style="margin-top: 20px;margin-left: 40px;list-style-type:disc">网站简介：服务端开发程序猿一枚</li>
            <li class="about-content" style="margin-top: 20px;margin-left: 40px;list-style-type:disc">网站地址：<a href="https://luoyublog.com/" style="word-wrap: break-word">https://luoyublog.com/</a></li>
            <li class="about-content" style="margin-top: 20px;margin-left: 40px;list-style-type:disc">头像地址：<a href="https://minio.luoyublog.com/img/20210415/f87450316b7b427ea4747401ac2d4514.jpg" style="word-wrap: break-word">https://minio.luoyublog.com/img/20210415/f87450316b7b427ea4747401ac2d4514.jpg</a></li>
            <li class="about-content" style="margin-top: 20px;margin-left: 40px;list-style-type:disc">欢迎交换友链，多多串门，互相踩踩。</li>
          </ul>
        <div style="margin-top: 20px;border:1px solid #CCC"></div>
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">交换须知</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 30px;font-size: 15px;">1. 请先添加本站链接。</p>
          <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">2. 请提供：站点名称、简介、链接、头像地址。</p>
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

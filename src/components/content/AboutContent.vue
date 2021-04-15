<template>
  <div class="article-content" v-cloak>
    <iv-row>
      <iv-col :xs="24" :sm="24" :md="24" :lg="17">
        <div class="layout-left">
<!--          <img style="width: 100%;height: 500px" src="/static/img/home.jpg" alt="image.png">-->
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">站长</p>
<!--            <div style="border: 1px solid #eee">-->
            <p class="about-content" style="margin-left: 20px;margin-top: 50px;font-size: 15px;">服务端开发程序猿一枚。</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">正在努力养活自己...</p>
<!--            </div>-->
          <div style="margin-top: 20px;border:1px solid #CCC"></div>
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">社交媒体</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 50px;font-size: 20px;">你可以在以下地方找到我：</p>
            <ul style="margin-top: 30px;font-size: 15px;">
              <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">公众号：微信搜索「落雨充电站」</li>
              <li class="about-content" style="margin-top: 10px;margin-left: 40px;">
                <img width="100px" height="100px" src="https://minio.luoyublog.com/img/20210319/981dc4a0c2f94dee922ca8693503a468.png" alt="image.png">
              </li>
              <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">简书：<a href="https://www.jianshu.com/u/ede51a29ab7e">https://www.jianshu.com/u/ede51a29ab7e</a></li>
              <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">GitHub：<a href="https://github.com/luoyusoft">https://github.com/luoyusoft</a></li>
              <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">微博：<a href="https://weibo.com/u/1836134790?topnav=1&amp;wvr=6&amp;topsug=1&amp;is_all=1">https://weibo.com/u/1836134790?topnav=1&amp;wvr=6&amp;topsug=1&amp;is_all=1</a></li>
            </ul>
          <div style="margin-top: 20px;border:1px solid #CCC"></div>
          <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">联系方式</p>
          <ul style="margin-top: 50px;font-size: 15px;">
            <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">微信：Jinhx127</li>
            <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">邮箱：luoyusoft@126.com</li>
          </ul>
          <div style="margin-top: 20px;border:1px solid #CCC"></div>
            <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">本站</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 50px;font-size: 15px;">本站所有内容均是本人学习，工作过程中Get到的，记录在此方便自己查看，同时也希望能够帮到正在阅读的你！</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">本站还处于迭代阶段，有任何意见、建议或有发现任何BUG，请联系我反馈，感谢！</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 40px;font-size: 15px;">本站前端使用Vue，后端使用Java。</p>
            <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">项目开源在GitHub上，会一直坚持迭代下去，欢迎大家Star，感谢！</p>
          <div style="margin-top: 20px;margin-bottom: 50px;border:1px solid #CCC"></div>
        </div>
      </iv-col>
      <iv-col :xs="0" :sm="0" :md="0" :lg="7">
        <div class="layout-right">
          <about></about>
        </div>
      </iv-col>
    </iv-row>
  </div>
</template>
<script type="text/ecmascript-6">
import ArticlePageHeader from '@/components/views/Article/ArticlePageHeader'
import ArticlePageContent from '@/components/views/Article/ArticlePageContent'
import ArticlePageFooter from '@/components/views/Article/ArticlePageFooter'
import About from '@/components/views/About'
import SideToc from '@/components/views/SideToc'

export default {
  data () {
    return {
      article: {}
    }
  },
  components: {
    'article-page-header': ArticlePageHeader,
    'article-page-content': ArticlePageContent,
    'article-page-footer': ArticlePageFooter,
    'about': About,
    'side-toc': SideToc
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.article-content
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
.about-title
  color #fff
.about-content
  color #d7d5d6
</style>

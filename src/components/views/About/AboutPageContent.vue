<template>
  <div>
    <!--          <img style="width: 100%;height: 500px" src="/static/img/home.jpg" alt="image.png">-->
    <p class="about-title" style="margin-left: 10px;margin-top: 20px;font-size: 25px;font-weight: bold;">站长</p>
    <!--            <div style="border: 1px solid #eee">-->
    <p class="about-content" style="margin-left: 20px;margin-top: 30px;font-size: 15px;">服务端开发程序猿一枚。</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">正在努力养活自己...</p>
    <!--            </div>-->
    <div style="margin-top: 20px;border:1px solid #CCC"></div>
    <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">社交媒体</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 30px;font-size: 20px;">你可以在以下地方找到我：</p>
    <iv-modal :title="'微信扫码，或搜索「码农要充电」关注'" v-model="showGZH" :footer-hide="true" :scrollable="true">
      <img src="../../../assets/icon/gongzhonghao.png" alt="" title="码农要充电">
    </iv-modal>
<!--    <iv-drawer title="微信扫码，或搜索「码农要充电」关注" placement="right" width="330px" v-model="showGZH">-->
<!--      <img src="../../../assets/icon/gongzhonghao.png" alt="" title="码农要充电" style="width: 300px; height: 300px; text-align: center">-->
<!--    </iv-drawer>-->
    <ul style="margin-top: 30px;font-size: 15px;">
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">公众号：<a @click="showGZH = true" style="color: red; margin-right: 2px;">点击</a>微信扫码，或搜索「码农要充电」关注</li>
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">简书：<a href="https://www.jianshu.com/u/ede51a29ab7e" target="_blank">https://www.jianshu.com/u/ede51a29ab7e</a></li>
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">GitHub：<a href="https://github.com/Jinhx128" target="_blank">https://github.com/Jinhx128</a></li>
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">微博：<a href="https://weibo.com/u/1836134790?topnav=1&amp;wvr=6&amp;topsug=1&amp;is_all=1" target="_blank">https://weibo.com/u/1836134790?topnav=1&amp;wvr=6&amp;topsug=1&amp;is_all=1</a></li>
    </ul>
    <div style="margin-top: 20px;border:1px solid #CCC"></div>
    <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">联系方式</p>
    <ul style="margin-top: 30px;font-size: 15px;">
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">微信：Jinhx127</li>
      <li class="about-content" style="margin-top: 10px;margin-left: 40px;list-style-type:disc">邮箱：Jinhx128@163.com</li>
    </ul>
    <div style="margin-top: 20px;border:1px solid #CCC"></div>
    <p class="about-title" style="margin-left: 10px;margin-top: 50px;font-size: 25px;font-weight: bold;">本站</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 30px;font-size: 15px;">本站所有内容均为站长学习，工作过程中Get到的一些小知识，记录在此方便自己查看，同时也希望能够帮到正在阅读的你！</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">本站还处于迭代阶段，有任何意见、建议或发现任何BUG，请留言或联系站长反馈，感谢！</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 40px;font-size: 15px;">本站前端使用Vue，后端使用Java。</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;">项目开源在GitHub上，会一直坚持迭代下去，欢迎大家Star，感谢！</p>
    <p class="about-content" style="margin-left: 20px;margin-top: 20px;font-size: 15px;"><a href="https://github.com/Jinhx128/blog-backend" style="color: red;" target="_blank">源码传送阵</a>，为了防止被有心人恶意攻击，后端项目需要Nacos配置文件内容的，请另外联系站长获取！</p>
    <div style="margin-top: 20px;margin-bottom: 50px;border:1px solid #CCC"></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      showGZH: false
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

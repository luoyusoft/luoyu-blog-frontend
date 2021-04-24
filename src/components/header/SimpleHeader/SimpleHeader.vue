<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
<!--        <router-link class="logo" to="/"></router-link>-->
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header" v-show="show" style="padding-top: 0;">
        <div id="logo" style="float: left;margin-top: 10px;margin-left:5%;width: 10%">
          <a :href="'/'" class="title" style="font-family: Hiragana Sans GB,serif;font-size: 30px;color: #fff"><img src="../../../assets/logo.png"></a>
    <!--      <span class="motto">看山是山！看山不是山！看山还是山！</span>-->
        </div>
        <div style="float: left;width: 50%;margin-left:5%;">
          <iv-menu mode="horizontal" theme="dark" :active-name="active" ref="menu" class="custom">
            <iv-menu-item name="home" to="/" style="font-size: 16px">
<!--                <iv-icon type="ios-home-outline" size="20"/>-->
                首页
            </iv-menu-item>
            <iv-menu-item name="articles" to="/articles?page=&limit=&latest=&categoryId=&latest=true&like=false&read=false" style="font-size: 16px">
<!--                <iv-icon type="ios-paper-outline" size="20"/>-->
                文章
            </iv-menu-item>
<!--            <iv-submenu name="other">-->
<!--              <template slot="title">-->
<!--&lt;!&ndash;                <iv-icon type="ios-more" size="20"/>&ndash;&gt;-->
<!--                其他-->
<!--              </template>-->
<!--              <iv-menu-item name="videos" to="/videos?page=&limit=&latest=&categoryId=&latest=true&like=false&watch=false">-->
<!--&lt;!&ndash;                <iv-icon type="ios-videocam-outline" size="20"/>&ndash;&gt;-->
<!--                视频-->
<!--              </iv-menu-item>-->
<!--              <iv-menu-item name="chat" to="/chat">-->
<!--&lt;!&ndash;                <iv-icon type="ios-chatbubbles-outline" size="20"/>&ndash;&gt;-->
<!--                聊天室-->
<!--              </iv-menu-item>-->
<!--  &lt;!&ndash;            <iv-menu-item name="tool" to="/tool">&ndash;&gt;-->
<!--  &lt;!&ndash;              <iv-icon type="ios-construct-outline" size="20"/>&ndash;&gt;-->
<!--  &lt;!&ndash;              工具&ndash;&gt;-->
<!--  &lt;!&ndash;            </iv-menu-item>&ndash;&gt;-->
<!--              <iv-menu-item name="all">-->
<!--                更多功能敬请期待！-->
<!--              </iv-menu-item>-->
<!--            </iv-submenu>-->
            <iv-menu-item name="videos" to="/videos?page=&limit=&latest=&categoryId=&latest=true&like=false&watch=false" style="font-size: 16px">
              <!--                <iv-icon type="ios-videocam-outline" size="20"/>-->
              视频
            </iv-menu-item>
            <iv-menu-item name="chat" to="/chat" style="font-size: 16px">
              <!--                <iv-icon type="ios-chatbubbles-outline" size="20"/>-->
              聊天室
            </iv-menu-item>
<!--            <iv-menu-item name="friendlink" to="/friendlink" style="font-size: 16px">-->
<!--              友链-->
<!--            </iv-menu-item>-->
            <iv-menu-item name="timeline" to="/timeline" style="font-size: 16px">
<!--              <iv-icon type="ios-timer-outline" size="20"/>-->
              时光轴
            </iv-menu-item>
            <iv-menu-item name="about" to="/about" style="font-size: 16px">
<!--              <iv-icon type="ios-alert-outline" size="20"/>-->
              关于
            </iv-menu-item>
            <iv-menu-item name="messagewall" to="/messagewall" style="font-size: 16px">
              <!--              <iv-icon type="ios-timer-outline" size="20"/>-->
              留言墙
            </iv-menu-item>
          </iv-menu>
        </div>
        <div style="float: right;width: 20%;margin-top: 18px;margin-left:2%;">
            <iv-input placeholder="搜索点什么..." style="width: 230px;border: #2b85e4" class="active" v-model="keyword" @keyup.enter.native="search()">
              <iv-icon type="ios-search" slot="suffix" color="blue" @click="search()" style="cursor:pointer;"/>
            </iv-input>
        </div>
      </div>
    </transition>
    <sidebar ref="sidebar" :articleCategoryList="articleCategoryList" :videoCategoryList="videoCategoryList"></sidebar>
  </div>

</template>

<script type="text/ecmascript-6">
import SideBar from '@/components/header/SimpleHeader/SideBar'
import {treeDataTranslate} from '@/utils'

export default {
  components: {
    'sidebar': SideBar
  },
  data () {
    return {
      list: {
        home: false,
        articles: false,
        videos: false,
        chat: false,
        timeline: false,
        article1: false
      },
      show: true,
      articleCategoryList: [],
      videoCategoryList: [],
      keyword: '',
      active: 'home'
    }
  },
  created () {
    this.listCategory()
    this.keyword = this.$route.query.keyword
    this.$nextTick(() => {
      if (this.$route.path.replace(/\//g, '') === '') {
        this.active = 'home'
        this.$refs.menu.updateActiveName()
        return
      }
      let path = this.$route.path.split('/')
      if (path[1] === 'articles' || path[1] === 'article') {
        this.active = 'articles'
      }
      if (path[1] === 'videos' || path[1] === 'video') {
        this.active = 'videos'
      }
      if (path[1] === 'chat') {
        this.active = 'chat'
      }
      if (path[1] === 'timeline') {
        this.active = 'timeline'
      }
      if (path[1] === 'friendlink') {
        this.active = 'friendlink'
      }
      if (path[1] === 'about') {
        this.active = 'about'
      }
      this.$refs.menu.updateActiveName()
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      this.initMobileMenu()
    })
    // 给页面绑定滑轮滚动事件
    if (document.addEventListener) { // firefox
      document.addEventListener('DOMMouseScroll', this.watchScroll, false)
    }
    // 滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.watchScroll
  },
  methods: {
    initMobileMenu () {
      // 显示手机端的菜单
      var sidebar = this.$refs.sidebar
      this.$refs.menubutton.addEventListener('click', function () {
        sidebar.toggleSideBar()
      })
    },
    watchScroll (e) {
      e = e || window.event
      if (e.wheelDelta) {
        // 当滑轮向上滚动
        if (e.wheelDelta > 0 && this.show === false) {
          this.show = true
        }
        // 当滑轮向下滚动
        if (e.wheelDelta < 0 && this.show === true && document.documentElement.scrollTop > 70) {
          this.show = false
        }
      } else if (e.detail) {
        // 当滑轮向上滚动
        if (e.detail < 0 && this.show === false) {
          this.show = true
        }
        // 当滑轮向下滚动
        if (e.detail > 0 && this.show === true && document.documentElement.scrollTop > 70) {
          this.show = false
        }
      }
    },
    listCategory () {
      this.$http({
        url: this.$http.adornUrl('/operation/categories?module='),
        method: 'get',
        params: this.$http.adornParams()
      }).then((response) => {
        if (response && response.code === 200) {
          response.data.forEach(category => {
            if (category.module === 0) {
              this.articleCategoryList.push(category)
            } else if (category.module === 1) {
              this.videoCategoryList.push(category)
            }
          })
          this.articleCategoryList = treeDataTranslate(this.articleCategoryList)
          this.videoCategoryList = treeDataTranslate(this.videoCategoryList)
        }
      })
    },
    search () {
      let path = this.$route.path.split('/')
      if (path[1] === 'search') {
        window.location.href = window.SITE_CONFIG.baseUrl + '/search?keyword=' + this.keyword
      } else {
        this.$router.push({name: 'search', query: {keyword: this.keyword}})
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
   // 添加导航栏显示动画
  .slide-fade-enter-active ,.slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-to ,.slide-fade-enter {
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-70px);
    opacity: 0;
  }
  .activeList {
    color: $color-main-primary;
    border-bottom: 2px solid $color-main-primary;
  }
  .custom
    background-color #1e1f21 !important
  //.custom
  //  .ivu-menu-submenu
  //    .ivu-select-dropdown
  //      background-color #1e1f21 !important

</style>

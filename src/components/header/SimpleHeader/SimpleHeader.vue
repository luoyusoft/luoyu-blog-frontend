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
        <div id="logo" style="float: left;margin-top: 12px;margin-left:5%;width: 15%;">
          <img src="../../../assets/logo.png">
          <span class="title" style="font-family: Hiragana Sans GB,serif">LuoYu</span>
    <!--      <span class="motto">看山是山！看山不是山！看山还是山！</span>-->
        </div>
        <div style="float: left;width: 50%;margin-left:5%;margin-right: 5%;">
          <iv-menu mode="horizontal" theme="light" :active-name="active" ref="menu">
            <iv-menu-item name="home" to="/">
                <iv-icon type="ios-home-outline" size="20"/>
                首页
            </iv-menu-item>
            <iv-menu-item name="articles" to="/articles?page=&limit=&latest=&categoryId=&latest=true&like=false&read=false">
                <iv-icon type="ios-paper-outline" size="20"/>
                文章
            </iv-menu-item>
            <iv-submenu name="other">
              <template slot="title">
                <iv-icon type="ios-more" size="20"/>
                其他
              </template>
              <iv-menu-item name="videos" to="/videos?page=&limit=&latest=&categoryId=&latest=true&like=false&watch=false">
                <iv-icon type="ios-videocam-outline" size="20"/>
                视频
              </iv-menu-item>
              <iv-menu-item name="chat" to="/chat">
                <iv-icon type="ios-chatbubbles-outline" size="20"/>
                聊天室
              </iv-menu-item>
  <!--            <iv-menu-item name="tool" to="/tool">-->
  <!--              <iv-icon type="ios-construct-outline" size="20"/>-->
  <!--              工具-->
  <!--            </iv-menu-item>-->
              <iv-menu-item name="all">
                更多功能敬请期待！
              </iv-menu-item>
            </iv-submenu>
            <iv-menu-item name="timeline" to="/timeline">
              <iv-icon type="ios-timer-outline" size="20"/>
              时光轴
            </iv-menu-item>
            <iv-menu-item name="about" to="/article/1">
              <iv-icon type="ios-alert-outline" size="20"/>
              关于
            </iv-menu-item>
          </iv-menu>
        </div>
        <div style="float: right;width: 20%;margin-top: 18px;">
          <form id="search-form" action="/search">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
            <input
              type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" name="keyword" v-model="keyword" @keyup.enter="submit"
              autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;">
            <iv-button class="search-button" @click="search()">搜索</iv-button>
            <pre
              aria-hidden="true"
              style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
            <span
              class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
              style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
              class="aa-dataset-1"></div></span></span>
              </form>
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
    this.showList()
    this.keyword = this.$route.query.keyword
    this.$nextTick(() => {
      if (this.$route.path.replace(/\//g, '') === '') {
        this.active = 'home'
        this.$refs.menu.updateActiveName()
        return
      }
      let path = this.$route.path.split('/')
      if (path[1] === 'articles') {
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
      if (path[1] === 'article') {
        if (path[2] === '1') {
          this.active = 'about'
        } else {
          this.active = 'articles'
        }
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
    changeR (r) {
      for (let listKey in this.list) {
        this.list[listKey] = false
      }
      this.list[r] = true
    },
    showList () {
      if (this.$route.path.replace(/\//g, '') === '') {
        this.list['home'] = true
        return
      }
      let path = this.$route.path.split('/')
      if (path[1] === 'articles') {
        this.list['articles'] = true
      }
      if (path[1] === 'videos' || path[1] === 'video') {
        this.list['videos'] = true
      }
      if (path[1] === 'chat') {
        this.list['chat'] = true
      }
      if (path[1] === 'timeline') {
        this.list['timeline'] = true
      }
      if (path[1] === 'article') {
        if (path[2] === '1') {
          this.list['article1'] = true
        } else {
          this.list['articles'] = true
        }
      }
    },
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
        if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
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
  .search-button {
    background: white;
    border: none;
    font-size: 17px;
    color: black;
  }
  .search-button:hover {
    color: #2579d1;
    cursor: pointer;
  }
  .search-button:focus {
    outline: none;
  }
  .activeList {
    color: $color-main-primary;
    border-bottom: 2px solid $color-main-primary;
  }

</style>

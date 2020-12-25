<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
        <router-link class="logo" to="/"></router-link>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header"  v-show="show">
    <router-link id="logo" to="/">
      <img src="../../../assets/logo.png">
      <span class="title">LuoYu's Blog</span>
<!--      <span class="motto">看山是山！看山不是山！看山还是山！</span>-->
    </router-link>
    <ul id="nav">
      <li @click="changeR('home')">
        <router-link class="logo" to="/">
        <a class="search-button nav-link contribute activeList" v-if="list.home" >首页</a>
        <a class="search-button nav-link contribute" v-if="!list.home">首页</a>
        </router-link>
      </li>
      <li @click="changeR('articles')">
        <router-link class="logo" to="/articles?page=&limit=&latest=&categoryId=&latest=true&like=false&read=false">
        <a class="search-button nav-link contribute activeList" v-if="list.articles">文章</a>
        <a class="search-button nav-link contribute" v-if="!list.articles">文章</a>
        </router-link>
      </li>
      <li @click="changeR('videos')">
        <router-link class="logo" to="/videos?page=&limit=&latest=&categoryId=&latest=true&like=false&watch=false">
        <a class="search-button nav-link contribute activeList" v-if="list.videos">视频</a>
        <a class="search-button nav-link contribute" v-if="!list.videos">视频</a>
        </router-link>
      </li>
      <li @click="changeR('chat')">
        <router-link class="logo" to="/chat">
        <a class="search-button nav-link contribute activeList" v-if="list.chat">聊天室</a>
        <a class="search-button nav-link contribute" v-if="!list.chat">聊天室</a>
        </router-link>
      </li>
      <li @click="changeR('timeline')">
        <router-link class="logo" to="/timeline">
        <a class="search-button nav-link contribute activeList" v-if="list.timeline">时光轴</a>
        <a class="search-button nav-link contribute" v-if="!list.timeline">时光轴</a>
        </router-link>
      </li>
      <li>
        <a href="/article/1" class="search-button nav-link contribute" :class="list.article1?'activeList':''">关于</a>
      </li>
      <li style="margin-left: 50px">
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
      </li>
    </ul>
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
      keyword: ''
    }
  },
  created () {
    this.listCategory()
    this.showList()
    this.keyword = this.$route.query.keyword
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
        url: this.$http.adornUrl('/operation/categories'),
        method: 'get',
        params: this.$http.adornParams()
      }).then((response) => {
        if (response && response.code === 200) {
          response.data.forEach(category => {
            if (category.type === 0) {
              this.articleCategoryList.push(category)
            } else if (category.type === 1) {
              this.videoCategoryList.push(category)
            }
          })
          this.articleCategoryList = treeDataTranslate(this.articleCategoryList)
          this.videoCategoryList = treeDataTranslate(this.videoCategoryList)
        }
      })
    },
    search () {
      this.$router.replace({name: 'search', query: {keyword: this.keyword}})
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
    margin-left: 10px;
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

<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
          <img src="../../../assets/background.jpg" alt="">
          <div class="site-info">
            <h1 class="site-name">LuoYu's Blog</h1>
            <h1 class="site-desc">看山是山！看山不是山！看山还是山！</h1>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <form action="/search">
            <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
            <input
              type="text" class="search-query st-default-search-input aa-input" name="keyword" v-model="keyword" @keyup.enter="submit"
              autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
              aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;width: 70%">
            <iv-button class="search-button" size="small" style="font-size: 14px; margin-left: 1px" @click="search()">搜索</iv-button>
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
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
              <iv-icon type="ios-home"></iv-icon>
              <a style="color: #777" :href="'/'" >首页</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav" @click="showArticle=!showArticle">
            <p>
              <iv-icon type="ios-book"></iv-icon>
              文章
              <iv-icon type="md-arrow-dropdown" v-if="showArticle"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showArticle"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" v-show="showArticle">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in articleCategoryList" :key="category_level1.id">
              <iv-icon type="ios-remove"></iv-icon>&nbsp;
              <a class="nav-link" :href="'/articles?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">
                  <iv-icon type="ios-remove"></iv-icon>
                  <a class="nav-link" :href="'/articles?categoryId='+category_level2.id" >{{ category_level2.name}}</a>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">
                      <iv-icon type="ios-remove"></iv-icon>&nbsp;
                      <a class="nav-link" :href="'/articles?categoryId='+category_level3.id" >{{ category_level3.name }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav" @click="showVideo=!showVideo">
            <p>
              <iv-icon type="ios-videocam"></iv-icon>
              视频
              <iv-icon type="md-arrow-dropdown" v-if="showVideo"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showVideo"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" v-show="showVideo">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in videoCategoryList" :key="category_level1.id">
              <iv-icon type="ios-remove"></iv-icon>&nbsp;
              <a class="nav-link" :href="'/videos?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">
                  <iv-icon type="ios-remove"></iv-icon>
                  <a class="nav-link" :href="'/videos?categoryId='+category_level2.id" >{{ category_level2.name}}</a>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">
                      <iv-icon type="ios-remove"></iv-icon>&nbsp;
                      <a class="nav-link" :href="'/videos?categoryId='+category_level3.id" >{{ category_level3.name }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
              <iv-icon type="ios-stopwatch"></iv-icon>
              <a style="color: #777" :href="'/timeline'" >时光轴</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
              <iv-icon type="logo-snapchat"></iv-icon>
              <a style="color: #777" :href="'/article/1'" >关于</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="sidebar-toc-list" ref="list" v-if="isArticle">
            <div class="site-nav" @click="showList=!showList">
              <p>
                <iv-icon type="ios-options"></iv-icon>
                文章目录
                <iv-icon type="md-arrow-dropdown" v-if="showList"></iv-icon>
                <iv-icon type="md-arrow-dropright" v-if="!showList"></iv-icon>
              </p>
            </div>
            <div id="sidebar-toc" class="list" @click.prevent v-show="showList"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click.prevent="toggleSideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'

export default {
  name: 'side-bar',
  data () {
    return {
      keyword: '',
      show: false,
      showNav: false,
      showArticle: false,
      showVideo: false,
      showList: true,
      isArticle: false
    }
  },
  props: {
    articleCategoryList: Array,
    videoCategoryList: Array
  },
  mixins: [mixin],
  beforeRouteUpdate (to, from, next) {
    next()
  },
  created () {
    this.initList()
  },
  methods: {
    initList () {
      let path = this.$route.path.split('/')
      if (path[1] === 'article') {
        this.isArticle = true
      }
    },
    rootRouterLink (category) {
      let router = {}
      router.name = category.category_type
      return router
    },
    routerLink (category) {
      let router = {}
      router.name = category.category_type
      router.params = {}
      router.params['id'] = category.id
      return router
    },
    toggleSideBar () {
      this.show = !this.show
      this.showNav = !(this.$route.name === 'article' ||
          this.$route.name === 'video' ||
          this.$route.name === 'movie' ||
          this.$route.name === 'album'
      )
    },
    search () {
      let path = this.$route.path.split('/')
      if (path[1] === 'search') {
        window.location.href = window.SITE_CONFIG.baseUrl + '/search?keyword=' + this.keyword
      } else {
        this.$router.replace({name: 'search', query: {keyword: this.keyword}})
      }
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";
</style>

<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
          <img src="../../../assets/background.jpg" alt="">
          <div class="site-info">
            <h1 class="site-name" style="font-family: Hiragana Sans GB,serif;">Jinhx</h1>
            <h1 class="site-desc">看山是山！看山不是山！看山还是山！</h1>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <iv-input placeholder="搜索点什么..." style="width: 230px;border: #2b85e4" class="active" v-model="keyword" @keyup.enter.native="search()">
              <iv-icon type="ios-search" slot="suffix" color="blue" @click="search()" style="cursor:pointer;"/>
            </iv-input>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
<!--              <iv-icon type="ios-home-outline"></iv-icon>-->
              <a style="color: #777" :href="'/'" >首页</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav" @click="showArticle=!showArticle">
            <p>
<!--              <iv-icon type="ios-paper-outline"></iv-icon>-->
              文章
              <iv-icon type="md-arrow-dropdown" v-if="showArticle"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showArticle"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" v-show="showArticle" style="margin-left: 10px;">
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
<!--        <div class="sidebar-menus">-->
<!--          <div class="site-nav" @click="showOther=!showOther">-->
<!--            <p>-->
<!--&lt;!&ndash;              <iv-icon type="ios-more"></iv-icon>&ndash;&gt;-->
<!--              其他-->
<!--              <iv-icon type="md-arrow-dropdown" v-if="showOther"></iv-icon>-->
<!--              <iv-icon type="md-arrow-dropright" v-if="!showOther"></iv-icon>-->
<!--            </p>-->
<!--          </div>-->
<!--          <div class="site-nav" style="margin-left: 10px;border: none" @click="showVideo=!showVideo" v-show="showOther">-->
<!--            <p>-->
<!--              <iv-icon type="ios-videocam-outline"></iv-icon>-->
<!--              视频-->
<!--              <iv-icon type="md-arrow-dropdown" v-if="showVideo"></iv-icon>-->
<!--              <iv-icon type="md-arrow-dropright" v-if="!showVideo"></iv-icon>-->
<!--            </p>-->
<!--          </div>-->
<!--          <ul class="nav-menu" style="margin-left: 20px" v-show="showVideo">-->
<!--            &lt;!&ndash; 类别导航 &ndash;&gt;-->
<!--            <li class="nav-dropdown-container" v-for="category_level1 in videoCategoryList" :key="category_level1.id">-->
<!--              <iv-icon type="ios-remove"></iv-icon>&nbsp;-->
<!--              <a class="nav-link" :href="'/videos?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>-->
<!--              </a>-->
<!--              <ul class="nav-dropdown">-->
<!--                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">-->
<!--                  <iv-icon type="ios-remove"></iv-icon>-->
<!--                  <a class="nav-link" :href="'/videos?categoryId='+category_level2.id" >{{ category_level2.name}}</a>-->
<!--                  <ul class="nav-dropdown">-->
<!--                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">-->
<!--                      <iv-icon type="ios-remove"></iv-icon>&nbsp;-->
<!--                      <a class="nav-link" :href="'/videos?categoryId='+category_level3.id" >{{ category_level3.name }}</a>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
<!--          <div class="site-nav" style="margin-left: 10px;border: none" v-show="showOther">-->
<!--            <p>-->
<!--              更多功能敬请期待！-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
        <div class="sidebar-menus">
          <div class="site-nav" @click="showVideo=!showVideo">
            <p>
<!--              <iv-icon type="ios-videocam-outline"></iv-icon>-->
              视频
              <iv-icon type="md-arrow-dropdown" v-if="showVideo"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showVideo"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" style="margin-left: 20px" v-show="showVideo">
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
<!--        <div class="sidebar-menus">-->
<!--          <div class="site-nav">-->
<!--            <p>-->
<!--              &lt;!&ndash;              <iv-icon type="ios-timer-outline"></iv-icon>&ndash;&gt;-->
<!--              <a style="color: #777" :href="'/friendlink'" >友链</a>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
<!--              <iv-icon type="ios-timer-outline"></iv-icon>-->
              <a style="color: #777" :href="'/timeline'" >时光轴</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
<!--              <iv-icon type="ios-alert-outline"></iv-icon>-->
              <a style="color: #777" :href="'/about'" >关于</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav">
            <p>
<!--              <iv-icon type="ios-alert-outline"></iv-icon>-->
              <a style="color: #777" :href="'/messagewall'" >留言墙</a>
            </p>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="sidebar-toc-list" ref="list" v-if="isArticle">
            <div class="site-nav" @click="showList=!showList">
              <p>
<!--                <iv-icon type="ios-options"></iv-icon>-->
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
      showOther: false,
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

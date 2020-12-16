<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
          <img src="../../../assets/background.jpg" alt="">
          <div class="site-info">
            <h1 class="site-name">LuoYu Blog</h1>
            <h1 class="site-desc">看山是山！看山不是山！看山还是山！</h1>
          </div>
        </div>
        <div class="sidebar-menus">
          <div class="site-nav" @click="showArticle=!showArticle">
            <p>
              <iv-icon type="ios-book"></iv-icon>
              文章导航
              <iv-icon type="md-arrow-dropdown" v-if="showArticle"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showArticle"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" v-show="showArticle">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in articleCategoryList" :key="category_level1.id">
              <iv-icon type="minus-round"></iv-icon>&nbsp;
              <a class="nav-link" :href="'/articles?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">
                  <iv-icon type="minus-round"></iv-icon>
                  <a class="nav-link" :href="'/articles?categoryId='+category_level2.id" >{{ category_level2.name}}</a>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">
                      <iv-icon type="minus-round"></iv-icon>&nbsp;
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
              视频导航
              <iv-icon type="md-arrow-dropdown" v-if="showVideo"></iv-icon>
              <iv-icon type="md-arrow-dropright" v-if="!showVideo"></iv-icon>
            </p>
          </div>
          <ul class="nav-menu" v-show="showVideo">
            <!-- 类别导航 -->
            <li class="nav-dropdown-container" v-for="category_level1 in videoCategoryList" :key="category_level1.id">
              <iv-icon type="minus-round"></iv-icon>&nbsp;
              <a class="nav-link" :href="'/videos?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>
              </a>
              <ul class="nav-dropdown">
                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">
                  <iv-icon type="minus-round"></iv-icon>
                  <a class="nav-link" :href="'/videos?categoryId='+category_level2.id" >{{ category_level2.name}}</a>
                  <ul class="nav-dropdown">
                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">
                      <iv-icon type="minus-round"></iv-icon>&nbsp;
                      <a class="nav-link" :href="'/videos?categoryId='+category_level3.id" >{{ category_level3.name }}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="sidebar-menus">
<!--          <div class="site-nav">-->
<!--            <p>-->
<!--              <iv-icon type="map"></iv-icon>-->
<!--              阅读导航-->
<!--            </p>-->
<!--          </div>-->
<!--          <ul class="nav-menu">-->
<!--            &lt;!&ndash; 阅读导航 &ndash;&gt;-->
<!--            <li class="nav-dropdown-container" v-for="category_level1 in bookCategoryList" :key="category_level1.id">-->
<!--              <iv-icon type="minus-round"></iv-icon>&nbsp;-->
<!--              <a class="nav-link" :href="'/books?categoryId='+category_level1.id" >{{category_level1.name}}<span class="arrow"></span>-->
<!--              </a>-->
<!--              <ul class="nav-dropdown">-->
<!--                <li v-for="category_level2 in category_level1.children" :key="category_level2.id">-->
<!--                  <iv-icon type="minus-round"></iv-icon>-->
<!--                  <a class="nav-link" :href="'/books?categoryId='+category_level2.id" >{{ category_level2.name}}</a>-->
<!--                  <ul class="nav-dropdown">-->
<!--                    <li v-for="category_level3 in category_level2.children"  :key="category_level3.id">-->
<!--                      <iv-icon type="minus-round"></iv-icon>&nbsp;-->
<!--                      <a class="nav-link" :href="'/books?categoryId='+category_level3.id" >{{ category_level3.name }}</a>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </li>-->
<!--          </ul>-->
          <div class="sidebar-toc-list" ref="list">
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
      show: false,
      showNav: false,
      showArticle: false,
      showVideo: false,
      showList: true
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
  methods: {
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
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";
</style>

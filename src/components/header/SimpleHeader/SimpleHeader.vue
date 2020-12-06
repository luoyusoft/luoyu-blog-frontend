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
      <span class="title">LuoYu Blog</span>
<!--      <span class="motto">看山是山！看山不是山！看山还是山！</span>-->
    </router-link>
    <ul id="nav">
      <li><a href="/" class="nav-link contribute">首页</a></li>
      <li><a href="/articles" class="nav-link contribute">文章分类</a></li>
      <!--      <li><a href="/books" class="nav-link contribute">阅读</a></li>-->
      <li><a href="/timeline" class="nav-link contribute">时光轴</a></li>
      <li><a href="/article/1" class="nav-link contribute">关于</a></li>
      <li style="margin-left: 100px">
        <form id="search-form" action="/articles/search">
      <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
        <input
        type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" name="keyword" v-model="keyword" @keyup.enter="submit"
        autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
        aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;">
        <button class="search-button"  @click="search()">搜索</button>
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
    <sidebar ref="sidebar" :articleCategoryList="articleCategoryList" :bookCategoryList="bookCategoryList"></sidebar>
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
      show: true,
      articleCategoryList: [],
      bookCategoryList: [],
      keyword: ''
    }
  },
  created () {
    this.listCategory()
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
              this.bookCategoryList.push(category)
            }
          })
          this.articleCategoryList = treeDataTranslate(this.articleCategoryList)
          this.bookCategoryList = treeDataTranslate(this.bookCategoryList)
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
    color: #878d99;
    margin-left: 10px;
  }
  .search-button:hover {
    color: #2579d1;
    cursor: pointer;
  }
  .search-button:focus {
    outline: none;
  }
</style>

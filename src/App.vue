<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      // 控制视图是否显示的变量
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      // 先关闭，
      this.isRouterAlive = false
      this.$nextTick(function () {
        // 再打开
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
  @import "assets/css/reset.css";
</style>

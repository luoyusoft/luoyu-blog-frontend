<template>
  <div>
    <div v-for="year in timelineList" :key="year.year" v-if="year.months.length > 0">
      <archive-list-time-title :date="year.year" :count="year.count"></archive-list-time-title>
      <div v-for="month in year.months" :key="month.month" v-if="month.posts.length > 0">
        <archive-list-time-title :date="month.month + '月'" :count="month.count" :dateType="'month'"></archive-list-time-title>
        <archive-list-cell v-for="post in month.posts" :post="post"
                           :key="post.title"></archive-list-cell>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ArchiveListCell from '@/components/views/Archive/ArchiveListCell'
import ArchiveListTimeTitle from '@/components/views/Archive/ArchiveListTimeTitle'

export default {
  data () {
    return {
      timelineList: []
    }
  },
  components: {
    'archive-list-time-title': ArchiveListTimeTitle,
    'archive-list-cell': ArchiveListCell
  },
  created () {
    this.listTimeline()
  },
  methods: {
    listTimeline () {
      this.$http({
        url: this.$http.adornUrl('/timeline'),
        method: 'get',
        params: this.$http.adornParams()
      }).then((response) => {
        if (response && response.code === 200) {
          this.timelineList = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

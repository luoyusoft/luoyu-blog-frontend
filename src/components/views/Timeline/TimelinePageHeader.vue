<template>
  <div>
    <section-title :mainTitle="'时光轴'" :subTitle="'随便瞅瞅'">
<!--      <title-menu-timeline slot="menu"></title-menu-timeline>-->
    </section-title>
  </div>
</template>

<script type="text/ecmascript-6">
import SectionTitle from '@/components/views/SectionTitle/SectionTitle'
import TitleMenuTimeline from '@/components/views/SectionTitle/TitleMenuTimeline'
import ClassifyMenu from '@/components/views/Classify/ClassifyMenu'

export default {
  components: {
    'section-title': SectionTitle,
    'title-menu-timeline': TitleMenuTimeline,
    'classify-menu': ClassifyMenu
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<template>
  <div class="tag-wall">
    <panel :title="'标签墙'">
      <div slot="content" class="content">
        <iv-tag v-for="(tag, index) in tagList" type="dot" :color="index | mapTagColor" :key="index" style="border: 0 solid red !important;background-color: rgba(255,0,0,0) !important;">{{ tag.name +' ['+ tag.linkNum + ']'}}
        </iv-tag>
      </div>
    </panel>
  </div>
</template>

<script type="text/ecmascript-6">
import Panel from '@/components/utils/Panel'
import {mixin} from '@/utils/index'
export default {
  props: {
    module: Number
  },
  data () {
    return {
      tagList: []
    }
  },
  components: {
    'panel': Panel
  },
  mixins: [mixin],
  created () {
    this.listTags()
  },
  methods: {
    listTags () {
      let params = {}
      params.module = this.module
      this.$http.listTags(params).then((response) => {
        if (response && response.code === 200) {
          this.tagList = response.data
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .tag-wall
    .content
      padding 5px 20px
      .ivu-tag-text
        color $color-gradually-gray-81

</style>

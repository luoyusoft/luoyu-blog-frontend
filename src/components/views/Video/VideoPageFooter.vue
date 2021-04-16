<template>
  <div>
    <social-section :type="'Video'" :postId="postId"></social-section>
  </div>
</template>

<script type="text/ecmascript-6">
import SocialSection from '@/components/views/Comment/SocialSection'

export default {
  components: {
    'social-section': SocialSection
  },
  props: {
    postId: Number
  }
}
</script>

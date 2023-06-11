<template lang="pug">
.pano-create-main
  .title.h3 新建全景图
  pano-form(url='pano' :id='id' :get-data-url="`public/pano/${id}`")
</template>

<script>
import PanoForm from './components/pano-form.vue'

export default {
  components: {
    PanoForm
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>
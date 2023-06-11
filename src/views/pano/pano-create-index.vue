<template lang="pug">
.pano-create-main
  .title.h3 新建全景图
  pano-form(url='pano')
</template>

<script>
import PanoForm from './components/pano-form.vue'

export default {
  components: {
    PanoForm
  }
}
</script>
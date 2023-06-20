<template lang="pug">
.pano-viewer-test
  pano-viewer-panel(:pano='pano' :meta='meta')
</template>

<script>
import PanoViewerPanel from './components/pano-viewer-panel.vue'

export default {
  components: {
    PanoViewerPanel
  },
  data() {
    return {
      pano: require('./220501-1532.jpg'),
      meta: {
        longitude: 113,
        latitude: 30,
        title: 'test',
        content: 'asdfadfadf content'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.pano-viewer-test
  height: 100%
  width: 100%
</style>
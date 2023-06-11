<template lang="pug">
.pano-viewer-test
  pano-viewer(:img='pano')
</template>

<script>
export default {
  data() {
    return {
      pano: require('./220501-1532.jpg')
    }
  }
}
</script>

<style lang="sass" scoped>
.pano-viewer-test
  height: 100%
  width: 100%
</style>
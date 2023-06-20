<template lang="pug">
.pano-viewer-main(v-loading='loading')
  pano-veiwer-panel(v-if='pano' :pano='pano' :meta='panoMeta')
</template>

<script>
import PanoVeiwerPanel from './components/pano-viewer-panel.vue'

export default {

  components: {
    PanoVeiwerPanel
  },

  data() {
    return {
      panoMeta: false,
      pano: false,
      loading: false,
    }
  },
  mounted() {
    const {
      id
    } = this
    this.getPanoById(id)
  },
  computed: {
    id() {
      return this.$route.params.id
    },

  },
  methods: {
    getPanoById(id) {
      this.loading = true
      this.$axios({
        url: `public/pano/${id}`,
      }).then(resp => {
        this.panoMeta = resp.data
        this.pano = this.getUploadedResource(`pano/${this.panoMeta.file}`)

      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.pano-viewer-main
  height: 100%
  widows: 100%
  position: relative
  .el-icon-info
    position: absolute
    font-size: 50px
    right: 2%
    top: 2%
    cursor: pointer
    color: #d0d0d0	
  .el-icon-info:hover
    opacity: .8

</style>
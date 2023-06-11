<template lang='pug'>
.pano-editor-index-main(v-loading='!pano || loading')
  pano-viewer(v-if='pano' :img='getUploadedResource(`pano/${pano.fileId}`)' :cfg='panoCfg' @click.prevent.stop='panoClicked')
</template>

<script>
import _ from 'lodash'

export default {
  created() {
    this.panoCfg = {
      navbar: false
    };
  },
  data() {
    return {
      pano: false,
      loading: false,
      drawer: {
        visible: false,
      }
    }
  },
  mounted() {
    const {
      id
    } = this
    this.getPanoById(id)
  },
  computed: {
    panoDesc() {
      return _.get(this, 'pano.content')
    },
    id() {
      return this.$route.params.id
    },

  },
  methods: {
    panoClicked(e, data) {
      console.log(data)
    },
    getPanoById(id) {
      this.loading = true
      this.$axios({
        url: `public/pano/${id}`,
      }).then(resp => {
        this.pano = resp.data
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.pano-editor-index-main
  position: relative
  height: 100%
  box-sizing: border-box
  
</style>

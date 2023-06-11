<template lang="pug">
.personal-index-main
  .block.mt30.mb30
    artical-list
  .block.mt30.mb30
    pano-list
  .block.mt30.mb30
    photo-list
</template>

<script>
import ArticalList from './components/artical-list.vue'
import PanoList from './components/pano-list.vue'
import PhotoList from './components/photo-list.vue'

export default {
  components: {
    ArticalList,
    PanoList,
    PhotoList,
  },
  created() {
    
  },
  data() {
    return {}
  },
  methods: {
    getQiniuFileList() {
      this.$axios({
        url: 'system/qiniu/key',
        method: "POST",
        params: {
          key: 'aadfadf'
        }
      }).then(resp => {
        console.log(resp)
      })
    },
    
  }
}
</script>

<style lang="sass" scoped>
.personal-index-main
  padding: 30px

.flex-row
  display: flex
  flex-flow: row wrap
</style>
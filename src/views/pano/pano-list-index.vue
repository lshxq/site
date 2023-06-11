<template lang="pug">
.pano-list-main
  el-button(type='primary') 上传全景图
</template>

<script>
export default {
  methods: {
    panoUpload() {
      const that = this
      const image = {}
      that.upload(image, 'pano').then(resp => {
        console.log(that.getUploadedResource(resp.key))
      }).catch(ex => {
        that.$message.error(ex)
      }).finally(() => {
      })
    }
  }
}
</script>
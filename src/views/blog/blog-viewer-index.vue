<template lang="pug">
.blog-viewer-index-main(v-loading='loading')
  .narrow
    sy-left-right
      template(v-slot:left)
        .title {{blog.title}}
      template(v-slot:right)
        .created {{long2datetime(blog.created)}}
        
    m-viewer.mavon-view-panel(:markdown='blog.content')
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      loading: false,
      articalResp: false
    }
  },
  computed: {
    blogId() {
      return this.$route.params.id
    },
    blog() {
      const markdown = _.get(this, 'articalResp.data', {})
      return markdown 
    }
  },
  mounted() {
    this.getBlogById(this.blogId)
  },
  methods: {
    getBlogById(blogId) {
      const that = this
      that.loading = true
      that.$axios({
        url: `public/artical/${blogId}`
      }).then(resp => {
        that.articalResp = resp
      }).finally(() => {
        that.loading = false
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.blog-viewer-index-main
  user-select: none
  background: #fafafa
  height: 100%
  .narrow
    background: white
    width: 80%
    margin: 0 auto
    .title
      padding: 10px
      font-size: 40px
    .created
      color: gray
      padding: 10px
    .mavon-view-panel
</style>
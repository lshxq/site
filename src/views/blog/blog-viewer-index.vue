<template lang="pug">
.blog-viewer-index-main(v-loading='loading')
  .narrow
    sy-left-right
      template(v-slot:left)
        .title {{blog.title}}
      template(v-slot:right)
        .created {{long2datetime(blog.created)}}
        
    mavon-editor.mavon-view-panel(
      :value='blog.content' 
      default-open='preview'
      :editable='false'
      :toolbarsFlag='false'
      :subfield='false'
      :boxShadow='false'
      previewBackground='white'
      :html='false')
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
      return _.get(this, 'articalResp.data', {})
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
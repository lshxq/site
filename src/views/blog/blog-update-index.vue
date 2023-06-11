<template lang="pug">
.blog-creation-index-main
  .header 新建文章
  .form-panel
    blog-form(url='artical' :id='blogId' :get-data-url="`public/artical/${blogId}`")
</template>

<script>
import BlogForm from './components/blog-form.vue'

export default {
  components: {
    BlogForm,
  },
  created() {

  },
  computed: {
    blogId() {
      return this.$route.params.id
    }
  },
}
</script>

<style lang="sass" scoped>
  .blog-creation-index-main
    .header
      display: flex
      align-items: center
      padding: 0 30px
      font-weight: bolder
      height: 60px
      background-image: linear-gradient(#f9f9f9, white, #f9f9f9)
    .form-panel
      padding: 30px
</style>
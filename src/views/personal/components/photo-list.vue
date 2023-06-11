<template lang="pug">
.pano-list-main
  .title.h3 照片管理
  sy-left-right.mb10
    template(slot='left')
      .flex-row
        sy-search-input.mr10(v-model='query.keyword' placeholder='请输入关键字')
    template(slot='right')
      el-button(type='primary' @click='goto("blog-creation")') 新建文章
  sy-pagin-data(url='photo/list' :query='query')
    template(v-slot:='scope')
      .panoramas
        .item(v-for='(photo, idx) of scope.data' :key='idx') {{photo}} {{idx}}
            

</template>

<script>
export default {
  created() {

  },
  data() {
    return {
      query: {
        orderBy: ''
      }
    };
  },
  methods: {

  }
};
</script>

<style lang="sass" scoped>
.panoramas
  display: flex
  flex-flow: row wrap
  .item
    position: relative
    margin: 10px
    width: 380px
    height: 250px
    


</style>

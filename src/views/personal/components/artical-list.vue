<template lang="pug">
.artical-list-main
  .title.h3 文章管理
  sy-left-right.mb10
    template(slot='left')
      .flex-row
        sy-search-input.mr10(v-model='query.keyword' placeholder='请输入关键字')
        sy-options(v-model='query.type' type='1' :options='blogTypeOptions' label='文件类型')
    template(slot='right')
      el-button(type='primary' @click='goto("blog-creation")') 新建文章

  sy-pagin-table(
    url='artical/list'
    :query='query'
    :columns='articalColumns'
  )
    template(v-slot:action='scope')
      el-button(type='primary' size='small' @click='editArtical(scope.data.row)') 编辑
      el-button(type='success' size='small' @click='showArtical(scope.data.row)') 预览

</template>

<script>
import ConstantHelper from '@/constant-helper.js'
import BlogConstant from '@/views/blog/blog-constant.js'

export default {
  created() {
    this.blogTypeOptions = ConstantHelper.options(BlogConstant.type)
    this.articalColumns = [
      {
        prop: 'title',
        label: '标题'
      },
      {
        label: '分类',
        getContent(data) {
          return ConstantHelper.getLabel(BlogConstant.type, data.row.type)
        },
        width: 100
      },
      {
        label: '创建日期',
        getContent(data) {
          return new Date(data.row.created).format()
        },
        width: 170
      },
      {
        label: '更新日期',
        getContent(data) {
          return new Date(data.row.updated).format()
        },
        width: 170
      },
      {
        label: '操作',
        slot: 'action',
        width: 200
      }
    ]
  },
  data() {
    return {
      query: {
        type: '',
        keyword: '',
        orderBy: 'CREATED DESC'
      }
    }
  },
  methods: {
    showArtical(artical) {
      this.goto("blog-viewer", {
        winTarget: `blog-viewer-${artical.id}`,
        params: {
          id: artical.id
        }
      })
    },
    editArtical(artical) {
      this.goto("blog-update", {
        params: {
          id: artical.id
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>

.flex-row
  display: flex
  flex-flow: row wrap
</style>
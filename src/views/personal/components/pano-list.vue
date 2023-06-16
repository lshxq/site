<template lang="pug">
.artical-list-main
  .title.h3 全景图管理
  sy-left-right.mb10
    template(slot='left')
      .flex-row
        sy-search-input.mr10(v-model='query.keyword' placeholder='请输入关键字')
    template(slot='right')
      el-button(type='primary' @click='goto("pano-create")') 新建全景图

  sy-pagin-table(
    url='pano/list'
    :query='query'
    :columns='articalColumns'
  )
    template(v-slot:action='scope')
      el-button(type='primary' size='small' @click='editPano(scope.data.row)') 编辑
      el-button(type='success' size='small' @click='showPano(scope.data.row)') 预览

</template>

<script>

export default {
  created() {
    this.articalColumns = [
      {
        prop: 'title',
        label: '标题'
      },
      {
        prop: 'high',
        label: '海拔高度'
      },
      {
        prop: 'longitude',
        label: '经度'
      },
      {
        prop: 'latitude',
        label: '纬度'
      },
      {
        label: '拍摄日期',
        getContent(data) {
          return new Date(data.row.shotDate).format()
        },
        width: 170
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
        keyword: ''
      }
    }
  },
  methods: {
    showPano(pano) {
      this.goto("pano-viewer", {
        winTarget: `pano-viewer-${pano.qiniuId}`,
        params: {
          id: pano.id
        }
      })
    },
    editPano(pano) {
      this.goto("pano-update", {
        params: {
          id: pano.id
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
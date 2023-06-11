<template lang="pug">
.blog-form-main-panel(v-loading='locking')
  el-form(:rules='rules' ref='formRef' :model='modified' label-width='100px')
    el-form-item(label='标题' prop='title')
      el-input(v-model.trim='modified.title')
    el-form-item(label='类型' prop='type')
      sy-options(type='2' :options='articalTypeOptions' v-model='modified.type')
    el-form-item(label='正文' prop='content')
      editor.mavon-editor-panel(v-model='modified.content' image-upload-folder='blog')
    el-form-item()
      el-button(type='primary' @click='apply') 保存
      el-button(@click='canceled') 取消

</template>

<script>
import tsy from 'tsyvue'
const {
  FormMixin
} = tsy

export default {
  mixins: [FormMixin],
  created() {
    this.rules = {
      title: [
        { required: true, message: "请输入文章标题", trigger: "blur" },
        { min: 2, max: 64, message: "长度在 2 到 64 个字符", trigger: "blur" },
      ],
      content: [
        { required: true, message: "请输入文章", trigger: "blur" },
        { required: true, message: "请书写文章", trigger: "blur" },
      ],
    };
    this.articalTypeOptions = [{
      label: '生活分享',
      value: 1,
    }, {
      label: '技术分享',
      value: 2,
    }]
  },
  data() {
    return {
      modified: {
        title: '',
        type: this.$route.query.type,
        content: ''
      },
      imageCropperData: false
    }
  },
  computed: {
    typeComp() {
      return this.$route.query.type
    }
  },
  methods: {
    submitted() {
      this.goto("personal")
    },
    canceled() {
      this.goto("personal")
    },
  }
}
</script>

<style lang="sass" scoped>

</style>
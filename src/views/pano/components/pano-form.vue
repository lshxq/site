<template lang="pug">
.pano-form-main-panel(v-loading='locking || uploading')
  el-form(:rules='rules' ref='formRef' :model='modified' label-width='100px')
    el-form-item(label='全景图' v-if='editMode')
      el-upload(
        action=''
        :http-request='uploadPano'
        drag
        :multiple='false')
        i.el-icon-upload
        .el-upload__text 将文件拖到此处，或<em>点击上传</em>
        .upload__tip( slot="tip") 只能上传jpg/png文件

    el-form-item(label='全景缩略图'  v-if='editMode')
      el-upload(
        action=''
        :http-request='uploadPanoPreview'
        drag
        :multiple='false')
        i.el-icon-upload
        .el-upload__text 将文件拖到此处，或<em>点击上传</em>
        .upload__tip( slot="tip") 只能上传jpg/png文件

    el-form-item(label='标题' prop='title')
      el-input(v-model.trim='modified.title')

    el-form-item(label='正文' prop='content')
      m-editor.mavon-editor-panel(v-model='modified.content' image-upload-folder='pano')

    el-form-item(label='海拔高度' prop='high')
      el-input-number(v-model='modified.high' :min='-100' :max='3000')
    
    el-form-item(label='拍摄日期' prop='shotDate')
      el-date-picker(v-model='modified.shotDate' type="datetime" placeholder="选择拍摄日期" format='yyyy-MM-dd hh:mm:ss')
    el-form-item(label='定位')
      .ditu-panel
        baidu-map.h0(:zoom='13' :center='mapCenter' @click='mapClicked')
          bm-navigation(anchor="BMAP_ANCHOR_TOP_LEFT")
          bm-city-list(anchor="BMAP_ANCHOR_TOP_RIGHT")
          bm-geolocation(anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true")
          bm-marker(v-if='modified.longitude && modified.latitude' :position='{lng: modified.longitude, lat: modified.latitude}' :dragging="true" @dragend='updateMarkerPosition')

    el-form-item()
      el-button(type='primary' @click='apply') 保存
      el-button(@click='canceled') 取消

</template>

<script>
import tsy from 'tsyvue'
const {
  FormMixin
} = tsy
import utils from '@/utils.js'

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
  },
  data() {
    return {
      uploading: false,
      modified: {
        title: '',
        content: '',
        qiniuKey: '',
        latitude: 0, // 纬度
        longitude: 0 // 经度
      },
      mapCenter: {
        lat: 0,
        lng: 0
      }
    }
  },
  computed: {
  },
  mounted() {
    
  },
  methods: {
    dataLoaded(model) {
      this.mapCenter.lat = model.latitude
      this.mapCenter.lng = model.longitude
      return model
    },
    mapClicked(event) {
      this.updateMarkerPosition(event)
    },
    updateMarkerPosition(event) {
      const {
        lat,
        lng
      } = event.point
      this.modified.longitude = lng
      this.modified.latitude = lat
    },
    uploadCore(param, filename) {
      console.log(param, filename)
      
      const that = this
      that.uploading = true
      
      return that.upload(param.file, 'pano', filename, uploadInfo => {
        console.log(uploadInfo)
      }).then(resp => {
        const {key} = resp
        that.modified.qiniuKey = key
        that.uploading = false
      }).finally(() => {
        that.loading = false
      })
      
    },
    uploadPano(param) {
      const that = this
      const {
        id
      } = that
      const {
        file
      } = param
      if (file.size > 50 * 1024 * 1024) {
        that.$message.error("全景图不能大于50M")
        return 
      } 
      const filename = `${id}${utils.getFileExtention(file.name)}`
      that.uploadCore(param, filename).then(resp => {
        console.log(resp)
        that.modified.file = filename
      })
    },
    uploadPanoPreview(param) {
      const that = this
      const {
        id
      } = that
      const {
        file
      } = param
      if (file.size > 2 * 1024 * 1024) {
        that.$message.error("全景图缩略图不能大于2M")
        return 
      } 
      const filename = `${id}-preview${utils.getFileExtention(param.file.name)}`
      that.uploadCore(param, filename).then(resp => {
        console.log(resp)
        that.modified.preview = filename
      })
    },
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
.pano-form-main-panel
  padding: 30px
.ditu-panel
  height: 600px
</style>
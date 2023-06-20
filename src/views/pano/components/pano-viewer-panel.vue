<template lang="pug">
.pano-viewer-panel
  pano-viewer(:img='pano' :cfg='panoCfg')
  
  .icon-info(@click='drawer.visible = true') i

  el-drawer(title="全景信息" direction='rtl' v-model="drawer.visible")
    .drawer-panel
      .pano-info
        .row
          .label 标题
          .value {{meta.title}}
        .row
          .label 描述
          .value 
            m-viewer.mavon-view-panel(:markdown='meta.content')
        .row
          .label 拍色日期
          .value {{long2datetime(meta.shotDate)}}
        .row
          .label 海拔高度
          .value {{meta.high}}米
        .row
          .label 上传日期
          .value {{long2datetime(meta.created)}}

      #ditu-container.ditu-panel(v-if='showDitu')
        sy-easy-ditu(:zoom='13' :center='meta' :markers='[meta]' :access-key="ak")
    
</template>
    
<script>

export default {
  props: {
    pano: String,
    meta: Object
  },

  created() {
    this.panoCfg = {
      autorotateDelay: 400,
      autorotateSpeed: "0.1rpm",
    };
  },
  data() {
    return {
      drawer: {
        visible: false,
      }
    }
  },

  computed: {
    ak() {
      return process.env.VUE_APP_BAIDU_ACCESS_KEY
    },
    showDitu() {
      const {
        latitude,
        longitude
      } = this.meta
      return latitude && longitude
    }
  },
}
</script>
    
<style lang="sass" scoped>
.pano-viewer-panel
  height: 100%
  widows: 100%
  position: relative
  .icon-info
    position: absolute
    font-size: 50px
    right: 2%
    top: 2%
    cursor: pointer
    color: #d0d0d0
    border-radius: 50%
    width: 50px
    height: 50px
    background: white
    font-size: 40px
    text-align: center
    vertical-align: middle
  .icon-info:hover
    opacity: .8

.drawer-panel
  height: 100%
  position: relative
  
  .ditu-panel
    height: 50%
    border: 1px solid gray
    position: absolute
    bottom: 0
    right: 0
    left: 0

  .pano-info
    overflow: auto
    height: 50%
    .row
      display: flex
      margin-bottom: 20px
      .label:after
        content: ' : '
      .label
        flex: 0 0 120px
        text-align: right
        padding-right: 10px
      .value
        flex: 1 1 auto
        color: gray

.mavon-view-panel
  box-shadow：none
</style>
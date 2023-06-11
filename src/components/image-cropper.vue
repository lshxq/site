<template lang="pug">
el-dialog(:visible.sync='visible' title='图片剪切' :width='`${windowWidth}px`' @closed='closed')
  template
    .image-cropper(:style='panelStyle')
      vueCropper(
        ref="cropperRef"
        :img="img"
        :canScale='true'
        :autoCrop='true'
        :autoCropWidth='imageWidth'
        :autoCropHeight='imageHeight'
        :canMoveBox='true'
        :canMove='true'
        :centerBox='false'
        :info='true'
        :fixed-box='fixedSize'
        :max-img-size='maxImgSize')
    sy-left-right.mt10
      template(slot='right')
        el-button(type='success' @click='$refs.cropperRef.rotateLeft()') 向左转
        el-button(type='success' @click='$refs.cropperRef.rotateRight()') 向右转
        el-button(type='primary' @click='applied') 确定
</template>

<script>
export default {
  props: {
    img: null,
    windowWidth: {
      type: Number,
      default() {
        return 1000
      }
    },
    imageWidth: {
      type: Number,
      default() {
        return 200;
      }
    },
    imageHeight: {
      type: Number,
      default() {
        return 200;
      }
    },
    fixedSize: {
      type: Boolean,
      default() {
        return true
      }
    },
    maxImgSize: {
      type: Number,
      default() {
        return 2000
      }
    }
  },
  data() {
    return {
      visible: true,
    }
  },
  computed: {
    panelStyle() {
      const {
        imageHeight,
        windowWidth
      } = this
      return {
        height: `${imageHeight + 100}px`,
        width: `${windowWidth-40}px`
      }
    }
  },
  methods: {
    applied() {
      const that = this
      that.$refs.cropperRef.getCropBlob(data => {
        that.$emit('applied', data)
      })
    },
    closed() {
      this.$emit('canceled')
    }
  }
}
</script>

<style lang="sass" scoped>
.image-cropper
  border: 1px solid lightgray
  min-height: 300px
</style>
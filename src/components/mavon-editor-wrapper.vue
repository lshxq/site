<template lang="pug">
.mavon-editor-main
  mavon-editor.mavon-editor-panel(:model-value='valueComputed' @update:model-value='updateValue' ref='mdRef' @imgAdd="imgAdd" :toolbars='toolbars'  v-bind='$attrs')
  el-dialog(v-if='imageCropperData' v-model='visible' @closed='imageCanceled' width='850')
    .image-cropper
      sy-img-cropper(ref='cropperRef' :img='imageCropperData.image')
    template(v-slot:footer)
      sy-left-right
        template(v-slot:right)
          el-button(type='primary' @click='imageUpload') 确定

</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    modelValue: String,
    imageUploadFolder: {
      type: String,
      default() {
        return "mavon-editor";
      },
    },
    toolbars: {
      type: Object,
      default() {
        return {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: false, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        };
      },
    },
  },
  data() {
    return {
      imageCropperData: null,
      visible: true
    };
  },
  computed: {
    valueComputed: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.updateValue(value);
      },
    },
  },
  methods: {
    updateValue(value) {
      this.$emit("update:modelValue", value);
    },
    imageCanceled() {
      const that = this;
      const { pos } = that.imageCropperData;
      that.imageCropperData = null;
      const md = that.$refs.mdRef;
      md.$imgDel(pos);
    },

    imageUpload() {
      const base64 = this.$refs.cropperRef.getImageData()
      const file = utils.dataURLtoFile(base64, 'mavon-img-cropper')
      const that = this;
      const { imageUploadFolder } = that;
      const { pos } = that.imageCropperData;
      const md = that.$refs.mdRef;
      that
        .upload(file, imageUploadFolder)
        .then((resp) => {
          md.$img2Url(
            pos,
            that.getUploadedResource(`${imageUploadFolder}/${resp.data.id}`)
          );
        })
        .catch((ex) => {
          that.$message.error(ex);
        })
        .finally(() => {
          that.imageCropperData = null;
        });
    },
    imgAdd(pos, file) {
      const that = this;
      console.log(file);
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
        that.$message({
          message: "图片类型要求：jpeg、jpg、png",
          type: "error",
        });
        return false;
      }
      //转化为blob
      const reader = new FileReader();
      reader.onload = (e) => {
        let data;
        if (typeof e.target.result === "object") {
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        that.imageCropperData = {
          pos,
          image: data,
        };
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>


<style lang="sass" scoped>
.image-cropper
  width: 100%
  height: 400px
</style>
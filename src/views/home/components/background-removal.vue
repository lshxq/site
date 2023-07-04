<template lang="pug">
.background-removal-main
    img.img-src(:src="srcImg", alt="" @click='selectImage')
    span 移除图片背景，点击左侧选择图片
    img.img-target(:src='targetImg')

</template>

<script>
import imglyRemoveBackground from "@imgly/background-removal"

export default {
    data() {
        return {
            srcImg: null,
            targetImg: null
        }
    },

    methods: {

        selectImage() {
            const that = this
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.addEventListener('change', (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    that.srcImg = e.target.result
                    imglyRemoveBackground(file).then((blob) => {
                        that.targetImg = URL.createObjectURL(blob);
                    })
                };
                reader.readAsDataURL(file);
            });
            input.click();
        }
    }
}
</script>

<style lang="sass" scoped>
.background-removal-main
  padding: 50px
  display: flex
  justify-content: space-around

  span
    color: white
    font-size: 50px

  img
    border: 1px dashed gray
    width: 300px
    height: 300px


</style>
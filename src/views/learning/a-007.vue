<template lang="pug">
.learning-007-main(:style='pageStyleComp')
  .ajustment-panel.mb30
    .block 
      .label 阳光强度
      .input
        el-slider(v-model='lightStrength')
    .block 
      .label 位置
      .input
        el-slider(v-model='lightPosition')
    .block 
      .label 色相旋转
      .input
        el-slider(v-model='hue' max='360')
    .block 
      .label 页面去色
      .input
        el-slider(v-model='grayScale')
  .shadow-panel
    .sun-block
      img.sun-img1(:src='`${getPublicPath()}/assets/sun.png`' :style='sun1StyleComp')
      img.sun-img2(:src='`${getPublicPath()}/assets/sun.png`' :style='sun2StyleComp')

    .girl-block
      img.girl-pic(:src='`${getPublicPath()}/assets/girl.png`' height='400' :style='girlStyleComp')

  m-viewer(:markdown='text')
</template>

<script>
export default {
  data() {
    return {
      grayScale: 0,
      lightStrength: 50,
      lightPosition: 50,
      hue: 0,

      text: `# 学习要点：
## filter: blur(px)
为图像设置高斯模糊，默认值为 0，单位为像素，值较大越模糊

## filter: brightness(%)
number越大图像越亮，number不能取负值，可以是整数也可以是百分比

## drop-shadow(h-shadow, v-shadow, blur, spread, color)
为图像添加阴影效果，参数说明如下：
h-shadow：必填值，指定水平方向阴影的像素值，若值为负，则阴影会出现在图像的左侧；
v-shadow：必填值，指定垂直方向阴影的像素值，若值为负，则阴影会出现在图像的上方；
blur：可选值，为阴影添加模糊效果，默认值为 0，单位为像素，值越大创建的模糊就越多（阴影会变得更大更亮），不允许使用负值；
spread：可选值，默认值为 0，单位为像素。若值为正，则阴影将会扩展并增大；若值为负，则阴影会缩小；
color：可选值，为阴影添加颜色，如未指定，则由浏览器来绝对，通常为黑色。
注意：Chrome、Safari 和 Opera 等浏览器不支持第 4 个参数，如果添加，则不会有任何效果

## filter: grayscale(%)
将图像转换为灰度图像，默认值为 0%，表示原始图像；100％ 表示将图像完全变成灰度图像（即黑白图像），不允许为负值.
在特殊的日子里，网页整体加一个grayscale，就可以网站去色，一行代码搞定。

# 拓展
## filter: invert(%)
应用在div上，可以给包含的image元素的颜色取反，100%时类似 底片的效果。

## filter: saturate(%)
默认值为 100%，表示原始图像；0% 表示图像完全不饱和，不允许使用负值

## hue-rotate(deg)
该值用来定义色环的度数，默认值为 0deg，代表原始图像，最大值为 360deg
      `
    }
  },
  computed: {
    pageStyleComp() {
      const {
        grayScale
      } = this
      return {
        filter: `grayscale(${grayScale}%)`
      }
    },
    sun2StyleComp() {
      const {
        lightStrength,
        lightPosition
      } = this

      return {
        left: `${lightPosition}%`,
        filter: `brightness(${95 + lightStrength / 20}%)`
      }
    },
    sun1StyleComp() {
      const {
        lightStrength,
        lightPosition
      } = this
      return {
        left: `${lightPosition}%`,
        filter: `blur(${10 + lightStrength / 10}px)`
      }
    }, 
    girlStyleComp() {
      const {
        lightStrength,
        lightPosition,
        hue
      } = this
      return {
        filter: `drop-shadow(${0 - (lightPosition / 3 - 15)}px ${10 + lightStrength / 5}px 20px black) hue-rotate(${hue}deg)`
      }
    }
  }
}
</script>

<style scoped>
@keyframes leaning-007-sun-move {
  0% {
    left: 0;
  }
  50% {
    left: 500px;
  }
  100% {
    left: 0;
  }
}
</style>

<style lang="sass" scoped>
.learning-007-main
  

.ajustment-panel
  height: 150px
  .block
    margin: 10px 40px
    display: flex
    align-items: center
    .label
      width: 100px
    .input
      width: 200px

.shadow-panel
  width: 400px
  margin-left: 100px
  margin-bottom: 100px
  .sun-block
    width: 100%
    height: 200px
    display: block
    position: relative
    margin-bottom: 100px
    img
      width: 150px
      position: absolute
      animation: leaning-007-sun-move 10s linear infinite
      transform: translateX(-50%)




  .girl-block
    position: relative
    display: flex
    justify-content: center
    .girl-pic
      

</style>
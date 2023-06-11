<template lang="pug">
.learning003-main 
  rotate-img(
    :img1="getUploadedResource('img/20220311102357.jpg')"
    :img2="getUploadedResource('img/20220311102855.jpg')"
    :img3="getUploadedResource('img/20220311102907.jpg')"
    :img4="getUploadedResource('img/20220311102918.jpg')"
    :img5="getUploadedResource('img/20220311102928.jpg')"
  )
  
  m-editor.mavon-view-panel(
    :value='text' 
    default-open='preview'
    :editable='false'
    :toolbarsFlag='false'
    :subfield='false'
    :boxShadow='false'
    previewBackground='white'
    :html='false')
</template>

<script>
import RotateImg from "@/comps/rotate-img.vue";

export default {
  components: {
    RotateImg,
  },
  data() {
    return {
      text: `
# 学习要点：

正方形盒子内是一个3行3列的网格布局
\`\`\` css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
gap: 5px;
grid-template:
  "a a b"
  "d e b"
  "d c c";
\`\`\`

每个item具体分配到哪个模板范围，用如下方式
\`\`\` css
.item:nth-child(1)
  grid-area: a
.item:nth-child(2)
  grid-area: b
.item:nth-child(3)
  grid-area: c
.item:nth-child(4)
  grid-area: d
.item:nth-child(5)
  grid-area: e
\`\`\`

通过keyframe让正方形无限旋转起来，变量--r 是在正方形的 css中定义的旋转角度，360度
\`\`\` css
@keyframes rotation {
  to {
    transform: rotate(var(--r));
  }
}
\`\`\`

相同的动画应用给每一个img对象，但是旋转角度 相反，在img的样式中，修改--r的值为 -360deg即可
\`\`\` css
.item > img {
  width: 260%;
  height: 260%;
  object-fit: cover;
  --r: -360deg;
  animation: rotation 10s linear infinite;
}
\`\`\`

img对象的宽高比抱住他的div大一些（260%），以防止图片在旋转的时候，外层div内显示空白区域。
      `,
    };
  },
};
</script>

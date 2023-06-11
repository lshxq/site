<template lang="pug">
.learning004-main 
  grid-layout
  
  editor.mavon-view-panel(
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
import GridLayout from "@/comps/grid-layout.vue";

export default {
  components: {
    GridLayout,
  },
  data() {
    return {
      text: `
# 学习要点：

正方形盒子内是一个3行3列的网格布局，起初他们是平局分配的，都是1fr
\`\`\` css
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: 1fr 1fr 1fr;
gap: 10px;
\`\`\`

当鼠标悬停到某个小方块的时候，我们希望把这个小方块变大，但是小方式的大小是在父容器中 定义的，原本是1fr，要想变大，就要更改父容器的 对应行列的 大小配置。
比如这是 第二列 第一行 变大
\`\`\` css
grid-template-columns: 1fr 2fr 1fr;
grid-template-rows: 2fr 1fr 1fr;
\`\`\`

我们的选择器应该这样写，square是大正方形， item是每一个小正方形，用has测试到底哪个小正方形 hover了，更改square的对应样式。
\`\`\` css
.square:has(.item:nth-child(1):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(2):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(3):hover) {
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(4):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(5):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(6):hover) {
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(7):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 3fr;
}
.square:has(.item:nth-child(8):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 3fr;
}
.square:has(.item:nth-child(9):hover) {
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 1fr 1fr 3fr;
}
\`\`\`
      `,
    };
  },
};
</script>

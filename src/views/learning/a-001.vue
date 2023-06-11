<template lang="pug">
.learning001-main
  new-york
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
import NewYork from "@/comps/new-york.vue";

export default {
  components: {
    NewYork,
  },
  data() {
    return {
      text: `
# 要点：
一个容器，贴了一个背景图.
一个蒙版，半透明背景色遮住背景图。
一个文字图层，覆盖在蒙版上，和蒙版尺寸相当，并且设置和最外层容器一样的背景图，这时这个图层默认会覆盖蒙版。 
设置文字图层的样式如下：
\`\`\` css  
  text-stroke: 1px white;
\`\`\`
文字描边, 对于webkit内核浏览器需要设置 -webkit-text-stroke

\`\`\` css
color: transparent;
\`\`\`
让文字透明

\`\`\` css
background-clip: text;
\`\`\`
仅在文字的部分显示背景，对于webkit内核浏览器需要设置 -webkit-background-clip
      `,
    };
  },
};
</script>

<style lang="sass" scoped></style>

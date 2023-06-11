<template lang="pug">
.learning-006-main
  .editor-panel
    editor.mavon-view-panel(
      :value='text' 
      default-open='preview'
      :editable='false'
      :toolbarsFlag='false'
      :subfield='false'
      :boxShadow='false'
      previewBackground='white'
      :html='false')
  .image-block(v-resize='updateSize')
    template(v-for='idx in 1000' :key='idx')
      img.image-obj( :src='`${getPublicPath()}/assets/new-york.webp`'  draggable='false')

</template>

<script>
let imgWidth = 100;

const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = `https://picsum.photos/${imgWidth}/300?r=${Math.random()}`
      ob.unobserve(img)
    }
  }
});



export default {
  data() {
    return {
      text: `
# 学习要点   
这个页面演示了 通过  IntersectionObserver 实现的懒加载。
IntersectionObserver用来观察对象 间是否存在交叉，
这个页面一上来就初始化了1000个 img， 只不过这些img用的都是  默认静态图， 可以利用缓存，加载很快。
之后通过 IntersectionObserver 观察，用户在滚动 过程中，会露出后面的img对象，这是再给 img.src更改为要显示的图片，
就是先了用户看到哪里，就加载到哪里，没看到的不加载。

\`\`\` javascript
const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = \`https://picsum.photos/\${imgWidth}/300?r=\${Math.random()}\`
      ob.unobserve(img)； // 已经完成了图片更新，取消监听该对象
    }
  }
});

const imgs = document.querySelectorAll('.image-obj');
imgs.forEach(img => {
  ob.observe(img)
})
\`\`\`
      `
    }
  },
  mounted() {
    
  },
  
  methods: {
    updateSize(size) {
      imgWidth = Math.floor(size.width / 5);
      const imgs = document.querySelectorAll('.image-obj');
      imgs.forEach(img => {
        ob.observe(img)
      })
    }
  }
}
</script>


<style lang="sass" scoped>
.learning-006-main
  display: flex
  flex-flow: column
  align-items: center
  position: relative


.editor-panel
  width: 100%
.image-block
  width: 80%
.image-obj 
  width: 20%
  height: 300px
  object-fit: cover
</style>
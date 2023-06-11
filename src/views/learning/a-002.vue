<template lang="pug">
.learning002-main
  grid-layout.mb30
  button.mb30(@click='openEyeDropper') eye dropper
  .color-block(:style='blockStyleComputed') 
  .mb30.ml30 {{sRGBHex}}

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
      sRGBHex: "",
      text: `
现代浏览器支持 EyeDropper 对象，是一个可以在全屏幕取色的工具， 
\`\`\` javascript
const drop = new EyeDropper(); 
drop.open().then(res => console.log(res.sRGBHex));
\`\`\`
      `,
    };
  },
  computed: {
    blockStyleComputed() {
      const { sRGBHex } = this;
      return {
        backgroundColor: sRGBHex,
      };
    },
  },
  methods: {
    openEyeDropper() {
      const { EyeDropper } = window;
      const dropper = new EyeDropper();
      try {
        dropper.open().then((data) => {
          this.sRGBHex = data.sRGBHex;
        });
      } catch (e) {
        alert("取消取色");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.color-block
  display: block
  width: 100px
  height: 100px
  margin: 30px
</style>

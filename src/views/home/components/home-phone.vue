<template lang="pug">
#app-main-panel-phone
  .narrow
    .header
      .title.red TSY ZONE
    .body
      

      .block-section
        .title 全景图欣赏
        pano-list

      .block-section
        .title 快乐时光
        .phone-img(v-for='(img, idx) of photos'  :key='idx')
          img(:src='img' width='100%')
            

    
          

</template>

<script>
import PanoList from "./pano-list.vue";

export default {
  name: "App",
  components: {
    PanoList,
  },
  data() {
    return {
      photos: [
        this.getUploadedResource("img/20220311102357.jpg"),
        this.getUploadedResource("img/20220311102855.jpg"),
        this.getUploadedResource("img/20220311102907.jpg"),
        this.getUploadedResource("img/20220311102918.jpg"),
        this.getUploadedResource("img/20220311102928.jpg"),
        this.getUploadedResource("img/20220311102938.jpg"),
      ],
    };
  },
  methods: {
    newLifeShare() {
      this.goto("blog-creation", { query: { type: "1" } });
    },
    newTechShare() {
      this.goto("blog-creation", { query: { type: "2" } });
    },
    showArtical(artical) {
      this.goto("blog-viewer", {
        params: {
          id: artical.id,
        },
        winTarget: `blog_viewer_${new Date().getTime()}`,
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.phone-img
  margin: 10px
  box-sizing: border-box

#app-main-panel-phone
  user-select: none
  background-image: linear-gradient(#101010, #303030, #101010)
  color: white
  min-height: 100vh




  .header
    .title
      font-size: 50px
      display: flex
      align-items: center
      padding: 10px

  .body
    width: 100%
    .block-section
      .title
        padding-left: 10px
</style>

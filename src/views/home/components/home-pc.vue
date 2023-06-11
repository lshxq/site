<template lang="pug">
#app-main-panel-pc(@scroll='pageScroll')
  .new-york-wrapper.mb30(@click='goto("learning-001")')
    new-york
  
  .narrow
    .header.cursor-pointer(@click='gotoCanvasTraining')
      text-canvas-refine(text='面向初中生的Canvas动画教程,点击查看文档')
      
    
    .body
      .flex-center.mt30
        sy-left-right(left-width='350')
          template(v-slot:left)
              sy-calendar.mr10(v-model='selectedDate' v-slot:left)

          template(v-slot:right)
            .flex-center
              sy-ray-border.ml10(:width='200' :height='300' :radius='5')
                img.game-image(src='/site/assets/poker.png' @click='goto2("/poker")')

              sy-ray-border.ml10(:width='200' :height='300' :radius='5')
                img.game-image(src='/site/assets/miao.png'  @click='goto2("/miao")')

              sy-ray-border.ml10(:width='200' :height='300' :radius='5')
                .tsy-card-panel 
                  .name Tian 
                  .num 21
              sy-ray-border.ml10(:width='200' :height='300' :radius='5')
                .tsy-card-panel 
                  .name UC 
                  .num 90
              sy-ray-border.ml10(:width='200' :height='300' :radius='5')
                .tsy-card-panel 
                  .name YC 
                  .num 15

      .sticky-animation 
        sticky-animation-one(:scroll-start='1000' :scroll-end='2800' :scroll-value='stickyAnimationOne.scrollValue')

      .water-drop-container 水滴可以拖动
        sy-water-drop(v-drag)

      .rolling-image-block
        sy-rolling-image(:images='rollingImages')
      
      .mb30.mt30(@click='goto("learning-003")')
        rotate-img(
          :img1="getUploadedResource('img/20220311102357.jpg')"
          :img2="getUploadedResource('img/20220311102855.jpg')"
          :img3="getUploadedResource('img/20220311102907.jpg')"
          :img4="getUploadedResource('img/20220311102918.jpg')"
          :img5="getUploadedResource('img/20220311102928.jpg')"
        )

      .block-section
        line-point-canvas
      
      .block-section
        .title 快乐时光
        photo-list
      
      .block-section(@click='goto("learning-004")')
        grid-layout

      .block-section
        .title 全景图欣赏
        pano-list

      .block-section
        tsyvue-canvas

      .block-section
        .h4 生活分享
        sy-pagin-data(url='/public/artical/list' :query='query1')
          template(v-slot:='scope')
            .data-row(v-for='(row, idx) of scope.data' :key='idx')
              ll(:text='row.title' :data='row' @click='showArtical')
      
  

      .block-section
        .h4 技术分享
        sy-pagin-data(url='/public/artical/list' :query='query2')
          template(v-slot:='scope')
            .data-row(v-for='(row, idx) of scope.data' :key='idx')
              ll(:text='row.title' :data='row' @click='showArtical')


  
            

    
          

</template>

<script>
import PhotoList from "./photo-list.vue";
import TextCanvas from "./text-canvas.vue";
import TextCanvasRefine from "./text-canvas-refine.vue";
import TsyvueCanvas from "./tsyvue-canvas.vue";
import PanoList from "./pano-list.vue";
import LinePointCanvas from "./line-point-canvas.vue";
import NewYork from "@/comps/new-york.vue";
import GridLayout from "@/comps/grid-layout.vue";
import RotateImg from "@/comps/rotate-img.vue";
import StickyAnimationOne from '@/comps/sticky-animation-2.vue' 

export default {
  name: "App",
  components: {
    StickyAnimationOne,
    GridLayout,
    RotateImg,
    NewYork,
    PanoList,
    PhotoList,
    LinePointCanvas,
    TextCanvas,
    TsyvueCanvas,
    TextCanvasRefine,
  },
  data() {
    return {
      selectedDate: new Date(),
      query1: { type: 1, orderBy: "CREATED DESC" },
      query2: {
        type: 2,
        orderBy: "CREATED DESC",
      },
      rollingImages: [
        this.getUploadedResource("img/20220311102357.jpg"),
        this.getUploadedResource("img/20220311102855.jpg"),
        this.getUploadedResource("img/20220311102907.jpg"),
        this.getUploadedResource("img/20220311102918.jpg"),
        this.getUploadedResource("img/20220311102928.jpg"),
        this.getUploadedResource("img/20220311102938.jpg"),
      ],

      stickyAnimationOne: {
        scrollValue: 0
      }
    };
  },
 

  methods: {
    goto2(href) {
      open(href, '_blank')
    },
    gotoCanvasTraining() {
      window.open(`${this.getPublicPath()}/blog/12/viewer`, "CanvasTraining");
    },
    newLifeShare() {
      this.goto("blog-creation", { query: { type: "1" } });
    },
    newTechShare() {
      this.goto("blog-creation", { query: { type: "2" } });
    },
    pageScroll(event) {
      this.stickyAnimationOne.scrollValue = event.target.scrollTop;
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


.block-section
  padding-bottom: 130px
  .title
    font-weight: bolder
    font-size: 20px
    margin-bottom: 10px


@media screen and (min-width:1000px)
  .block
    .section
      width: 50%

@media screen and (max-width:1000px)
  .block
    .section
      width: 100%

#app-main-panel-pc
  user-select: none
  min-width: 580px
  background-image: linear-gradient(#101010, #303030, #101010)
  color: white
  height: calc(100vh - 18px)
  overflow: auto


  .narrow
    margin: 0 auto
    width: 80%
    transition: all .5s

    .header
      min-height: 100px
      .title
        font-size: 50px
        display: flex
        align-items: center
        height: 100%
    .header:hover

    .body
      width: 100%



.rolling-image-block
  height: 800px

.water-drop-container
  margin-top: 50px
  height: 300px
  position: relative
  background: linear-gradient(#222, #333, #222)
  display: flex
  align-items: center
  justify-content: center
  overflow: auto
  font-size: 10vw
  color: transparent
  -webkit-text-stroke: 1px white
  text-stroke: 1px white

.tsy-card-panel
  background: red
  height: 100%
  margin: 0
  display: flex
  justify-content: center
  flex-flow: column
  align-items: center
  color: black
  -webkit-text-stroke: 3px white
  font-weight: bolder
  .name
    font-size: 70px

  .num
    font-size: 122px

.game-image
  width: 100%
  height: 100%
  cursor: pointer
  display: flex
</style>

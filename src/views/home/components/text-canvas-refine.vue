<template lang="pug">
.text-canvas-main-panel(ref='mainContainer')
  canvas(ref='canvasRef')
</template>

<script>
let imagePoints = []
export default {
  props: {
    text: {
      type: String,
      default() {
        return '你好啊！'
      }
    }
  },
  data() {
    return {
      currentTextIndex: -1
    };
  },
  computed: {
    textArray() {
      const {text} = this
      return text.split(',')
    },
  },
  mounted() {
    const { canvasRef, mainContainer } = this.$refs;
    this.canvasWidth = mainContainer.offsetWidth;
    if (this.canvasWidth < 1000) {
      this.canvasWidth = 1000
    }
    this.canvasHeight = 150;
    canvasRef.width = this.canvasWidth;
    canvasRef.height = this.canvasHeight;
    this.ctx = canvasRef.getContext("2d");
    this.drawText()
    this.updateText()
  },

  methods: {
    getTextImageData(text, fontSize = 100) {
      const cvs = document.createElement('canvas')
      
      const { canvasWidth, canvasHeight } = this;
      cvs.width = canvasWidth
      cvs.height = canvasHeight
      const ctx = cvs.getContext('2d')
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.font = `bold ${fontSize}px 微软雅黑`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

      const data = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
      const ps = []
      const rate = 4 // 像素稀释比率
      for (let idx=0; idx<data.length; idx+=4) {
        const pointIdx = idx / 4;
        const x = pointIdx % canvasWidth;
        const y = Math.floor(pointIdx / canvasWidth)
        if (data[idx] === 255 && data[idx+1] === 255 && data[idx+2] === 255) {
          if (x % rate === 0 && y % rate === 0) { // 稀释
            ps.push({
              x,
              y,
              currX:canvasWidth
            })
          }
        }
      }
      
      return ps.sort((a,b) => a.x - b.x)
    },

    updateText() {
      const {
        textArray
      } = this
      this.currentTextIndex+= 1
      if (this.currentTextIndex > textArray.length - 1) {
        this.currentTextIndex=0
      }
      const currentText=  textArray[this.currentTextIndex]
      imagePoints = this.getTextImageData(currentText)
    },

    drawText() {
      const { ctx, canvasWidth, canvasHeight} = this;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "#ffffff";
      imagePoints.map((point,idx) => {
        if (idx === 0 || imagePoints[idx - 1].stepCount > 2) {
          if (point.currX > point.x) {
            point.currX -= 30
            point.stepCount = point.stepCount ? point.stepCount + 1 : 1
          }
          if (point.currX < point.x) {
            point.currX = point.x
          }
        } 
        if (idx === imagePoints.length - 1 && point.currX === point.x) {
          setTimeout(this.updateText, 500)
        }
        ctx.fillRect(point.currX,point.y,2,2)
      })
      requestAnimationFrame(this.drawText)
    },
  },
};
</script>

<style lang="sass" scoped>
.text-canvas-main-panel
</style>

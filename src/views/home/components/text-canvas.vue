<template lang="pug">
.text-canvas-main-panel(ref='mainContainer')
  canvas(ref='canvasRef')
</template>

<script>
const points = [];
export default {
  data() {
    return {};
  },
  mounted() {
    const { canvasRef, mainContainer } = this.$refs;
    this.canvasWidth = mainContainer.offsetWidth;
    this.canvasHeight = 150;
    canvasRef.width = this.canvasWidth;
    canvasRef.height = this.canvasHeight;
    this.ctx = canvasRef.getContext("2d");

    const awaitSentText = async (txt, fontSize, stepV) => {
      return new Promise((res) => {
        this.sentText(txt, fontSize, stepV);
        setTimeout(res, 3000);
      });
    };

    const run = async () => {
      const textArr = `tsy.zone,分享最实用的开发经验`.split(",");
      for (let idx = 0; idx < textArr.length; idx++) {
        const txt = textArr[idx];
        await awaitSentText(txt, 100, 40);
        if (idx === textArr.length - 1) {
          idx = -1;
        }
      }
    };
    run();

    this.render();
  },

  methods: {
    sentText(text, fontSize = 100, stepV = 40) {
      const { ctx, canvasWidth: width, canvasHeight: height } = this;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `bold ${fontSize}px 微软雅黑`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, width / 2, height / 2);
      const data = ctx.getImageData(0, 0, width, height).data;

      let index = 0;
      let bl = 4;
      let useIndex = 0;

      for (let i = 0; i < data.length; i += 4) {
        const x = index % width;
        const y = Math.ceil(index / width);
        if (x % bl === 0 && y % bl === 0) {
          if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
            const rx =
              Math.floor(Math.random() * fontSize) + width / 2 - fontSize / 2;
            const ry =
              Math.floor(Math.random() * fontSize) + height / 2 - fontSize / 2;

            const item = points[useIndex];
            if (item) {
              points[useIndex] = {
                x,
                y,
                rx: item.x,
                ry: item.y,
                stepX: Math.abs(item.x - x) / stepV,
                stepY: Math.abs(item.y - y) / stepV,
              };
            } else {
              points[useIndex] = {
                x,
                y,
                rx,
                ry,
                stepX: Math.abs(rx - x) / stepV,
                stepY: Math.abs(ry - y) / stepV,
              };
            }
            useIndex++;
          }
        }
        index++;
      }

      if (useIndex < points.length) {
        points.splice(useIndex, points.length - useIndex);
      }
    },

    render() {
      const { ctx, canvasWidth: width, canvasHeight: height } = this;
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      points.forEach((v) => {
        if (v.rx > v.x) {
          v.rx -= v.stepX;
          if (v.rx < v.x) {
            v.rx = v.x;
          }
        } else if (v.rx < v.x) {
          v.rx += v.stepX;
          if (v.rx > v.x) {
            v.rx = v.x;
          }
        }

        if (v.ry > v.y) {
          v.ry -= v.stepY;
          if (v.ry < v.y) {
            v.ry = v.y;
          }
        } else if (v.ry < v.y) {
          v.ry += v.stepY;
          if (v.ry > v.y) {
            v.ry = v.y;
          }
        }

        ctx.rect(v.rx, v.ry, 2, 2);
      });
      ctx.fill();
      requestAnimationFrame(this.render);
    },
  },
};
</script>

<style lang="sass" scoped>
.text-canvas-main-panel
</style>

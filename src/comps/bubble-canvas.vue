<template lang="pug">
.bubble-canvas-main(ref='mainContainer')
  canvas(ref='canvasRef')
</template>

<script>
const rr = (min = 0, max = 100) => {
  return Math.floor(min + Math.random() * (max - min));
};

let points = [];

export default {
  data() {
    return {};
  },
  mounted() {
    const { canvasRef } = this.$refs;
    this.ctx = canvasRef.getContext("2d");
    const size = {
      height: this.$refs.mainContainer.offsetHeight,
      width: this.$refs.mainContainer.offsetWidth,
    }
    this.containerResize(size)
  },

  methods: {
    render() {
      this.animationStarted = true;
      const { ctx, containerSize } = this;
      ctx.clearRect(0, 0, containerSize.width, containerSize.height);
      ctx.fillStyle = "hsl(30, 10%, 20%)";
      for (let idx = 0; idx < points.length; idx++) {
        const point = points[idx];
        const { pos, radius, step } = point;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        pos.y -= step;
        if (pos.y < 0 + 2 * radius) {
          pos.y = this.containerSize.height;
        }
      }

      requestAnimationFrame(this.render);
    },
    containerResize(size) {
      this.containerSize = size;
      const { canvasRef } = this.$refs;
      canvasRef.width = size.width;
      canvasRef.height = size.height;
      points = [];
      for (let idx = 0; idx < 100; idx++) {
        points.push({
          pos: {
            x: rr(50, size.width - 50),
            y: rr(100, size.height),
          },
          step: rr(1, 2),
          radius: rr(5, 12),
        });
      }

      if (!this.animationStarted) {
        this.render();
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.bubble-canvas-main
  width: 100%
  height: 60vh

  canvas
    width: 100%
    height: 100%
</style>

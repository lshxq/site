<template lang="pug">
.line-point-canvas(ref='mainContainer')
  canvas(ref='canvasRef')
</template>

<script>
const random = (max = 100, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const points = [];
let drawTimestamp = Date.now();

export default {
  data() {
    return {};
  },
  mounted() {
    const { canvasRef, mainContainer } = this.$refs;
    this.canvasWidth = mainContainer.offsetWidth;
    this.canvasHeight = 300;
    canvasRef.width = this.canvasWidth;
    canvasRef.height = this.canvasHeight;
    this.ctx = canvasRef.getContext("2d");

    if (points.length === 0) {
      const pointCount = 50;
      for (let idx = 0; idx < pointCount; idx++) {
        points.push({
          x: random(this.canvasWidth - 10),
          y: random(this.canvasHeight - 10),
          xSpeed: random(50, -50),
          ySpeed: random(50, -50),
        });
      }
    }

    this.draw();
  },
  methods: {
    draw() {
      const { canvasWidth, canvasHeight, ctx } = this;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      ctx.fillStyle = "#fff";
      for (let idx = 0; idx < points.length; idx++) {
        const point = points[idx];
        for (let ii = idx + 1; ii < points.length; ii++) {
          const nextPoint = points[ii];
          const distence = Math.sqrt(
            Math.pow(point.x - nextPoint.x, 2) +
              Math.pow(point.y - nextPoint.y, 2)
          );
          const maxLength = 110;
          if (distence < maxLength && distence > 0) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            ctx.closePath();

            const opacity = 1 - distence / maxLength;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        // 更新x
        let xStep = this.getStepLength(point.xSpeed);
        let newX = point.x + xStep;
        if (0 > newX || newX > canvasWidth) {
          point.xSpeed = 0 - point.xSpeed;
          xStep = this.getStepLength(point.xSpeed);
        }
        point.x = point.x + xStep;
        if (point.x < 0 || point.x > canvasWidth) {
          point.x = random(canvasWidth - 10, 10);
        }
        // 更新y
        let yStep = this.getStepLength(point.ySpeed);
        let newY = point.y + yStep;
        if (0 > newY || newY > canvasHeight) {
          point.ySpeed = 0 - point.ySpeed;
          yStep = this.getStepLength(point.ySpeed);
        }
        point.y = point.y + yStep;
        if (point.y < 0 || point.y > canvasHeight) {
          point.y = random(canvasHeight - 10, 10);
        }
      }
      drawTimestamp = Date.now();
      requestAnimationFrame(this.draw);
    },

    getStepLength(ySpeed) {
      let yStep = 0;
      const now = Date.now();
      const duration = (now - drawTimestamp) / 1000;
      yStep = duration * ySpeed;
      return yStep;
    },
  },

  unmounted() {
    console.log("line-point-canvas destroyed");
    const { annimationFrameId } = this;
    if (annimationFrameId) {
      cancelAnimationFrame(annimationFrameId);
    }
  },
};
</script>

<style lang="sass" scoped>
.line-point-canvas
  width: 100%
</style>

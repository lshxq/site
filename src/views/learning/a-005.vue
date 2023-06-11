<template lang="pug">
.learning005-main(v-resize='updateSize')
  
  
  m-editor.mavon-view-panel(
    :value='text' 
    default-open='preview'
    :editable='false'
    :toolbarsFlag='false'
    :subfield='false'
    :boxShadow='false'
    previewBackground='white'
    :html='false')

  .ball(ref='ballRef')
</template>

<script>

const rr = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export default {
  components: {
  },
  mounted() {
    const ball = this.$refs.ballRef
    
    const move = (x, y) => {
      const ballRect = ball.getBoundingClientRect();
      const initX = ballRect.left;
      const initY = ballRect.top;
      const rad = Math.atan2(y - initY, x - initX)
      let deg = (rad * 180) / Math.PI;
      if (!deg) {
        deg =0
      }
      const yy = y - initY;
      const xx = x - initX;
      let duration = Math.sqrt(yy*yy + xx*xx)
      if (duration < 1 || !duration) {
        duration = 10
      }
      console.log(`${initX}    ${initY}     ${deg}    ${duration}`)

      ball.getAnimations().forEach(ani => {
        ani.cancel();
      })

      ball.animate([
        {
          left: `${initX}px`,
          top: `${initY}px`,
          transform: `rotate(${deg}deg)`,
          easing: 'ease-in'
        },
        {
          transform: `rotate(${deg}deg) scaleX(1.5) `,
          offset: 0.7
        },
        { 
          transform: `rotate(${deg}deg) scaleX(1.5)  `,
          offset: 0.85
        },
        {
          left: `${x}px`,
          top: `${y}px`,
          transform: `rotate(${deg}deg)`,
          easing: 'ease-out'
        }
      ], {
        duration,
        fill: 'forwards'
      })
    }

    move(rr(100, this.cWidth - 100), rr(400, this.cHeight - 200))
    this.timeId = setInterval(() => {
      move(rr(100, this.cWidth - 100), rr(400, this.cHeight - 200))
    }, 3000) 

  },
  data() {
    return {
      text: `
# 学习要点：

现代浏览器支持 web animation api 了， 可以通过js 函数的方式，高性能的实现动画效果。
第一个参数是变化的集合
第二个参数 配置变化

\`\`\` javascript
ball.animate([
  {
    left: \`\${initX}px\`,
    top: \`\${initY}px\`
    easing: 'ease-in'
  },
  {
    left: \`\${x}px\`,
    top: \`\${y}px\`
    easing: 'ease-out'
  }
], {
  duration: 2000,
  fill: 'forwards'
})
\`\`\`
      `,
    };
  },
  unmounted() {
    clearInterval(this.timeId)
  },
  methods: {
    updateSize(size) {
      this.cWidth = size.width
      this.cHeight = size.height
    }
  }
};
</script>


<style lang="sass" scoped>
.learning005-main 
  height: 98vh
  background: linear-gradient(#333, #222, #333)
  position: relative

  .ball
    width: 100px
    height: 100px
    position: absolute
    background: conic-gradient(red, magenta, blue, aqua, lime, yellow, red)
    border-radius: 50%
</style>
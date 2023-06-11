<template lang="pug">
.sticky-animation-1
  .show-panel(v-resize='showPanelResize')
    .item(v-for="item of showItemsComp" :key='item.key' :style='itemStyle(item)') {{item.text}}
</template>


<script>

const rangeMapping = (range1, range2, value) => {
  const {
    start:s1, 
    end:e1
  } = range1

  const {
    start:s2=0, 
    end:e2=1
  } = range2

  if (value > e1) { // 值在范围之外，返回 相应 的边界
    return e2;
  } else if (value < s1) {
    return s2;
  } 

  const rr1 = e1 - s1;
  const vv = value - Math.min(e1, s1);
  const percentage = vv / rr1;
  const rr2 = e2 - s2;

  if (rr2 > 0) {
    return s2 + rr2 * percentage;

  } else if (rr2 < 0) {
    return s2 - Math.abs(rr2 * percentage);

  } else {
    return e2;
  }
}


const strs = [
  '多年全栈开发经验',
  '寻求兼职工作机会',
  '微信：tsycuu',
]

export default {
  props: {
    scrollStart: Number,
    scrollEnd: Number,
    scrollValue: Number
  },
  data() {
    return {
      showPanelSize: {}
    }
  },
  mounted() {
  },
  computed: {
    showItemsComp() {
      const {
        scrollStart,
        scrollEnd,
        scrollValue,
        showPanelSize
      } = this
      const center = {
        x: showPanelSize.width / 2,
        y: showPanelSize.height / 2
      }

      const items = [];
      for (let rowIdx=0; rowIdx<strs.length; rowIdx++) {
        const str = strs[rowIdx];
        for (let chIdx=0; chIdx<str.length; chIdx++) {
          const text = str.charAt(chIdx)

          const columnWidth = showPanelSize.width / (str.length + 1)
          const rowHeight = showPanelSize.height / (strs.length + 1)

          const target = {
            x: columnWidth * (chIdx + 1),
            y: rowHeight * (rowIdx + 1),
          }

          let startOffset = 0;
          const division = Math.floor(str.length / 2)

          if (chIdx < division) {
            startOffset -= rangeMapping({
              start: 0, 
              end: division -1
            }, {
              start: division - 1,
              end: 0
            }, chIdx) * 100 

          } else if (chIdx >= division){
            startOffset -= (chIdx - division) * 100
          }

          const range1Start = scrollStart + startOffset
          if (range1Start < scrollValue) {
            const pos = {
              x: rangeMapping({
                start: range1Start, 
                end: scrollEnd
              }, {
                start: center.x, 
                end: target.x
              }, scrollValue),

              y: rangeMapping({
                start: range1Start, 
                end: scrollEnd
              }, {
                start: center.y,
                end: target.y
              }, scrollValue)
            }

            const opacity = rangeMapping({
              start: range1Start, 
              end: scrollEnd / 2
            }, {
              start: 0.1, 
              end: 0.9
            }, scrollValue)

            items.push({
              key: `a-${rowIdx}-${chIdx}`,
              pos,
              bg: (rowIdx + 1) * (chIdx + 1) * 30,
              text,
              opacity,
            })
          }
          
        }
      }      
      return items;
    }
  },

  methods: {
    showPanelResize(size) {
      this.showPanelSize = size
    },
    itemStyle(item) {
      const {
        pos,
        bg,
        opacity,
        rotate
      } = item
      return {
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        background: `hsl(${bg}deg, 100%, 64%)`,
        color: `hsl(${bg + 198}deg, 100%, 64%)`,
        opacity,
        transform: `rotate(${rotate}deg)`
      }
    }
  }
}
</script>


<style lang="sass" scoped>
.sticky-animation-1
  height: 300vh
  overflow: visible

  .show-panel
    position: sticky
    height: 100vh
    min-height: 600px
    top: 0
    overflow: hidden

    .item
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      width: 100px
      height: 100px
      border-radius: 10px
      font-size: 70px
      font-weight: bolder
      text-stroke: 1px white
      -webkit-text-stroke: 2px white
    

</style>
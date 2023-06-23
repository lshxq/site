<template lang="pug">
.sticky-animation-2
  .show-panel(v-resize='showPanelResize')
    bubble-canvas.bubble-canvas-in-sticky(:style='bubbleStyleComp')
    .item(v-for="item of showItemsComp" :key='item.key' :style='itemStyle(item)') {{item.text}}
      
</template>

<script>
import BubbleCanvas from "./bubble-canvas.vue";

const rangeMapping = (range1, range2, value) => {
  const { start: s1, end: e1 } = range1;

  const { start: s2 = 0, end: e2 = 1 } = range2;

  if (value > e1) {
    // 值在范围之外，返回 相应 的边界
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
};

const strs = ["多年全栈开发经验", "精通微信小程序开发", "助力社区小店商品上线", "微信：tsycuu"];

const rr = (min = 0, max = 100) => {
  const range = max - min;
  return Math.floor(Math.random() * range + min);
};

export default {
  components: {
    BubbleCanvas,
  },
  props: {
    scrollStart: Number,
    scrollEnd: Number,
    scrollValue: Number,
  },
  data() {
    return {
      showPanelSize: {},
    };
  },
  mounted() {},
  computed: {
    bubbleStyleComp() {
      const { scrollStart, scrollEnd, scrollValue } = this;
      const delay = (scrollEnd - scrollStart) / 2;
      const bottom = rangeMapping(
        {
          start: scrollStart + delay,
          end: scrollEnd,
        },
        {
          start: -60,
          end: 0,
        },
        scrollValue
      );
      return {
        bottom: `${bottom}vh`,
      };
    },
    showItemsComp() {
      const { scrollStart, scrollEnd, scrollValue, showPanelSize, colorBlock } =
        this;
      const center = {
        x: showPanelSize.width / 2,
        y: showPanelSize.height / 2,
      };

      const items = [];

      if (colorBlock && colorBlock.length > 0) {
        // 前期色块
        const endOffset = (scrollEnd - scrollStart) / 10000;
        const range1End = scrollEnd - endOffset;
        for (let idx = 0; idx < colorBlock.length; idx++) {
          const block = colorBlock[idx];
          const x = rangeMapping(
            {
              start: scrollStart,
              end: range1End,
            },
            {
              start: block.start.x,
              end: block.end.x,
            },
            scrollValue
          );
          const y = rangeMapping(
            {
              start: scrollStart,
              end: range1End,
            },
            {
              start: block.start.y,
              end: block.end.y,
            },
            scrollValue
          );

          const itemWidth = rangeMapping(
            {
              start: scrollStart,
              end: scrollEnd,
            },
            {
              start: 80,
              end: block.size,
            },
            scrollValue
          );
          items.push({
            pos: {
              x,
              y,
            },
            key: `b-${idx}`,
            bg: block.color,
            text: "",
            opacity: 1,
            size: {
              width: itemWidth,
              height: itemWidth,
            },
          });
        }
      }

      {
        // 文字设块
        const delay = (scrollEnd - scrollStart) / 5;
        for (let rowIdx = 0; rowIdx < strs.length; rowIdx++) {
          const str = strs[rowIdx];
          for (let chIdx = 0; chIdx < str.length; chIdx++) {
            const text = str.charAt(chIdx);

            const columnWidth = showPanelSize.width / (str.length + 1);
            const rowHeight = showPanelSize.height / (strs.length + 1);

            const target = {
              x: columnWidth * (chIdx + 1),
              y: rowHeight * (rowIdx + 1),
            };

            let startOffset = 0;
            const division = Math.floor(str.length / 2);

            if (chIdx < division) {
              startOffset -=
                rangeMapping(
                  {
                    start: 0,
                    end: division - 1,
                  },
                  {
                    start: division - 1,
                    end: 0,
                  },
                  chIdx
                ) * 100;
            } else if (chIdx >= division) {
              startOffset -= (chIdx - division) * 100;
            }

            const range1Start = scrollStart + startOffset + delay;
            if (range1Start < scrollValue) {
              const pos = {
                x: rangeMapping(
                  {
                    start: range1Start,
                    end: scrollEnd,
                  },
                  {
                    start: center.x,
                    end: target.x,
                  },
                  scrollValue
                ),

                y: rangeMapping(
                  {
                    start: range1Start,
                    end: scrollEnd,
                  },
                  {
                    start: center.y,
                    end: target.y,
                  },
                  scrollValue
                ),
              };

              const opacity = rangeMapping(
                {
                  start: range1Start,
                  end: scrollEnd / 2,
                },
                {
                  start: 0.1,
                  end: 0.9,
                },
                scrollValue
              );

              items.push({
                key: `a-${rowIdx}-${chIdx}`,
                pos,
                bg: (rowIdx + 1) * (chIdx + 1) * 30,
                text,
                opacity,
              });
            }
          }
        }
      }

      return items;
    },
  },

  methods: {
    showPanelResize(size) {
      this.showPanelSize = size;
      const centerX = size.width / 2;
      const centerY = size.height / 2;
      const offsetX = centerX / 20;
      const offsetY = centerY / 20;

      const distanse = 1999;

      const cnt = 20;
      const colorBlock = [];
      for (let idx = 0; idx < cnt; idx++) {
        const start = {
          x: rr(centerX - offsetX, centerX + offsetX),
          y: rr(centerY - offsetY, centerY + offsetY),
        };
        let endX = 0;
        let endY = 0;
        if (start.x < centerX && start.y < centerY) {
          endX = rr(0, centerX);
          endY = rr(0, centerY);

          if (Math.random() > 0.5) {
            // x
            endX = 0 - rr(300, distanse);
          } else {
            endY = 0 - rr(300, distanse);
          }
        } else if (start.x > centerX && start.y < centerY) {
          endX = rr(centerX, size.width);
          endY = rr(0, centerY);

          if (Math.random() > 0.5) {
            // x
            endX = rr(size.width * 2, size.width * 3);
          } else {
            endY = 0 - rr(300, distanse);
          }
        } else if (start.x > centerX && start.y > centerY) {
          endX = rr(centerX, size.width);
          endY = rr(centerY, size.height);

          if (Math.random() > 0.5) {
            // x
            endX = rr(size.width * 2, size.width * 3);
          } else {
            endY = rr(size.height * 2, size.height * 3);
          }
        } else {
          endX = rr(0, centerX);
          endY = rr(centerY, size.height);

          if (Math.random() > 0.5) {
            // x
            endX = 0 - rr(400, 800);
          } else {
            endY = rr(size.height, size.height + distanse);
          }
        }
        const end = {
          x: endX,
          y: endY,
        };
        colorBlock.push({
          start,
          end,
          color: rr(0, 360),
          size: rr(100, 300),
        });
      }
      this.colorBlock = colorBlock;
    },
    itemStyle(item) {
      const { pos, bg, opacity, rotate, size } = item;
      const style = {
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        background: `linear-gradient(hsl(${bg}deg, 100%, 64%), hsl(${
          bg + 20
        }deg, 100%, 64%))`,
        color: `hsl(${bg + 198}deg, 100%, 64%)`,
        opacity,
        transform: `rotate(${rotate}deg)`,
      };
      if (size) {
        style.width = `${size.width}px`;
        style.height = `${size.height}px`;
      }
      return style;
    },
  },
};
</script>

<style lang="sass" scoped>
.sticky-animation-2
  height: 300vh
  overflow: visible

  .show-panel
    position: sticky
    height: 100vh
    min-height: 600px
    top: 0
    overflow: hidden

    .bubble-canvas-in-sticky
      position: absolute
      bottom: 0

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

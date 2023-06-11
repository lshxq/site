<template lang="pug">
.grid-layout-main
  .square 
    .item 
    .item 
    .item 
    .item 
    .item 
    .item 
    .item 
    .item 
    .item 
</template>

<style scoped>
.square:has(.item:nth-child(1):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(2):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(3):hover) {
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 2fr 1fr 1fr;
}
.square:has(.item:nth-child(4):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(5):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(6):hover) {
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1fr 2fr 1fr;
}
.square:has(.item:nth-child(7):hover) {
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 3fr;
}
.square:has(.item:nth-child(8):hover) {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 1fr 3fr;
}
.square:has(.item:nth-child(9):hover) {
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: 1fr 1fr 3fr;
}
</style>

<style lang="scss" scoped>
.grid-layout-main {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;

  .square {
    width: 400px;
    height: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-gap: 10px;
    transition: all 0.5s;

    .item:nth-child(1) {
      background: hsl(0, 100%, 64%);
    }
    .item:nth-child(2) {
      background: hsl(40, 100%, 64%);
    }
    .item:nth-child(3) {
      background: hsl(80, 100%, 64%);
    }
    .item:nth-child(4) {
      background: hsl(120, 100%, 64%);
    }
    .item:nth-child(5) {
      background: hsl(160, 100%, 64%);
    }
    .item:nth-child(6) {
      background: hsl(200, 100%, 64%);
    }
    .item:nth-child(7) {
      background: hsl(240, 100%, 64%);
    }
    .item:nth-child(8) {
      background: hsl(280, 100%, 64%);
    }
    .item:nth-child(9) {
      background: hsl(320, 100%, 64%);
    }
  }
}
</style>

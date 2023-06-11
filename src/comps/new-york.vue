<template lang="pug">
.main-container 
  .main-bg
    .mask 
      .text New York City
</template>

<style lang="sass" scoped>
$bg: url('./new-york.webp')

.main-bg
  background-image: $bg
  height: 500px
  position: relative
  .mask
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    background: rgba(0, 0, 0, .7)

    .text
      background-image: $bg
      height: 100%
      width: 100%
      display: flex
      justify-content: center
      align-items: center
      font-size: 12vw
      font-weight: bolder
      text-stroke: 1px white
      -webkit-text-stroke: 1px white
      background-clip: text
      -webkit-background-clip: text
      color: transparent
      transition: all .5s
    .text:hover
      font-size: 13.5vw
</style>

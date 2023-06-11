<template lang="pug">
.kanban-main-panel
  .left-panel
    el-calendar(v-model='date')
  .right-panel
  
</template>

<script>
export default {
  data() {
    return {
      date: new Date()
    }
  }
}
</script>

<style lang="sass">
$left-panel-width: 300px

.kanban-main-panel
  height: calc(100vh - 20px)
  background: #000000

  .left-panel
    height: 100%
    background: green
    display: inline-block
    width: $left-panel-width

  .right-panel
    display: inline-block
    height: 100%
    background: red
    width: calc(100% - #{$left-panel-width})
</style>
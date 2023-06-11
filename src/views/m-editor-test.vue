<template lang="pug">
.m-editor-test-main
  m-editor(v-model='value')
</template>

<script>
export default {
  data() {
    return {
      value: `hello`
    }
  }
}
</script>

<style lang="sass" scoped>
.m-editor-test-main
  height: 600px
</style>

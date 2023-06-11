<template lang="pug">
.link-main(@click.prevent.stop='linkClicked') {{text}}
</template>

<script>
export default {
  props: {
    data: null,
    text: String
  },
  methods: {
    linkClicked() {
      this.$emit('click', this.data)
    }
  }
}
</script>

<style lang="sass" scoped>
.link-main 
  color: white
  cursor: pointer
.link-main:hover
  color: #409eff
</style>
<template lang="pug">
.pano-list-main
  sy-pagin-data(url='public/photo/list' :query='query')
    template(v-slot:='scope')
      .panoramas
        .item(v-for='(photo, idx) of scope.data' :key='idx') {{photo}} {{idx}}
            

</template>

<script>
export default {
  created() {

  },
  data() {
    return {
      query: {
        orderBy: ''
      }
    };
  },
  methods: {

  }
};
</script>

<style lang="sass" scoped>
.panoramas
  display: flex
  flex-flow: row wrap
  .item
    position: relative
    margin: 10px
    width: 380px
    height: 250px
    


</style>

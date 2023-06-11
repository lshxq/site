<template lang="pug">
#app-main-panel
  pc(v-if='isPc')
  phone(v-else)
    
          

</template>

<script>
import utils from '@/utils.js'
import Pc from './components/home-pc.vue'
import Phone from './components/home-phone.vue'

export default {
  name: "App",
  components: {
    Pc,
    Phone
  },
  data() {
    return {};
  },
  computed: {
    isPc() {
      return utils.ua().isPc
    }
  },
  methods: {

  },
};
</script>

<style lang="sass" scoped>

</style>

<template>
  <z-canvas :views='$options.components'></z-canvas>
</template>
<script>
// TO SET UP VUE-ROUTER UNCOMMENT THE FOLLOWING LINES
// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router)
// const router = new Router()
export default {
  components: {
    holon: () => import('./views/holon'),
    settings: () => import('./views/settings')
  },
  mounted () {
    this.$zircle.config({
      mode: 'full',
      style: {
        theme: 'black',
        mode: 'dark'
      },
      debug: true
    })
    this.$zircle.toView('holon')
    //
    //   to: 'holon',
    //   params: { id: 'home' } // Optional
    // })
  }
}
</script>
<style>
a {
  color:  var( --primary);
  font-style: bold
}
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700');
@import url('https://use.fontawesome.com/releases/v5.1.0/css/all.css');
</style>

<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

// import HelloWorld from './components/HelloWorld.vue'
// import Client from './modules/clients/ClientView.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    NavBar
  }
}
</script>

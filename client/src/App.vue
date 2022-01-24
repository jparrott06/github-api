<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <PullComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import PullComponent from './components/PullComponent.vue'

export default {
  name: 'App',
  components: {
    PullComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

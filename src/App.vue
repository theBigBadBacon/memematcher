<template>
  <div id="app">
    <h1>Meme Matcher</h1>
    <Integrator/>
  </div>
</template>

<script>
import Integrator from './components/Integrator.vue'

export default {
  name: 'app',
  components: {
    Integrator
  }
}
</script>

<style>
html, body {
  min-height: 100%;
}
html {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(#acdfcb, #acddfc);
}
body {
  margin: 0;
}
h1 {
  font-size: 6rem;
  margin: 0;
  padding: 40px 0;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
@media (max-width: 768px) {
  h1 {
    font-size: 2em;
    margin: 0;
    padding: 20px 0 0 0;
  }
}
</style>

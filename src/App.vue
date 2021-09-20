<template>
  <h1>Breakout Game</h1>
  <GameCanvas/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameCanvas from './components/GameCanvas.vue';

@Options({
  components: {
    GameCanvas,
  },
})
export default class App extends Vue {}
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

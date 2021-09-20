<template>
  <h1>Breakout Game</h1>
  <GameCanvas ref="gameCanvas" /><br>
  <div style="display: inline-flex;">
    <button @click="restart">Restart</button>
    <button @click="switchPauseState">{{ paused ? "Resume" : "Pause" }}</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameCanvas from './components/GameCanvas.vue';

@Options({
  components: {
    GameCanvas,
  },
})
export default class App extends Vue {
  declare $refs: {
    gameCanvas: GameCanvas
  }

  paused = false;

  restart() {
    this.$refs.gameCanvas.restart();
    this.paused = false;
  }

  switchPauseState() {
    if (this.paused) {
      this.$refs.gameCanvas.resume();
      this.paused = false;
    } else {
      this.$refs.gameCanvas.pause();
      this.paused = true;
    }
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

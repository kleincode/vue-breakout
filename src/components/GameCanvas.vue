<template>
    <canvas :width="width" :height="height" ref="canvas" id="canvas"></canvas>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import Ball from './Ball';

export default class GameCanvas extends Vue {
  declare $refs: {
    canvas: HTMLCanvasElement
  }

  width = 600;

  height = 400;

  context : CanvasRenderingContext2D | null = null;

  ball = new Ball();

  mounted() {
    this.initCanvas();
  }

  initCanvas() {
    const { canvas } = this.$refs;
    this.context = canvas.getContext('2d');
    this.updateCanvas();
    setInterval(this.tick, 10);
  }

  tick() {
    this.ball.move(this.width, this.height);
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.context;
    if (ctx == null) {
      GameCanvas.handleError();
      return;
    }
    ctx.clearRect(0, 0, this.width, this.height);
    this.ball.draw(ctx);
  }

  static handleError() {
    console.error('Error!');
  }
}
</script>
<style scoped>
#canvas {
  border-width: 2px;
  border-color: #000080;
  border-style: solid;
}
</style>

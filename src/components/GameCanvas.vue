<template>
  <canvas
    :width="width"
    :height="height"
    ref="canvas"
    id="canvas"
    :class="isGameOver ? 'game-over' : ''"
  ></canvas>
</template>
<script lang="ts">
import { Vue } from 'vue-class-component';
import Ball from './Ball';
import Paddle from './Paddle';

export default class GameCanvas extends Vue {
  declare $refs: {
    canvas: HTMLCanvasElement
  }

  width = 600;

  height = 400;

  context: CanvasRenderingContext2D | null = null;

  ball = new Ball();

  paddle = new Paddle();

  interval = 0;

  isGameOver = false;

  mounted() {
    this.initCanvas();
  }

  initCanvas() {
    const { canvas } = this.$refs;
    this.context = canvas.getContext('2d');
    this.updateCanvas();
    document.addEventListener('keydown', this.onKeyDown, false);
    document.addEventListener('keyup', this.onKeyUp, false);
    this.isGameOver = false;
    this.resume();
  }

  tick() {
    this.paddle.move(this.width);
    this.ball.move(this.width, this.paddle);
    if (this.ball.isGameOver(this.height)) this.gameOver();
    else this.updateCanvas();
  }

  restart() {
    this.pause();
    this.ball = new Ball();
    this.paddle = new Paddle();
    this.resume();
  }

  pause() {
    clearInterval(this.interval);
  }

  resume() {
    this.interval = setInterval(this.tick, 10);
  }

  gameOver() {
    this.isGameOver = true;
    clearInterval(this.interval);
    if (this.context) this.context.clearRect(0, 0, this.width, this.height);
  }

  updateCanvas() {
    const ctx = this.context;
    if (ctx == null) {
      GameCanvas.handleError();
      return;
    }
    ctx.clearRect(0, 0, this.width, this.height);
    this.ball.draw(ctx);
    this.paddle.draw(ctx);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.paddle.moveRight = true;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.paddle.moveLeft = true;
    }
  }

  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
      this.paddle.moveRight = false;
    }
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
      this.paddle.moveLeft = false;
    }
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
#canvas.game-over {
  border-color: #ff0000;
}
</style>

import Paddle from './Paddle';

export default class Ball {
  x = 200;

  y = 180;

  dx = 5;

  dy = -4;

  radius = 10;

  colors = ['#5C6BC0', '#E91E63', '#FF7043', '#42A5F5', '#FDD835'];

  colorIndex = 0;

  draw(context: CanvasRenderingContext2D) {
    const ctx = context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.colors[this.colorIndex];
    ctx.fill();
    ctx.closePath();
  }

  private changeColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
  }

  move(width: number, paddle: Paddle) {
    const { x, y, radius } = this;
    // detect wall collisions
    if (y + this.dy < radius) {
      this.dy = -this.dy;
      this.changeColor();
    }
    if (x + this.dx < radius || x + this.dx + radius > width) {
      this.dx = -this.dx;
      this.changeColor();
    }
    // detect paddle collision
    if (this.dy >= 0 && y + radius > paddle.y && x >= paddle.x && x <= paddle.x + paddle.width) {
      this.dy = -this.dy;
      this.changeColor();
    }
    // move
    this.x += this.dx;
    this.y += this.dy;
  }

  isGameOver(height: number) {
    return this.y + this.radius > height;
  }
}

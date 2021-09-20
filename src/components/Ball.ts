import Brick from './Brick';
import Paddle from './Paddle';

export default class Ball {
  x = 200;

  y = 160;

  dx = 2;

  dy = -3;

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

  move(game: any, paddle: Paddle, bricks: Brick[]) {
    // move
    this.x += this.dx;
    this.y += this.dy;
    const { x, y, radius } = this;
    const { width } = game;
    // detect wall collisions
    if (y + this.dy < radius) {
      this.dy = -this.dy;
      this.y = radius + (radius - y);
      this.changeColor();
    }
    if (x + this.dx < radius) {
      this.dx = -this.dx;
      this.x = radius + (radius - x);
      this.changeColor();
    } else if (x + this.dx + radius > width) {
      this.dx = -this.dx;
      this.x = width - radius - (x + radius - width);
      this.changeColor();
    }
    // detect paddle collision
    if (this.dy >= 0 && y + radius > paddle.y && x >= paddle.x && x <= paddle.x + paddle.width) {
      this.dy = -this.dy;
      this.y = paddle.y - radius;
      this.changeColor();
    }
    // detect brick collision
    const collBrick = bricks.find((brick) => (
      brick.alive
      && x + radius >= brick.x && x - radius <= brick.x + brick.width
      && y + radius >= brick.y && y - radius <= brick.y + brick.height
    ));
    if (collBrick) {
      collBrick.kill();
      game.onBrickHit();
      this.dy = -this.dy;
      this.changeColor();
    }
  }

  isGameOver(height: number) {
    return this.y + this.radius > height;
  }
}

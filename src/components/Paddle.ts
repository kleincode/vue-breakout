export default class Paddle {
  x = 260;

  y = 360;

  width = 80;

  height = 10;

  readonly color = '#1A237E';

  readonly padding = 4;

  readonly moveSpeed = 8;

  moveLeft = false;

  moveRight = false;

  draw(context: CanvasRenderingContext2D) {
    const ctx = context;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(width: number) {
    if (this.moveLeft && !this.moveRight) {
      this.x = Math.max(this.x - this.moveSpeed, this.padding);
    } else if (this.moveRight && !this.moveLeft) {
      this.x = Math.min(this.x + this.moveSpeed, width - this.width - this.padding);
    }
  }
}

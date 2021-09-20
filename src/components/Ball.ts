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

  move(width: number, height: number) {
    const { x, y, radius } = this;
    // detect wall collisions
    if (y + this.dy < radius || y + this.dy + radius > height) {
      this.dy = -this.dy;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    }
    if (x + this.dx < radius || x + this.dx + radius > width) {
      this.dx = -this.dx;
      this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    }
    // move
    this.x += this.dx;
    this.y += this.dy;
  }
}

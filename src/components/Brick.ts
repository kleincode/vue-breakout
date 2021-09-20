export default class Brick {
  x: number;

  y: number;

  width: number;

  height: number;

  colorIndex: number;

  alive = true;

  constructor(x: number, y: number, width: number, height: number, colorIndex: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colorIndex = colorIndex;
  }

  static colors = ['#5C6BC0', '#E91E63', '#FF7043', '#42A5F5', '#FDD835'];

  draw(context: CanvasRenderingContext2D) {
    if (!this.alive) return;
    const ctx = context;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = Brick.colors[this.colorIndex];
    ctx.fill();
    ctx.closePath();
  }

  kill() {
    this.alive = false;
  }

  static generateBrickTable(width: number, brickHeight: number, rows: number, cols: number,
    innerPad: number, outerPad: number): Brick[] {
    const bricks: Brick[] = [];
    const brickWidth = (width - 2 * outerPad - (cols - 1) * innerPad) / cols;
    for (let col = 0; col < cols; col += 1) {
      for (let row = 0; row < rows; row += 1) {
        const x = outerPad + col * (brickWidth + innerPad);
        const y = outerPad + row * (brickHeight + innerPad);
        bricks.push(new Brick(x, y, brickWidth, brickHeight, row % Brick.colors.length));
      }
    }
    return bricks;
  }
}

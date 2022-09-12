var canvasCopy = null;

const drawLine = (context, startingPoint, endingPoint, color, lineWidth) => {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.moveTo(startingPoint.x, startingPoint.y);
  context.lineTo(endingPoint.x, endingPoint.y);
  context.lineJoin = "round";
  context.lineCap = "round";
  context.stroke();
  context.closePath();
};

const drawPoint = (context, point, color, radius) => {
  context.beginPath();
  context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
  context.lineWidth = 0;
  context.closePath();
};

const saveCanvas = (canvas) => {
  canvasCopy = document.createElement("canvas");
  canvasCopy.width = canvas.width;
  canvasCopy.height = canvas.height;
  canvasCopy.ctx = canvasCopy.getContext("2d");
  canvasCopy.ctx.drawImage(canvas, 0, 0);
};

const restoreCanvas = (canvas) => {
  if (canvasCopy == null) return;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(canvasCopy, 0, 0);
};

const isInsideCanvas = (event) => {
  if (event.target.id == "drawing-area") {
    return true;
  }
  return false;
};

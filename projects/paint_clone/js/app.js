const drawingFunction = () => {
  let isDrawing = false;
  let previousPoint = { x: 0, y: 0 };

  var c = document.querySelector("#drawing-area");
  var ctx = c.getContext("2d");
  ctx.canvas.width = window.innerWidth - 52;
  ctx.canvas.height = window.innerHeight - 2;

  onmousedown = (e) => {
    if (!isInsideCanvas(e)) {
      return;
    }

    saveCanvas(c);
    isDrawing = true;
    previousPoint = { x: e.layerX, y: e.layerY };

    if (selectedTool.name === "bucket") {
      selectedTool.func(ctx, previousPoint, selectedColor);
    }
    else{
      drawPoint(ctx, previousPoint, selectedColor, selectedTool.size / 2);
    }
  };

  onmouseup = (e) => {
    isDrawing = false;
    saveCanvas(c);
  };

  onmousemove = (e) => {
    const currentMouseCoordinates = { x: e.layerX, y: e.layerY };
    if (isDrawing && isInsideCanvas(e) && selectedTool.name !== "bucket") {
      selectedTool.func(
        ctx,
        previousPoint,
        currentMouseCoordinates,
        selectedColor,
        selectedTool.size
      );
    }
  };
};

window.addEventListener("load", drawingFunction);

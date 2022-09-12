const lineFunction = (context, initialMouseCoordinates, currentMouseCoordinates, brushColor, brushSize) =>{
    const canvas = context.canvas;
    restoreCanvas(canvas);
    saveCanvas(canvas);
    drawLine(
        context,
        initialMouseCoordinates,
        currentMouseCoordinates,
        brushColor,
        brushSize
      );
}
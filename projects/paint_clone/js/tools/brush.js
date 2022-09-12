const brushFunction = (context, previousMouseCoordinates, currentMouseCoordinates, brushColor, brushSize) => {
    drawLine(
        context,
        previousMouseCoordinates,
        currentMouseCoordinates,
        brushColor,
        brushSize
      );
      
      previousMouseCoordinates.x = currentMouseCoordinates.x;
      previousMouseCoordinates.y = currentMouseCoordinates.y;
}
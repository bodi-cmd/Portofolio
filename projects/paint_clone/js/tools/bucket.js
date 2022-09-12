let maxWidth = null;
let maxHeight = null;

const bucketFunction = (context, point, color) => {
  maxWidth = context.canvas.width;
  maxHeight = context.canvas.height;
  const screen = context.getImageData(0, 0, maxWidth, maxHeight);

  //implementation of a BFS algorithm
  const visitedPoints = new Map();
  const pointQueue = [point];
  const initialPixel = { ...context.getImageData(point.x, point.y, 1, 1) };

  visitedPoints.set(hashPoint(point),1);

  while (pointQueue.length) {
    const currPoint = pointQueue.shift();
    setPixel(screen, currPoint, color);

    //neighbours = [up,down,left,right]
    const neighbours = [
      { ...currPoint, y: currPoint.y - 1 },
      { ...currPoint, y: currPoint.y + 1 },
      { ...currPoint, x: currPoint.x - 1 },
      { ...currPoint, x: currPoint.x + 1 },
    ];

    neighbours.forEach((neighbour) => {
        const pixelData = getPixel(screen,neighbour);
      if (
        isPointInsideCanvas(neighbour) &&
        !visitedPoints.get(hashPoint(neighbour)) &&
        equalColorPixels(pixelData, initialPixel)
      ) {
        visitedPoints.set(hashPoint(neighbour),1);
        pointQueue.push(neighbour);
      }
    });
  }
  
  context.putImageData(screen,0,0);
};

const hashPoint = (point) => {
    return point.x * maxWidth + point.y
}

const getPixel = (screen, position) => {
  const index = (position.y * maxWidth + position.x) * 4;
  return { data: [...screen.data.slice(index, index + 4)] };
};

const isPointInsideCanvas = (point) => {
  if (point.x > maxWidth || point.x < 0 || point.y < 0 || point.y > maxHeight) {
    return false;
  }
  return true;
};

const equalColorPixels = (pixelA, pixelB) => {
  let equal = true;
  pixelA.data.forEach((channel, index) => {
    if (channel != pixelB.data[index]) equal = false;
  });
  return equal;
};

const setPixel = (screen, position, color) => {
  const index = (position.y * maxWidth + position.x) * 4;
  //color has the '#rrggbb' format in base16
  const _8bitColor = base16ColorTo8bitChannels(color);
  screen.data[index] = _8bitColor[0];
  screen.data[index+1] = _8bitColor[1];
  screen.data[index+2] = _8bitColor[2];
  screen.data[index+3] = _8bitColor[3];
};

const base16ColorTo8bitChannels = (color) => {
  if (color[0] !== "#") return -1;

  const r = parseInt(color.substring(1, 3), 16);
  const g = parseInt(color.substring(3, 5), 16);
  const b = parseInt(color.substring(5, 7), 16);

  return [r, g, b, 255];
};

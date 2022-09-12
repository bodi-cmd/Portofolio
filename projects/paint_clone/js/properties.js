const tools = {
  brush: { name: "brush", size: 10, func: brushFunction },
  line: { name: "line", size: 10, func: lineFunction },
  bucket: { name: "bucket", size: -1, func: bucketFunction },
};

var selectedColor = "#000000";
var selectedTool = tools["brush"];

var isSliderOpen = false;
var sliderWindow = null;
var sliderNumeric = null;
var sliderRange = null;

const menuFunction = () => {
  sliderWindow = document.querySelector("#slider-container");
  sliderRange = document.querySelector("#WidthInput");
  sliderNumeric = document.querySelector("#WidthSlider");
  const buttons = document.querySelectorAll(".button");
  const colorInput = document.querySelector("#color-picker");

  updateSliderWindow();

  buttons.forEach((button) => {
    button.onclick = () => menuButtonClickHandler(button.id, button.offsetTop);
  });

  colorInput.oninput = (e) => {
    selectedColor = e.target.value;
  };

  sliderNumeric.oninput = (e) => {
    selectedTool.size = e.target.value;
    updateSliderWindow();
  };

  sliderRange.oninput = (e) => {
    selectedTool.size = e.target.value;
    updateSliderWindow();
  };
};

const menuButtonClickHandler = (id, yPosition) => {
  if (isSliderOpen && id == selectedTool.name) {
    isSliderOpen = false;
    updateSliderWindow();
  } else {
    sliderWindow.style.top = `${yPosition + 1}px`;
    selectedTool = tools[id];
    isSliderOpen = tools[id].size > 0;
    updateSliderWindow();
  }
};

const updateSliderWindow = () => {
  sliderNumeric.value = selectedTool.size;
  sliderRange.value = selectedTool.size;

  document.querySelector(".selected")?.classList.remove("selected");
  document.querySelector(`#${selectedTool.name}`)?.classList.add("selected");

  sliderWindow.style.display = isSliderOpen ? "flex" : "none";
};

window.addEventListener("load", menuFunction);

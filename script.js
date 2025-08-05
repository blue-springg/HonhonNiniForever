function upDate(previewPic) {
  let display = document.getElementById('image');
  display.style.backgroundImage = `url('${previewPic.src}')`;
  display.innerHTML = previewPic.alt;
}

function undo() {
  let display = document.getElementById('image');
  display.style.backgroundImage = "url('')";
  display.innerHTML = "Hover over an image below to display here.";
}

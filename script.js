const IMAGES = [
  {version: "JP", src: "images/chunithm-jp.jpeg"},
  {version: "INTL", src: "images/chunithm-intl.jpg"}
];

const image = document.getElementById("displayImage");
const button = document.getElementById("toggleButton");

let imageIndex = 0;

button.addEventListener("click", () => {
  imageIndex = (imageIndex + 1) % IMAGES.length;
  image.src = IMAGES[imageIndex].src;
  button.textContent = IMAGES[imageIndex].version;
});

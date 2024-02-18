"strict mode";

let pageX;
let pageY;
let numKeysPressed = 0;
let numClicks = 0;
let clickX = 0;
let clickY = 0;

const inner = document.querySelector(".info.inner");
const outer = document.querySelector(".info.outer");
const cursor = document.querySelector(".info.cursor");
const keypress = document.querySelector(".info.keypress");
const pressed = document.querySelector(".info.pressed");
const clickCoordinates = document.querySelector(".info.clickCoordinates");
const clicks = document.querySelector(".info.clicks");

const updateDimensions = function () {
  let iw = window.innerWidth;
  let ih = window.innerHeight;
  let ow = window.outerWidth;
  let oh = window.outerHeight;
  inner.textContent = `${iw}px x ${ih}`;
  outer.textContent = `${ow}px x ${oh}`;
};

updateDimensions();
cursor.textContent = "x: 0 y: 0";
keypress.textContent = "_";
clickCoordinates.textContent = "x: 0 y: 0";
clicks.textContent = numClicks;
pressed.textContent = numKeysPressed;

const accessMouseCoordinates = function (event) {
  x = event.pageX;
  y = event.pageY;
  cursor.textContent = `x: ${x} y: ${y}`;
};

const updateKeypress = function (event) {
  if (event.key === " ") {
    console.log("space");
    keypress.textContent = "space";
    numKeysPressed++;
    pressed.textContent = numKeysPressed;
  } else {
    keypress.textContent = event.key;
    numKeysPressed++;
    pressed.textContent = numKeysPressed;
  }
};

const captureClick = function (event) {
  x = event.pageX;
  y = event.pageX;
  clickCoordinates.innerText = `x: ${x} y: ${y}`;
  numClicks++;
  clicks.textContent = numClicks;
};

//Abstracted
const listenToWindow = function (event, callback) {
  window.addEventListener(event, callback);
};

listenToWindow("resize", updateDimensions);
listenToWindow("mousemove", accessMouseCoordinates);
listenToWindow("keypress", updateKeypress);
listenToWindow("click", captureClick);

// Long-form
// window.addEventListener("resize", updateDimensions);
// window.addEventListener("mousemove", accessMouseCoordinates);
// window.addEventListener("keypress", updateKeypress);

// Drag and Drop

let dragged = null;
const target = document.querySelectorAll(".dropzone");
// console.log(`target length is: ${target.length}`);
const source = document.querySelectorAll(".draggable");

const dragStart = function (event) {
  dragged = event.target;
  console.log(dragged.parentNode);
};

const allowDrop = function (event) {
  event.preventDefault();
};

const dropElement = function (event) {
  event.preventDefault();
  console.log(event.target);
  if (event.target.className === "dropzone") {
    console.log("code executed");
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
};
for (let i = 0; i < source.length; i++) {
  source[i].addEventListener("dragstart", dragStart);
}
// for (let i = 0; i < target.length; i++) {
//   target[i].addEventListener("dragover", allowDrop);
//   target[i].addEventListener("drop", dropElement);
// }

for (let i = 0; i < target.length; i++) {
  target[i].addEventListener("dragover", allowDrop);
  target[i].addEventListener("drop", dropElement);
}

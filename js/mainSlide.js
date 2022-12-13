const slideList = document.getElementById("slide");
const slideContent = document.querySelectorAll(".slide-item");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const pagination = document.getElementById("slide-count");
const pageNumber = document.getElementById("count");
const maxPageNumber = document.getElementById("max-count");

const slideLen = slideContent.length;

const slideWidth = 1920;
const slideSpeed = 600;
const startNum = 0;
slideList.style.width = slideWidth * (slideLen + 2) + "px";
maxPageNumber.textContent = slideLen;
let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

slideList.style.transform =
  "translate3d(-" + slideWidth * (startNum + 1) + "px, 0px, 0px)";

let curIndex = startNum;
let curSlide = slideContent[curIndex];
let curNum = 1;
let pageNumCount = curSlide.classList.add("slide-active");

function nextMove() {
  next.addEventListener("click", () => {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * (curIndex + 2) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(() => {
        slideList.style.transition = "0ms";
        slideList.style.transform =
          "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }

    curSlide.classList.remove("slide-active");
    curSlide = slideContent[++curIndex];

    curSlide.classList.add("slide-active");
    pageNumber.textContent = curIndex + 1;
  });
}
nextMove();

function prevMove() {
  prev.addEventListener("click", () => {
    if (curIndex >= 0) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * curIndex + "px, 0px, 0px)";
    }
    if (curIndex === 0) {
      setTimeout(() => {
        slideList.style.transition = "0ms";
        slideList.style.transform =
          "translate3d(-" + slideWidth * slideLen + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = slideLen;
    }
    curSlide.classList.remove("slide-active");
    curSlide = slideContent[--curIndex];

    curSlide.classList.add("slide-active");
    pageNumber.textContent = curIndex + 1;
  });
}
prevMove();

const play = document.getElementById("play");
const pause = document.getElementById("pause");
let slideAuto;
function move() {
  slideAuto = setInterval(function () {
    if (curIndex <= slideLen - 1) {
      slideList.style.transition = slideSpeed + "ms";
      slideList.style.transform =
        "translate3d(-" + slideWidth * (curIndex + 2) + "px, 0px, 0px)";
    }
    if (curIndex === slideLen - 1) {
      setTimeout(() => {
        slideList.style.transition = "0ms";
        slideList.style.transform =
          "translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      curIndex = -1;
    }

    curSlide.classList.remove("slide-active");
    curSlide = slideContent[++curIndex];
    curSlide.classList.add("slide-active");
    pageNumber.textContent = curIndex + 1;
  }, 3000);
}
move();
play.addEventListener("click", () => {
  pause.classList.remove("btn-hide");
  play.classList.add("btn-hide");
  move();
});
pause.addEventListener("click", () => {
  play.classList.remove("btn-hide");
  pause.classList.add("btn-hide");
  clearInterval(slideAuto);
});

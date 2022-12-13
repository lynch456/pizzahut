const banners = document.getElementById("banner-thum_wrap");
const banner = document.querySelectorAll(".banner-thum");
const paginationDot = document.querySelectorAll(".page-dot");
const subSlides = document.getElementById("sub-slide_wrap");
const subSlide = document.querySelectorAll(".sub-img");
const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");
const subPlay = document.getElementById("play-btn");
const subPause = document.getElementById("pause-btn");
const bannerText = document.querySelectorAll(".change-text");

let currentIdx = 0;
let subSlideCount = subSlide.length;
let subSlideHeight = 146;
let subSlideMargin = 24;
let speed = 300;
let bannerIdx = 0;
let bannerHeight = 486;
let bannerCount = banner.length;

function subSlideClone() {
  for (let i = 0; i < subSlideCount; i++) {
    let cloneSlide = subSlide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    subSlides.appendChild(cloneSlide);
  }
  for (let i = subSlideCount - 1; i >= 0; i--) {
    let cloneSlide = subSlide[i].cloneNode(true);
    cloneSlide.classList.add("clone");
    subSlides.prepend(cloneSlide);
  }
  updateHeight();
  setInitialPos();
}
subSlideClone();
function updateHeight() {
  let currentSlides = subSlide;
  let newSlideCount = currentSlides.length;
  let newHeight =
    (subSlideHeight + subSlideMargin) * newSlideCount - subSlideMargin + "px";
  subSlides.style.height = newHeight;
}
function setInitialPos() {
  let initialTranslateVal = -(subSlideHeight + subSlideMargin) * subSlideCount;
  subSlides.style.transform = `translateY(` + initialTranslateVal + `px)`;
}

let pageDotCount = paginationDot.length;

function subSlideMove(num) {
  subSlides.style.transition = speed + "ms";
  subSlides.style.top = -num * (subSlideHeight + subSlideMargin) + "px";
  currentIdx = num;

  for (let j = 0; j < bannerCount; j++) {
    banner[j].index = j;

    if (j == currentIdx) {
      banner[j].classList.add("active");
      paginationDot[j].classList.add("on");
      bannerText[j].classList.add("text-on");
    } else if (
      banner[currentIdx] == undefined ||
      currentIdx == 4 ||
      currentIdx == 0
    ) {
      banner[0].classList.add("active");
      banner[j].classList.remove("active");
      paginationDot[0].classList.add("on");
      paginationDot[j].classList.remove("on");
      bannerText[0].classList.add("text-on");
      bannerText[j].classList.remove("text-on");
    } else {
      banner[j].classList.remove("active");
      paginationDot[j].classList.remove("on");
      bannerText[j].classList.remove("text-on");
    }
  }

  if (currentIdx == subSlideCount || currentIdx == -subSlideCount) {
    setTimeout(() => {
      subSlides.style.transition = `0ms`;
      subSlides.style.top = "0px";
      currentIdx = 0;
    }, 300);
  }
}

let n = 0;
function pageDotMove() {
  subSlides.style.transition = speed + "ms";

  for (let i = 0; i < bannerCount; i++) {
    paginationDot[i].index = i;
    paginationDot[n].classList.add("on");
    banner[n].classList.add("active");
    bannerText[n].classList.add("text-on");
    paginationDot[i].addEventListener("click", (e) => {
      e.preventDefault();
      n = e.currentTarget.index;

      for (let j = 0; j < bannerCount; j++) {
        if (j == n) {
          banner[j].classList.add("active");
          paginationDot[j].classList.add("on");
          subSlides.style.top = -n * (subSlideHeight + subSlideMargin) + "px";
        } else {
          banner[j].classList.remove("active");
          paginationDot[j].classList.remove("on");
        }
      }
    });
  }
}
pageDotMove();

downBtn.addEventListener("click", () => {
  subSlideMove(currentIdx + 1);
});
upBtn.addEventListener("click", () => {
  subSlideMove(currentIdx - 1);

  if (currentIdx == -1) {
    banner[3].classList.add("active");
    bannerText[3].classList.add("text-on");
    paginationDot[3].classList.add("on");
    bannerText[0].classList.remove("text-on");
    bannerText[1].classList.remove("text-on");
    bannerText[2].classList.remove("text-on");
    paginationDot[0].classList.remove("on");
    paginationDot[1].classList.remove("on");
    paginationDot[2].classList.remove("on");
  } else if (currentIdx == -2) {
    banner[2].classList.add("active");
    bannerText[2].classList.add("text-on");
    paginationDot[2].classList.add("on");
    bannerText[0].classList.remove("text-on");
    bannerText[1].classList.remove("text-on");
    bannerText[3].classList.remove("text-on");
    paginationDot[0].classList.remove("on");
    paginationDot[1].classList.remove("on");
    paginationDot[3].classList.remove("on");
  } else if (currentIdx == -3) {
    banner[1].classList.add("active");
    bannerText[1].classList.add("text-on");
    paginationDot[1].classList.add("on");
    bannerText[0].classList.remove("text-on");
    bannerText[2].classList.remove("text-on");
    bannerText[3].classList.remove("text-on");
    paginationDot[0].classList.remove("on");
    paginationDot[2].classList.remove("on");
    paginationDot[3].classList.remove("on");
  } else if (currentIdx == -4) {
    banner[0].classList.add("active");
    bannerText[0].classList.add("text-on");
    paginationDot[0].classList.add("on");
    bannerText[1].classList.remove("text-on");
    bannerText[2].classList.remove("text-on");
    bannerText[3].classList.remove("text-on");
    paginationDot[1].classList.remove("on");
    paginationDot[2].classList.remove("on");
    paginationDot[3].classList.remove("on");
  }
});

let subSlideAuto = undefined;
function subSlideMoveAuto() {
  if (subSlideAuto == undefined) {
    subSlideAuto = setInterval(() => {
      subSlideMove(currentIdx + 1);
    }, 2000);
  }
}
function subSlideMoveStop() {
  clearInterval(subSlideAuto);
  subSlideAuto = undefined;
}
subSlideMoveAuto();
subPlay.addEventListener("click", () => {
  subPlay.classList.add("btn-hide");
  subPause.classList.remove("btn-hide");
  subSlideMoveAuto();
});
subPause.addEventListener("click", () => {
  subPlay.classList.remove("btn-hide");
  subPause.classList.add("btn-hide");
  subSlideMoveStop();
});

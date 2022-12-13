const scrollOn = document.querySelector("header");

window.onscroll = () => {
  window.scrollY
    ? scrollOn.classList.add("scrollOn")
    : scrollOn.classList.remove("scrollOn");
};

const menuBtn = document.getElementById("menu-btn");

const btnTop = document.querySelector(".btn-top");
const btnBottom = document.querySelector(".btn-bottom");

const allMenu = document.getElementById("all-menu");
const allMenuBack = document.getElementById("all-menu_background");
const menuList = document.getElementById("menu-inner");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("btnActive");
  allMenuBack.classList.toggle("backOn");
  menuList.classList.toggle("menuOpen");
});

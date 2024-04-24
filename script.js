"use strict";

const navLinks = document.querySelectorAll(".nav-item");
const navBar = document.querySelector(".nav-bar");
const arrToTopMobile = document.querySelector(".nav-to-top-arr");
const sectionOne = document.querySelector("#section-1");
const logotype = document.querySelector(".logotype");
const headerImg = document.querySelector(".header-img");
const sections = document.querySelectorAll(".section-container");

const slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slider-item");
const sliderBtnNext = document.querySelector("#slider-btn-next");
const sliderBtnPrev = document.querySelector("#slider-btn-prev");
const lazyImg = document.querySelectorAll("img[data-src]");

// SLIDES TO GENERATE
const addSlides = [
  {
    title: "Portfolio Site!",
    content:
      "It's the site you are currently looking at, created by me to showcase my projects. It was built using pure HTML, CSS and JavaScript! You can check it out on github by clicking the link below:",
    link: "https://github.com/Coblexx/Portfolio-site",
  },
  {
    title: "Live commerce!",
    content:
      "Currently in progress, me along with 6 people are currently working on a Live commerce platform, where shops and creators can showcase and sell their products live! With another team member, I'm responsible for the frontend part. (Repo coming soon)",
    link: "",
  },
];

// NAVIGATION BEHAVIOR
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    let sectionNum = document.querySelector(`#${link.dataset.section}`);

    if (!sectionNum) {
      sectionNum = document.body;
      sectionNum.scrollIntoView({ behavior: "smooth" });
    } else sectionNum.scrollIntoView({ behavior: "smooth" });
  });
});

// ADD SEPARATOR AFTER EACH SECTION
sections.forEach((section) => {
  const separator = document.createElement("div");
  separator.classList.add("separator");

  if (section.id !== "section-1") section.appendChild(separator);
});

// STICKY NAV
function stickyNavObserver(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navBar.classList.add("sticky-nav");
    navBar.style.top = "0px";

    arrToTopMobile.classList.add("show-arr-to-top");
  } else {
    setTimeout(() => {
      navBar.classList.remove("sticky-nav");
      arrToTopMobile.classList.remove("show-arr-to-top");
    }, 200);
    navBar.style.top = "-80px";
  }
}

const sectonOneObserver = new IntersectionObserver(stickyNavObserver, {
  root: null,
  rootMargin: "-80px",
  threshold: 0,
});
sectonOneObserver.observe(sectionOne);

// LAZY LOADING
function loadImg(imgs, observer) {
  let [img] = imgs;

  if (!img.isIntersecting) return;

  img.target.src = img.target.dataset.src;
  img.target.addEventListener("load", function () {
    img.target.classList.remove("lazy-loading");
    img.target.style.transition = "filter 0.5s ease";
    img.target.style.filter = "blur(0)";
  });

  observer.unobserve(img.target);
}

const lazyImgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
lazyImg.forEach((img) => lazyImgObserver.observe(img));

// ADD SLIDES
addSlides.forEach(function (slide) {
  const {
    title,
    content,
    link = "#",
    img = "src/img/project-icon.png",
  } = slide;
  const html = ` 
  <div class="slider-item">
    <p class="slider-title">${title}</p>
    <div class="slider-item-desc">
      <img src=${img} class="slider-img img"/>
      <p class="slider-content">
      ${content}
      </p>
    </div>
    ${
      link
        ? `
      <div class="slider-link-container">
        <a href="${link}" class="slider-link link" target="_blank">
          Github &rsaquo;
        </a>
      </div>
    `
        : ""
    }
    </div>  
  `;

  slider.insertAdjacentHTML("beforeend", html);
  slides = document.querySelectorAll(".slider-item");
});

// SLIDER LOGIC
let slideId = 0;
const lastSlideId = slides.length - 1;

function changeSlidePosition(curSlide) {
  slides.forEach((slide) => {
    const newPosition = 100 * -curSlide;
    slide.style.transform = `translateX(${newPosition}%)`;
    slide.style.transition = "transform 0.5s ease";
  });
}
changeSlidePosition(0);

sliderBtnNext.addEventListener("click", () => {
  slideId = slideId === lastSlideId ? 0 : slideId + 1;
  changeSlidePosition(slideId);
});

sliderBtnPrev.addEventListener("click", () => {
  slideId = slideId === 0 ? lastSlideId : slideId - 1;
  changeSlidePosition(slideId);
});

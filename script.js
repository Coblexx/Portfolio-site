const navLinks = document.querySelectorAll(".nav-item");
const navBar = document.querySelector(".nav-bar");
const sectionOne = document.querySelector("#section-1");
const logotype = document.querySelector(".logotype");
const headerImg = document.querySelector(".header-img");

const slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slider-item");
const sliderBtnNext = document.querySelector("#slider-btn-next");
const sliderBtnPrev = document.querySelector("#slider-btn-prev");
const lazyImg = document.querySelectorAll("img[data-src]");

const addSlides = [
  {
    title: "Portfolio Site!",
    content:
      "This is a project, created by me to showcase my portfolio. It was built using pure HTML, CSS and JavaScript! You can check it out on github by clicking the link below:",
    link: "https://github.com/Coblexx/Portfolio-site",
  },
  { title: "test", content: "test test", link: "" },
];

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    sectionNum = document.querySelector(`#${link.dataset.section}`);
    sectionNum.scrollIntoView({ behavior: "smooth" });
  });
});

// sticky nav logic
function stickyNavObserver(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    navBar.classList.add("sticky-nav");
    navBar.style.top = "0px";
  } else {
    setTimeout(() => {
      navBar.classList.remove("sticky-nav");
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

// add slides to the slider
addSlides.forEach(function (slide) {
  const { title, content, link = "#" } = slide;
  const html = ` 
  <div class="slider-item">
  <p class="slider-title">${title}</p>
  <p class="slider-content">
    ${content}
  </p>
  <div class="slider-link-container">
    <a href="${link}" class="slider-link link" target="_blank"
      >Look it up on Github!</a
    >
  </div>`;

  slider.insertAdjacentHTML("beforeend", html);
  slides = document.querySelectorAll(".slider-item");
});

//slider nav
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

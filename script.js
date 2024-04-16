const navLinks = document.querySelectorAll(".nav-item");
const logotype = document.querySelector(".logotype");
const headerImg = document.querySelector(".header-img");

const slides = document.querySelectorAll(".slider-item");
const sliderBtnNext = document.querySelector("#slider-btn-next");
const sliderBtnPrev = document.querySelector("#slider-btn-prev");
const lazyImg = document.querySelectorAll("img[data-src]");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    sectionNum = document.querySelector(`#${link.dataset.section}`);
    sectionNum.scrollIntoView({ behavior: "smooth" });
  });
});

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
  console.log(slideId);
  changeSlidePosition(slideId);
});

sliderBtnPrev.addEventListener("click", () => {
  slideId = slideId === 0 ? lastSlideId : slideId - 1;
  changeSlidePosition(slideId);
});

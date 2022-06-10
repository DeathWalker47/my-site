import SmoothScroll from "smooth-scroll";
const scroll = new SmoothScroll(".nav__link, .hero__works, .to-top", {
  speed: 600,
});

const linkToTop = document.querySelector(".to-top");
const topSection = document.querySelector(".hero");
console.log();
window.addEventListener("scroll", (e) => {
  let y = window.scrollY;
  if (y > (topSection.clientHeight / 2) ) {
    linkToTop.classList.add('to-top--active')
  } else {
    linkToTop.classList.remove('to-top--active')
  }
});

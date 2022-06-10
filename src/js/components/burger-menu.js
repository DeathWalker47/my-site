import { burger } from "../functions/burger";
import { enableScroll } from '../functions/enable-scroll';


const menuLink = document.querySelectorAll(".nav__link");
menuLink.forEach((el) => {
  el.addEventListener("click", (e) => {
    enableScroll();
    document.querySelector(".nav ").classList.remove("menu--active");
    document.querySelector(".burger ").classList.remove("burger--active");
  });
});

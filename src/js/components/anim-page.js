import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

if(ScrollTrigger.isTouch === 0) {

  gsap.fromTo('.amin-top', {opacity: 1}, {
    opacity:0,
    scrollTrigger: {
      trigger: '.amin-top',
      start: 150,
      end: 800,
      scrub: 0.5,
    }
  })

  gsap.fromTo('.amin-top__title', {y:0}, {
    y: -150,
    scrollTrigger: {
      trigger: '.amin-top__title',
      start: 80,
      end: 500,
      scrub: 1,
    }
  })

  let itemsLeft = gsap.utils.toArray('.anim-gallery__left .anim-gallery__item');
  // console.log(itemsL);

  itemsLeft.forEach(elem => {
    gsap.fromTo(elem, {opacity:0, x: -70, y: 90}, {
      opacity: 1,
      x: 0,
      y:0,
      scrollTrigger: {
        trigger: elem,
        start: '-820',
        end: '-120',
        scrub: 1,
      }
    })
  })
  let itemsRight = gsap.utils.toArray('.anim-gallery__right .anim-gallery__item');
  // console.log(itemsL);

  itemsRight.forEach(elem => {
    gsap.fromTo(elem, {opacity:0, x: 50, y: 100}, {
      opacity: 1,
      x: 0,
      y:0,
      scrollTrigger: {
        trigger: elem,
        start: '-720',
        end: '-100',
        scrub: 1.2,
      }
    })
  })
}




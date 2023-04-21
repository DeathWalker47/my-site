const sliderMain = new Swiper('.slider_main', {
  freeMode: true,
  centeredSlides: true,
  mousewheel: true,
  parallax:true,
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
    680: {
      slidesPerView: 3.5,
      spaceBetween: 60,
    }
  },
 

})

const sliderBg = new Swiper('.slider_bg', {
  freeMode: true,
  centeredSlides: true,
  parallax:true,
  slidesPerView: 2.5,
  spaceBetween: 60,
  // thumbs: {
  //   swiper: sliderMain
  // }
})

sliderMain.controller.control = sliderBg

document.querySelectorAll('.slider__item').forEach(e => {
  e.addEventListener('click', el => {
    e.classList.toggle('open')
  })
})

let desc = document.querySelector('.descr')
sliderMain.on('slideChange', e => {
  sliderMain.activeIndex >0 ? desc.classList.add('hidden'): desc.classList.remove('hidden')
})
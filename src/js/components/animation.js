import AOS from 'aos';

window.addEventListener("load", () => {
  AOS.init({
    disable: 'phone',
    startEvent: 'DOMContentLoaded',
    easing: 'ease',
    duration: 1000,
    once: true,
  });
});

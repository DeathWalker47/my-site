const navLine = document.querySelector('.nav__line'),
      navItem = document.querySelectorAll('.nav__link');

navLine.style.width = `${navItem[0].offsetWidth}px`;

navItem.forEach(el => {
  el.addEventListener('mouseenter', (e) => {
    navLine.style.width = `${e.currentTarget.offsetWidth}px`;
    navLine.style.transform = `translateX(${e.currentTarget.offsetLeft}px)`
  });

  el.addEventListener('mouseleave', (e) => {
    navLine.style.width = `${navItem[0].offsetWidth}px`;
    navLine.style.transform = null;
  });

});

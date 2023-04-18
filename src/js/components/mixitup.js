import mixitup from "mixitup";

if(document.querySelector('.portfolio-list')) {

  const mixer = mixitup(".portfolio-list", {
    animation: {
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      duration: 600,
    },
    // animation: {
    //   easing: "ease-in-out",
    //   duration: 800,
    // },
  });

  const btnsFilter = document.querySelectorAll(".filter__btn");
  const btnMore = document.querySelector(".btn-more");
  const portfolioWorks = document.querySelectorAll(".portfolio-list__item");
  const asfafaf = document.querySelectorAll(".portfolio-list__item--visually");

  btnsFilter.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      if (
        !(
          self.dataset.filter === "all" &&
          self.classList.contains("mixitup-control-active")
        )
      ) {
        btnMore.classList.add("btn-more--hidden");
      } else {
        if (asfafaf.length < 6) {
          btnMore.classList.add("btn-more--hidden");
        } else {
          btnMore.classList.remove("btn-more--hidden");
        }
      }
    });
  });

  btnMore.addEventListener("click", (e) => {
    e.preventDefault();
    portfolioWorks.forEach((el) => {
      if (!el.classList.contains("portfolio-list__item--visually")) {
        el.classList.add("portfolio-list__item--visually");
      }
    });
    btnMore.classList.add("btn-more--hidden");
    setTimeout(() => {
      btnMore.remove();
    }, 200);
  });
}


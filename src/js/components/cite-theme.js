if(document.querySelector('.hero-themes__btn')) {

  
  const btnsTheme = document.querySelectorAll(".hero-themes__btn");

  btnsTheme.forEach((el) => {
    el.addEventListener("click", (e) => {
      const self = e.currentTarget;
      const changeOfTheme = (selectopr, theme) => {
        document.querySelectorAll(selectopr).forEach((el) => el.classList.remove("hero-themes__btn--active"));
        self.classList.add("hero-themes__btn--active");
        localStorage.setItem("theme", theme);
      };

      if (self.classList.contains("hero-themes__btn--light")) {
        changeOfTheme(".hero-themes__btn", "light");
        document.querySelector("html").classList.add("light-theme");
      } else if (self.classList.contains("hero-themes__btn--dark")) {
        changeOfTheme(".hero-themes__btn", "dark");
        document.querySelector("html").classList.remove("light-theme");
      }
    });
  });

  if (localStorage.getItem("theme") === "light") {
    btnsTheme.forEach((el) => el.classList.remove("hero-themes__btn--active"));
    document.querySelector('.hero-themes__btn--light').classList.add('hero-themes__btn--active')
    document.querySelector("html").classList.add("light-theme");
  } else if (localStorage.getItem("theme") === "dark") {
    btnsTheme.forEach((el) => el.classList.remove("hero-themes__btn--active"));
    document.querySelector('.hero-themes__btn--dark').classList.add('hero-themes__btn--active')
    document.querySelector("html").classList.remove("light-theme");
  }
}


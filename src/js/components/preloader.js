if(document.querySelector('.preloader')) {

  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
      if (!preloader.classList.contains("preloader--hidden")) {
        preloader.classList.add("preloader--hidden");
        document.querySelector("body").classList.remove("hidden");
      }
    }, 400);
    setTimeout(() => {
      if (preloader.classList.contains("preloader--hidden")) {
        preloader.remove();
      }
    }, 2000);

  });
}

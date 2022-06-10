const inputHidden = document.querySelector(".input-services");
const spanChecked = document.querySelectorAll(".checkbox__content");
const formInput = document.querySelectorAll(".form__input");

spanChecked.forEach((el) => {
  el.addEventListener("click", (e) => {
    const self = e.currentTarget;
    document.querySelectorAll(".checkbox__content").forEach((el) => {
      el.classList.remove("checkbox__content--checked");
    });
    self.classList.add("checkbox__content--checked");
    if (self.textContent) {
      inputHidden.value = self.textContent;
    }
    console.log(inputHidden.value);
  });
});

formInput.forEach((el) => {
  el.addEventListener("change", (e) => {
    const self = e.currentTarget;
    if (self.value) {
      self.style.borderColor = "#fe206f";
    } else {
      self.style.borderColor = "";
    }
  });
});

import GraphModal from 'graph-modal';
const modal = new GraphModal();


if(document.querySelectorAll('.modals')) {

  const modalOverlay = document.querySelector(".modal-overlay"),
    modalWindow = document.querySelector(".modal"),
    modalConent = document.querySelector(".modal-content"),
    modalBtnClose = document.querySelector(".modal-content__btn"),
    modalOpenLink = document.querySelector(".modal-link"),
    notFinished = document.querySelector('.portfolio-work__link--not-finished')

  // Функции для открытия  модакли
  const openModalWindow = () => {
    modalOverlay.classList.add("modal-overlay--visible");
    modalWindow.classList.add("modal--visible");
    document.querySelector('body').classList.add('hidden')
  };

  const closeModalWindow = () => {
    modalOverlay.classList.remove("modal-overlay--visible");
    modalWindow.classList.remove("modal--visible");
    document.querySelector('body').classList.remove('hidden')
  };

  modalOpenLink.addEventListener("click", (e) => {
    e.preventDefault();
    openModalWindow();
  });

  modalOverlay.addEventListener("click", (e) => {
    if (
      e.target == modalOverlay ||
      e.target == modalWindow ||
      e.target == modalBtnClose
    ) {
      closeModalWindow();
    }
  });
}

const notFinished = document.querySelector('.portfolio-work__link--not-finished');
 notFinished.addEventListener('click', (e) => {
  e.preventDefault();
  openModalWindow();

 })


 notFinished.addEventListener('click', (e)=> {
  e.preventDefault();
 })

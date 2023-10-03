import {
  RESULT_PER_PAGE,
  state,
  paginationEl,
  paginationNumberBackEl,
  paginationBtnBackEl,
  paginationBtnNextEl,
  paginationNumberNextEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const renderPaginationButtons = () => {
  //back button in page 2 or further
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove("pagination__button--hidden");
  } else {
    paginationBtnBackEl.classList.add("pagination__button--hidden");
  }

  if (state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add("pagination__button--hidden");
  } else {
    paginationBtnNextEl.classList.remove("pagination__button--hidden");
  }

  //update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
};

const clickHandler = (event) => {
  const clickedButtonEl = event.target.closest(".pagination__button");

  if (!clickedButtonEl) return;

  const nextPage = clickedButtonEl.className.includes("--next") ? true : false;

  nextPage ? state.currentPage++ : state.currentPage--;

  //render pagination buttons
  renderPaginationButtons();

  renderJobList();
};

paginationEl.addEventListener("click", clickHandler);

export default renderPaginationButtons;

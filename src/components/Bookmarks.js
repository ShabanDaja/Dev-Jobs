import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const clickHandler = (event) => {
  // Don't continue if click was outside bookmark button
  if (!event.target.className.includes("bookmark")) return;

  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  // persist data with local storage
  localStorage.setItem(
    "bookmarkJobItems",
    JSON.stringify(state.bookmarkJobItems)
  );

  //update bookmark icon
  document
    .querySelector(".job-info__bookmark-icon")
    .classList.toggle("job-info__bookmark-icon--bookmarked");
};

const mouseEnterHandler = () => {
  //makes bookmark button look active
  bookmarksBtnEl.classList.add("boockmarks.btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");

  //render bookmarks job list
  renderJobList("bookmarks");
};
const mouseLeaveHandler = () => {
  //makes bookmark button look inactive
  bookmarksBtnEl.classList.remove("boockmarks.btn--active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

jobDetailsEl.addEventListener("click", clickHandler);
bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);

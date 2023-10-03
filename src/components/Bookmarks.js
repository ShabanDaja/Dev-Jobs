import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from "../common.js";
import renderJobList from "./JobList.js";

const mouseEnterHandler = () => {
  //makes bookmark button look active
  bookmarksBtnEl.classList.add("boockmarks.btn--active");

  // make job list visible
  jobListBookmarksEl.classList.add("job-list--visible");
};
const mouseLeaveHandler = () => {
  //makes bookmark button look inactive
  bookmarksBtnEl.classList.remove("boockmarks.btn--active");

  // make job list invisible
  jobListBookmarksEl.classList.remove("job-list--visible");
};

bookmarksBtnEl.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksEl.addEventListener("mouseleave", mouseLeaveHandler);

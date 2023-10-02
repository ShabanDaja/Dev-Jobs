import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const submitHandler = (event) => {
  // prevent default behavior
  event.preventDefault();

  //search text
  const searchText = searchInputEl.value;

  //validation
  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }
  //blur input
  searchInputEl.blur();
  // remove previous job items
  jobListSearchEl.innerHTML = "";

  renderSpinner("search");

  //fetch search results
  fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
    .then((response) => {
      if (!response.ok) {
        console.log("Something went wrong!");
        return;
      }
      return response.json();
    })
    .then((data) => {
      //extract job items only
      const { jobItems } = data;

      renderSpinner("search");
      numberEl.textContent = jobItems.length;
      renderJobList(jobItems);
    })
    .catch((error) => console.log(error));
};
searchFormEl.addEventListener("submit", submitHandler);

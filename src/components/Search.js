import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
  getData,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./JobList.js";

const submitHandler = async (event) => {
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
  try {
    const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    //extract job items only
    const { jobItems } = data;

    renderSpinner("search");
    numberEl.textContent = jobItems.length;
    renderJobList(jobItems);
  } catch (error) {
    renderSpinner("search");
    renderError(error.message);
  }
};
searchFormEl.addEventListener("submit", submitHandler);

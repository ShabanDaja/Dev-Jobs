import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";

import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";

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

      jobItems.slice(0, 7).forEach((jobItem) => {
        const newJobItemHTML = `
                      <li class="job-item">
                          <a class="job-item__link" href="${jobItem.id}">
                              <div class="job-item__badge">${jobItem.badgeLetters}</div>
                              <div class="job-item__middle">
                                  <h3 class="third-heading">${jobItem.title}</h3>
                                  <p class="job-item__company">${jobItem.company}</p>
                                  <div class="job-item__extras">
                                      <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                                      <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                                      <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                                  </div>
                              </div>
                              <div class="job-item__right">
                                  <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                  <time class="job-item__time">${jobItem.daysAgo}</time>
                              </div>
                          </a>
                      </li>
                  `;
        jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
      });
    })
    .catch((error) => console.log(error));
};
searchFormEl.addEventListener("submit", submitHandler);

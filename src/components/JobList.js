import {
  jobListSearchEl,
  jobDetailsContentEl,
  BASE_API_URL,
  getData,
  state,
  RESULT_PER_PAGE,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = () => {
  jobListSearchEl.innerHTML = "";
  state.searchJobItems
    .slice(
      state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
      state.currentPage * RESULT_PER_PAGE
    )
    .forEach((jobItem) => {
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
};

//Job list component
const clickHandler = async (event) => {
  event.preventDefault();

  //get clicked job element
  const jobItemEl = event.target.closest(".job-item");

  // remove  the active class from previously active job item

  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  // add active class
  jobItemEl.classList.add("job-item--active");

  // empty the job details section
  jobDetailsContentEl.innerHTML = "";
  renderSpinner("job-details");

  // get the ID
  const id = jobItemEl.children[0].getAttribute("href");

  // fetch job item data
  try {
    const data = await getData(`${BASE_API_URL}/jobs/${id}`);

    const { jobItem } = data;

    renderSpinner("job-details");

    renderJobDetails(jobItem);
  } catch (error) {
    renderSpinner("job-details");
    renderError(error.message);
  }
};

jobListSearchEl.addEventListener("click", clickHandler);

export default renderJobList;

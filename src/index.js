export * from "./css/styles.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import debounce from "lodash/debounce";
import compiledTemplate from "./template/markup-one.handlebars";
import compiledTemplatemany from "./template/markup-many.handlebars";
import { fetchCountries } from "./js/fetchCountries";

const DEBOUNCE_DELAY = 300;

const countryInfo = document.querySelector(".country-info");
const countryList = document.querySelector(".country-list");
const input = document.querySelector("#search-box");

input.addEventListener("input", new debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  const name = e.target.value.trim();
  clearCountryList();
  clearCountryInfo();
  if (name) {
    return fetchCountries(name).then(filterArrayLength).then(renderChange);
  }
}

function clearCountryList() {
  countryList.innerHTML = "";
}

function clearCountryInfo() {
  countryInfo.innerHTML = "";
}

function filterArrayLength(response) {
  if (response.length > 10) {
    throw Error(
      Notify.info("Too many matches found. Please enter a more specific name.")
    );
  }
  return response;
}

function renderColection(response) {
  return response
    .map((response) => {
      return compiledTemplatemany(response);
    })
    .join("");
}


function renderChange(response) {
    if (response.length !== 1) {
      clearCountryList();
      clearCountryInfo();
      countryList.innerHTML = renderColection(response);
      return;
    }
    clearCountryList();
    countryInfo.innerHTML = compiledTemplate(response[0]);
}

import { Notify } from "notiflix/build/notiflix-notify-aio";

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then((r) => r.json())
    .then(handleErrors);
}

function handleErrors(response) {
  if (response.status === 404) {
    throw Error(Notify.failure("Oops, there is no country with that name"));
  }
  return response;
}

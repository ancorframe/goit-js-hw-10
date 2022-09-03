export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(handleErrors)
    .then((r) => r.json());
}

function handleErrors(response) {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response;
}

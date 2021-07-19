import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.eu/rest/v2';
const fieldsFilterCountry = '?fields=name;capital;population;flag;languages';

function fetchCountries(counrtyName) {
    Notiflix.Loading.hourglass()
    return fetch(`${BASE_URL}/name/${counrtyName}${fieldsFilterCountry}`)
        .then(response => {
            if (!response.ok) {
                throw Error("Oops, there is no country with that name");
            }
            return response.json();
        })
}

export default {fetchCountries}
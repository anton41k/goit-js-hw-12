import '../css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryListTpl from '../templates/country-list.hbs';
import countryInfoTpl from '../templates/country-info.hbs';
import API from './fetchCountries';
import getRefs from './get-refs'

//notiflix.Report.info('Notiflix Info','"Knowledge rests not upon truth alone, but upon error also." <br><br>- Carl Gustav Jung','Click')

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.inputSearch.addEventListener('input', _debounce(onSearch.bind(this), DEBOUNCE_DELAY));


function onSearch(ev) {
    const valueSearch = ev.target.value;
    if (valueSearch === '') {
        changeDataCard('countryInfoCard', 'countryListContainer');
        return
    }
    API.fetchCountries(valueSearch)
        .then(response => {
            Notiflix.Loading.remove();
            if (response.length >= 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                changeDataCard('countryInfoCard', 'countryListContainer');
            }
            else if (response.length >= 2) {
                renderCountriesCards(response);
            }
            else if (response.length === 1){
                renderCountryInfoCard(response[0]);
            }
        })
        .catch(onFetchError)
}



function renderCountriesCards(countries) {
    const markup = countryListTpl(countries);
    changeDataCard('countryListContainer', 'countryInfoCard', markup)
}
function renderCountryInfoCard(country) {
    const markup = countryInfoTpl(country);
    changeDataCard('countryInfoCard', 'countryListContainer', markup)
}

function onFetchError(error) {
    Notiflix.Notify.failure("Oops, there is no country with that name");
    changeDataCard('countryInfoCard', 'countryListContainer');
    Notiflix.Loading.remove();
}

function changeDataCard(add, remov, data = '') {
    refs[add].innerHTML = data;
    refs[remov].innerHTML = '';
}


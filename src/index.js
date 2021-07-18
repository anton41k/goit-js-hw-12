import './css/styles.css';
import _debounce from 'lodash.debounce';
import notiflix from 'notiflix';
import countryListTpl from './templates/country-list.hbs';
import countryInfoTpl from './templates/country-info.hbs';
import API from './fetchCountries';

//notiflix.Report.info('Notiflix Info','"Knowledge rests not upon truth alone, but upon error also." <br><br>- Carl Gustav Jung','Click')

const DEBOUNCE_DELAY = 500;
const refs = {
    inputSearch: document.querySelector('#search-box'),
    countryListContainer: document.querySelector('.country-list'),
    countryInfoContainer: document.querySelector('.country-info')
};

refs.inputSearch.addEventListener('input', _debounce(onSearch.bind(this), DEBOUNCE_DELAY));


function onSearch(ev) {
    const searchNameCountry = ev.target.value;
    if (searchNameCountry === '') {
        dataContainerCard('', 'countryInfoContainer', 'countryListContainer')
        return
    }
    API.fetchCountries(searchNameCountry)
        .then(response => {
            console.log(response.length);
            if (response.length >= 10) {
                console.log('большой запрос');
                notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            }
            else if (response.length >= 2) {
                renderCountriesCard(response)
            }
            else {
                renderCountryInfoCard(response[0]);
            }
        })
        .catch(error => {
            console.log(error)
        })
}



function renderCountriesCard(countries) {
    const markup = countryListTpl(countries);
    dataContainerCard(markup, 'countryListContainer', 'countryInfoContainer')
}
function renderCountryInfoCard(country) {
    const markup = countryInfoTpl(country);
    dataContainerCard(markup, 'countryInfoContainer', 'countryListContainer')
}

function dataContainerCard(data, add, remov) {
    refs[add].innerHTML = data;
    refs[remov].innerHTML = '';
}
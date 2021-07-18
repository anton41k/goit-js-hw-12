import { Report, Loading } from "notiflix";



const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
const fieldsFilterListCountry = '?fields=name;capital;population;flag;languages';

function fetchCountries(counrtyName) {
    console.log(counrtyName)
    return fetch(`${BASE_URL}${counrtyName}${fieldsFilterListCountry}`)
        .then(response => {
            const r =response.json()
            console.log(r);
            //if (!response.ok) {
               // return Report.Info('dfgd',"Too many matches found. Please enter a more specific name.",'fhs');
            //}
            return r
        })
}

export default {fetchCountries}
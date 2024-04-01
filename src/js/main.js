import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';


const year = document.querySelector('.copyright .year')
year && (year.innerText = new Date().getFullYear())


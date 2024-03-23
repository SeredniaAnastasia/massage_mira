import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';

const href = document.querySelector(`.menu-list a[href = "${window.location.pathname.replace("/", "")}"]`)
href && href.classList.add('active-page')

const year = document.querySelector('.copyright .year')
year && (year.innerText = new Date().getFullYear())


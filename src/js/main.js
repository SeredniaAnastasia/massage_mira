import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';

setTimeout(() => {

    // const href = document.querySelector(`.menu-list a[href = "${window.location.pathname.replace("/", "")}"]`)
    let pathnamePage;
    if (window.location.pathname === '/')
        pathnamePage = "index.html"
    else
        pathnamePage = window.location.pathname.replace("/", "")

    const href = document.querySelector(`.menu-list a[href = "${pathnamePage}"]`)

    href && href.classList.add('active-page')

    const year = document.querySelector('.copyright .year')
    year && (year.innerText = new Date().getFullYear())

}, 200)



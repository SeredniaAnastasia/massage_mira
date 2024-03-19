
const mailPath = 'http://marcho.smm.zzz.com.ua/send-mail.php';

function formDataToObject(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}


const submit = (myForm) => {
    const data = formDataToObject(new FormData(myForm))
    console.log(data)

    fetch(mailPath, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json' //application/json  multipart/form-data
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            // Обробка відповіді від сервера
            if (result.success) {
                alert("The letter has been sent");
                clearForm(e)
            } else {
                alert("Письмо не отправлено произошла ошибка:  " + result.message);
            }
        })
        .catch(error => {
            console.error('Помилка:', error);
        });
}





const myForm = document.getElementById('form');

myForm.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(myForm.elements)

    const name = myForm.elements.name.value.trim();
    const nameError = document.querySelector('#name + .errorMessage');
    const nameInput = document.getElementById('name');
    if (name === '' || name.length < 3) {
        nameError.textContent = 'Name is required.';
        nameInput.parentNode.classList.add('error');
        nameInput.parentNode.classList.remove('success');
    } else {
        nameError.textContent = '';
        nameInput.parentNode.classList.add('success');
        nameInput.parentNode.classList.remove('error');
    }


    const email = myForm.elements.email.value.trim();
    const emailError = document.querySelector('#email + .errorMessage');
    const emailInput = document.getElementById('email');

    if (email === '') {
        emailError.textContent = 'Email is required.';
        emailInput.parentNode.classList.add('error');
        emailInput.parentNode.classList.remove('success');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailInput.parentNode.classList.add('error');
        emailInput.parentNode.classList.remove('success');
    } else {
        emailError.textContent = '';
        emailInput.parentNode.classList.add('success');
        emailInput.parentNode.classList.remove('error');
    }



    const tel = myForm.elements.tel.value.trim();
    const telError = document.querySelector('#tel + .errorMessage');
    const telInput = document.getElementById('tel');

    if (tel === '') {
        telError.textContent = 'tel is required.';
        telInput.parentNode.classList.add('error');
        telInput.parentNode.classList.remove('success');
        // } else if (!/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/.test(tel)) {
    } else if (false) {

        telError.textContent = 'Please enter a valid telephone number.';
        telInput.parentNode.classList.add('error');
        telInput.parentNode.classList.remove('success');
    } else {
        telError.textContent = '';
        telInput.parentNode.classList.add('success');
        telInput.parentNode.classList.remove('error');
    }


    const theme = myForm.elements.theme.value.trim();
    const themeError = document.querySelector('#theme + .errorMessage');
    const themeInput = document.getElementById('theme');

    if (theme === '') {
        themeError.textContent = 'theme is required.';
        themeInput.parentNode.classList.add('error');
        themeInput.parentNode.classList.remove('success');
    } else {
        themeError.textContent = '';
        themeInput.parentNode.classList.add('success');
        themeInput.parentNode.classList.remove('error');
    }


    const formText = myForm.elements.form_text.value.trim();
    const form_textError = document.querySelector('#form_text + .errorMessage');
    const form_textInput = document.getElementById('form_text');

    if (formText === '') {
        form_textError.textContent = 'theme is required.';
        form_textInput.parentNode.classList.add('error');
        form_textInput.parentNode.classList.remove('success');
    } else {
        form_textError.textContent = '';
        form_textInput.parentNode.classList.add('success');
        form_textInput.parentNode.classList.remove('error');
    }

    const checked = myForm.elements.checked.checked
    const checkedError = document.querySelector('#checked + .errorMessage');
    const checkedInput = document.getElementById('checked');
    if (!checked) {
        checkedError.textContent = 'checked is required.';
        checkedInput.parentNode.classList.add('error');
        checkedInput.parentNode.classList.remove('success');
    } else {
        checkedError.textContent = '';
        checkedInput.parentNode.classList.add('success');
        checkedInput.parentNode.classList.remove('error');
    }

    const antiBot = myForm.elements.anti_bot.value
    let antiBotError = true
    if (antiBot !== "") {
        antiBot = false
    }



    if (nameError.textContent === ''
        && emailError.textContent === ''
        && telError.textContent === ''
        && themeError.textContent === ''
        && form_textError.textContent === ''
        && checkedError.textContent === ''
        && antiBotError
    ) {
        submit(myForm);
    }




})



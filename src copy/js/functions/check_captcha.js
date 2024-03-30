
const mailPath = '/send-mail.php';
const myForm = document.getElementById('form');

function formDataToObject(formData) {
    let jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}


const submit = (myForm) => {
    const data = formDataToObject(new FormData(myForm))
    fetch(mailPath, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json' //application/json  multipart/form-data
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const captchaError = document.querySelector('#captcha + .errorMessage');
            const captchaInput = document.getElementById('captcha');
            if (result.success) {
                alert("Dopis byl odeslán");
                captchaError.textContent = '';
                captchaInput.parentNode.classList.add('success');
                captchaInput.parentNode.classList.remove('error');
                window.location.reload();
            } else {
                if (result.captcha === "error") {
                    captchaError.textContent = 'Captcha zadán nesprávně';
                    captchaInput.parentNode.classList.add('error');
                    captchaInput.parentNode.classList.remove('success');
                } else if (result.captcha === "undefined") {
                    alert("Zpráva nebyla odeslána, došlo k chybě:  " + result.message);
                } else {
                    captchaError.textContent = '';
                    captchaInput.parentNode.classList.add('success');
                    captchaInput.parentNode.classList.remove('error');
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


myForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value.trim();
    const nameError = document.querySelector('#name + .errorMessage');
    const nameInput = document.getElementById('name');
    if (name === '' || name.length < 3) {
        nameError.textContent = 'Napište jméno';
        nameInput.parentNode.classList.add('error');
        nameInput.parentNode.classList.remove('success');
    } else {
        nameError.textContent = '';
        nameInput.parentNode.classList.add('success');
        nameInput.parentNode.classList.remove('error');
    }


    const email = event.target.elements.email.value.trim();
    const emailError = document.querySelector('#email + .errorMessage');
    const emailInput = document.getElementById('email');

    if (email === '') {
        emailError.textContent = 'Zadejte e-mail';
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

    const tel = event.target.elements.tel.value.trim();
    const telError = document.querySelector('#tel + .errorMessage');
    const telInput = document.getElementById('tel');

    if (tel === '') {
        telError.textContent = 'Vložte telefonní číslo';
        telInput.parentNode.classList.add('error');
        telInput.parentNode.classList.remove('success');
    } else if (!/^((\+)([0-9]{0,5}))?(([ .-]?)([0-9]{3})){3}$/.test(tel)) {
        telError.textContent = 'Zadejte prosím platné telefonní číslo.';
        telInput.parentNode.classList.add('error');
        telInput.parentNode.classList.remove('success');
    } else {
        telError.textContent = '';
        telInput.parentNode.classList.add('success');
        telInput.parentNode.classList.remove('error');
    }

    const theme = event.target.elements.theme.value.trim();
    const themeError = document.querySelector('#theme + .errorMessage');
    const themeInput = document.getElementById('theme');

    if (theme === '') {
        themeError.textContent = 'Motiv je povinný.';
        themeInput.parentNode.classList.add('error');
        themeInput.parentNode.classList.remove('success');
    } else {
        themeError.textContent = '';
        themeInput.parentNode.classList.add('success');
        themeInput.parentNode.classList.remove('error');
    }

    const formText = event.target.elements.form_text.value.trim();
    const form_textError = document.querySelector('#form_text + .errorMessage');
    const form_textInput = document.getElementById('form_text');

    if (formText === '') {
        form_textError.textContent = 'Nenapsali jste zprávu';
        form_textInput.parentNode.classList.add('error');
        form_textInput.parentNode.classList.remove('success');
    } else {
        form_textError.textContent = '';
        form_textInput.parentNode.classList.add('success');
        form_textInput.parentNode.classList.remove('error');
    }

    const checked = event.target.elements.checked.checked
    const checkedError = document.querySelector('.form-check .errorMessage');
    const checkedInput = document.getElementById('checked');
    if (!checked) {
        checkedError && (checkedError.textContent = 'Zaškrtněte políčko');
        checkedInput.parentNode.classList.add('error');
        checkedInput.parentNode.classList.remove('success');
    } else {
        checkedError.textContent = '';
        checkedInput.parentNode.classList.add('success');
        checkedInput.parentNode.classList.remove('error');
    }

    const captcha = event.target.elements.captcha.value.trim();
    const captchaError = document.querySelector('#captcha + .errorMessage');
    const captchaInput = document.getElementById('captcha');
    if (captcha === '') {
        captchaError && (captchaError.textContent = 'Zadejte symboly na obrázku');
        captchaInput.parentNode.classList.add('error');
        captchaInput.parentNode.classList.remove('success');
    } else {
        captchaError.textContent = '';
        captchaInput.parentNode.classList.add('success');
        captchaInput.parentNode.classList.remove('error');
    }

    const antiBot = event.target.elements.anti_bot.value
    let antiBotError = true
    if (antiBot !== "") {
        antiBotError = false
    }

    if (nameError.textContent === ''
        && emailError.textContent === ''
        && telError.textContent === ''
        && themeError.textContent === ''
        && form_textError.textContent === ''
        && checkedError.textContent === ''
        && antiBotError
    ) {
        submit(event.target);
    }

})




const mailPathUrl = '/send-mail.php';
const checkCaptchaUrl = '/captcha_check.php';
// const checkCaptchaUrl = 'http://masaeazkvam.cz/captcha_check.php';
// const checkCaptchaUrl = 'http://masazeazkvam.cz/captcha_check.php';




const myForm = document.getElementById('form');

function formDataToObject(formData) {
  let jsonObject = {};
  for (const [key, value] of formData.entries()) {
    jsonObject[key] = value;
  }
  return jsonObject;
}

const dataFetch = {
  method: 'POST',
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json' //application/json  multipart/form-data
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *client
}



const submit = (myForm) => {
  const data = formDataToObject(new FormData(myForm))
  dataFetch.body = JSON.stringify(data)
  fetch(mailPathUrl, dataFetch)
    .then(response => response.json())
    .then(result => {

      const captchaError = document.querySelector('.form-captcha__wrapper  .errorMessage');
      const captchaInput = document.getElementById('captcha');
      captchaError && (captchaError.textContent = '');

      if (captchaInput) {
        captchaInput.parentNode.classList.add('success')
        captchaInput.parentNode.classList.remove('error');
      }

      if (result.success) {
        alert("Dopis byl odeslán");
        window.location.reload();
      } else {
        alert("Zpráva nebyla odeslána, došlo k chybě:  " + result.message);
      }
    })
    .catch(error => {
      alert("Zpráva nebyla odeslána, došlo k chybě:  ");
      console.error('Error:', error);
    });
}

const captchaCheck = async (myForm) => {
  const data = formDataToObject(new FormData(myForm))
  dataFetch.body = JSON.stringify(data)
  const response = await fetch(checkCaptchaUrl, dataFetch)
  return response.json()
}

myForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const antiBot = event.target.elements.anti_bot.value
  if (antiBot !== "") {
    return
  }

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
  const captchaError = document.querySelector('.form-captcha__wrapper .errorMessage');
  const captchaInput = document.getElementById('captcha');
  if (captcha === '') {
    captchaError && (captchaError.textContent = 'Zadejte symboly na obrázku');
    captchaInput.parentNode.classList.add('error');
    captchaInput.parentNode.classList.remove('success');
  } else {

    const result = await captchaCheck(myForm)

    if (result.success) {
      if (nameError.textContent === ''
        && emailError.textContent === ''
        && telError.textContent === ''
        && themeError.textContent === ''
        && form_textError.textContent === ''
        && checkedError.textContent === ''
      ) {
        console.log("send")
        submit(event.target);
      }
      captchaError.textContent = '';
      captchaInput.parentNode.classList.add('success');
      captchaInput.parentNode.classList.remove('error');
    } else {
      captchaError.textContent = 'Captcha zadán nesprávně';
      captchaInput.parentNode.classList.add('error');
      captchaInput.parentNode.classList.remove('success');
    }

  }

})





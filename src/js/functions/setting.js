const dataFont = [
  "Roboto Mono",
  `"Nunito Sans", sans-serif`,
  `"Rubik", sans-serif`,
  `"Satisfy", cursive`,
  `"Patrick Hand", cursive`,
  `"Roboto Mono", monospace`,
  `"Kaushan Script", cursive`,
  `"Kalam", cursive`,
  `"Great Vibes", cursive`,
  `"Courgette", cursive`,
  `"Asap", sans-serif`,
  `"Sofia", cursive`,
  `"Taviraj", serif`,
  `"Fraunces", serif`,
  `"Prata", serif`,
  `"Marcellus", serif`,
  `"DM Serif Display", serif`,
  `"Libre Baskerville", serif`,
  `"Playfair Display", serif`,
  `"Montserrat", sans-serif`,
]

let isSelectText = false;
let nodeSelectText = null;
const setting = document.querySelector('.setting');
const settingBlock = document.querySelector('.setting .setting-block');


const btnOpen = document.querySelector('.setting .open');
const btnDown = document.querySelector('.setting .down')
const btnUp = document.querySelector('.setting .up')
const btnSelectText = document.querySelector('.setting .setting__select-text');
const btnNextFamily = document.querySelector('.setting .buttons-family .next');
const btnPrevFamily = document.querySelector('.setting .buttons-family .prev');
const btnNextWeight = document.querySelector('.setting .buttons-weight .next');
const btnPrevWeight = document.querySelector('.setting .buttons-weight .prev');
const btnNextSize = document.querySelector('.setting .buttons-size .next');
const btnPrevSize = document.querySelector('.setting .buttons-size .prev');

const settingFontFamily = document.querySelector('.setting .setting-font__family');
const settingFontNumber = document.querySelector('.setting .setting-font__number');
const settingFontWeight = document.querySelector('.setting .setting-font__weight');
const settingFontSize = document.querySelector('.setting .setting-size');

let eventTarget = null;
function iteratorFont(dataFont) {
  let current = 0;
  const limit = dataFont.length;
  return {
    next: function () {
      if (current < limit) {
        if (current < limit - 1) current++
        return { value: dataFont[current], done: false, current, };
      }
    },
    prev: function () {
      if (current >= 0) {
        if (current > 0) current--
        return { value: dataFont[current], done: false, current, };
      }
    }
  }
}

const newFont = iteratorFont(dataFont);

function iteratorWeight(current = 100) {
  const weightStart = 100;
  const weightEnd = 1000;
  const stepWeight = 100
  return {
    next: function () {
      if (current < weightEnd) {
        if (current < weightEnd - 100) current += stepWeight
        return { value: current, done: false, };
      }
    },
    prev: function () {
      if (current >= weightStart) {
        if (current > weightStart) current -= stepWeight;
        return { value: current, done: false, };
      }
    }
  }
}

let newWeight = iteratorWeight(100);


function iteratorSize(current = 16) {
  const sizeStart = 5;
  const sizeEnd = 101;
  const stepSize = 1
  return {
    next: function () {
      if (current < sizeEnd) {
        if (current < sizeEnd - 1) current += stepSize
        return { value: current, done: false, };
      }
    },
    prev: function () {
      if (current >= sizeStart) {
        if (current > sizeStart) current -= stepSize;
        return { value: current, done: false, };
      }
    }
  }
}
let newFontSize = iteratorSize(16);



settingFontFamily.innerText = dataFont[0]
let intervalId = null

document.body.addEventListener('click', (event) => {
  eventTarget = event.target
  if (isSelectText && !eventTarget.closest('.setting')) {
    let checkedColor = false;
    nodeSelectText && (nodeSelectText.style.color = '');

    const elementStyle = window.getComputedStyle(eventTarget);

    const fontWight = +elementStyle.fontWeight;
    newWeight = iteratorWeight(fontWight);
    settingFontWeight.innerText = fontWight


    const fontSize = elementStyle.fontSize;
    newFontSize = iteratorSize(parseInt(fontSize));
    settingFontSize.innerText = fontSize;


    eventTarget.style.color = 'red';
    nodeSelectText = eventTarget





    const intervalId = setInterval(() => {
      checkedColor = !checkedColor;
      if (checkedColor) {
        eventTarget.style.color = '';
      } else {
        eventTarget.style.color = 'red';
      }
      if (!isSelectText) {
        eventTarget.style.color = '';
        clearInterval(intervalId);
      }
    }, 2500)



  }


})

btnOpen && btnOpen.addEventListener('click', (event) => {
  event.stopPropagation()
  settingBlock?.classList.toggle('open')
})

btnUp && btnUp.addEventListener('click', (event) => {
  event.stopPropagation()
  if (setting) {
    setting.style.top = "10px";
    setting.style.left = "10px";
    setting.style.right = "";
    setting.style.bottom = "";
  }

})

btnDown && btnDown.addEventListener('click', (event) => {
  event.stopPropagation()
  if (setting) {
    setting.style.top = "";
    setting.style.left = "";
    setting.style.right = "10px";
    setting.style.bottom = "10px";
  }
})

btnSelectText && btnSelectText.addEventListener('click', (event) => {
  event.stopPropagation()
  isSelectText = !isSelectText;
  isSelectText ? event.target.style.backgroundColor = "red" : event.target.style.backgroundColor = ""
})

btnNextFamily && btnNextFamily.addEventListener('click', (event) => {
  const { value, current } = newFont.next();
  event.stopPropagation()
  if (settingFontFamily && settingFontNumber && nodeSelectText) {
    settingFontFamily.innerText = value;
    settingFontNumber.innerText = current;
    nodeSelectText.style.fontFamily = value;
  }
})

btnPrevFamily && btnPrevFamily.addEventListener('click', (event) => {
  const { value, current } = newFont.prev();
  event.stopPropagation()
  if (settingFontFamily && settingFontNumber && nodeSelectText) {
    settingFontFamily.innerText = value;
    settingFontNumber.innerText = current;
    nodeSelectText.style.fontFamily = value;
  }
})

btnNextWeight && btnNextWeight.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newWeight.next();
  if (settingFontWeight && nodeSelectText) {
    settingFontWeight.innerText = value;
    nodeSelectText.style.fontWeight = value;
  }
})

btnPrevWeight && btnPrevWeight.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newWeight.prev();
  if (settingFontWeight && nodeSelectText) {
    settingFontWeight.innerText = value;
    nodeSelectText.style.fontWeight = value;
  }
})

btnNextSize && btnNextSize.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newFontSize.next();
  if (settingFontSize && nodeSelectText) {
    settingFontSize.innerText = value + 'px';
    nodeSelectText.style.fontSize = value + 'px';
  }
})

btnPrevSize && btnPrevSize.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newFontSize.prev();
  if (settingFontSize && nodeSelectText) {
    settingFontSize.innerText = value + 'px';
    nodeSelectText.style.fontSize = value + 'px';
  }
})


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

ddd = null;

const btnOpen = document.querySelector('.setting .open');
const btnDown = document.querySelector('.setting .down');
const btnUp = document.querySelector('.setting .up');
const btnSelectText = document.querySelector('.setting .setting__select-text');
const btnNextFamily = document.querySelector('.setting .buttons-family .next');
const btnPrevFamily = document.querySelector('.setting .buttons-family .prev');
const btnNormal = document.querySelector('.setting .buttons-style .normal');
const btnItalic = document.querySelector('.setting .buttons-style .italic');

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
    next: () => {
      if (current < limit) {
        if (current < limit - 1) current++;
        return { value: dataFont[current], done: false, current };
      }
    },
    prev: () => {
      if (current >= 0) {
        if (current > 0) current--;
        return { value: dataFont[current], done: false, current };
      }
    }
  };
}

const newFont = iteratorFont(dataFont);

function iteratorWeight(current = 100) {
  const weightStart = 100;
  const weightEnd = 1000;
  const stepWeight = 100;
  return {
    next: () => {
      if (current < weightEnd) {
        if (current < weightEnd - 100) { current += stepWeight; }
        return { value: current, done: false };
      }
    },
    prev: () => {
      if (current >= weightStart) {
        if (current > weightStart) { current -= stepWeight; }
        return { value: current, done: false };
      }
    },
    changeCurrent: (newCurrent) => {
      current = newCurrent;
    }
  };
}

const newWeight = iteratorWeight(100);

function iteratorSize(current = 16) {
  const sizeStart = 5;
  const sizeEnd = 101;
  const stepSize = 1;
  return {
    next: () => {
      if (current < sizeEnd) {
        if (current < sizeEnd - 1) current += stepSize;
        return { value: current, done: false };
      }
    },
    prev: () => {
      if (current >= sizeStart) {
        if (current > sizeStart) current -= stepSize;
        return { value: current, done: false };
      }
    },
    changeCurrent: (newCurrent) => {
      current = newCurrent;
    }
  };
}

const newFontSize = iteratorSize(16);

settingFontFamily.innerText = dataFont[0];

document.body.addEventListener('click', (event) => {
  eventTarget = event.target;

  if (isSelectText && !eventTarget.closest('.setting')) {
    let checkedColor = false;
    nodeSelectText = eventTarget;

    const elementStyle = window.getComputedStyle(eventTarget);
    console.log(elementStyle);
    const fontWight = +elementStyle.fontWeight;
    newWeight.changeCurrent(fontWight);
    settingFontWeight.innerText = fontWight;

    const fontSize = elementStyle.fontSize;
    newFontSize.changeCurrent(fontSize);
    settingFontSize.innerText = fontSize;

    nodeSelectText.style.color = 'red';

    if (elementStyle.fontStyle === 'normal') {
      btnNormal.style.backgroundColor = '#ddeea6';
      btnItalic.style.backgroundColor = '';
    } else if (elementStyle.fontStyle === 'italic') {
      btnNormal.style.backgroundColor = '';
      btnItalic.style.backgroundColor = '#ddeea6';
    }

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
    }, 2500);
  }
});

btnOpen && btnOpen.addEventListener('click', (event) => {
  event.stopPropagation();
  settingBlock?.classList.toggle('open');
});

btnUp && btnUp.addEventListener('click', (event) => {
  event.stopPropagation();
  if (setting) {
    setting.style.top = '10px';
    setting.style.left = '10px';
    setting.style.right = '';
    setting.style.bottom = '';
  }
});

btnDown && btnDown.addEventListener('click', (event) => {
  event.stopPropagation();
  if (setting) {
    setting.style.top = '';
    setting.style.left = '';
    setting.style.right = '10px';
    setting.style.bottom = '10px';
  }
});

btnSelectText && btnSelectText.addEventListener('click', (event) => {
  event.stopPropagation();
  isSelectText = !isSelectText;
  isSelectText ? event.target.style.backgroundColor = '#ddeea6' : event.target.style.backgroundColor = '';
});

btnNextFamily && btnNextFamily.addEventListener('click', (event) => {
  const { value, current } = newFont.next();
  event.stopPropagation();
  if (settingFontFamily && settingFontNumber && nodeSelectText) {
    settingFontFamily.innerText = value;
    settingFontNumber.innerText = current;
    nodeSelectText.style.fontFamily = value;
  }
});

btnPrevFamily && btnPrevFamily.addEventListener('click', (event) => {
  const { value, current } = newFont.prev();
  event.stopPropagation();
  if (settingFontFamily && settingFontNumber && nodeSelectText) {
    settingFontFamily.innerText = value;
    settingFontNumber.innerText = current;
    nodeSelectText.style.fontFamily = value;
  }
});

btnNormal && btnNormal.addEventListener('click', (event) => {
  event.stopPropagation();
  btnNormal.style.backgroundColor = '#ddeea6';
  btnItalic.style.backgroundColor = '';
  nodeSelectText && (nodeSelectText.style.fontStyle = 'normal');
});

btnItalic && btnItalic.addEventListener('click', (event) => {
  event.stopPropagation();
  btnNormal.style.backgroundColor = '';
  btnItalic.style.backgroundColor = '#ddeea6';
  nodeSelectText && (nodeSelectText.style.fontStyle = 'italic');
});

btnNextWeight && btnNextWeight.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newWeight.next();
  if (settingFontWeight && nodeSelectText) {
    settingFontWeight.innerText = value;
    nodeSelectText.style.fontWeight = value;
  }
});

btnPrevWeight && btnPrevWeight.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newWeight.prev();
  if (settingFontWeight && nodeSelectText) {
    settingFontWeight.innerText = value;
    nodeSelectText.style.fontWeight = value;
  }
});

btnNextSize && btnNextSize.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newFontSize.next();
  if (settingFontSize && nodeSelectText) {
    settingFontSize.innerText = value + 'px';
    nodeSelectText.style.fontSize = value + 'px';
  }
});

btnPrevSize && btnPrevSize.addEventListener('click', (event) => {
  event.stopPropagation();
  const { value } = newFontSize.prev();
  if (settingFontSize && nodeSelectText) {
    settingFontSize.innerText = value + 'px';
    nodeSelectText.style.fontSize = value + 'px';
  }
});

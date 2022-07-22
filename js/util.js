const ALERT_SHOW_TIME = 3000;

//* Функция возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInt = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция для проверки максимальной длины строки.
const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;

//* Функция возвращающая случайный элемент из массива.
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length -1)];

//Функция нажатия на Esc.
const isEscapeKey = (evt) => evt.key === 'Escape';

//Проверка на уникальность элемента
const checkUniqueElement = (value) => new Set(value).size === value.length;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '15px 3px';
  alertContainer.style.fontSize = '26px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInt, getRandomArrayElement,isEscapeKey, checkCommentLength, checkUniqueElement, showAlert, debounce};

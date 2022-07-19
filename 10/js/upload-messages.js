import {isEscapeKey} from './util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessageElement = successMessageTemplate.cloneNode(true);
const successButton = successMessageElement.querySelector('.success__button');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const errorButton = errorMessageElement.querySelector('.error__button');
const body = document.querySelector('body');


// Открытие и закрытие сообщения об удачной отправке
const onPopupSuccessClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successModalClose();
  }
};

//Проверка на нажатие на область
const successModalAreaClick = (evt) => {
  if (evt.target.matches('.success')) {
    successModalClose();
  }
};

function successModalOpen () {
  body.append(successMessageElement);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupSuccessClose);
  document.addEventListener('click', successModalAreaClick);
  successButton.addEventListener('click', successModalClose);
}

function successModalClose () {
  successMessageElement.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupSuccessClose);
}


// Открытие и закрытие сообщения о неудачной отправке
const onPopupErrorClose = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorModalClose();
  }
};

const errorModalAreaClick = (evt) => {
  if (evt.target.matches('.error')) {
    errorModalClose();
  }
};

function errorModalOpen () {
  errorMessageElement.style.zIndex = '99';
  body.append(errorMessageElement);
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupErrorClose);
  document.addEventListener('click', errorModalAreaClick);
  errorButton.addEventListener('click', errorModalClose);
}

function errorModalClose () {
  errorMessageElement.remove();
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupErrorClose);
}

export {successModalOpen, errorModalOpen};

import {isEscapeKey, checkCommentLength, checkUniqueElement} from './util.js';

const uploadContainer = document.querySelector('.img-upload');
const uploadForm = uploadContainer.querySelector('.img-upload__form');
const uploadOverlay = uploadContainer.querySelector('.img-upload__overlay');
const uploadInput = uploadContainer.querySelector('#upload-file');
const body = document.querySelector('body');
const uploadCancelButton = uploadContainer.querySelector('#upload-cancel');
const uploadHashtag = uploadContainer.querySelector('.text__hashtags');
const uploadComment = uploadContainer.querySelector('.text__description');
const maxCommentLength = 140;
const maxHashtagsLength = 5;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

//Функция проверки нажатия esc
const onPopupEscKeydown = (evt) => {
  //Проверка элементов на фокус
  if (uploadHashtag === document.activeElement || uploadComment === document.activeElement) {
    return evt;
  }
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    overlayClose();
  }
};

//Функция открытия окна
function overlayOpen () {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

//Функция закрытия окна
function overlayClose () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  //Сброс полей формы
  uploadInput.value = '';
  uploadHashtag.value = '';
  uploadComment.value = '';
}

uploadInput.addEventListener('change', overlayOpen);
uploadCancelButton.addEventListener('click',overlayClose);

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text',
});

//Функция создает массив хэш-тегов
const splitHashtags = (value) => value.toLowerCase().split(' ');

// Проверка на количество хэш-тегов
const checkHashtagsLength = (value) => splitHashtags(value).length <= maxHashtagsLength;

// Проверка на правильность символов и их длину
const validateHashtag = (value) => splitHashtags(value).every((item) => re.test(item)) || value[0] === '';

//Проверка на уникальность
const checkUniqueHashtags = (value) => checkUniqueElement(splitHashtags(value));

//Проверка длины комментария
const validateUploadComment = (value) => checkCommentLength(value, maxCommentLength);

pristine.addValidator(uploadHashtag, checkHashtagsLength, `Нельзя указать больше ${maxHashtagsLength} хэш-тегов`);
pristine.addValidator(uploadHashtag, validateHashtag, 'Хэш-тег начинается с символа #, строка должна состоять из букв и чисел, максимальная длина 20 символов');
pristine.addValidator(uploadHashtag, checkUniqueHashtags, 'Хэш-теги не должны повторяться');
pristine.addValidator(uploadComment, validateUploadComment, `Длина комментария не может составлять больше ${maxCommentLength} символов!`);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});



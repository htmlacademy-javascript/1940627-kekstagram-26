import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentsCountElement = bigPictureElement.querySelector('.comments-count');
const socialCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const body = document.querySelector('body');
const socialCommentsContainer = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = bigPictureElement.querySelector('.social__comment');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

//Функция открытия окна
function bigPictureOpen () {
  bigPictureElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

//Функция закрытия окна
function bigPictureClose () {
  bigPictureElement.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

// Функция генерирует полноразмерное фото с информацией
const createFullSizePicture = ({url, likes, comments, description}) => {
  bigPictureOpen();

  bigPictureImageElement.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = String(comments.length);
  bigPictureDescriptionElement.textContent = description;
  socialCommentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const socialCommentElementTemplate = socialCommentElement.cloneNode(true);
    const socialCommentImage = socialCommentElementTemplate.querySelector('.social__picture');
    const socialCommentText = socialCommentElementTemplate.querySelector('.social__text');

    socialCommentImage.src = comment.avatar;
    socialCommentImage.alt = comment.name;
    socialCommentText.textContent = comment.message;

    socialCommentsContainer.appendChild(socialCommentElementTemplate);
  });

  bigPictureCloseElement.addEventListener('click', bigPictureClose);

  socialCommentsCountElement.classList.add('hidden');
  socialCommentsLoaderElement.classList.add('hidden');
};

export {createFullSizePicture};

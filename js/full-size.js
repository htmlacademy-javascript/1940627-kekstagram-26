import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImageElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const socialCommentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const body = document.querySelector('body');
const socialCommentsContainer = bigPictureElement.querySelector('.social__comments');
const socialCommentElement = bigPictureElement.querySelector('.social__comment');
const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPictureCloseElement = bigPictureElement.querySelector('#picture-cancel');
const commentsFragment = document.createDocumentFragment();
const MAX_COMMENTS_VALUE = 5;

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
  bigPictureDescriptionElement.textContent = description;

  let commentsValue = 0;

  //Функция отрисовки комментариев
  const showComment = () => {
    commentsValue += MAX_COMMENTS_VALUE;
    comments.slice(0, commentsValue).forEach(({avatar, name, message}) => {
      const socialCommentElementTemplate = socialCommentElement.cloneNode(true);
      const socialCommentImage = socialCommentElementTemplate.querySelector('.social__picture');
      const socialCommentText = socialCommentElementTemplate.querySelector('.social__text');

      socialCommentImage.src = avatar;
      socialCommentImage.alt = name;
      socialCommentText.textContent = message;

      commentsFragment.append(socialCommentElementTemplate);
    });

    socialCommentsContainer.innerHTML = '';
    socialCommentsContainer.append(commentsFragment);

    //Проверка на условие показа кнопки "Загрузить еще"
    if (comments.length <= commentsValue) {
      socialCommentsCountElement.textContent = `${comments.length} из ${comments.length} комментариев`;
      socialCommentsLoaderElement.classList.add('hidden');
    } else {
      socialCommentsCountElement.textContent = `${commentsValue} из ${comments.length} комментариев`;
      socialCommentsLoaderElement.classList.remove('hidden');
    }
  };
  //Выводит первые 5 комментариев
  showComment();

  bigPictureCloseElement.addEventListener('click', bigPictureClose);
  socialCommentsLoaderElement.addEventListener('click', () => showComment());
};

export {createFullSizePicture};

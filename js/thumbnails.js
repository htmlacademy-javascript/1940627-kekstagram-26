import {photoDescriptions} from './data.js';

//Модуль отрисовывает миниатюры ползователей
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnails = photoDescriptions();
const thumbnailsFragment = document.createDocumentFragment();

thumbnails.forEach(({url, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnailsFragment.appendChild(thumbnail);
});

thumbnailsContainer.appendChild(thumbnailsFragment);

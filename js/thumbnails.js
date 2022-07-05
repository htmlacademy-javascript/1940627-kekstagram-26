import {photoDescriptions} from './data.js';
import {createFullSizePicture} from './full-size.js';

//Модуль отрисовывает миниатюры пользователей
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnails = photoDescriptions();
const thumbnailsFragment = document.createDocumentFragment();

thumbnails.forEach((photo) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnailsFragment.appendChild(thumbnail);
  thumbnail.addEventListener('click', () => {
    createFullSizePicture(photo);
  });
});

thumbnailsContainer.appendChild(thumbnailsFragment);

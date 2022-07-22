import {createFullSizePicture} from './full-size.js';

//Модуль отрисовывает миниатюры пользователей
const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsFragment = document.createDocumentFragment();
const imageFilterContainer = document.querySelector('.img-filters');

const createThumbnails = (thumbnails) => {
  thumbnails.forEach(({url, likes, comments, description}) => {
    const thumbnail = thumbnailTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnail.querySelector('.picture__comments').textContent = comments.length;
    thumbnailsFragment.appendChild(thumbnail);
    thumbnail.addEventListener('click', () => {
      createFullSizePicture({url, likes, comments, description});
    });
  });

  // очистка контейнера перед наполнением новыми фото
  thumbnailsContainer.querySelectorAll('.picture').forEach((element) => {element.remove();});
  thumbnailsContainer.appendChild(thumbnailsFragment);

  // Показывает меню фильтров, после загрузки фото
  imageFilterContainer.classList.remove('img-filters--inactive');
};

export {createThumbnails};

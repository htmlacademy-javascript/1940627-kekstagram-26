const POST_FILTER_NUMBER = 10;

const imageFiltersContainer = document.querySelector('.img-filters');
const defaultFilterButton = imageFiltersContainer.querySelector('#filter-default');
const randomFilterButton = imageFiltersContainer.querySelector('#filter-random');
const discussedFilterButton = imageFiltersContainer.querySelector('#filter-discussed');

// Очищаем активный элемент по умолчанию и назначаем на активный
const setActiveFilter = (button) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

//Функция перемешивания массива (https://www.tech-wiki.online/ru/how-to-shuffle-array-javascript.html)
const shuffleThumbnails = () => Math.random() - 0.5;

//Функция сортировки по убыванию
const compareThumbnails = (thumbnailA, thumbnailB) => {
  const rankA = thumbnailA.comments.length;
  const rankB = thumbnailB.comments.length;
  return rankB - rankA;
};

const setFilters = (thumbnails, createThumbnails) => {
  defaultFilterButton.addEventListener('click', (evt) => {
    createThumbnails(thumbnails);
    setActiveFilter(evt.target);
  });
  randomFilterButton.addEventListener('click', (evt) => {
    createThumbnails(thumbnails
      .slice()
      .sort(shuffleThumbnails)
      .slice(0, POST_FILTER_NUMBER));
    setActiveFilter(evt.target);
  });
  discussedFilterButton.addEventListener('click', (evt) => {
    createThumbnails(thumbnails
      .slice()
      .sort(compareThumbnails));
    setActiveFilter(evt.target);
  });
};

export {setFilters};

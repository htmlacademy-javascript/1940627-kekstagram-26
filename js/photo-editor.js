const EFFECTS = {
  none: {
    filter: 'none',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : ''
  },
  chrome: {
    filter: 'grayscale',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : '',
    connect: 'lower'
  },
  sepia: {
    filter: 'sepia',
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
    unit : '',
    connect: 'lower'
  },
  marvin: {
    filter: 'invert',
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
    unit : '%',
    connect: 'lower'
  },
  phobos: {
    filter: 'blur',
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : 'px',
    connect: 'lower'
  },
  heat: {
    filter: 'brightness',
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
    unit : '',
    connect: 'lower'
  }
};

const MIN_SCALE_RANGE = 25;
const MAX_SCALE_RANGE = 100;
const SCALE_STEP = 25;

const photoScaleContainer = document.querySelector('.img-upload__scale');
const scaleInputElement = photoScaleContainer.querySelector('.scale__control--value');
const photoInputElement = document.querySelector('.img-upload__preview img');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectValueElement = effectLevelElement.querySelector('.effect-level__value');
const effectSliderElement = effectLevelElement.querySelector('.effect-level__slider');
const effectListElement = document.querySelector('.effects__list');

// Управление масштабом
let scaleValue = MAX_SCALE_RANGE;

//Функция вносит значения масштаба
const getScaleValue = (value) => {
  scaleInputElement.value = `${value}%`;
  photoInputElement.style.transform = `scale(${value * 0.01})`;
};

//Функция очищает значения масштаба
const clearScaleValue = () => {
  scaleValue = MAX_SCALE_RANGE;
  getScaleValue(MAX_SCALE_RANGE);
  photoInputElement.style.transform = `scale(${scaleValue * 0.01})`;
};

// Функция меняет значения масштаба при нажатии на кнопки
const onScaleButtonClick = (evt) => {
  if (evt.target.matches('.scale__control--smaller') && scaleValue > MIN_SCALE_RANGE) {
    scaleValue -= SCALE_STEP;
    return getScaleValue(scaleValue);
  }

  if (evt.target.matches('.scale__control--bigger') && scaleValue < MAX_SCALE_RANGE) {
    scaleValue += SCALE_STEP;
    return getScaleValue(scaleValue);
  }
};

getScaleValue(scaleValue);

photoScaleContainer.addEventListener('click', onScaleButtonClick);


//Функция очистки стилей
const resetEffect = () => {
  photoInputElement.style.filter= '';
  photoInputElement.className = '';
  effectSliderElement.classList.add('hidden');
};

//Функция управления графическими фильтрами
const getPhotoEffect = (evt) => {
  const currentFilter = evt.target.value;
  effectSliderElement.classList.remove('hidden');

  // Удаление слайдера при переключении вкладок
  if (effectSliderElement.noUiSlider) {
    effectSliderElement.noUiSlider.destroy();
  }
  //Скрытие слайдера и очистка стилей у оригинала фото
  if (currentFilter === 'none') {
    resetEffect();
  } else {
    noUiSlider.create(effectSliderElement, EFFECTS[currentFilter]);
    photoInputElement.className = `effects__preview--${currentFilter}`;

    effectSliderElement.noUiSlider.on('update', (values) => {
      photoInputElement.style.filter = `${EFFECTS[currentFilter].filter}(${values}${EFFECTS[currentFilter].unit})`;
      effectValueElement.value = parseFloat(values);
    });
  }
};

effectListElement.addEventListener('change', getPhotoEffect);

export {clearScaleValue, resetEffect};

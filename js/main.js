const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Имя 1',
  'Имя 2',
  'Имя 3',
  'Имя 4',
  'Имя 5'
];

const DESCRIPTIONS = [
  'Описание раз',
  'Описание два раза',
  'Описание три',
  'Описание четыре',
  'Описание пять'
];

const PHOTO_COUNT = 25;
const MAX_COMMENT_ID = 10000;
const LIKES_RANGE = [15, 200];
const AVATARS_NUMBER = 6;
let id = 0;

//* Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInt = (min, max) => {
  min = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  max = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Функция для проверки максимальной длины строки.
const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;
checkCommentLength('Hello world', 11);

//* Функция, возвращающая случайный элемент из массива.
const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length -1)];

// Функция создает комментарии
const createComments = () => ({
  id: getRandomInt(1, MAX_COMMENT_ID),
  avatar: `img/avatar-${getRandomInt(1, AVATARS_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// Функция создает описание фотографии
const createPhotoDescriptions = () => ({
  id: ++id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(LIKES_RANGE[0], LIKES_RANGE[1]),
  comments: createComments()
});

// eslint-disable-next-line
const photoDescriptions = Array.from({length: PHOTO_COUNT}, createPhotoDescriptions);

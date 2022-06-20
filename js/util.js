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

export {getRandomInt, getRandomArrayElement};

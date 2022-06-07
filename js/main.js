/* Функция, возвращающая случайное целое число из переданного диапазона включительно.
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  + добавил взятие чисел по модулю, для обработки отрицательных значений. */

const getRandomInt = (min, max) => {
  min = Math.ceil(Math.abs(min));
  max = Math.floor(Math.abs(max));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomInt(3, 19);

//Функция для проверки максимальной длины строки.

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;

checkCommentLength('Hello world', 11);

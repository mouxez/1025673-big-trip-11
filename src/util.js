// случайное число 1 до n
const getRandomInteger = (min, max) => {
  let number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
};

// случайный массив из массива
const getRandomArray = (array) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, getRandomInteger(1, 5)).join(` `);
};

// случайный элнмент из массива
const getRandomEl = (array) => {
  let el = Math.floor(Math.random() * array.length);
  return array[el];
};

export {getRandomInteger, getRandomArray, getRandomEl};

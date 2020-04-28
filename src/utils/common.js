const getRandomInteger = (min, max) => {
  let number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
};

const getRandomArray = (array) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, getRandomInteger(1, 5)).join(` `);
};

const getRandomEl = (array) => {
  let el = Math.floor(Math.random() * array.length);
  return array[el];
};

const sortByStartTime = (a, b) => {
  let dateA = new Date(a.startTime.toDate()).getTime();
  let dateB = new Date(b.startTime.toDate()).getTime();
  return dateA > dateB ? 1 : -1;
};

export {
  getRandomInteger,
  getRandomArray,
  getRandomEl,
  sortByStartTime,
};

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const RenderPosition = {
  BEFOREEND: `beforeend`
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const sortByStartTime = (a, b) => {
  let dateA = new Date(a.startTime.toDate()).getTime();
  let dateB = new Date(b.startTime.toDate()).getTime();
  return dateA > dateB ? 1 : -1;
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {
  getRandomInteger,
  getRandomArray,
  getRandomEl,
  createElement,
  RenderPosition,
  render,
  sortByStartTime,
  replace
};

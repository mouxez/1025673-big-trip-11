import {createElement} from '../util.js';

const filterOptions = [`Everything`, `Future`, `Past`];

const createFilterMarkup = (array) => {
  return array.map((option) => {
    return (`<div class="trip-filters__filter">
    <input id="filter-${option.toLowerCase()}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio" name="trip-filter"
    value="${option.toLowerCase()}" />
    <label class="trip-filters__filter-label"
    for="filter-${option.toLowerCase()}">${option}</label>
  </div>`);
  }).join(`\n`);
};

const createFilter = () => {
  const filterValues = createFilterMarkup(filterOptions);

  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterValues}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createFilter();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

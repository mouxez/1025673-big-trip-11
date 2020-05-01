import AbstractComponent from './abstract-component.js';
import {SortType} from '../const.js';

const createSortingMarkup = (array) => {
  return array.map((value) => {

    return (`<div class="trip-sort__item  trip-sort__item--${value.toLowerCase()}">
    <input id="sort-${value.toLowerCase()}" class="trip-sort__input data-sort-type="${value.toLowerCase()}" visually-hidden" type="radio" name="trip-sort" value="sort-${value.toLowerCase()}" ${value === `Event` ? `checked` : ``} />
    <label class="trip-sort__btn" for="sort-${value.toLowerCase()}">
    ${value}
    </label>
    </div>`);
  }).join(`\n`);
};

const createSorting = () => {
  const sortingItems = createSortingMarkup(Object.values(SortType));

  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${sortingItems}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.EVENT;
  }
  getTemplate() {
    return createSorting();
  }
  getSortType() {
    return this._currentSortType;
  }
  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      handler(this._currenSortType);
    });
  }
}

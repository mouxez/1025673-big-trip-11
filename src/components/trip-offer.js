import {createElement} from '../util.js';

const sequence = (start = 1) => {
  let callNumber = start;
  return () => {
    let returnValue = callNumber;
    callNumber++;

    return returnValue;
  };
};

let generator = sequence(1);

const createTripOfferMarkup = (date) => {
  return (`<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${generator()}</span>
    <time class="day__date" datetime="${date}">${date}</time>
  </div>
  <ul class="trip-events__list">
  </ul>
</li>`);
};

const createTripOffer = () => {
  return (
    `<ul class="trip-days">
      ${createTripOfferMarkup(`18 MAR`)}
    </ul>`
  );
};

export default class TripOffer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createTripOffer();
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

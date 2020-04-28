import {createElement} from '../utils/render.js';

const createNoTripPointsMarkup = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoTripPoints {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createNoTripPointsMarkup();
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

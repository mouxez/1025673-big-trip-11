import AbstractComponent from './abstract-component.js';

const createNoTripPointsMarkup = () => {
  return (
    `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );
};

export default class NoTripPoints extends AbstractComponent {
  getTemplate() {
    return createNoTripPointsMarkup();
  }
}

import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';
import {getRandomInteger} from '../utils/common.js';
import {MAX_ROUTE_COUNT} from '../const.js';
import {sortedByStartTime} from '../main.js';

export default class Controller {
  constructor(container) {
    this._container = container;
  }
  render(container) {
    sortedByStartTime.slice(0, getRandomInteger(0, MAX_ROUTE_COUNT)).forEach((i) => {
      let tripPointComponent = new TripPointComponent(i);
      let tripEditComponent = new TripEditComponent(i);

      render(container, tripPointComponent, RenderPosition.BEFOREEND);

      const onEditFormSubmit = (evt) => {
        evt.preventDefault();
        replace(tripPointComponent, tripEditComponent);
        tripEditComponent.getElement().removeEventListener(`submit`, onEditFormSubmit);
      };
      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
        if (isEscKey) {
          replace(tripPointComponent, tripEditComponent);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      const onEditButtonClick = () => {
        replace(tripEditComponent, tripPointComponent);
        tripEditComponent.setSubmitHandler(onEditFormSubmit);
        document.addEventListener(`keydown`, onEscKeyDown);
      };
      tripPointComponent.setEditButtonClickHandler(onEditButtonClick);
    });
  }
}

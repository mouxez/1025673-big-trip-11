import MenuComponent from '../components/menu.js';
import FilterComponent from '../components/filter.js';
import SortingComponent from '../components/sorting.js';
import TripOfferComponent from '../components/trip-offer.js';
import NoTripPointsComponent from '../components/no-trip-points.js';
import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {getRandomInteger} from '../utils/common.js';
import {MAX_ROUTE_COUNT} from '../const.js';
import {sortedByStartTime} from '../main.js';

export default class Controler {
  constructor() {
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._sortingComponent = new SortingComponent();
    this._tripOfferComponent = new TripOfferComponent();
    this._noTripPointsComponent = new NoTripPointsComponent();
  }
  render() {
    const tripControls = document.querySelector(`.trip-controls`);
    render(tripControls, this._menuComponent, RenderPosition.BEFOREEND);
    render(tripControls, this._filterComponent, RenderPosition.BEFOREEND);

    const tripEvent = document.querySelector(`.trip-events`);
    render(tripEvent, this._sortingComponent, RenderPosition.BEFOREEND);
    render(tripEvent, this._tripOfferComponent, RenderPosition.BEFOREEND);

    const tripEventPoint = document.querySelector(`.trip-events__list`);
    sortedByStartTime.slice(0, getRandomInteger(0, MAX_ROUTE_COUNT)).forEach((i) => {
      let tripPointComponent = new TripPointComponent(i);
      let tripEditComponent = new TripEditComponent(i);

      render(tripEventPoint, tripPointComponent, RenderPosition.BEFOREEND);

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
  renderNoPointsMessage(nodeArray) {
    const tripEvents = document.querySelector(`.trip-events`);
    if (nodeArray.length === 0) {
      remove(this._tripOfferComponent);
      remove(this._sortingComponent);
      render(tripEvents, this._noTripPointsComponent, RenderPosition.BEFOREEND);
    }
  }
}

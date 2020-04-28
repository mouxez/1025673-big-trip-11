import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import TripOfferComponent from './components/trip-offer.js';
import TripPointComponent from './components/trip-point.js';
import TripEditComponent from './components/trip-edit.js';
import NoTripPointsComponent from './components/no-trip-points.js';
import {MAX_ROUTE_COUNT, DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {getRandomInteger, sortByStartTime} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';

let listOfData = createData(DATA_COUNT);
let sortedByStartTime = listOfData.sort(sortByStartTime);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripControls, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(tripEvent, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvent, new TripOfferComponent().getElement(), RenderPosition.BEFOREEND);

const tripEventPoint = document.querySelector(`.trip-events__list`);

for (let i = 0; i < getRandomInteger(0, MAX_ROUTE_COUNT); i++) {
  let tripPointComponent = new TripPointComponent(sortedByStartTime[i]).getElement();
  let tripEditComponent = new TripEditComponent(sortedByStartTime[i]).getElement();

  render(tripEventPoint, tripPointComponent, RenderPosition.BEFOREEND);

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    tripEventPoint.replaceChild(tripPointComponent, tripEditComponent);
    tripEditComponent.removeEventListener(`submit`, onEditFormSubmit);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      tripEventPoint.replaceChild(tripPointComponent, tripEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onEditButtonClick = () => {
    tripEventPoint.replaceChild(tripEditComponent, tripPointComponent);
    tripEditComponent.addEventListener(`submit`, onEditFormSubmit);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  tripPointComponent.querySelector(`.event__rollup-btn`).addEventListener(`click`, onEditButtonClick);
}

const listOfPoints = Array.from(document.querySelectorAll(`.trip-events__item`));
const tripEvents = document.querySelector(`.trip-events`);

const renderNoPointsMessage = (array) => {
  if (array.length === 0) {
    document.querySelector(`.trip-days__item`).remove();
    document.querySelector(`.trip-sort`).remove();
    render(tripEvents, new NoTripPointsComponent().getElement(), RenderPosition.BEFOREEND);
  }
};
renderNoPointsMessage(listOfPoints);

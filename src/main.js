import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import TripOfferComponent from './components/trip-offer.js';
import TripPointComponent from './components/trip-point.js';
import TripEditComponent from './components/trip-edit.js';
import {MAX_ROUTE_COUNT, DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {getRandomInteger, RenderPosition, render, sortByStartTime} from './util.js';

let listOfData = createData(DATA_COUNT);
let sortedByStartTime = listOfData.sort(sortByStartTime);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripControls, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(tripEvent, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvent, new TripOfferComponent().getElement(), RenderPosition.BEFOREEND);

const tripEventPoint = document.querySelector(`.trip-events__list`);

for (let i = 0; i < getRandomInteger(1, MAX_ROUTE_COUNT); i++) {
  let tripPointComponent = new TripPointComponent(sortedByStartTime[i]).getElement();
  let tripEditComponent = new TripEditComponent(sortedByStartTime[i]).getElement();

  render(tripEventPoint, tripPointComponent, RenderPosition.BEFOREEND);

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    tripEventPoint.replaceChild(tripPointComponent, tripEditComponent);
  };

  const onEditButtonClick = () => {
    tripEventPoint.replaceChild(tripEditComponent, tripPointComponent);
    tripEditComponent.querySelector(`.event__save-btn`).addEventListener(`click`, onEditFormSubmit);
  };

  tripPointComponent.querySelector(`.event__rollup-btn`).addEventListener(`click`, onEditButtonClick);
}

import ControllerComponent from './controllers/trip.js';
import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import TripOfferComponent from './components/trip-offer.js';
import NoTripPointsComponent from './components/no-trip-points.js';
import {DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {sortByStartTime} from './utils/common.js';
import {render, RenderPosition, remove} from './utils/render.js';

const menuComponent = new MenuComponent();
const filterComponent = new FilterComponent();
const sortingComponent = new SortingComponent();
const tripOfferComponent = new TripOfferComponent();
const noTripPointsComponent = new NoTripPointsComponent();
const controllerComponent = new ControllerComponent();
const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

let listOfData = createData(DATA_COUNT);
export let sortedByStartTime = listOfData.sort(sortByStartTime);

render(tripControls, menuComponent, RenderPosition.BEFOREEND);
render(tripControls, filterComponent, RenderPosition.BEFOREEND);
render(tripEvent, sortingComponent, RenderPosition.BEFOREEND);
render(tripEvent, tripOfferComponent, RenderPosition.BEFOREEND);

const tripEventPoint = document.querySelector(`.trip-events__list`);
controllerComponent.render(tripEventPoint);

const listOfPoints = Array.from(document.querySelectorAll(`.trip-events__item`));
const renderCreateFirstPointMessage = (nodeArray) => {
  const tripEvents = document.querySelector(`.trip-events`);
  if (nodeArray.length === 0) {
    remove(tripOfferComponent);
    remove(sortingComponent);
    render(tripEvents, noTripPointsComponent, RenderPosition.BEFOREEND);
  }
};
renderCreateFirstPointMessage(listOfPoints);

import {createMenu} from './components/menu';
import {createFilter} from './components/filter';
import {createSorting} from './components/sorting';
import {createTripOffer} from './components/trip-offer';
import {createTripPoint} from './components/trip-point';
import {createForm} from './components/form';
import {ROUTE_COUNT} from '../src/const.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripEvent, createSorting());
render(tripEvent, createForm());
render(tripEvent, createTripOffer());
render(tripControls, createMenu());
render(tripControls, createFilter());

const tripEventPoint = document.querySelector(`.trip-events__list`);
for (let i = 0; i < ROUTE_COUNT; i++) {
  render(tripEventPoint, createTripPoint());
}

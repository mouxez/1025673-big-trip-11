import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createSorting} from './components/sorting.js';
import {createTripOffer} from './components/trip-offer.js';
import {createTripPoint} from './components/trip-point.js';
import {createForm} from './components/trip-edit.js';
import {ROUTE_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// создаёт объекты с данными
let listOfData = createData(20);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripEvent, createSorting());
render(tripEvent, createForm(listOfData[0]));
render(tripEvent, createTripOffer());
render(tripControls, createMenu());
render(tripControls, createFilter());

const tripEventPoint = document.querySelector(`.trip-events__list`);
for (let i = 0; i < ROUTE_COUNT; i++) {
  render(tripEventPoint, createTripPoint(listOfData[i]));
}

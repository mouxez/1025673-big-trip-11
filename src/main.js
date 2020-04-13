import {createMenu} from './components/menu';
import {createFilter} from './components/filter';
import {createSorting} from './components/sorting';
import {createTripOffer} from './components/trip-offer';
import {createTripPoint} from './components/trip-point';
import {createForm} from './components/form';
import {ROUTE_COUNT} from '../src/const.js';
import {createData} from './mock/mock.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

// создаёт объекты с данными
let listOfData = createData(20);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripEvent, createSorting());
render(tripEvent, createForm(listOfData));
render(tripEvent, createTripOffer());
render(tripControls, createMenu());
render(tripControls, createFilter());

const tripEventPoint = document.querySelector(`.trip-events__list`);
for (let i = 0; i < ROUTE_COUNT; i++) {
  render(tripEventPoint, createTripPoint());
}

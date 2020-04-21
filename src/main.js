import {createMenu} from './components/menu.js';
import {createFilter} from './components/filter.js';
import {createSorting} from './components/sorting.js';
import {createTripOffer} from './components/trip-offer.js';
import {createTripPoint} from './components/trip-point.js';
import {createForm} from './components/trip-edit.js';
import {MAX_ROUTE_COUNT, DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {getRandomInteger} from './util.js';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

let listOfData = createData(DATA_COUNT);

function sortByStartTime(a, b) {
  let dateA = new Date(a.startTime.toDate()).getTime();
  let dateB = new Date(b.startTime.toDate()).getTime();
  return dateA > dateB ? 1 : -1;
}

let sortedByStartTime = listOfData.sort(sortByStartTime);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripEvent, createSorting());
render(tripEvent, createForm(sortedByStartTime[0]));
render(tripEvent, createTripOffer());
render(tripControls, createMenu());
render(tripControls, createFilter());

const tripEventPoint = document.querySelector(`.trip-events__list`);
for (let i = 0; i < getRandomInteger(1, MAX_ROUTE_COUNT); i++) {
  render(tripEventPoint, createTripPoint(sortedByStartTime[i]));
}

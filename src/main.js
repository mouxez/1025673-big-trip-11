import ControllerComponent from './controllers/trip.js';
import {DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {sortByStartTime} from './utils/common.js';

const controllerComponent = new ControllerComponent();

let listOfData = createData(DATA_COUNT);
export let sortedByStartTime = listOfData.sort(sortByStartTime);

const tripControls = document.querySelector(`.trip-controls`);
controllerComponent.render(tripControls);

const listOfPoints = Array.from(document.querySelectorAll(`.trip-events__item`));
controllerComponent.renderCreateFirstPointMessage(listOfPoints);

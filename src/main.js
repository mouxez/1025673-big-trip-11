import ControllerComponent from './controllers/controller.js';
import {DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {sortByStartTime} from './utils/common.js';

let listOfData = createData(DATA_COUNT);
export let sortedByStartTime = listOfData.sort(sortByStartTime);

const controllerComponent = new ControllerComponent();
controllerComponent.render();

const listOfPoints = Array.from(document.querySelectorAll(`.trip-events__item`));
controllerComponent.renderNoPointsMessage(listOfPoints);

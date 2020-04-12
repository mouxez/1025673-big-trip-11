import {routePoint} from '../components/form.js';
import {tripEvents, destinations, ADDITIONAL_OFFERS, description, photos} from '../const.js';
import {getRandomEl, getRandomInteger, getRandomArray} from '../util.js';

let eventType = getRandomEl(tripEvents);

function createCard() {
  return {
    eventType: routePoint(eventType),
    destination: getRandomEl(destinations),
    price: getRandomInteger(100, 1000),
    // startEventTime: ,
    // endEventTime: ,
    offers: getRandomArray(ADDITIONAL_OFFERS),
    description: getRandomArray(description),
    photos: getRandomArray(photos),
  };
}

let objectsCount = 20;
let listOfData = [];
for (let i = 0; i < objectsCount; i++) {
  listOfData.push(createCard(i));
}

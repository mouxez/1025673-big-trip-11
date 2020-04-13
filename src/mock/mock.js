import {routePoint, destinationOptions, eventOffer, getRandomPhotos} from '../components/form.js';
import {tripEvents, tripActivities, destinations, ADDITIONAL_OFFERS, descriptionList} from '../const.js';
import {getRandomEl, getRandomInteger, getRandomArray} from '../util.js';

let moment = require(`moment`);
moment().format();

function createCard() {
  return {
    eventType: routePoint(getRandomEl(tripEvents)),
    activityType: routePoint(getRandomEl(tripActivities)),
    destination: destinationOptions(destinations),
    price: getRandomInteger(100, 1000),
    startTime: moment.utc(new Date()).format(`DD/MM/YY HH:mm`),
    endTime: moment.utc().add(getRandomInteger(1, 7), `d`).add(getRandomInteger(1, 24), `h`).add(getRandomInteger(1, 60), `m`).format(`DD/MM/YY HH:mm`),
    offers: [eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[0]), eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[1]), eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[2]), eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[3]), eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[4])].join(` `),
    description: getRandomArray(descriptionList),
    photos: getRandomArray(getRandomPhotos(5)),
  };
}

function createData(count) {
  return new Array(count).fill(``).map(createCard);
}

export {createData};

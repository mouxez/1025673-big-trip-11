import {getDestinationOptions, getRandomPhotos} from '../components/trip-edit.js';
import {tripEvents, tripActivities, destinations, ADDITIONAL_OFFERS, descriptionList} from '../const.js';
import {getRandomEl, getRandomInteger, getRandomArray} from '../util.js';

let moment = require(`moment`);
moment().format();

const generateOfferList = () => {
  const result = [];
  const count = getRandomInteger(0, 5);

  for (let i = 0; i < count; i++) {
    result.push({
      title: getRandomEl(ADDITIONAL_OFFERS),
      price: getRandomInteger(1, 100),
      isChecked: true,
    });
  }

  return result;
};

function createCard() {
  return {
    eventType: getRandomEl(tripEvents),
    activityType: getRandomEl(tripActivities),
    destination: getDestinationOptions(destinations),
    city: getRandomEl(destinations),
    price: getRandomInteger(100, 1000),
    startTime: moment.utc(new Date()).format(`DD/MM/YY HH:mm`),
    endTime: moment.utc().add(getRandomInteger(1, 7), `d`).add(getRandomInteger(1, 24), `h`).add(getRandomInteger(1, 60), `m`).format(`DD/MM/YY HH:mm`),
    offers: generateOfferList(),
    description: getRandomArray(descriptionList),
    photos: getRandomArray(getRandomPhotos(5)),
  };
}

function createData(count) {
  return new Array(count)
  .fill(``)
  .map(createCard);
}

export {createData};

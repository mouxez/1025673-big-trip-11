import {getRandomInteger, getRandomArray} from '../util.js';
import {ADDITIONAL_OFFERS, tripEvents, tripActivities, destinations, descriptionList} from '../const.js';

let moment = require(`moment`);
moment().format();

function getRandomPhotos(count) {
  const photoList = [];
  for (let i = 0; i < count; i++) {
    photoList.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`);
  }

  return photoList;
}

// массив опций городов
function destinationOptions(array) {
  let listOfOptions = [];
  for (let i = 0; i < array.length; i++) {
    let option = `<option value="${array[i]}"></option>`;
    listOfOptions.push(option);
  }
  return listOfOptions.join(` `);
}

function eventOffer(array, offer) {
  const isChecked = () => array.indexOf(offer) > -1 ? `checked` : ``;
  return (
    `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}"} ${isChecked()} />
  <label class="event__offer-label" for="event-offer-${offer.name}-1">
    <span class="event__offer-title">${offer.description}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </label>
</div>`
  );
}

// создаёт элементы точек маршрута транспорта
function routePoint(point) {
  return (
    `<div class="event__type-item">
  <input id="event-type-${point.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point.toLowerCase()}" />
  <label class="event__type-label  event__type-label--${point.toLowerCase()}" for="event-type-${point.toLowerCase()}-1">${point}</label>
  </div>`
  );
}

export function createForm(item) {
  const {eventType, activityType, destination, price, startTime, endTime, offers, description, photos} = item;
  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${eventType}
              ${routePoint(tripEvents[0])}
              ${routePoint(tripEvents[1])}
              ${routePoint(tripEvents[2])}
              ${routePoint(tripEvents[3])}
              ${routePoint(tripEvents[4])}
              ${routePoint(tripEvents[5])}
              ${routePoint(tripEvents[6])}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${activityType}
              ${routePoint(tripActivities[0])}
              ${routePoint(tripActivities[1])}
              ${routePoint(tripActivities[2])}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Copenhagen" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destination}
            ${destinationOptions(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${moment.utc(new Date()).format(`DD/MM/YY HH:mm`)} ${startTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${moment.utc().add(getRandomInteger(1, 7), `d`).add(getRandomInteger(1, 24), `h`).add(getRandomInteger(1, 60), `m`).format(`DD/MM/YY HH:mm`)} ${endTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price} ${getRandomInteger(100, 1000)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offers}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[0])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[1])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[2])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[3])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[4])}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${description}
          ${getRandomArray(descriptionList)}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${photos}
            ${getRandomArray(getRandomPhotos(5))}
           </div>
          </div>

        </section>
      </section>
    </form>`
  );
}

export {routePoint, destinationOptions, eventOffer, getRandomPhotos};

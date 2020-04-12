import {getRandomInteger, getRandomArray} from '../util.js';
import {ADDITIONAL_OFFERS, tripEvents, destinations, photos, description} from '../const.js';

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
  return (`<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.name}-1" type="checkbox" name="event-offer-${offer.name}"} ${isChecked()} />
  <label class="event__offer-label" for="event-offer-${offer.name}-1">
    <span class="event__offer-title">${offer.description}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </label>
</div>`);
}

// создаёт элементы точек маршрута транспорта
function routePoint(point) {
  return (`<div class="event__type-item">
  <input id="event-type-${point.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${point.toLowerCase()}" />
  <label class="event__type-label  event__type-label--${point.toLowerCase()}" for="event-type-${point.toLowerCase()}-1">${point}</label>
  </div>`);
}

export function createForm() {
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
              ${routePoint(tripEvents[7])}
              ${routePoint(tripEvents[8])}
              ${routePoint(tripEvents[9])}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            Flight to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Copenhagen" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationOptions(destinations)}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 00:00">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 00:00">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${getRandomInteger(100, 1000)}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[0])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[1])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[2])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[3])}
            ${eventOffer(ADDITIONAL_OFFERS, ADDITIONAL_OFFERS[4])}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${getRandomArray(description)}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${getRandomArray(photos)}
           </div>
          </div>

        </section>
      </section>
    </form>`
  );
}

export {routePoint};

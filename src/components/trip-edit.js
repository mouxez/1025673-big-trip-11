let moment = require(`moment`);
moment().format();

// массив случайных фотографий
function getRandomPhotos(count) {
  const photoList = [];
  for (let i = 0; i < count; i++) {
    photoList.push(`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`);
  }
  return photoList;
}

// массив опций городов
function getDestinationOptions(array) {
  let listOfOptions = [];
  for (let i = 0; i < array.length; i++) {
    let option = `<option value="${array[i]}"></option>`;
    listOfOptions.push(option);
  }
  return listOfOptions.join(` `);
}

function createOfferMarkup(array) {
  return array.map((offer) => {

    return (
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden"
    id="event-offer-${offer.name}-1"
    type="checkbox"
    name="event-offer-${offer.name}"}
    ${offer.isChecked ? `checked` : ``} />
    <label class="event__offer-label" for="event-offer-${offer.name}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`
    );
  }).join(`\n`);
}

function createForm(item) {
  const {eventType, activityType, destination, price, startTime, endTime, offers, description, photos, city} = item;
  const offersList = createOfferMarkup(offers);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              <div class="event__type-item">
                <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input
                visually-hidden"
                type="radio"
                name="event-type"
                value="${eventType.toLowerCase()}" />
                <label class="event__type-label
                event__type-label--${eventType.toLowerCase()}"
                for="event-type-${eventType.toLowerCase()}-1">${eventType}</label>
              </div>
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              <div class="event__type-item">
                <input id="event-type-${activityType.toLowerCase()}-1" class="event__type-input
                visually-hidden"
                type="radio"
                name="event-type"
                value="${activityType.toLowerCase()}" />
                <label class="event__type-label
                event__type-label--${activityType.toLowerCase()}"
                for="event-type-${activityType.toLowerCase()}-1">${activityType}</label>
              </div>
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${eventType} to
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destination}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime.format(`DD/MM/YY HH:mm`)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime.format(`DD/MM/YY HH:mm`)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">

        ${offers.length > 0 ? `<section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersList}
          </div>
        </section>` : ``}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
          ${description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
            ${photos}
           </div>
          </div>

        </section>
      </section>
    </form>`
  );
}

export {getDestinationOptions, getRandomPhotos, createForm};
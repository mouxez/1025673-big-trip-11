const createSelectedOfferMarkup = (array) => {
  return array.map((offer) => {

    return (`<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`);
  }).join(`\n`);
};

const formatDateValue = (value) => {
  return String(value).padStart(2, `0`);
};

const getEventDuration = (start, end) => {
  const durationMs = end.getTime() - start.getTime();
  const durationTime = new Date(`1970-01-01T00:00`);
  durationTime.setMilliseconds(durationMs);
  const days = durationTime.getDate() - 1;
  const hours = durationTime.getHours();
  const minutes = durationTime.getMinutes();

  const dayFormated = days > 0 ? formatDateValue(days) + `D` : ``;
  const hourFormated = hours > 0 ? formatDateValue(hours) + `H` : ``;
  const minuteFormated = minutes > 0 ? formatDateValue(minutes) + `M` : ``;

  return `${dayFormated} ${hourFormated} ${minuteFormated}`;
};

export const createTripPoint = (item) => {
  const {eventType, city, price, startTime, endTime, offers} = item;
  const selectedOffers = createSelectedOfferMarkup(offers);
  const eventDuration = getEventDuration(startTime.toDate(), endTime.toDate());

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} to ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startTime.format(`YYYY-MM-DD`)}T${startTime.format(`HH:mm`)}">${startTime.format(`HH:mm`)}</time>
          &mdash;
          <time class="event__end-time" datetime="${endTime.format(`YYYY-MM-DD`)}T${endTime.format(`HH:mm`)}">${endTime.format(`HH:mm`)}</time>
        </p>
        <p class="event__duration">${eventDuration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${selectedOffers}
      </ul>
      ${offers.length > 0 ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>` : ``}
    </div>
  </li>`
  );
};

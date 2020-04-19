function createSelectedOfferMarkup(array) {
  return array.map((offer) => {

    return (`<li class="event__offer">
    <span class="event__offer-title">${offer.title}</span>
    &plus;
    &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
  </li>`);
  }).join(`\n`);
}

export function createTripPoint(item) {
  const {eventType, city, price, startTime, endTime, offers} = item;
  const selectedOffers = createSelectedOfferMarkup(offers);

  return (
    `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventType} to ${city}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T${startTime}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T${endTime}">${endTime}</time>
        </p>
        <p class="event__duration">1H 10M</p>
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
}

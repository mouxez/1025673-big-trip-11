function sequence(start = 1, step = 1) {
  let callNumber = start;
  return function () {
    let returnValue = callNumber;
    callNumber += step;
    return returnValue;
  };
}

let generator = sequence(1, 1);

function createTripOfferMarkup(date) {
  return (`<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${generator()}</span>
    <time class="day__date" datetime="${date}">${date}</time>
  </div>
  <ul class="trip-events__list">
  </ul>
</li>`);
}

// доработка счетчика даты
export function createTripOffer() {
  return (
    `<ul class="trip-days">
      ${createTripOfferMarkup(`18 MAR`)}
      ${createTripOfferMarkup(`19 MAR`)}
      ${createTripOfferMarkup(`20 MAR`)}
    </ul>`
  );
}

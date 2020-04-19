const sortingList = [`Event`, `Time`, `Price`];

function createSortingMarkup(array) {
  return array.map((value) => {

    return (`<div class="trip-sort__item  trip-sort__item--${value.toLowerCase()}">
    <input id="sort-${value.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${value.toLowerCase()}" />
    <label class="trip-sort__btn" for="sort-${value.toLowerCase()}">
    ${value}
    </label>
    </div>`);
  }).join(`\n`);
}

export function createSorting() {
  const sortingItems = createSortingMarkup(sortingList);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>
        ${sortingItems}
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
}

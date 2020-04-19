const filterOptions = [`Everything`, `Future`, `Past`];

function createFilterMarkup(array) {
  return array.map((option) => {

    return (`<div class="trip-filters__filter">
    <input id="filter-${option.toLowerCase()}"
    class="trip-filters__filter-input  visually-hidden"
    type="radio" name="trip-filter"
    value="${option.toLowerCase()}" />
    <label class="trip-filters__filter-label"
    for="filter-${option.toLowerCase()}">${option}</label>
  </div>`);
  }).join(`\n`);
}

export function createFilter() {
  const filterValues = createFilterMarkup(filterOptions);

  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterValues}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

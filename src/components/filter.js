const filterOptions = [`Everything`, `Future`, `Past`];

function getFilterItem(option) {
  // const isChecked = () => array.indexOf(option) > -1 ? `checked` : ``; ${isChecked()}
  return (`<div class="trip-filters__filter">
  <input id="filter-${option.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${option.toLowerCase()}" />
  <label class="trip-filters__filter-label" for="filter-${option.toLowerCase()}">${option}</label>
</div>`);
}

export function createFilter() {
  return (
    `<form class="trip-filters" action="#" method="get">
    ${getFilterItem(filterOptions[0])}
    ${getFilterItem(filterOptions[1])}
    ${getFilterItem(filterOptions[2])}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

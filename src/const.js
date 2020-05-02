const ADDITIONAL_OFFERS = [`Add taxi`, `Add meal`, `Switch to business`, `Add luggage`, `Choose seats`];

const MAX_ROUTE_COUNT = 3;
const DATA_COUNT = 20;
const tripEvents = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const tripActivities = [`Check-in`, `Sightseeing`, `Restaurant`];
const destinations = [`Copenhagen`, `Paris`, `Reykjavik`, `Zurich`];
const descriptionList = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`];
const SortType = {
  EVENT: `Event`,
  TIME: `Time`,
  PRICE: `Price`,
};

export {
  ADDITIONAL_OFFERS,
  tripEvents,
  tripActivities,
  destinations,
  descriptionList,
  MAX_ROUTE_COUNT, DATA_COUNT,
  SortType,
};

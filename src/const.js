const ADDITIONAL_OFFERS = [
  {name: `taxi`, price: 40, discription: `Add taxi`},
  {name: `meal`, price: 50, discription: `Add meal`},
  {name: `business`, price: 100, discription: `Switch to business`},
  {name: `luggage`, price: 30, discription: `Add luggage`},
  {name: `seat`, price: 5, discription: `Choose seats`}
];
const ROUTE_COUNT = 3;
const tripEvents = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const destinations = [`Copenhagen`, `Paris`, `Reykjavik`, `Zurich`];
const photos = [`<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`, `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`, `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`, `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`, `<img class="event__photo" src="http://picsum.photos/248/152?r=${Math.random()}" alt="Event photo"></img>`];
const description = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`, `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`, `Sed sed nisi sed augue convallis suscipit in sed felis.`, `Aliquam erat volutpat.`, `Nunc fermentum tortor ac porta dapibus.`, `In rutrum ac purus sit amet tempus.`];

export {ADDITIONAL_OFFERS, tripEvents, destinations, photos, description, ROUTE_COUNT};

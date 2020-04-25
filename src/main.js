import MenuComponent from './components/menu.js';
import FilterComponent from './components/filter.js';
import SortingComponent from './components/sorting.js';
import TripOfferComponent from './components/trip-offer.js';
import TripPointComponent from './components/trip-point.js';
import TripEditComponent from './components/trip-edit.js';
import {MAX_ROUTE_COUNT, DATA_COUNT} from '../src/const.js';
import {createData} from './mock/trip-point.js';
import {getRandomInteger, RenderPosition, render, sortByStartTime, replace} from './util.js';

let listOfData = createData(DATA_COUNT);
let sortedByStartTime = listOfData.sort(sortByStartTime);

const tripControls = document.querySelector(`.trip-controls`);
const tripEvent = document.querySelector(`.trip-events`);

render(tripControls, new MenuComponent().getElement(), RenderPosition.BEFOREEND);
render(tripControls, new FilterComponent().getElement(), RenderPosition.BEFOREEND);

render(tripEvent, new SortingComponent().getElement(), RenderPosition.BEFOREEND);
render(tripEvent, new TripOfferComponent().getElement(), RenderPosition.BEFOREEND);

const tripEventPoint = document.querySelector(`.trip-events__list`);

for (let i = 0; i < getRandomInteger(1, MAX_ROUTE_COUNT); i++) {
  // получаю текущие компоненты с индексом
  let tripPoint = new TripPointComponent(sortedByStartTime[i]);
  let tripEdit = new TripEditComponent(sortedByStartTime[i]);
  // логика при нажатии на кнопку редакторования
  const onEditButtonClick = () => {
    replace(tripPoint.getElement(), tripEdit.getElement());
  };
  // логика при сохранении формы
  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    replace(tripEdit.getElement(), tripPoint.getElement());
  };
  // устанавливает обработчики компонентам
  tripPoint.setClickHandler(onEditButtonClick);
  tripEdit.setSubmitHandler(onEditFormSubmit);
  // отрисовывает точки маршрута
  render(tripEventPoint, tripPoint, RenderPosition.BEFOREEND);
}

import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {getRandomInteger} from '../utils/common.js';
import {MAX_ROUTE_COUNT, SortType} from '../const.js';
import {sortedByStartTime} from '../main.js';
import TripPointComponent from '../components/trip-point.js';
import TripEditComponent from '../components/trip-edit.js';
import MenuComponent from '../components/menu.js';
import FilterComponent from '../components/filter.js';
import SortingComponent from '../components/sorting.js';
import TripOfferComponent from '../components/trip-offer.js';
import NoTripPointsComponent from '../components/no-trip-points.js';

// Вынес логику рендеринга точек маршрута в отдельную функцию

const renderTripPoints = (array) => {
  array.slice(0, getRandomInteger(0, MAX_ROUTE_COUNT)).forEach((i) => {
    let tripPointComponent = new TripPointComponent(i);
    let tripEditComponent = new TripEditComponent(i);
    const tripEventPoint = document.querySelector(`.trip-events__list`);

    render(tripEventPoint, tripPointComponent, RenderPosition.BEFOREEND);

    const onEditFormSubmit = (evt) => {
      evt.preventDefault();
      replace(tripPointComponent, tripEditComponent);
      tripEditComponent.getElement().removeEventListener(`submit`, onEditFormSubmit);
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replace(tripPointComponent, tripEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    const onEditButtonClick = () => {
      replace(tripEditComponent, tripPointComponent);
      tripEditComponent.setSubmitHandler(onEditFormSubmit);
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    tripPointComponent.setEditButtonClickHandler(onEditButtonClick);
  });
};
// создал функцию сортировки точек маршрута

const getSortedTripPoints = (array, sortType) => {
  let sortedPoints = [];
  const pointsToSort = array.slice();

  switch (sortType) {
    case SortType.PRICE:
      sortedPoints = pointsToSort.sort((a, b) => a.price - b.price);
      break;
    case SortType.TIME:
      sortedPoints = pointsToSort.sort((a, b) => a.startTime.toDate() - b.startTime.toDate());
      break;
    case SortType.EVENT:
      sortedPoints = pointsToSort;
  }
  return sortedPoints;
};

const tripEvent = document.querySelector(`.trip-events`);

// перенёс рендеринг всех компонентов в контроллер для удобства работы с ними

export default class Controller {
  constructor(container) {
    this._container = container;
    this._menuComponent = new MenuComponent();
    this._filterComponent = new FilterComponent();
    this._sortingComponent = new SortingComponent();
    this._tripOfferComponent = new TripOfferComponent();
    this._noTripPointsComponent = new NoTripPointsComponent();
  }
  render(container) {
    render(container, this._menuComponent, RenderPosition.BEFOREEND);
    render(container, this._filterComponent, RenderPosition.BEFOREEND);
    render(tripEvent, this._sortingComponent, RenderPosition.BEFOREEND);
    render(tripEvent, this._tripOfferComponent, RenderPosition.BEFOREEND);

    renderTripPoints(sortedByStartTime);
    // добавляет слушатель клика компоненту Sorting
    this._sortingComponent.setSortTypeChangeHandler(() => {
      const sortedTripPoints = getSortedTripPoints(sortedByStartTime, this._sortComponent.getSortType());
      // собираю отрисованные точки маршрута и удаляю их
      document.querySelectorAll(`.trip-events__item`).forEach((item) => {
        item.remove();
      });
      // отрисовываю отсортированные точки
      renderTripPoints(sortedTripPoints);
    });
  }
  renderCreateFirstPointMessage(nodeArray) {
    const tripEvents = document.querySelector(`.trip-events`);
    if (nodeArray.length === 0) {
      remove(this._tripOfferComponent);
      remove(this._sortingComponent);
      render(tripEvents, this._noTripPointsComponent, RenderPosition.BEFOREEND);
    }
  }
  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    const sortedEvents = getSortedTripPoints(this._events, sortType, 0, this._events.length);
    this.renderTripDays(sortedEvents);

  }
  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }
  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());

  }
}

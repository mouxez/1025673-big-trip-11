import Day from './../components/day.js';
import DaysList from './../components/days-list.js';
import Message from './../components/message.js';
import Sort from './../components/sort.js';
import EventController from './event-controller';
import SortContainer from './../components/sort-container';
import {getEventsInDays, TYPES_OF_EVENT, ModeType, remove} from './../util.js';

export default class TripController {
  constructor(container, onDataChange) {
    this._container = container;
    this._creatingEvent = null;
    this._sort = new Sort();
    this._message = new Message();
    this._daysList = new DaysList();
    this._sortOrFilterEventsContainer = new SortContainer();
    this._onDataChange = onDataChange;
    this._subscriptions = [];
    this.onChangeView = this.onChangeView.bind(this);
  }

  init(eventsData) {
    if (eventsData && eventsData.length === 0) {
      this._renderMessage();
      remove(this._daysList.getElement());
      return;
    }
    if (eventsData) {
      this._eventsData = eventsData;
    }
    const data = this._eventsData;
    const filteredData = this._getFilteredData(data);
    this._renderSortEvents(filteredData);
    const tripEvents = document.querySelector(`.trip-events`);
    tripEvents.querySelector(`h2`).after(this._sort.getElement());
    this._sort.getElement().addEventListener(`change`, () => {
      this._renderSortEvents(filteredData);
    });
  }
  _getFilteredData(data) {
    const currentFilter = Array.from(document.querySelectorAll(`.trip-filters__filter-input`)).find((it) => it.checked).value;
    const date = Date.now();
    let events;
    switch (currentFilter) {
      case `future`:
        events = data.filter((event) => event.start > date);
        break;
      case `past`:
        events = data.filter((event) => event.start < date);
        break;
      case `everything`:
        events = data;
        break;
    }
    return events;
  }

  _renderSortEvents(data) {

    if (!this._daysList.getElement().querySelector(`ul`)) {
      this._renderDaysList(data);
      return;
    }
    this._daysList.getElement().innerHTML = ``;
    this._daysList.getElement().append(this._sortOrFilterEventsContainer.getElement());
    const eventsListSort = this._sortOrFilterEventsContainer.getElement().querySelector(`.trip-events__list`);
    eventsListSort.innerHTML = ``;
    const currentSort = Array.from(this._sort.getElement().querySelectorAll(`input`)).find((it) => it.checked).value;

    switch (currentSort) {
      case `sort-event`:
        this._renderDaysList(data);
        break;
      case `sort-time`:
        const eventsByTime = data.slice().sort((a, b) => (a.start - a.end) - (b.start - b.end));
        this._renderEvents(eventsByTime, eventsListSort);
        break;
      case `sort-price`:
        const eventsByPrice = data.slice().sort((a, b) => b.price - a.price);
        this._renderEvents(eventsByPrice, eventsListSort);
        break;
    }
  }

  createEvent(addButton) {
    const defaultEvent = {
      type: TYPES_OF_EVENT[0],
      destination: ``,
      price: 0,
      start: new Date(),
      end: new Date(),
      offers: [],
      isFavorite: false,
    };

    if (this._message.getElement()) {
      remove(this._message.getElement());
      this._sort.getElement().classList.remove(`visually-hidden`);
    }
    this._addButton = addButton;
    const eventsListContainer = this._container.querySelector(`.trip-sort`);
    this._creatingEvent = new EventController(defaultEvent, ModeType.ADD, eventsListContainer, (...args) => {
      this._addButton.disabled = false;
      this._onDataChange(...args);
    }, this.onChangeView);
  }
  _renderMessage() {
    this._sort.getElement().classList.add(`visually-hidden`);
    this._container.append(this._message.getElement());
  }

  _renderDaysList(events) {
    remove(this._daysList.getElement());
    this._daysList.removeElement();
    this._container.append(this._daysList.getElement());
    const sortedEvents = events.sort((a, b) => a.start - b.start);
    const eventsInDays = getEventsInDays(sortedEvents);

    const datesData = Object.keys(eventsInDays);
    datesData.forEach((date, index) => {
      const day = this._renderDay(date, index, this._daysList.getElement());
      const eventsInDayData = eventsInDays[date];
      const eventsListContainer = day.querySelector(`.trip-events__list`);
      this._renderEvents(eventsInDayData, eventsListContainer);
    });
  }

  _renderDay(date, index, daysListElement) {
    const day = new Day(date, index);
    const dayElement = day.getElement();
    daysListElement.append(dayElement);
    return dayElement;
  }

  _renderEvents(eventsInDayData, eventsListContainer) {
    eventsInDayData.map((eventData) => {
      this._renderEvent(eventData, eventsListContainer);
    });
  }
  _renderEvent(eventData, eventsListContainer) {
    const eventController = new EventController(eventData, ModeType.DEFAULT, eventsListContainer, this._onDataChange, this.onChangeView);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }

  onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }
  hide() {
    this._daysList.getElement().classList.add(`visually-hidden`);
    this._sort.getElement().classList.add(`visually-hidden`);
  }
  show() {
    this._daysList.getElement().classList.remove(`visually-hidden`);
    this._sort.getElement().classList.remove(`visually-hidden`);
  }
}

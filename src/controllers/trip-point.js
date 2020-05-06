import AbstractComponent from "../components/abstract-component.js";
import TripPointComponent from "../components/trip-point.js";
import TripEditComponent from "../components/trip-edit.js";
import {RenderPosition, render, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController extends AbstractComponent {
  constructor(container, onDataChange, onViewChange) {
    super();
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._tripPointComponent = null;
    this._tripEditComponent = null;
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
    if (isEscKey) {
      replace(this._tripPointComponent, this._tripEditComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(point) {
    const oldEventComponent = this._tripPointComponent;
    const oldEventEditComponent = this._tripEditComponent;

    this._tripPointComponent = new TripPointComponent(point);
    this._tripEditComponent = new TripEditComponent(point);

    this._tripPointComponent.setRollupBtnClickHandler(() => {
      this._replaceEventToEdit();
    });

    this._tripEditComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._tripEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._tripPointComponent, oldEventComponent);
      replace(this._tripEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._tripPointComponent, RenderPosition.BEFOREEND);
    }
  }
  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._tripEditComponent, this._tripPointComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }
  _replaceEditToEvent() {
    replace(this._tripPointComponent, this._tripEditComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }
  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }
}

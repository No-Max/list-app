import Component from "./Component.js";

export default class CreateButton extends Component {
  _disabled;
  _onClick = () => {};
  constructor(selector) {
    super(selector);
    this.disabled = true;
  }

  set onClick(handler) {
    this._onClick = handler;
    this.$element.addEventListener("click", this._onClick);
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
    this.$element.disabled = isDisabled;
  }
}

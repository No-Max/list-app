import Component from "./Component.js";

export default class Button extends Component {
  _disabled;
  _hidden;
  _onClick = () => {};
  constructor(selector, disabled = true, hidden = false) {
    super(selector);
    this.disabled = disabled;
    this.hidden = hidden;
  }

  set onClick(handler) {
    this._onClick = handler;
    this.$element.addEventListener("click", this._onClick);
  }

  set disabled(isDisabled) {
    this._disabled = isDisabled;
    this.$element.disabled = isDisabled;
  }

  set hidden(isHidden) {
    this._hidden = isHidden;
    if (this._hidden) {
      this.$element.style.display = "none";
    } else {
      this.$element.style.display = "inline-block";
    }
  }
}

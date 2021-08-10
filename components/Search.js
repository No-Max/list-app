import Component from "./Component.js";

export default class Search extends Component {
  _value = "";
  constructor(selector, onInput) {
    super(selector);
    this.$element.addEventListener("input", ({ target }) => {
      this._value = target.value;
      onInput(this._value.toLowerCase().trim());
    });
  }

  get value() {
    return this._value;
  }

  clear() {
    this._value = "";
    this.$element.value = "";
  }
}

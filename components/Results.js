import Component from "./Component.js";

export default class Results extends Component {
  constructor(selector, items = []) {
    super(selector);
    this._items = items;
    this._searchResults = items;
    this.render(); // довольно опасно вызывать методы в конструкторе, но если вы уверены в своем коде, то можно
  }

  searchItems(text) {
    this._searchResults = this._items.filter((item) =>
      item.toLowerCase().includes(text)
    );
    this.render();
  }

  get items() {
    return this._items;
  }

  addItem(item) {
    this._items.push(item);
    this._searchResults = this._items;
    this.render();
  }

  render() {
    this.$element.innerHTML = this._searchResults.reduce(
      (result, item) => (result += `<li>${item}</li>`),
      ""
    );
  }
}
